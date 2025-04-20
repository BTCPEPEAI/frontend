import { CoinTable } from "@/components/coin-table"
import { NetworkSelector } from "@/components/network-selector"
import { MainLayout } from "@/components/layouts/main-layout"

export default function RecentlyAddedPage() {
  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-6 space-y-6">
        <div className="flex flex-col space-y-2">
          <h1 className="text-3xl font-bold">Recently Added</h1>
          <p className="text-muted-foreground">Newly listed cryptocurrencies across all supported networks</p>
        </div>

        <NetworkSelector />

        <CoinTable filter="new" showCharts={true} />
      </div>
    </MainLayout>
  )
}
