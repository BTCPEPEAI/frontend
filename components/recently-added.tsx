"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Clock } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { NetworkIcon } from "@/components/network-icon"
import { fetchRecentlyAddedCoins } from "@/lib/api"
import type { CoinData } from "@/types/common"
import { Skeleton } from "@/components/ui/skeleton"

export function RecentlyAdded() {
  const [recentCoins, setRecentCoins] = useState<(CoinData & { timeAgo: string })[]>([])
  const [loading, setLoading] = useState(true)

  // Fetch recently added coins
  useEffect(() => {
    const getRecentCoins = async () => {
      try {
        setLoading(true)
        const coins = await fetchRecentlyAddedCoins()
        setRecentCoins(coins)
      } catch (error) {
        console.error("Error fetching recent coins:", error)
      } finally {
        setLoading(false)
      }
    }

    getRecentCoins()
  }, [])

  return (
    <Card className="h-full">
      <CardHeader className="flex flex-row items-center">
        <Clock className="mr-2 h-5 w-5 text-blue-500" />
        <CardTitle>Recently Added</CardTitle>
        <Link href="/recently-added" className="ml-auto text-sm text-primary hover:underline">
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
                  <div className="text-right">
                    <Skeleton className="w-12 h-3 mb-1 ml-auto" />
                    <Skeleton className="w-16 h-2 ml-auto" />
                  </div>
                </div>
              ))
            : recentCoins.slice(0, 5).map((coin) => (
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
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge variant="secondary" className="text-xs">
                        New
                      </Badge>
                      <div className="text-xs text-muted-foreground mt-1">{coin.timeAgo}</div>
                    </div>
                  </div>
                </Link>
              ))}
        </div>
      </CardContent>
    </Card>
  )
}
