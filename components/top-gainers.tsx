"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ArrowUp, TrendingUp } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { NetworkIcon } from "@/components/network-icon"
import { MiniCandleChart } from "@/components/charts/mini-candle-chart"
import { fetchTopGainers } from "@/lib/api"
import type { CoinData } from "@/types/common"
import { Skeleton } from "@/components/ui/skeleton"

export function TopGainers() {
  const [topGainers, setTopGainers] = useState<CoinData[]>([])
  const [loading, setLoading] = useState(true)

  // Fetch top gainers
  useEffect(() => {
    const getTopGainers = async () => {
      try {
        setLoading(true)
        const coins = await fetchTopGainers()
        setTopGainers(coins)
      } catch (error) {
        console.error("Error fetching top gainers:", error)
      } finally {
        setLoading(false)
      }
    }

    getTopGainers()
  }, [])

  return (
    <Card className="h-full">
      <CardHeader className="flex flex-row items-center">
        <TrendingUp className="mr-2 h-5 w-5 text-green-500" />
        <CardTitle>Top Gainers</CardTitle>
        <Link href="/top-gainers" className="ml-auto text-sm text-primary hover:underline">
          View All
        </Link>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {loading
            ? // Loading skeletons
              Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="flex items-center gap-3 border rounded-lg p-2">
                  <div className="flex items-center gap-2 flex-1">
                    <Skeleton className="w-6 h-6 rounded-full" />
                    <div>
                      <Skeleton className="w-16 h-3 mb-1" />
                      <Skeleton className="w-24 h-2" />
                    </div>
                  </div>
                  <Skeleton className="w-16 h-10" />
                  <div className="text-right">
                    <Skeleton className="w-12 h-3 mb-1 ml-auto" />
                    <Skeleton className="w-16 h-2 ml-auto" />
                  </div>
                </div>
              ))
            : topGainers.slice(0, 5).map((coin) => (
                <Link key={coin.address} href={`/coin/${coin.address}`} className="block">
                  <div className="flex items-center gap-3 border rounded-lg p-2 hover:bg-accent transition-colors">
                    <div className="flex items-center gap-2 flex-1">
                      <div className="flex items-center justify-center w-6 h-6 rounded-full bg-primary/10 text-primary">
                        {coin.symbol.charAt(0)}
                      </div>
                      <div>
                        <div className="font-medium text-sm">{coin.symbol}</div>
                        <div className="flex items-center text-xs">
                          <Badge variant="outline" className="mr-1 text-[10px] px-1 py-0">
                            <NetworkIcon network={coin.network} size="sm" className="mr-0.5" />
                            {coin.network.toUpperCase()}
                          </Badge>
                          <span className="text-green-500">
                            <ArrowUp className="inline h-2 w-2 mr-0.5" />
                            {coin.change24h.toFixed(2)}%
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="w-16 h-10">
                      <MiniCandleChart data={generateMockChartData(coin.address)} positive={true} />
                    </div>
                    <div className="text-right">
                      <div className="font-medium text-sm">${coin.price.toFixed(coin.price < 0.001 ? 6 : 2)}</div>
                      <div className="text-xs text-muted-foreground">Vol: ${(coin.volume / 1000).toFixed(0)}K</div>
                    </div>
                  </div>
                </Link>
              ))}
        </div>
      </CardContent>
    </Card>
  )
}

// Helper function to generate mock chart data
function generateMockChartData(seed: string) {
  const data = []
  // Use the first 8 characters of the address as a seed
  const seedNum = Number.parseInt(seed.slice(2, 10), 16)
  let baseValue = 100 + (seedNum % 100)

  for (let i = 0; i < 20; i++) {
    const open = baseValue
    const close = baseValue * (1 + (Math.random() - 0.3) * 0.05) // Bias towards positive
    const high = Math.max(open, close) * (1 + Math.random() * 0.03)
    const low = Math.min(open, close) * (1 - Math.random() * 0.02)

    data.push({ open, high, low, close })
    baseValue = close
  }

  return data
}
