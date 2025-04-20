import { CoinTable } from "@/components/coin-table"
import { NetworkSelector } from "@/components/network-selector"
import { MainLayout } from "@/components/layouts/main-layout"
import { TrendingColumn } from "@/components/trending-column"

export default function TrendingPage() {
  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-6 space-y-6">
        <TrendingColumn />
        <div className="flex flex-col space-y-2">
          <h1 className="text-3xl font-bold">Trending Coins</h1>
          <p className="text-muted-foreground">
            The most popular cryptocurrencies based on trading volume and user activity
          </p>
        </div>

        <NetworkSelector />

        <CoinTable filter="trending" showCharts={true} />
      </div>
    </MainLayout>
  )
}
