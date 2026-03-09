import { useGoldPrice } from './hooks/useGoldPrice'
import { PriceCard } from './components/PriceCard'
import { PriceChart } from './components/PriceChart'

function App() {
  const { priceData, loading, error, refresh } = useGoldPrice()

  return (
    <div className="min-h-screen bg-[#0a0a0f] font-sans">
      {/* Subtle gradient background */}
      <div className="fixed inset-0 bg-gradient-to-br from-gold-900/10 via-transparent to-gold-900/5 pointer-events-none" />

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        {/* Header */}
        <header className="flex items-center justify-between mb-10">
          <div>
            <h1 className="text-2xl font-bold text-white tracking-tight">Gold Price Tracker</h1>
            <p className="text-sm text-white/30 mt-1">Live gold price, updated every 60 seconds</p>
          </div>
          <div className="flex items-center gap-3">
            {priceData && (
              <span className="text-xs text-white/20">
                {new Date(priceData.lastUpdated).toLocaleTimeString('de-DE')}
              </span>
            )}
            <button
              onClick={refresh}
              className="flex items-center gap-2 px-3 py-2 text-sm text-white/50 hover:text-white/80 bg-white/[0.03] hover:bg-white/[0.06] border border-white/[0.06] rounded-lg transition-all"
              title="Refresh"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              Refresh
            </button>
          </div>
        </header>

        {/* Error banner */}
        {error && (
          <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm">
            {error} — Retrying automatically...
          </div>
        )}

        {/* Main content */}
        <div className="space-y-8">
          <PriceCard data={priceData} loading={loading} />
          <PriceChart />
        </div>

        {/* Footer */}
        <footer className="mt-12 pt-6 border-t border-white/[0.04] text-center">
          <p className="text-xs text-white/20">
            Data provided by CoinGecko (PAX Gold). Prices may differ slightly from spot gold.
          </p>
          <div className="flex items-center justify-center gap-1.5 mt-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            <span className="text-xs text-emerald-500/70">Live</span>
          </div>
        </footer>
      </div>
    </div>
  )
}

export default App
