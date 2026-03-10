# Gold Price Tracker

Live gold price tracker built with React, TypeScript, and the CoinGecko API.

![Dark themed dashboard](https://img.shields.io/badge/theme-dark-0a0a0f) ![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue) ![React](https://img.shields.io/badge/React-19-61dafb)

## Features

- **Live gold price** with automatic updates every 60 seconds
- **24h statistics**: price change (absolute + percentage), high/low, market cap
- **Interactive price chart** with selectable time ranges (24H, 7D, 30D, 90D, 1Y)
- **Responsive** dark-themed UI with gold accent colors
- **No API key required** — uses CoinGecko's free public API

## Getting Started

```bash
npm install
npm run dev
```

The app runs at [http://localhost:5173](http://localhost:5173).

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Type-check and build for production |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |

## Tech Stack

- **React 19** + **TypeScript** — UI and type safety
- **Vite** — build tool and dev server
- **Tailwind CSS v4** — styling with custom gold color palette
- **Recharts** — interactive area charts
- **CoinGecko API** — gold price data via PAX Gold token (PAXG)

## How It Works

The app fetches gold price data from the [CoinGecko API](https://www.coingecko.com/en/api) using the PAX Gold (PAXG) token, which is backed 1:1 by physical gold and closely tracks the XAU/USD spot price. Prices may differ slightly from actual gold spot prices.
