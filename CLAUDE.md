# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- **Dev server**: `npm run dev` (Vite, default port 5173)
- **Build**: `npm run build` (runs `tsc -b && vite build`, output in `/dist`)
- **Lint**: `npm run lint` (ESLint)
- **Preview production build**: `npm run preview`
- **Type-check only**: `npx tsc --noEmit`

Node.js is managed via nvm. If `npm` is not found, run:
```
export PATH="$HOME/.nvm/versions/node/v20.20.1/bin:$PATH"
```

## Architecture

Single-page React app that displays live gold prices using the CoinGecko API (via PAX Gold token as proxy for physical gold).

### Data flow

```
CoinGecko API (PAX Gold)
  └─ src/api.ts          ← fetchCurrentPrice(), fetchPriceHistory(days)
      └─ src/hooks/useGoldPrice.ts  ← useGoldPrice() (auto-refresh 60s), usePriceHistory(days)
          └─ src/App.tsx
              ├─ PriceCard   ← current price, 24h change, high/low, market cap
              └─ PriceChart  ← interactive area chart with 24H/7D/30D/90D/1Y ranges
```

### Key design decisions

- **PAX Gold as data source**: Uses CoinGecko's free, no-auth API for the PAX Gold token which closely tracks physical gold spot price. Prices may differ slightly from actual XAU/USD spot.
- **Tailwind CSS v4**: Configured via `@tailwindcss/vite` plugin (not PostCSS). Custom gold color palette defined in `src/index.css` using `@theme` directive.
- **Dark theme**: Background `#0a0a0f` with semi-transparent white overlays for cards/borders (`white/[0.03]`, `white/[0.06]`).
- **German locale**: Dates and times formatted with `de-DE` locale.
