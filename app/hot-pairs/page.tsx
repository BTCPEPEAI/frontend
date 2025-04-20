import { HotPairsTable } from "@/components/hot-pairs-table"
import { NetworkSelector } from "@/components/network-selector"
import { MainLayout } from "@/components/layouts/main-layout"
import { TrendingColumn } from "@/components/trending-column"

export default function HotPairsPage() {
  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-6 space-y-6">
        <TrendingColumn />
        <div className="flex flex-col space-y-2">
          <h1 className="text-3xl font-bold">Hot Pairs</h1>
          <p className="text-muted-foreground">Most active trading pairs across all supported networks</p>
        </div>

        <NetworkSelector />

        <HotPairsTable />
      </div>
    </MainLayout>
  )
}
