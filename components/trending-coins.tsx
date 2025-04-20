"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { ArrowRight, Flame } from "lucide-react"
import { fetchTrendingCoins } from "@/lib/api"
import type { CoinData } from "@/types/common"
import { NetworkIcon } from "@/components/icons/network-icon"

export function TrendingCoins() {
  const [coins, setCoins] = useState<CoinData[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadTrendingCoins = async () => {
      setLoading(true)
      try {
        const data = await fetchTrendingCoins()
        setCoins(data.slice(0, 5))
      } catch (error) {
        console.error("Failed to load trending coins:", error)
      } finally {
        setLoading(false)
      }
    }

    loadTrendingCoins()
  }, [])

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-md font-medium flex items-center">
          <Flame className="mr-2 h-4 w-4 text-orange-500" />
          Trending
        </CardTitle>
        <Button variant="ghost" size="sm" asChild>
          <Link href="/trending">
            View All
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="space-y-3">
            {Array.from({ length: 5 }).map((_, i) => (
              <Skeleton key={i} className="h-12 w-full" />
            ))}
          </div>
        ) : (
          <div className="space-y-3">
            {coins.map((coin) => (
              <Link
                key={coin.address}
                href={`/coin/${coin.address}`}
                className="flex items-center justify-between p-2 rounded-lg hover:bg-muted transition-colors"
              >
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center mr-3">
                    <span className="text-primary font-medium">{coin.symbol.charAt(0)}</span>
                  </div>
                  <div>
                    <div className="font-medium flex items-center">
                      {coin.symbol}
                      <div className="ml-2 flex items-center">
                        <NetworkIcon network={coin.network} size="sm" />
                      </div>
                    </div>
                    <div className="text-xs text-muted-foreground">${coin.price.toFixed(6)}</div>
                  </div>
                </div>
                <div className="flex flex-col items-end">
                  <div className={coin.change24h >= 0 ? "text-green-500" : "text-red-500"}>
                    {coin.change24h >= 0 ? "+" : ""}
                    {coin.change24h.toFixed(2)}%
                  </div>
                  <div className="text-xs text-muted-foreground">Vol: ${(coin.volume / 1000000).toFixed(2)}M</div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
