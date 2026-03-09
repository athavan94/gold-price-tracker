import type { PriceData } from '../api'

function formatCurrency(value: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value)
}

function formatLargeNumber(value: number): string {
  if (value >= 1_000_000_000) return `$${(value / 1_000_000_000).toFixed(2)}B`
  if (value >= 1_000_000) return `$${(value / 1_000_000).toFixed(2)}M`
  return formatCurrency(value)
}

export function PriceCard({ data, loading }: { data: PriceData | null; loading: boolean }) {
  if (loading || !data) {
    return (
      <div className="animate-pulse space-y-4">
        <div className="h-8 bg-white/5 rounded-lg w-48" />
        <div className="h-16 bg-white/5 rounded-lg w-72" />
        <div className="grid grid-cols-3 gap-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-20 bg-white/5 rounded-lg" />
          ))}
        </div>
      </div>
    )
  }

  const isPositive = data.priceChange24h >= 0

  return (
    <div className="space-y-6">
      <div>
        <div className="flex items-center gap-3 mb-1">
          <span className="text-4xl">🪙</span>
          <div>
            <h2 className="text-sm font-medium text-white/50 uppercase tracking-wider">Gold (XAU/USD)</h2>
            <p className="text-xs text-white/30">via PAX Gold Token</p>
          </div>
        </div>

        <div className="flex items-end gap-4 mt-4">
          <span className="text-5xl sm:text-6xl font-bold tracking-tight text-white">
            {formatCurrency(data.currentPrice)}
          </span>
          <div className={`flex items-center gap-1 pb-2 ${isPositive ? 'text-emerald-400' : 'text-red-400'}`}>
            <svg
              className={`w-5 h-5 ${isPositive ? '' : 'rotate-180'}`}
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M10 17a.75.75 0 01-.75-.75V5.612L5.29 9.77a.75.75 0 01-1.08-1.04l5.25-5.5a.75.75 0 011.08 0l5.25 5.5a.75.75 0 11-1.08 1.04l-3.96-4.158V16.25A.75.75 0 0110 17z"
                clipRule="evenodd"
              />
            </svg>
            <span className="text-lg font-semibold">
              {isPositive ? '+' : ''}{data.priceChangePercent24h.toFixed(2)}%
            </span>
            <span className="text-sm opacity-70">
              ({isPositive ? '+' : ''}{formatCurrency(data.priceChange24h)})
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3">
        <StatBox label="24h High" value={formatCurrency(data.high24h)} />
        <StatBox label="24h Low" value={formatCurrency(data.low24h)} />
        <StatBox label="Market Cap" value={formatLargeNumber(data.marketCap)} />
      </div>
    </div>
  )
}

function StatBox({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-4">
      <p className="text-xs text-white/40 font-medium uppercase tracking-wider mb-1">{label}</p>
      <p className="text-lg font-semibold text-white/90">{value}</p>
    </div>
  )
}
