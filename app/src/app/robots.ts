/**
 * Next.js App Router generates /robots.txt from this file.
 * Before this existed, eastcoastutility.com/robots.txt returned a 404 page.
 *
 * THE IMPORTANT PART: the explicit AI crawler allowances below.
 *
 * A missing robots.txt allows everything by default, so nothing was blocked
 * before — but the moment you add one, anything not covered risks being
 * excluded. More to the point, these bots fall into two distinct groups, and
 * conflating them is the most common way a business accidentally makes itself
 * invisible to AI search:
 *
 *   RETRIEVAL bots fetch pages at the moment a user asks a question. If you
 *   block these you CANNOT be cited, full stop. This is the entire ballgame.
 *     - OAI-SearchBot, ChatGPT-User    (ChatGPT)
 *     - PerplexityBot, Perplexity-User (Perplexity)
 *     - Claude-User, Claude-SearchBot  (Claude)
 *
 *   TRAINING bots collect pages to train future models. Blocking these does
 *   not remove you from search results today; it's a business judgement about
 *   whether your content trains someone's model.
 *     - GPTBot (OpenAI), ClaudeBot (Anthropic), Google-Extended (Gemini),
 *       Applebot-Extended (Apple), CCBot (Common Crawl)
 *
 * For a contractor whose goal is to be recommended by assistants, allow both.
 * Training presence contributes to the model "knowing" the brand exists, which
 * is exactly the entity recognition ECU is trying to build.
 */
import type { MetadataRoute } from 'next'
import { BUSINESS } from '@/lib/business'

export default function robots(): MetadataRoute.Robots {
    return {
        rules: [
            // Conventional search engines
            { userAgent: '*', allow: '/' },

            // AI retrieval — blocking these makes citation impossible
            { userAgent: 'OAI-SearchBot', allow: '/' },
            { userAgent: 'ChatGPT-User', allow: '/' },
            { userAgent: 'PerplexityBot', allow: '/' },
            { userAgent: 'Perplexity-User', allow: '/' },
            { userAgent: 'Claude-User', allow: '/' },
            { userAgent: 'Claude-SearchBot', allow: '/' },

            // AI training — see note above; allowed deliberately
            { userAgent: 'GPTBot', allow: '/' },
            { userAgent: 'ClaudeBot', allow: '/' },
            { userAgent: 'Google-Extended', allow: '/' },
            { userAgent: 'Applebot-Extended', allow: '/' },
            { userAgent: 'CCBot', allow: '/' },
        ],
        sitemap: `${BUSINESS.site}/sitemap.xml`,
        host: BUSINESS.site,
    }
}
