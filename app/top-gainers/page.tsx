import { CoinTable } from "@/components/coin-table"
import { NetworkSelector } from "@/components/network-selector"
import { MainLayout } from "@/components/layouts/main-layout"
import { TrendingColumn } from "@/components/trending-column"

export default function TopGainersPage() {
  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-6 space-y-6">
        <TrendingColumn />
        <div className="flex flex-col space-y-2">
          <h1 className="text-3xl font-bold">Top Gainers</h1>
          <p className="text-muted-foreground">
            Cryptocurrencies with the highest price increases in the last 24 hours
          </p>
        </div>

        <NetworkSelector />

        <CoinTable filter="gainers" showCharts={true} />
      </div>
    </MainLayout>
  )
}
