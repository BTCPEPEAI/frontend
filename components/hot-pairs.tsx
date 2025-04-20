"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Flame } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { NetworkIcon } from "@/components/network-icon"
import { fetchHotPairs } from "@/lib/api"
import type { PairData } from "@/types/common"
import { Skeleton } from "@/components/ui/skeleton"

export function HotPairs() {
  const [hotPairs, setHotPairs] = useState<PairData[]>([])
  const [loading, setLoading] = useState(true)

  // Fetch hot pairs
  useEffect(() => {
    const getHotPairs = async () => {
      try {
        setLoading(true)
        const pairs = await fetchHotPairs()
        setHotPairs(pairs)
      } catch (error) {
        console.error("Error fetching hot pairs:", error)
      } finally {
        setLoading(false)
      }
    }

    getHotPairs()
  }, [])

  return (
    <Card className="h-full">
      <CardHeader className="flex flex-row items-center">
        <Flame className="mr-2 h-5 w-5 text-orange-500" />
        <CardTitle>Hot Pairs</CardTitle>
        <Link href="/hot-pairs" className="ml-auto text-sm text-primary hover:underline">
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
            : hotPairs.slice(0, 5).map((pair) => (
                <Link key={pair.address} href={`/pair/${pair.address}`} className="block">
                  <div className="flex items-center gap-3 border rounded-lg p-2 hover:bg-accent transition-colors">
                    <div className="flex items-center gap-2 flex-1">
                      <div className="flex items-center justify-center w-6 h-6 rounded-full bg-primary/10 text-primary">
                        <Flame className="h-3 w-3" />
                      </div>
                      <div>
                        <div className="font-medium text-sm">{pair.pair}</div>
                        <div className="flex items-center text-xs">
                          <Badge variant="outline" className="mr-1 text-[10px] px-1 py-0">
                            <NetworkIcon network={pair.network} size="sm" className="mr-0.5" />
                            {pair.network.toUpperCase()}
                          </Badge>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium text-sm">${(pair.volume / 1000).toFixed(0)}K</div>
                      <div className="text-xs text-muted-foreground">24h Volume</div>
                    </div>
                  </div>
                </Link>
              ))}
        </div>
      </CardContent>
    </Card>
  )
}
