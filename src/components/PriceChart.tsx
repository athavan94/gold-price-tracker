import { useState } from 'react'
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  type TooltipProps,
} from 'recharts'
import { usePriceHistory } from '../hooks/useGoldPrice'

const TIME_RANGES = [
  { label: '24H', days: 1 },
  { label: '7D', days: 7 },
  { label: '30D', days: 30 },
  { label: '90D', days: 90 },
  { label: '1Y', days: 365 },
] as const

function CustomTooltip({ active, payload }: TooltipProps<number, string>) {
  if (!active || !payload?.length) return null
  const data = payload[0]
  const point = data.payload as { timestamp: number; price: number }

  return (
    <div className="bg-zinc-900 border border-white/10 rounded-lg px-3 py-2 shadow-xl">
      <p className="text-white font-semibold">
        ${point.price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
      </p>
      <p className="text-white/50 text-xs">
        {new Date(point.timestamp).toLocaleString('de-DE', {
          day: 'numeric',
          month: 'short',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
        })}
      </p>
    </div>
  )
}

export function PriceChart() {
  const [selectedRange, setSelectedRange] = useState(30)
  const { history, loading } = usePriceHistory(selectedRange)

  const priceChange = history.length >= 2 ? history[history.length - 1].price - history[0].price : 0
  const isPositive = priceChange >= 0
  const chartColor = isPositive ? '#34d399' : '#f87171'

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium text-white/50 uppercase tracking-wider">Price History</h3>
        <div className="flex gap-1 bg-white/[0.03] rounded-lg p-1">
          {TIME_RANGES.map(({ label, days }) => (
            <button
              key={days}
              onClick={() => setSelectedRange(days)}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all ${
                selectedRange === days
                  ? 'bg-gold-500/20 text-gold-400'
                  : 'text-white/40 hover:text-white/70'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-white/[0.02] border border-white/[0.06] rounded-xl p-4 h-[350px]">
        {loading ? (
          <div className="h-full flex items-center justify-center">
            <div className="flex items-center gap-3 text-white/30">
              <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              Loading chart data...
            </div>
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={history} margin={{ top: 5, right: 5, bottom: 5, left: 5 }}>
              <defs>
                <linearGradient id="priceGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={chartColor} stopOpacity={0.2} />
                  <stop offset="100%" stopColor={chartColor} stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis
                dataKey="date"
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 11, fill: 'rgba(255,255,255,0.3)' }}
                interval="preserveStartEnd"
                minTickGap={50}
              />
              <YAxis
                domain={['auto', 'auto']}
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 11, fill: 'rgba(255,255,255,0.3)' }}
                tickFormatter={(v: number) => `$${v.toLocaleString()}`}
                width={80}
              />
              <Tooltip content={<CustomTooltip />} />
              <Area
                type="monotone"
                dataKey="price"
                stroke={chartColor}
                strokeWidth={2}
                fill="url(#priceGradient)"
                animationDuration={500}
              />
            </AreaChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  )
}
