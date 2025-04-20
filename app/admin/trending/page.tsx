"use client"

import { useState, useEffect } from "react"
import { AdminLayout } from "@/components/layouts/admin-layout"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { ArrowUp, ArrowDown, Flame, Search, Plus, Trash2, ExternalLink, DollarSign } from "lucide-react"
import { fetchTrendingCoins } from "@/lib/api"
import type { CoinData } from "@/types/common"
import { useToast } from "@/components/ui/use-toast"
import { NetworkIcon } from "@/components/network-icon"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function AdminTrendingPage() {
  const { toast } = useToast()
  const [trendingCoins, setTrendingCoins] = useState<CoinData[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [newCoinAddress, setNewCoinAddress] = useState("")
  const [newCoinNetwork, setNewCoinNetwork] = useState("eth")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [platformTrendingCoins, setPlatformTrendingCoins] = useState<CoinData[]>([])
  const [activeTab, setActiveTab] = useState("trending-column")

  useEffect(() => {
    const loadData = async () => {
      setLoading(true)
      try {
        const coins = await fetchTrendingCoins()
        setTrendingCoins(coins.slice(0, 15))
        // Initialize platform trending coins with the first 5 coins
        setPlatformTrendingCoins(coins.slice(0, 5))
      } catch (error) {
        console.error("Failed to load trending coins:", error)
        toast({
          title: "Error",
          description: "Failed to load trending coins. Please try again.",
          variant: "destructive",
        })
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [toast])

  const handleAddToPlatformTrending = (coin: CoinData) => {
    if (platformTrendingCoins.length >= 5) {
      toast({
        title: "Limit Reached",
        description: "You can only have 5 coins in the platform trending box.",
        variant: "destructive",
      })
      return
    }

    if (platformTrendingCoins.some((c) => c.address === coin.address)) {
      toast({
        title: "Already Added",
        description: "This coin is already in the platform trending box.",
        variant: "destructive",
      })
      return
    }

    setPlatformTrendingCoins([...platformTrendingCoins, coin])
    toast({
      title: "Coin Added",
      description: "The coin has been added to the platform trending box.",
    })
  }

  const handleRemoveFromPlatformTrending = (address: string) => {
    setPlatformTrendingCoins((prev) => prev.filter((coin) => coin.address !== address))
    toast({
      title: "Coin Removed",
      description: "The coin has been removed from the platform trending box.",
    })
  }

  const handleAddTrendingCoin = async () => {
    if (!newCoinAddress) {
      toast({
        title: "Missing information",
        description: "Please enter a token address",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // In a real implementation, you would fetch the coin data from the API
      const newCoin: CoinData = {
        name: "New Trending Coin",
        symbol: "NTC",
        address: newCoinAddress,
        network: newCoinNetwork as any,
        pair: `NTC/USDT`,
        price: 0.12345,
        change24h: 5.67,
        volume: 1000000,
        liquidity: 500000,
        totalSupply: 1000000000,
        circulatingSupply: 500000000,
        burnedSupply: 100000000,
        lockedSupply: 400000000,
        percentCirculating: 50,
        percentBurned: 10,
        percentLocked: 40,
        description: "A new trending coin added by admin",
        website: "https://example.com",
        twitter: "https://twitter.com/example",
        telegram: "https://t.me/example",
        discord: "https://discord.gg/example",
        github: "https://github.com/example",
        trustVotes: 100,
        distrustVotes: 10,
        totalVotes: 110,
        trustPercentage: 91,
        distrustPercentage: 9,
        isLiquidityLocked: true,
        lockPlatform: "PinkSale",
        lockDuration: "6 months",
        lockAmount: "$100000",
        launchDate: new Date().toISOString().split("T")[0],
        allTimeHigh: 0.2,
        allTimeLow: 0.05,
        hasBanner: false,
        hasLogo: false,
        trafficCount: 600000,
      }

      if (activeTab === "trending-column") {
        if (trendingCoins.length < 15) {
          setTrendingCoins((prev) => [newCoin, ...prev])
        } else {
          toast({
            title: "Limit Reached",
            description: "You can only have 15 coins in the trending column.",
            variant: "destructive",
          })
        }
      } else {
        if (platformTrendingCoins.length < 5) {
          setPlatformTrendingCoins((prev) => [newCoin, ...prev])
        } else {
          toast({
            title: "Limit Reached",
            description: "You can only have 5 coins in the platform box.",
            variant: "destructive",
          })
        }
      }

      toast({
        title: "Coin added",
        description: `The coin has been added to the ${
          activeTab === "trending-column" ? "trending column" : "platform box"
        }`,
      })

      setIsAddDialogOpen(false)
      setNewCoinAddress("")
      setNewCoinNetwork("eth")
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add trending coin. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleRemoveTrendingCoin = (address: string) => {
    setTrendingCoins((prev) => prev.filter((coin) => coin.address !== address))

    toast({
      title: "Coin removed",
      description: "The coin has been removed from the trending list",
    })
  }

  const handleMoveUp = (index: number, list: "trending" | "platform") => {
    if (index === 0) return

    if (list === "trending") {
      const newTrendingCoins = [...trendingCoins]
      const temp = newTrendingCoins[index]
      newTrendingCoins[index] = newTrendingCoins[index - 1]
      newTrendingCoins[index - 1] = temp
      setTrendingCoins(newTrendingCoins)
    } else {
      const newPlatformCoins = [...platformTrendingCoins]
      const temp = newPlatformCoins[index]
      newPlatformCoins[index] = newPlatformCoins[index - 1]
      newPlatformCoins[index - 1] = temp
      setPlatformTrendingCoins(newPlatformCoins)
    }

    toast({
      title: "Position updated",
      description: "The coin has been moved up in the list",
    })
  }

  const handleMoveDown = (index: number, list: "trending" | "platform") => {
    if (list === "trending" && index === trendingCoins.length - 1) return
    if (list === "platform" && index === platformTrendingCoins.length - 1) return

    if (list === "trending") {
      const newTrendingCoins = [...trendingCoins]
      const temp = newTrendingCoins[index]
      newTrendingCoins[index] = newTrendingCoins[index + 1]
      newTrendingCoins[index + 1] = temp
      setTrendingCoins(newTrendingCoins)
    } else {
      const newPlatformCoins = [...platformTrendingCoins]
      const temp = newPlatformCoins[index]
      newPlatformCoins[index] = newPlatformCoins[index + 1]
      newPlatformCoins[index + 1] = temp
      setPlatformTrendingCoins(newPlatformCoins)
    }

    toast({
      title: "Position updated",
      description: "The coin has been moved down in the list",
    })
  }

  // Filter trending coins based on search query
  const getFilteredCoins = () => {
    const coins = activeTab === "trending-column" ? trendingCoins : platformTrendingCoins
    return coins.filter(
      (coin) =>
        coin.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        coin.symbol.toLowerCase().includes(searchQuery.toLowerCase()) ||
        coin.address.toLowerCase().includes(searchQuery.toLowerCase()),
    )
  }

  const filteredCoins = getFilteredCoins()

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold">Trending Coins</h1>
            <p className="text-muted-foreground">Manage coins that appear in trending sections</p>
          </div>

          <Button onClick={() => setIsAddDialogOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Add Coin
          </Button>
        </div>

        <Card className="shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle>Trending Coins Management</CardTitle>
            <CardDescription>Manage coins that appear in trending sections on the homepage</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="trending-column" value={activeTab} onValueChange={setActiveTab} className="mb-6">
              <TabsList className="grid grid-cols-2 mb-4">
                <TabsTrigger value="trending-column" className="flex items-center">
                  <Flame className="mr-2 h-4 w-4" />
                  Trending Column (15)
                </TabsTrigger>
                <TabsTrigger value="platform-box" className="flex items-center">
                  <DollarSign className="mr-2 h-4 w-4" />
                  Platform Box (5)
                </TabsTrigger>
              </TabsList>

              <div className="flex flex-col md:flex-row gap-4 mb-6">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search by name, symbol or address..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              <TabsContent value="trending-column" className="mt-0">
                {loading ? (
                  <div className="flex items-center justify-center h-64">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                  </div>
                ) : (
                  <div className="rounded-md border overflow-hidden">
                    <Table>
                      <TableHeader>
                        <TableRow className="bg-muted/50">
                          <TableHead className="w-[80px]">Position</TableHead>
                          <TableHead>Coin</TableHead>
                          <TableHead className="text-right">Price</TableHead>
                          <TableHead className="text-right">24h Change</TableHead>
                          <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredCoins.length > 0 ? (
                          filteredCoins.map((coin, index) => (
                            <TableRow key={coin.address}>
                              <TableCell>
                                <div className="flex items-center">
                                  <Badge variant="outline" className="mr-2">
                                    #{index + 1}
                                  </Badge>
                                  <div className="flex flex-col">
                                    <Button
                                      variant="ghost"
                                      size="icon"
                                      className="h-6 w-6"
                                      onClick={() => handleMoveUp(index, "trending")}
                                      disabled={index === 0}
                                    >
                                      <ArrowUp className="h-4 w-4" />
                                    </Button>
                                    <Button
                                      variant="ghost"
                                      size="icon"
                                      className="h-6 w-6"
                                      onClick={() => handleMoveDown(index, "trending")}
                                      disabled={index === filteredCoins.length - 1}
                                    >
                                      <ArrowDown className="h-4 w-4" />
                                    </Button>
                                  </div>
                                </div>
                              </TableCell>
                              <TableCell>
                                <div className="flex items-center">
                                  <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center mr-2">
                                    <span className="text-primary font-medium">{coin.symbol.charAt(0)}</span>
                                  </div>
                                  <div>
                                    <div className="font-medium flex items-center">
                                      {coin.symbol}
                                      <Badge variant="outline" className="ml-2 text-xs">
                                        <NetworkIcon network={coin.network} size="sm" className="mr-1" />
                                        {coin.network.toUpperCase()}
                                      </Badge>
                                    </div>
                                    <div className="text-xs text-muted-foreground">{coin.name}</div>
                                  </div>
                                </div>
                              </TableCell>
                              <TableCell className="text-right font-medium">
                                ${coin.price.toFixed(coin.price < 0.001 ? 8 : 2)}
                              </TableCell>
                              <TableCell
                                className={`text-right ${coin.change24h >= 0 ? "text-green-500" : "text-red-500"}`}
                              >
                                {coin.change24h >= 0 ? "+" : ""}
                                {coin.change24h.toFixed(2)}%
                              </TableCell>
                              <TableCell>
                                <div className="flex justify-end gap-2">
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => handleAddToPlatformTrending(coin)}
                                    disabled={platformTrendingCoins.some((c) => c.address === coin.address)}
                                    className="h-8"
                                  >
                                    {platformTrendingCoins.some((c) => c.address === coin.address)
                                      ? "In Platform Box"
                                      : "Add to Platform Box"}
                                  </Button>
                                  <Button variant="ghost" size="icon" asChild className="h-8 w-8">
                                    <a href={`/coin/${coin.address}`} target="_blank" rel="noopener noreferrer">
                                      <ExternalLink className="h-4 w-4" />
                                    </a>
                                  </Button>
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => handleRemoveTrendingCoin(coin.address)}
                                    className="h-8 w-8 text-red-500 hover:text-red-700 hover:bg-red-100"
                                  >
                                    <Trash2 className="h-4 w-4" />
                                  </Button>
                                </div>
                              </TableCell>
                            </TableRow>
                          ))
                        ) : (
                          <TableRow>
                            <TableCell colSpan={5} className="text-center py-6 text-muted-foreground">
                              No trending coins found
                            </TableCell>
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="platform-box" className="mt-0">
                {loading ? (
                  <div className="flex items-center justify-center h-64">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                  </div>
                ) : (
                  <div className="rounded-md border overflow-hidden">
                    <Table>
                      <TableHeader>
                        <TableRow className="bg-muted/50">
                          <TableHead className="w-[80px]">Position</TableHead>
                          <TableHead>Coin</TableHead>
                          <TableHead className="text-right">Price</TableHead>
                          <TableHead className="text-right">24h Change</TableHead>
                          <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredCoins.length > 0 ? (
                          filteredCoins.map((coin, index) => (
                            <TableRow key={coin.address}>
                              <TableCell>
                                <div className="flex items-center">
                                  <Badge variant="outline" className="mr-2">
                                    #{index + 1}
                                  </Badge>
                                  <div className="flex flex-col">
                                    <Button
                                      variant="ghost"
                                      size="icon"
                                      className="h-6 w-6"
                                      onClick={() => handleMoveUp(index, "platform")}
                                      disabled={index === 0}
                                    >
                                      <ArrowUp className="h-4 w-4" />
                                    </Button>
                                    <Button
                                      variant="ghost"
                                      size="icon"
                                      className="h-6 w-6"
                                      onClick={() => handleMoveDown(index, "platform")}
                                      disabled={index === filteredCoins.length - 1}
                                    >
                                      <ArrowDown className="h-4 w-4" />
                                    </Button>
                                  </div>
                                </div>
                              </TableCell>
                              <TableCell>
                                <div className="flex items-center">
                                  <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center mr-2">
                                    <span className="text-primary font-medium">{coin.symbol.charAt(0)}</span>
                                  </div>
                                  <div>
                                    <div className="font-medium flex items-center">
                                      {coin.symbol}
                                      <Badge variant="outline" className="ml-2 text-xs">
                                        <NetworkIcon network={coin.network} size="sm" className="mr-1" />
                                        {coin.network.toUpperCase()}
                                      </Badge>
                                    </div>
                                    <div className="text-xs text-muted-foreground">{coin.name}</div>
                                  </div>
                                </div>
                              </TableCell>
                              <TableCell className="text-right font-medium">
                                ${coin.price.toFixed(coin.price < 0.001 ? 8 : 2)}
                              </TableCell>
                              <TableCell
                                className={`text-right ${coin.change24h >= 0 ? "text-green-500" : "text-red-500"}`}
                              >
                                {coin.change24h >= 0 ? "+" : ""}
                                {coin.change24h.toFixed(2)}%
                              </TableCell>
                              <TableCell>
                                <div className="flex justify-end gap-2">
                                  <Button variant="ghost" size="icon" asChild className="h-8 w-8">
                                    <a href={`/coin/${coin.address}`} target="_blank" rel="noopener noreferrer">
                                      <ExternalLink className="h-4 w-4" />
                                    </a>
                                  </Button>
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => handleRemoveFromPlatformTrending(coin.address)}
                                    className="h-8 w-8 text-red-500 hover:text-red-700 hover:bg-red-100"
                                  >
                                    <Trash2 className="h-4 w-4" />
                                  </Button>
                                </div>
                              </TableCell>
                            </TableRow>
                          ))
                        ) : (
                          <TableRow>
                            <TableCell colSpan={5} className="text-center py-6 text-muted-foreground">
                              No platform trending coins found
                            </TableCell>
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>

      {/* Add Trending Coin Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Trending Coin</DialogTitle>
            <DialogDescription>
              Add a new coin to the {activeTab === "trending-column" ? "trending column" : "platform box"}.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="address" className="text-right">
                Token Address
              </Label>
              <Input
                id="address"
                placeholder="0x..."
                value={newCoinAddress}
                onChange={(e) => setNewCoinAddress(e.target.value)}
                className="col-span-3"
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="network" className="text-right">
                Network
              </Label>
              <Select value={newCoinNetwork} onValueChange={setNewCoinNetwork}>
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select network" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="eth">Ethereum</SelectItem>
                  <SelectItem value="bnb">BNB Chain</SelectItem>
                  <SelectItem value="sol">Solana</SelectItem>
                  <SelectItem value="trx">Tron</SelectItem>
                  <SelectItem value="matic">Polygon</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddDialogOpen(false)} disabled={isSubmitting}>
              Cancel
            </Button>
            <Button onClick={handleAddTrendingCoin} disabled={isSubmitting}>
              {isSubmitting ? "Adding..." : "Add Coin"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  )
}
