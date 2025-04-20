"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { useWalletStore } from "@/lib/stores/wallet-store"
import { fetchWalletAssets, fetchCoinsByAddresses } from "@/lib/api"
import type { WalletAsset, CoinData } from "@/types/common"
import { NetworkIcon } from "@/components/network-icon"
import { WalletConnectButton } from "@/components/wallet-connect-button"
import { Badge } from "@/components/ui/badge"
import { Wallet, Star, Clock, Plus, Minus, ArrowUpRight, ArrowDownRight, ExternalLink } from "lucide-react"
import { MiniCandleChart } from "@/components/charts/mini-candle-chart"

export default function DashboardPage() {
  const { isConnected, walletAddress } = useWalletStore()
  const [assets, setAssets] = useState<WalletAsset[]>([])
  const [watchlist, setWatchlist] = useState<CoinData[]>([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("portfolio")

  useEffect(() => {
    const loadData = async () => {
      setLoading(true)
      try {
        if (isConnected && walletAddress) {
          const assetData = await fetchWalletAssets(walletAddress)
          setAssets(assetData)

          // Mock watchlist addresses
          const watchlistAddresses = [
            "0x1234567890abcdef1234567890abcdef12345678",
            "0xabcdef1234567890abcdef1234567890abcdef12",
            "0x7890abcdef1234567890abcdef1234567890abcd",
          ]
          const watchlistData = await fetchCoinsByAddresses(watchlistAddresses)
          setWatchlist(watchlistData)
        }
      } catch (error) {
        console.error("Failed to load dashboard data:", error)
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [isConnected, walletAddress])

  // Calculate total portfolio value
  const totalValue = assets.reduce((sum, asset) => sum + asset.value, 0)

  if (!isConnected) {
    return (
      <div className="container py-10">
        <div className="max-w-md mx-auto text-center">
          <div className="mb-6">
            <Wallet className="mx-auto h-12 w-12 text-muted-foreground" />
            <h1 className="text-2xl font-bold mt-4">Connect Your Wallet</h1>
            <p className="text-muted-foreground mt-2">
              Connect your wallet to view your portfolio, transactions, and watchlist
            </p>
          </div>
          <WalletConnectButton />
        </div>
      </div>
    )
  }

  return (
    <div className="container py-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">Manage your portfolio and watchlist</p>
        </div>
      </div>

      <Tabs defaultValue="portfolio" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-6">
          <TabsTrigger value="portfolio">Portfolio</TabsTrigger>
          <TabsTrigger value="watchlist">Watchlist</TabsTrigger>
          <TabsTrigger value="transactions">Transactions</TabsTrigger>
        </TabsList>

        <TabsContent value="portfolio">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Total Value</CardTitle>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <Skeleton className="h-8 w-24" />
                ) : (
                  <div className="text-2xl font-bold">${totalValue.toFixed(2)}</div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">24h Change</CardTitle>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <Skeleton className="h-8 w-24" />
                ) : (
                  <div className="text-2xl font-bold text-green-500">+$45.67 (2.34%)</div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Assets</CardTitle>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <Skeleton className="h-8 w-24" />
                ) : (
                  <div className="text-2xl font-bold">{assets.length}</div>
                )}
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Your Assets</CardTitle>
              <CardDescription>Manage your cryptocurrency holdings</CardDescription>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="space-y-4">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Skeleton key={i} className="h-16 w-full" />
                  ))}
                </div>
              ) : assets.length > 0 ? (
                <div className="space-y-4">
                  {assets.map((asset) => (
                    <div
                      key={asset.address}
                      className="flex flex-col md:flex-row md:items-center justify-between p-4 border rounded-lg"
                    >
                      <div className="flex items-center mb-4 md:mb-0">
                        <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center mr-4">
                          <span className="text-primary font-medium">{asset.symbol.charAt(0)}</span>
                        </div>
                        <div>
                          <div className="font-medium flex items-center">
                            {asset.name}
                            <Badge variant="outline" className="ml-2 text-xs">
                              <NetworkIcon network={asset.network} size="sm" className="mr-1" />
                              {asset.network.toUpperCase()}
                            </Badge>
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {asset.balance.toFixed(6)} {asset.symbol}
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-col md:flex-row md:items-center gap-4">
                        <div className="flex flex-col items-start md:items-end">
                          <div className="font-medium">${asset.value.toFixed(2)}</div>
                          <div className={`text-sm ${asset.change24h >= 0 ? "text-green-500" : "text-red-500"}`}>
                            {asset.change24h >= 0 ? "+" : ""}
                            {asset.change24h.toFixed(2)}%
                          </div>
                        </div>

                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            <Plus className="mr-1 h-4 w-4" />
                            Buy
                          </Button>
                          <Button variant="outline" size="sm">
                            <Minus className="mr-1 h-4 w-4" />
                            Sell
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-10">
                  <p className="text-muted-foreground">No assets found in your wallet</p>
                  <Button className="mt-4">
                    <Plus className="mr-2 h-4 w-4" />
                    Add Assets
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="watchlist">
          <Card>
            <CardHeader>
              <CardTitle>Your Watchlist</CardTitle>
              <CardDescription>Track your favorite cryptocurrencies</CardDescription>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="space-y-4">
                  {Array.from({ length: 3 }).map((_, i) => (
                    <Skeleton key={i} className="h-16 w-full" />
                  ))}
                </div>
              ) : watchlist.length > 0 ? (
                <div className="space-y-4">
                  {watchlist.map((coin) => (
                    <div
                      key={coin.address}
                      className="flex flex-col md:flex-row md:items-center justify-between p-4 border rounded-lg"
                    >
                      <div className="flex items-center mb-4 md:mb-0">
                        <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center mr-4">
                          <span className="text-primary font-medium">{coin.symbol.charAt(0)}</span>
                        </div>
                        <div>
                          <div className="font-medium flex items-center">
                            {coin.name}
                            <Badge variant="outline" className="ml-2 text-xs">
                              <NetworkIcon network={coin.network} size="sm" className="mr-1" />
                              {coin.network.toUpperCase()}
                            </Badge>
                          </div>
                          <div className="text-sm text-muted-foreground">${coin.price.toFixed(6)}</div>
                        </div>
                      </div>

                      <div className="flex flex-col md:flex-row md:items-center gap-4">
                        <div className="w-24 h-12">
                          <MiniCandleChart data={[]} />
                        </div>

                        <div className="flex flex-col items-start md:items-end">
                          <div className={`text-sm ${coin.change24h >= 0 ? "text-green-500" : "text-red-500"}`}>
                            {coin.change24h >= 0 ? "+" : ""}
                            {coin.change24h.toFixed(2)}%
                          </div>
                          <div className="text-sm text-muted-foreground">
                            Vol: ${(coin.volume / 1000000).toFixed(2)}M
                          </div>
                        </div>

                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            <Star className="mr-1 h-4 w-4 text-yellow-500" />
                            Remove
                          </Button>
                          <Button variant="outline" size="sm">
                            <Plus className="mr-1 h-4 w-4" />
                            Buy
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-10">
                  <p className="text-muted-foreground">No coins in your watchlist</p>
                  <Button className="mt-4">
                    <Star className="mr-2 h-4 w-4" />
                    Add Coins
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="transactions">
          <Card>
            <CardHeader>
              <CardTitle>Recent Transactions</CardTitle>
              <CardDescription>View your recent cryptocurrency transactions</CardDescription>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="space-y-4">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Skeleton key={i} className="h-16 w-full" />
                  ))}
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="flex flex-col md:flex-row md:items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center mb-4 md:mb-0">
                      <div className="w-10 h-10 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mr-4">
                        <ArrowDownRight className="h-5 w-5 text-green-500" />
                      </div>
                      <div>
                        <div className="font-medium">Received ETH</div>
                        <div className="text-sm text-muted-foreground">
                          <Clock className="inline-block mr-1 h-3 w-3" />2 hours ago
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col md:flex-row md:items-center gap-4">
                      <div className="flex flex-col items-start md:items-end">
                        <div className="font-medium">+0.5 ETH</div>
                        <div className="text-sm text-muted-foreground">$1,245.67</div>
                      </div>

                      <Button variant="ghost" size="sm" className="ml-auto">
                        <ExternalLink className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  <div className="flex flex-col md:flex-row md:items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center mb-4 md:mb-0">
                      <div className="w-10 h-10 bg-red-100 dark:bg-red-900 rounded-full flex items-center justify-center mr-4">
                        <ArrowUpRight className="h-5 w-5 text-red-500" />
                      </div>
                      <div>
                        <div className="font-medium">Sent USDT</div>
                        <div className="text-sm text-muted-foreground">
                          <Clock className="inline-block mr-1 h-3 w-3" />
                          Yesterday
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col md:flex-row md:items-center gap-4">
                      <div className="flex flex-col items-start md:items-end">
                        <div className="font-medium">-500 USDT</div>
                        <div className="text-sm text-muted-foreground">$500.00</div>
                      </div>

                      <Button variant="ghost" size="sm" className="ml-auto">
                        <ExternalLink className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  <div className="flex flex-col md:flex-row md:items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center mb-4 md:mb-0">
                      <div className="w-10 h-10 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mr-4">
                        <ArrowDownRight className="h-5 w-5 text-green-500" />
                      </div>
                      <div>
                        <div className="font-medium">Received BNB</div>
                        <div className="text-sm text-muted-foreground">
                          <Clock className="inline-block mr-1 h-3 w-3" />3 days ago
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col md:flex-row md:items-center gap-4">
                      <div className="flex flex-col items-start md:items-end">
                        <div className="font-medium">+2 BNB</div>
                        <div className="text-sm text-muted-foreground">$678.90</div>
                      </div>

                      <Button variant="ghost" size="sm" className="ml-auto">
                        <ExternalLink className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
