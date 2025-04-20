"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { MainLayout } from "@/components/layouts/main-layout"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowUp, ArrowDown, Star, Trash2 } from "lucide-react"
import { NetworkIcon } from "@/components/network-icon"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { useWalletStore } from "@/lib/stores/wallet-store"
import { fetchCoinsByAddresses } from "@/lib/api"
import type { CoinData } from "@/types/common"
import { MiniCandleChart } from "@/components/charts/mini-candle-chart"
import Link from "next/link"
import { useToast } from "@/components/ui/use-toast"

export default function WatchlistPage() {
  const router = useRouter()
  const { toast } = useToast()
  const { isConnected, watchlist, removeFromWatchlist } = useWalletStore()
  const [loading, setLoading] = useState(true)
  const [watchlistCoins, setWatchlistCoins] = useState<CoinData[]>([])

  useEffect(() => {
    if (!isConnected) {
      router.push("/")
      return
    }

    const loadWatchlist = async () => {
      if (watchlist.length === 0) {
        setWatchlistCoins([])
        setLoading(false)
        return
      }

      setLoading(true)
      try {
        const coins = await fetchCoinsByAddresses(watchlist)
        setWatchlistCoins(coins)
      } catch (error) {
        console.error("Failed to fetch watchlist coins:", error)
      } finally {
        setLoading(false)
      }
    }

    loadWatchlist()
  }, [isConnected, router, watchlist])

  const handleRemoveFromWatchlist = (address: string, name: string) => {
    removeFromWatchlist(address)
    toast({
      title: "Removed from watchlist",
      description: `${name} has been removed from your watchlist`,
    })
  }

  if (!isConnected) {
    return null
  }

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <div>
            <h1 className="text-3xl font-bold">Watchlist</h1>
            <p className="text-muted-foreground">Track your favorite cryptocurrencies</p>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Your Watchlist</CardTitle>
            <CardDescription>
              {watchlist.length > 0
                ? `You are tracking ${watchlist.length} cryptocurrencies`
                : "Add cryptocurrencies to your watchlist to track them here"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="space-y-4">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Skeleton key={i} className="h-20 w-full" />
                ))}
              </div>
            ) : watchlistCoins.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-10 text-center">
                <Star className="h-10 w-10 text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium">Your watchlist is empty</h3>
                <p className="text-sm text-muted-foreground mt-1 max-w-md">
                  Add cryptocurrencies to your watchlist by clicking the star icon next to any coin.
                </p>
                <Button className="mt-4" onClick={() => router.push("/")}>
                  Browse Coins
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                {watchlistCoins.map((coin) => (
                  <div
                    key={coin.address}
                    className="flex items-center justify-between p-4 border rounded-lg hover:bg-accent/50 transition-colors"
                  >
                    <Link href={`/coin/${coin.address}`} className="flex items-center gap-4 flex-1">
                      <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                        <span className="text-primary font-medium">{coin.symbol.charAt(0)}</span>
                      </div>
                      <div>
                        <div className="font-medium">{coin.name}</div>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Badge variant="outline" className="mr-2 text-xs">
                            <NetworkIcon network={coin.network} size="sm" className="mr-1" />
                            {coin.network.toUpperCase()}
                          </Badge>
                          <span>{coin.symbol}</span>
                        </div>
                      </div>
                    </Link>

                    <div className="w-24 h-16 mx-4">
                      <MiniCandleChart data={generateMockChartData(coin.address)} positive={coin.change24h >= 0} />
                    </div>

                    <div className="flex flex-col items-end mr-4">
                      <div className="font-medium">${coin.price.toFixed(coin.price < 0.001 ? 8 : 2)}</div>
                      <div
                        className={`text-sm flex items-center ${coin.change24h >= 0 ? "text-green-500" : "text-red-500"}`}
                      >
                        {coin.change24h >= 0 ? (
                          <ArrowUp className="h-3 w-3 mr-1" />
                        ) : (
                          <ArrowDown className="h-3 w-3 mr-1" />
                        )}
                        {Math.abs(coin.change24h).toFixed(2)}%
                      </div>
                    </div>

                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleRemoveFromWatchlist(coin.address, coin.name)}
                      className="text-muted-foreground hover:text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </MainLayout>
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
    const close = baseValue * (1 + (Math.random() - 0.5) * 0.05)
    const high = Math.max(open, close) * (1 + Math.random() * 0.03)
    const low = Math.min(open, close) * (1 - Math.random() * 0.03)

    data.push({ open, high, low, close })
    baseValue = close
  }

  return data
}
