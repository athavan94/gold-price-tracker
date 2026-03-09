import { useState, useEffect, useCallback } from 'react'
import { fetchCurrentPrice, fetchPriceHistory, type PriceData, type ChartDataPoint } from '../api'

const REFRESH_INTERVAL = 60_000 // 60 seconds

export function useGoldPrice() {
  const [priceData, setPriceData] = useState<PriceData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const refresh = useCallback(async () => {
    try {
      const data = await fetchCurrentPrice()
      setPriceData(data)
      setError(null)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch price')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    refresh()
    const interval = setInterval(refresh, REFRESH_INTERVAL)
    return () => clearInterval(interval)
  }, [refresh])

  return { priceData, loading, error, refresh }
}

export function usePriceHistory(days: number) {
  const [history, setHistory] = useState<ChartDataPoint[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false
    setLoading(true)

    fetchPriceHistory(days)
      .then((data) => {
        if (!cancelled) {
          setHistory(data)
          setError(null)
        }
      })
      .catch((err) => {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : 'Failed to fetch history')
        }
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })

    return () => {
      cancelled = true
    }
  }, [days])

  return { history, loading, error }
}
