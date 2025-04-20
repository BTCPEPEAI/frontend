"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { Flame } from "lucide-react"
import { fetchTrendingCoins } from "@/lib/api"
import type { CoinData } from "@/types/common"
import { NetworkIcon } from "@/components/network-icon"

interface TrendingColumnProps {
  network?: string
}

export function TrendingColumn({ network }: TrendingColumnProps) {
  const [trendingCoins, setTrendingCoins] = useState<CoinData[]>([])
  const [loading, setLoading] = useState(true)
  const scrollRef = useRef<HTMLDivElement>(null)
  const [isPaused, setIsPaused] = useState(false)

  useEffect(() => {
    const loadTrendingCoins = async () => {
      setLoading(true)
      try {
        const data = await fetchTrendingCoins()
        // Filter by network if provided
        const filteredData = network && network !== "all" ? data.filter((coin) => coin.network === network) : data
        // Duplicate the data to create a continuous scrolling effect
        setTrendingCoins([...filteredData.slice(0, 12), ...filteredData.slice(0, 12)])
      } catch (error) {
        console.error("Failed to load trending coins:", error)
      } finally {
        setLoading(false)
      }
    }

    loadTrendingCoins()
  }, [network])

  // Auto-scrolling effect
  useEffect(() => {
    if (loading || !scrollRef.current) return

    let scrollAmount = 0
    const scrollSpeed = 0.5
    let animationFrameId: number

    const scroll = () => {
      if (scrollRef.current && !isPaused) {
        scrollAmount += scrollSpeed
        scrollRef.current.scrollLeft = scrollAmount

        // Reset scroll position when reaching the end of the first set
        if (scrollAmount >= scrollRef.current.scrollWidth / 2) {
          scrollAmount = 0
          scrollRef.current.scrollLeft = 0
        }
      }
      animationFrameId = requestAnimationFrame(scroll)
    }

    scroll()

    return () => {
      cancelAnimationFrame(animationFrameId)
    }
  }, [loading, isPaused])

  return (
    <div
      className="w-full overflow-hidden py-3 mb-4 bg-card border rounded-lg"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div
        ref={scrollRef}
        className="flex space-x-4 px-4 overflow-x-auto scrollbar-hide"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {loading
          ? // Loading skeletons
            Array.from({ length: 12 }).map((_, i) => (
              <div key={i} className="flex-shrink-0 w-32">
                <Skeleton className="h-6 w-24 mb-2" />
                <Skeleton className="h-4 w-16" />
              </div>
            ))
          : // Trending coins
            trendingCoins.map((coin, index) => (
              <Link key={`${coin.address}-${index}`} href={`/coin/${coin.address}`} className="flex-shrink-0 group">
                <div className="flex flex-col items-center text-center p-2 rounded-lg hover:bg-muted transition-colors min-w-[120px]">
                  <Badge variant="outline" className="mb-1 bg-orange-500/10 text-orange-500 border-orange-500/20">
                    <Flame className="h-3 w-3 mr-1" />
                    Hot #{(index % 12) + 1}
                  </Badge>
                  <div className="font-medium text-sm flex items-center">
                    {coin.symbol}
                    <NetworkIcon network={coin.network} size="sm" className="ml-1" />
                  </div>
                  <div className={`text-xs ${coin.change24h >= 0 ? "text-green-500" : "text-red-500"}`}>
                    {coin.change24h >= 0 ? "+" : ""}
                    {coin.change24h.toFixed(2)}%
                  </div>
                </div>
              </Link>
            ))}
      </div>
    </div>
  )
}

export default TrendingColumn;