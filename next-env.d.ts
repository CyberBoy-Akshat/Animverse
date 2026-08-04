# 🔥 AnimeWorld — Live Anime Streaming Site

A Next.js anime streaming site that **live-scrapes** data from watchanimeworld.top on every request. No database, no pre-scraping — fresh data every time.

## Features

- **Live scraping** — data fetched on-demand from source, 5-min in-memory cache
- **Embedded video players** — iframe-based with server selection
- **Series browser** — seasons, episodes, genres, languages
- **Movie support** — dedicated movie pages
- **Search** — real-time search against source
- **Responsive** — mobile-first dark theme
- **Fast** — SSR + ISR, no database overhead
- **Vercel-ready** — deploys in one click

## Run Locally

```bash
npm install
npm run dev
# → http://localhost:3000
```

## Deploy to Vercel

```bash
# Option 1: Vercel CLI
npx vercel

# Option 2: Push to GitHub, connect on vercel.com
```

## Architecture

```
src/
├── lib/scraper.ts          # Core scraper engine (cheerio + fetch)
├── app/
│   ├── page.tsx            # Homepage — newest drops, most watched
│   ├── series/[slug]/      # Series detail — seasons, episodes
│   ├── episode/[slug]/     # Episode page — video player + servers
│   ├── movies/             # Movie listing + detail
│   ├── search/             # Search results
│   └── api/proxy/image/    # Image proxy for hotlink protection
└── components/
    ├── Navbar.tsx           # Navigation + search bar
    ├── Footer.tsx           # Footer
    ├── SeriesCard.tsx       # Anime card component
    └── VideoPlayer.tsx      # Multi-server video player
```

## How It Works

1. User visits a page
2. Server calls `scrapeXxx()` which fetches HTML from watchanimeworld.top
3. Cheerio parses the HTML and extracts structured data
4. Result is cached in-memory for 5 minutes
5. Page is rendered with the scraped data
6. Video iframes are embedded directly from source servers

## Tech Stack

- **Next.js 14** — App Router, SSR, ISR
- **Cheerio** — HTML parsing
- **Tailwind CSS** — Styling
- **TypeScript** — Type safety

## Notes

- All content is sourced from third-party providers
- No videos are hosted — only embedded via iframes
- Cache TTL is 5 minutes (configurable in `src/lib/scraper.ts`)
