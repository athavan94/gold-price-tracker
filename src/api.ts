const COINGECKO_BASE = 'https://api.coingecko.com/api/v3'

export interface PriceData {
  currentPrice: number
  priceChange24h: number
  priceChangePercent24h: number
  high24h: number
  low24h: number
  marketCap: number
  lastUpdated: string
}

export interface ChartDataPoint {
  timestamp: number
  price: number
  date: string
}

export async function fetchCurrentPrice(): Promise<PriceData> {
  const res = await fetch(
    `${COINGECKO_BASE}/coins/pax-gold?localization=false&tickers=false&community_data=false&developer_data=false`
  )
  if (!res.ok) throw new Error(`API error: ${res.status}`)
  const data = await res.json()

  return {
    currentPrice: data.market_data.current_price.usd,
    priceChange24h: data.market_data.price_change_24h,
    priceChangePercent24h: data.market_data.price_change_percentage_24h,
    high24h: data.market_data.high_24h.usd,
    low24h: data.market_data.low_24h.usd,
    marketCap: data.market_data.market_cap.usd,
    lastUpdated: data.market_data.last_updated,
  }
}

export async function fetchPriceHistory(days: number): Promise<ChartDataPoint[]> {
  const res = await fetch(
    `${COINGECKO_BASE}/coins/pax-gold/market_chart?vs_currency=usd&days=${days}`
  )
  if (!res.ok) throw new Error(`API error: ${res.status}`)
  const data = await res.json()

  return data.prices.map(([timestamp, price]: [number, number]) => ({
    timestamp,
    price,
    date: new Date(timestamp).toLocaleDateString('de-DE', {
      month: 'short',
      day: 'numeric',
      ...(days > 90 ? { year: '2-digit' } : {}),
    }),
  }))
}
