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
import { Search, Plus, Trash2, ExternalLink, TrendingUp, Clock, ArrowDown, Flame, Shield, BarChart } from "lucide-react"
import { fetchTrendingCoins, fetchTopGainers, fetchRecentlyAddedCoins, fetchHotPairs } from "@/lib/api"
import type { CoinData, PairData } from "@/types/common"
import { useToast } from "@/components/ui/use-toast"
import { NetworkIcon } from "@/components/network-icon"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function TokenManagementPage() {
  const { toast } = useToast()
  const [activeCategory, setActiveCategory] = useState("trending")
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")

  // Token lists for each category
  const [trendingTokens, setTrendingTokens] = useState<CoinData[]>([])
  const [topGainersTokens, setTopGainersTokens] = useState<CoinData[]>([])
  const [newListingsTokens, setNewListingsTokens] = useState<CoinData[]>([])
  const [lowVolumeTokens, setLowVolumeTokens] = useState<CoinData[]>([])
  const [trustedTokens, setTrustedTokens] = useState<CoinData[]>([])
  const [hotPairsTokens, setHotPairsTokens] = useState<PairData[]>([])

  // Dialog states
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [newTokenAddress, setNewTokenAddress] = useState("")
  const [newTokenNetwork, setNewTokenNetwork] = useState("eth")
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    const loadData = async () => {
      setLoading(true)
      try {
        // Load data for all categories
        const [trending, topGainers, newListings, hotPairs] = await Promise.all([
          fetchTrendingCoins(),
          fetchTopGainers(),
          fetchRecentlyAddedCoins(),
          fetchHotPairs(),
        ])

        setTrendingTokens(trending.slice(0, 20))
        setTopGainersTokens(topGainers.slice(0, 20))
        setNewListingsTokens(newListings.slice(0, 20))

        // Generate low volume tokens (in a real app, you'd fetch these)
        const lowVolume = trending.sort((a, b) => a.volume - b.volume).slice(0, 20)
        setLowVolumeTokens(lowVolume)

        // Generate trusted tokens (in a real app, you'd fetch these)
        const trusted = trending.filter((coin) => coin.trustPercentage > 80).slice(0, 20)
        setTrustedTokens(trusted)

        setHotPairsTokens(hotPairs.slice(0, 20))
      } catch (error) {
        console.error("Failed to load token data:", error)
        toast({
          title: "Error",
          description: "Failed to load token data. Please try again.",
          variant: "destructive",
        })
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [toast])

  const handleAddToken = async () => {
    if (!newTokenAddress) {
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

      // In a real implementation, you would fetch the token data from the API
      const newToken: CoinData = {
        name: "New Token",
        symbol: "NTK",
        address: newTokenAddress,
        network: newTokenNetwork as any,
        pair: `NTK/USDT`,
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
        description: "A new token added by admin",
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

      // Add to the appropriate category
      switch (activeCategory) {
        case "trending":
          if (trendingTokens.length >= 20) {
            toast({
              title: "Limit Reached",
              description: "You can only have 20 tokens in this category.",
              variant: "destructive",
            })
            break
          }
          setTrendingTokens((prev) => [newToken, ...prev])
          break
        case "topGainers":
          if (topGainersTokens.length >= 20) {
            toast({
              title: "Limit Reached",
              description: "You can only have 20 tokens in this category.",
              variant: "destructive",
            })
            break
          }
          setTopGainersTokens((prev) => [newToken, ...prev])
          break
        case "newListings":
          if (newListingsTokens.length >= 20) {
            toast({
              title: "Limit Reached",
              description: "You can only have 20 tokens in this category.",
              variant: "destructive",
            })
            break
          }
          setNewListingsTokens((prev) => [newToken, ...prev])
          break
        case "lowVolume":
          if (lowVolumeTokens.length >= 20) {
            toast({
              title: "Limit Reached",
              description: "You can only have 20 tokens in this category.",
              variant: "destructive",
            })
            break
          }
          setLowVolumeTokens((prev) => [newToken, ...prev])
          break
        case "trusted":
          if (trustedTokens.length >= 20) {
            toast({
              title: "Limit Reached",
              description: "You can only have 20 tokens in this category.",
              variant: "destructive",
            })
            break
          }
          setTrustedTokens((prev) => [newToken, ...prev])
          break
      }

      toast({
        title: "Token added",
        description: `The token has been added to the ${activeCategory} list`,
      })

      setIsAddDialogOpen(false)
      setNewTokenAddress("")
      setNewTokenNetwork("eth")
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add token. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleRemoveToken = (address: string) => {
    switch (activeCategory) {
      case "trending":
        setTrendingTokens((prev) => prev.filter((token) => token.address !== address))
        break
      case "topGainers":
        setTopGainersTokens((prev) => prev.filter((token) => token.address !== address))
        break
      case "newListings":
        setNewListingsTokens((prev) => prev.filter((token) => token.address !== address))
        break
      case "lowVolume":
        setLowVolumeTokens((prev) => prev.filter((token) => token.address !== address))
        break
      case "trusted":
        setTrustedTokens((prev) => prev.filter((token) => token.address !== address))
        break
      case "hotPairs":
        setHotPairsTokens((prev) => prev.filter((pair) => pair.address !== address))
        break
    }

    toast({
      title: "Token removed",
      description: `The token has been removed from the ${activeCategory} list`,
    })
  }

  // Filter tokens based on search query
  const getFilteredTokens = () => {
    switch (activeCategory) {
      case "trending":
        return trendingTokens.filter(
          (token) =>
            token.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            token.symbol.toLowerCase().includes(searchQuery.toLowerCase()) ||
            token.address.toLowerCase().includes(searchQuery.toLowerCase()),
        )
      case "topGainers":
        return topGainersTokens.filter(
          (token) =>
            token.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            token.symbol.toLowerCase().includes(searchQuery.toLowerCase()) ||
            token.address.toLowerCase().includes(searchQuery.toLowerCase()),
        )
      case "newListings":
        return newListingsTokens.filter(
          (token) =>
            token.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            token.symbol.toLowerCase().includes(searchQuery.toLowerCase()) ||
            token.address.toLowerCase().includes(searchQuery.toLowerCase()),
        )
      case "lowVolume":
        return lowVolumeTokens.filter(
          (token) =>
            token.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            token.symbol.toLowerCase().includes(searchQuery.toLowerCase()) ||
            token.address.toLowerCase().includes(searchQuery.toLowerCase()),
        )
      case "trusted":
        return trustedTokens.filter(
          (token) =>
            token.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            token.symbol.toLowerCase().includes(searchQuery.toLowerCase()) ||
            token.address.toLowerCase().includes(searchQuery.toLowerCase()),
        )
      case "hotPairs":
        return hotPairsTokens.filter(
          (pair) =>
            pair.pair.toLowerCase().includes(searchQuery.toLowerCase()) ||
            pair.address.toLowerCase().includes(searchQuery.toLowerCase()),
        )
      default:
        return []
    }
  }

  const filteredTokens = getFilteredTokens()

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold">Token Management</h1>
            <p className="text-muted-foreground">Manage tokens in different categories</p>
          </div>

          <Button onClick={() => setIsAddDialogOpen(true)} disabled={activeCategory === "hotPairs"}>
            <Plus className="mr-2 h-4 w-4" />
            Add Token
          </Button>
        </div>

        <Card className="shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle>Token Categories</CardTitle>
            <CardDescription>Manage tokens that appear in different sections of the website</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="trending" value={activeCategory} onValueChange={setActiveCategory} className="mb-6">
              <TabsList className="grid grid-cols-3 md:grid-cols-6 mb-4">
                <TabsTrigger value="trending" className="flex items-center">
                  <Flame className="mr-2 h-4 w-4" />
                  <span className="hidden md:inline">Trending</span>
                </TabsTrigger>
                <TabsTrigger value="topGainers" className="flex items-center">
                  <TrendingUp className="mr-2 h-4 w-4" />
                  <span className="hidden md:inline">Top Gainers</span>
                </TabsTrigger>
                <TabsTrigger value="newListings" className="flex items-center">
                  <Clock className="mr-2 h-4 w-4" />
                  <span className="hidden md:inline">New Listings</span>
                </TabsTrigger>
                <TabsTrigger value="lowVolume" className="flex items-center">
                  <ArrowDown className="mr-2 h-4 w-4" />
                  <span className="hidden md:inline">Low Volume</span>
                </TabsTrigger>
                <TabsTrigger value="trusted" className="flex items-center">
                  <Shield className="mr-2 h-4 w-4" />
                  <span className="hidden md:inline">Trusted</span>
                </TabsTrigger>
                <TabsTrigger value="hotPairs" className="flex items-center">
                  <BarChart className="mr-2 h-4 w-4" />
                  <span className="hidden md:inline">Hot Pairs</span>
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

              <TabsContent value={activeCategory} className="mt-0">
                {loading ? (
                  <div className="flex items-center justify-center h-64">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                  </div>
                ) : (
                  <div className="rounded-md border overflow-hidden">
                    <Table>
                      <TableHeader>
                        <TableRow className="bg-muted/50">
                          <TableHead>Position</TableHead>
                          {activeCategory === "hotPairs" ? <TableHead>Pair</TableHead> : <TableHead>Token</TableHead>}
                          <TableHead className="text-right">Price</TableHead>
                          <TableHead className="text-right">24h Change</TableHead>
                          {activeCategory !== "hotPairs" && <TableHead className="text-right">Volume</TableHead>}
                          <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredTokens.length > 0 ? (
                          activeCategory === "hotPairs" ? (
                            // Hot Pairs Table
                            filteredTokens.map((pair: any, index) => (
                              <TableRow key={pair.address}>
                                <TableCell>
                                  <Badge variant="outline">#{index + 1}</Badge>
                                </TableCell>
                                <TableCell>
                                  <div className="flex items-center">
                                    <div>
                                      <div className="font-medium flex items-center">
                                        {pair.pair}
                                        <Badge variant="outline" className="ml-2 text-xs">
                                          <NetworkIcon network={pair.network} size="sm" className="mr-1" />
                                          {pair.network.toUpperCase()}
                                        </Badge>
                                      </div>
                                    </div>
                                  </div>
                                </TableCell>
                                <TableCell className="text-right font-medium">
                                  ${pair.price.toFixed(pair.price < 0.001 ? 8 : 2)}
                                </TableCell>
                                <TableCell
                                  className={`text-right ${pair.change24h >= 0 ? "text-green-500" : "text-red-500"}`}
                                >
                                  {pair.change24h >= 0 ? "+" : ""}
                                  {pair.change24h.toFixed(2)}%
                                </TableCell>
                                <TableCell>
                                  <div className="flex justify-end gap-2">
                                    <Button variant="ghost" size="icon" asChild className="h-8 w-8">
                                      <a href={`/pair/${pair.address}`} target="_blank" rel="noopener noreferrer">
                                        <ExternalLink className="h-4 w-4" />
                                      </a>
                                    </Button>
                                    <Button
                                      variant="ghost"
                                      size="icon"
                                      onClick={() => handleRemoveToken(pair.address)}
                                      className="h-8 w-8 text-red-500 hover:text-red-700 hover:bg-red-100"
                                    >
                                      <Trash2 className="h-4 w-4" />
                                    </Button>
                                  </div>
                                </TableCell>
                              </TableRow>
                            ))
                          ) : (
                            // Regular Tokens Table
                            filteredTokens.map((token: any, index) => (
                              <TableRow key={token.address}>
                                <TableCell>
                                  <Badge variant="outline">#{index + 1}</Badge>
                                </TableCell>
                                <TableCell>
                                  <div className="flex items-center">
                                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center mr-2">
                                      <span className="text-primary font-medium">{token.symbol.charAt(0)}</span>
                                    </div>
                                    <div>
                                      <div className="font-medium flex items-center">
                                        {token.symbol}
                                        <Badge variant="outline" className="ml-2 text-xs">
                                          <NetworkIcon network={token.network} size="sm" className="mr-1" />
                                          {token.network.toUpperCase()}
                                        </Badge>
                                      </div>
                                      <div className="text-xs text-muted-foreground">{token.name}</div>
                                    </div>
                                  </div>
                                </TableCell>
                                <TableCell className="text-right font-medium">
                                  ${token.price.toFixed(token.price < 0.001 ? 8 : 2)}
                                </TableCell>
                                <TableCell
                                  className={`text-right ${token.change24h >= 0 ? "text-green-500" : "text-red-500"}`}
                                >
                                  {token.change24h >= 0 ? "+" : ""}
                                  {token.change24h.toFixed(2)}%
                                </TableCell>
                                <TableCell className="text-right">${token.volume.toLocaleString()}</TableCell>
                                <TableCell>
                                  <div className="flex justify-end gap-2">
                                    <Button variant="ghost" size="icon" asChild className="h-8 w-8">
                                      <a href={`/coin/${token.address}`} target="_blank" rel="noopener noreferrer">
                                        <ExternalLink className="h-4 w-4" />
                                      </a>
                                    </Button>
                                    <Button
                                      variant="ghost"
                                      size="icon"
                                      onClick={() => handleRemoveToken(token.address)}
                                      className="h-8 w-8 text-red-500 hover:text-red-700 hover:bg-red-100"
                                    >
                                      <Trash2 className="h-4 w-4" />
                                    </Button>
                                  </div>
                                </TableCell>
                              </TableRow>
                            ))
                          )
                        ) : (
                          <TableRow>
                            <TableCell colSpan={6} className="text-center py-6 text-muted-foreground">
                              No tokens found
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

      {/* Add Token Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Token</DialogTitle>
            <DialogDescription>
              Add a new token to the {activeCategory} list. This token will appear in the {activeCategory} section on
              the website.
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
                value={newTokenAddress}
                onChange={(e) => setNewTokenAddress(e.target.value)}
                className="col-span-3"
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="network" className="text-right">
                Network
              </Label>
              <Select value={newTokenNetwork} onValueChange={setNewTokenNetwork}>
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
            <Button onClick={handleAddToken} disabled={isSubmitting}>
              {isSubmitting ? "Adding..." : "Add Token"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  )
}
