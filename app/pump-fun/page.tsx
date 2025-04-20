"use client"

import { useState, useEffect } from "react"
import { CoinTable } from "@/components/coin-table"
import { NetworkSelector } from "@/components/network-selector"
import { MainLayout } from "@/components/layouts/main-layout"
import { Rocket } from "lucide-react"
import { fetchPumpFunCoins } from "@/lib/api"
import type { CoinData } from "@/types/common"
import { Skeleton } from "@/components/ui/skeleton"

export default function PumpFunPage() {
  const [pumpFunCoins, setPumpFunCoins] = useState<CoinData[]>([])
  const [loading, setLoading] = useState(true)

  // Fetch Pump.fun coins
  useEffect(() => {
    const getPumpFunCoins = async () => {
      try {
        setLoading(true)
        const coins = await fetchPumpFunCoins()
        setPumpFunCoins(coins)
      } catch (error) {
        console.error("Error fetching Pump.fun coins:", error)
      } finally {
        setLoading(false)
      }
    }

    getPumpFunCoins()
  }, [])

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-6 space-y-6">
        <div className="flex items-center space-x-3">
          <Rocket className="h-8 w-8 text-purple-500" />
          <div>
            <h1 className="text-3xl font-bold">Latest from Pump.fun</h1>
            <p className="text-muted-foreground">Track the newest tokens launched on Pump.fun</p>
          </div>
        </div>

        <NetworkSelector />

        {loading ? <Skeleton className="w-full h-[600px]" /> : <CoinTable coins={pumpFunCoins} showCharts={true} />}
      </div>
    </MainLayout>
  )
}
