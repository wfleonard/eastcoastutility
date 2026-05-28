#!/bin/bash
# ──────────────────────────────────────────────────────────────
# East Coast Utility — Linode Nanode Deploy Script
#
# Run this on a fresh Ubuntu 22.04/24.04 Nanode as root.
# Idempotent: safe to re-run.
#
# What it does:
#   1. apt update + base packages
#   2. Installs Docker Engine + compose plugin
#   3. Installs git, ufw, fail2ban, nginx, certbot
#   4. Configures UFW (SSH + HTTP/HTTPS only — port 3000 stays internal)
#   5. Creates a non-root `deploy` user in the `docker` group
#   6. Clones the repo to /opt/eastcoastutility (SSH, HTTPS fallback)
#   7. Scaffolds .env from .env.example and pauses for editing
#   8. `docker compose up --build -d`
#   9. Installs nginx server block for eastcoastutility.com → :3000
#  10. Creates 1 GB swap (matters on a 1 GB Nanode)
#  11. Enables docker on boot
#  12. Installs `ecu-update` helper for one-command git-pull + rebuild
#
# After this script: run `certbot --nginx -d eastcoastutility.com -d www.eastcoastutility.com`
# once DNS is pointing at the Nanode, to enable TLS.
#
# Usage:
#   ssh root@<nanode-ip>
#   curl -fsSL https://raw.githubusercontent.com/wfleonard/eastcoastutility/main/deploy.sh -o deploy.sh
#   bash deploy.sh
# ──────────────────────────────────────────────────────────────
set -euo pipefail

APP_USER="deploy"
APP_DIR="/opt/eastcoastutility"
REPO_SSH="git@github.com:wfleonard/eastcoastutility.git"
REPO_HTTPS="https://github.com/wfleonard/eastcoastutility.git"
BRANCH="main"
DOMAIN="eastcoastutility.com"

echo "═══════════════════════════════════════════════"
echo "  East Coast Utility — Server Setup"
echo "═══════════════════════════════════════════════"

# ── 1. System updates & dependencies ──────────────────────────
echo ""
echo "▶ Updating system packages..."
apt-get update -qq
DEBIAN_FRONTEND=noninteractive apt-get upgrade -y -qq

echo "▶ Installing Docker..."
if ! command -v docker &>/dev/null; then
    curl -fsSL https://get.docker.com | sh
fi

echo "▶ Installing supporting packages..."
DEBIAN_FRONTEND=noninteractive apt-get install -y -qq \
    docker-compose-plugin \
    git \
    ufw \
    fail2ban \
    nginx \
    certbot \
    python3-certbot-nginx

# ── 2. Firewall ───────────────────────────────────────────────
echo ""
echo "▶ Configuring firewall..."
ufw default deny incoming
ufw default allow outgoing
ufw allow OpenSSH
ufw allow "Nginx Full"
# Port 3000 is NOT opened — nginx proxies localhost:3000.
echo "y" | ufw enable
ufw status

# ── 3. Create deploy user ────────────────────────────────────
echo ""
if ! id "$APP_USER" &>/dev/null; then
    echo "▶ Creating deploy user..."
    useradd -m -s /bin/bash -G docker "$APP_USER"
else
    echo "▶ Deploy user exists, ensuring docker group..."
    usermod -aG docker "$APP_USER"
fi

# ── 4. Clone repo ────────────────────────────────────────────
echo ""
echo "▶ Setting up application directory..."
mkdir -p "$APP_DIR"
chown "$APP_USER:$APP_USER" "$APP_DIR"

if [ -d "$APP_DIR/.git" ]; then
    echo "  Repo exists, pulling latest..."
    sudo -u "$APP_USER" git -C "$APP_DIR" pull origin "$BRANCH"
else
    echo "  Cloning repo..."
    if sudo -u "$APP_USER" git clone -b "$BRANCH" "$REPO_SSH" "$APP_DIR" 2>/dev/null; then
        echo "  Cloned via SSH"
    else
        echo "  SSH clone failed — falling back to HTTPS (public repo, no auth needed)."
        sudo -u "$APP_USER" git clone -b "$BRANCH" "$REPO_HTTPS" "$APP_DIR"
    fi
fi

# ── 5. Environment file ──────────────────────────────────────
echo ""
ENV_FILE="$APP_DIR/.env"
if [ ! -f "$ENV_FILE" ]; then
    echo "▶ Creating .env from .env.example..."
    sudo -u "$APP_USER" cp "$APP_DIR/.env.example" "$ENV_FILE"
    chmod 600 "$ENV_FILE"
    echo ""
    echo "  ⚠  IMPORTANT: edit $ENV_FILE with the real Mailtrap token + emails:"
    echo "       nano $ENV_FILE"
    echo ""
    read -p "  Press Enter once .env is filled in (or Ctrl+C to do it later)..."
else
    echo "▶ .env file already exists, keeping it"
fi

# ── 6. Build & start containers ──────────────────────────────
echo ""
echo "▶ Building containers (first build takes a few minutes)..."
cd "$APP_DIR"
sudo -u "$APP_USER" docker compose build

echo ""
echo "▶ Starting services..."
sudo -u "$APP_USER" docker compose up -d

# ── 7. nginx reverse proxy ───────────────────────────────────
echo ""
NGINX_CONF="/etc/nginx/sites-available/$DOMAIN"
if [ ! -f "$NGINX_CONF" ]; then
    echo "▶ Installing nginx server block for $DOMAIN..."
    if [ -f "$APP_DIR/nginx/eastcoastutility.conf" ]; then
        cp "$APP_DIR/nginx/eastcoastutility.conf" "$NGINX_CONF"
    else
        # Fallback inline config if the repo file is missing.
        cat > "$NGINX_CONF" <<NGINX
server {
    listen 80;
    listen [::]:80;
    server_name $DOMAIN www.$DOMAIN;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
        proxy_cache_bypass \$http_upgrade;
    }
}
NGINX
    fi
    ln -sf "$NGINX_CONF" "/etc/nginx/sites-enabled/$DOMAIN"
    rm -f /etc/nginx/sites-enabled/default
    nginx -t && systemctl reload nginx
else
    echo "▶ nginx config for $DOMAIN already in place"
fi

# ── 8. Verify ─────────────────────────────────────────────────
echo ""
echo "▶ Waiting for the app to start..."
sleep 8

if curl -sf http://localhost:3000 > /dev/null 2>&1; then
    echo "  ✓ Next.js is responding on localhost:3000"
else
    echo "  ✗ Next.js not responding yet (check: docker compose logs)"
fi

# ── 9. Auto-restart on reboot ─────────────────────────────────
echo ""
echo "▶ Enabling Docker on boot..."
systemctl enable docker
systemctl enable nginx

# ── 10. Update helper ─────────────────────────────────────────
cat > /usr/local/bin/ecu-update <<'SCRIPT'
#!/bin/bash
# Pull latest from main and rebuild the running container.
set -euo pipefail
cd /opt/eastcoastutility
sudo -u deploy git pull origin main
sudo -u deploy docker compose build
sudo -u deploy docker compose up -d
echo "✓ Updated and restarted"
SCRIPT
chmod +x /usr/local/bin/ecu-update

# ── 11. Swap (safety net for 1 GB Nanode) ────────────────────
if [ ! -f /swapfile ]; then
    echo ""
    echo "▶ Creating 1 GB swap file..."
    fallocate -l 1G /swapfile
    chmod 600 /swapfile
    mkswap /swapfile
    swapon /swapfile
    echo "/swapfile none swap sw 0 0" >> /etc/fstab
fi

# ── Done ──────────────────────────────────────────────────────
SERVER_IP=$(hostname -I | awk '{print $1}')
echo ""
echo "═══════════════════════════════════════════════"
echo "  ✓ Setup complete!"
echo "═══════════════════════════════════════════════"
echo ""
echo "  Internal:   http://localhost:3000"
echo "  Direct IP:  http://$SERVER_IP  (HTTP, before TLS)"
echo "  Update:     ecu-update"
echo "  Logs:       cd $APP_DIR && docker compose logs -f"
echo "  Status:     cd $APP_DIR && docker compose ps"
echo ""
echo "  Next: point $DOMAIN + www.$DOMAIN A records at $SERVER_IP,"
echo "        then run:"
echo "          certbot --nginx -d $DOMAIN -d www.$DOMAIN"
echo "        to enable HTTPS."
echo ""
