# Deploy — East Coast Utility on a Linode Nanode

End-to-end runbook for taking `eastcoastutility.com` from a bare Linode to a live HTTPS site. Total time: ~20 minutes.

## What `deploy.sh` installs on a bare server

Running `bash deploy.sh` on a fresh Ubuntu 22.04/24.04 Nanode (as root) gives you:

| Component | Source | Why |
| --- | --- | --- |
| Docker Engine | `get.docker.com` script | Runs the app container |
| `docker compose` plugin | apt (`docker-compose-plugin`) | One-command lifecycle |
| Git | apt | Clone + pull the repo |
| UFW | apt | Firewall (SSH + HTTP/HTTPS only) |
| fail2ban | apt | Blocks SSH brute-force |
| nginx | apt | TLS terminator + reverse proxy → `:3000` |
| certbot + nginx plugin | apt | Let's Encrypt cert + auto-renew |
| `deploy` user | created | Non-root account in the `docker` group |
| 1 GB swap | `/swapfile` | Safety net on a 1 GB Nanode during `npm install` |
| `ecu-update` helper | `/usr/local/bin` | One-command pull-and-rebuild |

The repo itself lands in `/opt/eastcoastutility`.

## Prerequisites

1. A Linode Nanode (1 GB, Ubuntu 24.04 LTS) — Nanode 1 GB plan is fine.
2. DNS access for `eastcoastutility.com` (Linode DNS, Cloudflare, registrar — wherever the zone lives).
3. A Mailtrap Send token (`MAILTRAP_API_TOKEN`) — get it from Mailtrap → Sending → API Tokens.

The GitHub repo (`wfleonard/eastcoastutility`) is public, so the bootstrap and ongoing `git pull`s need no auth.

## Step 1 — Spin up the Nanode

1. Linode dashboard → **Create → Linode**
2. Distribution: Ubuntu 24.04 LTS
3. Region: Newark (NJ) for low latency to Tom
4. Plan: Shared CPU → **Nanode 1 GB**
5. Set a strong root password (or attach an SSH key now and skip password auth)
6. Label: `ecu-prod`
7. Click **Create Linode**, wait ~60s for it to come up
8. Note the **public IP** — you'll need it twice (for SSH and DNS)

## Step 2 — Point DNS

Before TLS will work, the domain must resolve to the Nanode.

In whichever DNS provider hosts `eastcoastutility.com`:

| Type | Host | Value | TTL |
| --- | --- | --- | --- |
| A | `@` | `<Nanode IP>` | 300 |
| A | `www` | `<Nanode IP>` | 300 |

Verify with `dig eastcoastutility.com +short` — it must return the Nanode IP before you run certbot.

## Step 3 — Run the bootstrap

```bash
ssh root@<nanode-ip>

curl -fsSL https://raw.githubusercontent.com/wfleonard/eastcoastutility/main/deploy.sh -o deploy.sh
bash deploy.sh
```

The script will:

1. Run through all the apt installs (~3 min)
2. `git clone` the public repo over HTTPS — no prompts.
3. Copy `.env.example` → `.env` and pause for you to fill in:

   ```
   MAILTRAP_API_TOKEN=<paste your token>
   CONTACT_FROM_EMAIL=noreply@eastcoastutility.com
   CONTACT_TO_EMAIL=tom@eastcoastutility.com
   ```

   Save the file (`Ctrl+O`, `Enter`, `Ctrl+X`) and hit Enter to continue.
4. Build the Docker image and start the container (~3–5 min on first build).
5. Install the nginx config and reload.

At the end you'll see the URL summary.

## Step 4 — Enable HTTPS

Once `dig` confirms DNS is propagated:

```bash
certbot --nginx -d eastcoastutility.com -d www.eastcoastutility.com
```

- Enter Tom's email when prompted
- Agree to TOS
- Choose to **redirect HTTP → HTTPS** when asked

Certbot rewrites the nginx config to add a `:443` block and a `:80 → :443` redirect. The cron job for auto-renewal is installed automatically — verify with `systemctl list-timers | grep certbot`.

Visit https://eastcoastutility.com — the new site should load.

## Step 5 — Smoke test the contact form

1. Open https://eastcoastutility.com
2. Click **Contact**
3. Submit the form with your real info
4. Check `tom@eastcoastutility.com` for the inbound message (subject: "New ECU contact request from …")

If the email never arrives, check the container logs:

```bash
cd /opt/eastcoastutility && docker compose logs -f nextjs-app
```

Most likely cause: `MAILTRAP_API_TOKEN` is wrong or the `CONTACT_FROM_EMAIL` domain isn't verified in Mailtrap.

## Day-2 ops

### Deploy a new version
```bash
ssh root@<nanode-ip>
ecu-update
```
Pulls main, rebuilds, restarts. ~30 seconds.

### Tail logs
```bash
cd /opt/eastcoastutility && docker compose logs -f
```

### Restart only the app
```bash
cd /opt/eastcoastutility && docker compose restart nextjs-app
```

### Renew TLS (manual — auto-renew runs daily)
```bash
certbot renew --nginx
```

### Edit the contact email / Mailtrap token
```bash
nano /opt/eastcoastutility/.env
cd /opt/eastcoastutility && docker compose up -d
```

## Rolling back

The deploy is just a git commit. To roll back:

```bash
cd /opt/eastcoastutility
sudo -u deploy git log --oneline -5     # find the last good commit
sudo -u deploy git checkout <sha>
sudo -u deploy docker compose build
sudo -u deploy docker compose up -d
```

## Decommissioning the old PHP site

After the new site is verified live on `eastcoastutility.com`:

1. Confirm the Mailtrap email pipeline has been delivering at least one full business day's worth of contacts.
2. Take a final database export of the legacy `customers` MySQL table (so any historical leads aren't lost).
3. **Rotate the old shared credentials** — the password `Sa1l0r!001` was hardcoded into `website2024/db/Database.php` and `website2024/db/sendCustomerEmail.php`. Change both the MySQL user password and the `tom@eastcoastutility.com` mailbox password before deleting the shared-host files.
4. Then it's safe to remove the legacy PHP/MySQL site from the old shared host.
