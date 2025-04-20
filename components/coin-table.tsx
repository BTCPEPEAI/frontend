"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ArrowUp, ArrowDown, Clock } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { NetworkIcon } from "@/components/network-icon"
import { MiniCandleChart } from "@/components/charts/mini-candle-chart"
import { CoinAuditButton } from "@/components/coin/coin-audit-button"
import { HotFireBadge } from "@/components/hot-fire-badge"
import { CoinWatchlistCounter } from "@/components/coin/coin-watchlist-counter"
import type { CoinData } from "@/types/common"
import { Skeleton } from "@/components/ui/skeleton"
import { Button } from "@/components/ui/button"

interface CoinTableProps {
  filter?: "trending" | "gainers" | "new" | "low-volume" | "trusted" | "hot-pairs"
  network?: string
  query?: string
  limit?: number
  showCharts?: boolean
  coins?: CoinData[]
  showAudit?: boolean
  showMarketCap?: boolean
  showDexInfo?: boolean
  show24hChange?: boolean
  showPoolCreated?: boolean
}

export function CoinTable({
  filter,
  network,
  query,
  limit,
  showCharts = false,
  coins: propCoins,
  showAudit = false,
  showMarketCap = false,
  showDexInfo = false,
  show24hChange = true,
  showPoolCreated = false,
}: CoinTableProps) {
  const [coins, setCoins] = useState<CoinData[]>([])
  const [loading, setLoading] = useState(!propCoins)
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 20

  // Use provided coins or fetch based on filters
  useEffect(() => {
    if (propCoins) {
      setCoins(propCoins)
      setLoading(false)
      return
    }

    // In a real implementation, you would fetch data from an API with the appropriate filters
    // This is just a mock implementation
    setLoading(true)

    // Simulate API delay
    const timer = setTimeout(() => {
      // Generate mock coins
      const mockCoins = Array.from({ length: 100 }, (_, i) => {
        const randomHex = Math.floor(Math.random() * 0xffffff)
          .toString(16)
          .padStart(6, "0")
        const address = `0x${randomHex}${i.toString().padStart(4, "0")}`

        // Generate a unique seed for each coin
        const seed = Number.parseInt(address.slice(2, 10), 16)

        // Generate network based on seed
        const networks = ["eth", "bnb", "sol", "trx", "matic"] as const
        const network = networks[seed % networks.length]

        // Generate price based on seed
        const price = (seed % 1000) / 10 || 0.1

        // Generate change percentages
        const change24h = ((seed % 40) - 20) / 2

        // Generate pool created time
        const daysAgo = (seed % 365) + 1
        const poolCreatedDate = new Date(Date.now() - daysAgo * 24 * 60 * 60 * 1000)
        const poolCreatedTime = poolCreatedDate.toLocaleString()

        // Generate DEX info
        const primaryDexMap: Record<string, string> = {
          eth: "Uniswap V3",
          bnb: "PancakeSwap",
          sol: "Raydium",
          trx: "SunSwap",
          matic: "QuickSwap",
        }
        const primaryDex = primaryDexMap[network] || "Unknown DEX"

        return {
          name: `Coin ${i + 1}`,
          symbol: `C${i + 1}`,
          address,
          network,
          pair: `C${i + 1}/USDT`,
          price,
          change24h,
          volume: (seed % 100) * 100000,
          liquidity: (seed % 50) * 200000,
          totalSupply: ((seed % 10) + 1) * 100000000,
          circulatingSupply: (((seed % 10) + 1) * 100000000 * ((seed % 80) + 20)) / 100,
          burnedSupply: (((seed % 10) + 1) * 100000000 * (seed % 10)) / 100,
          lockedSupply:
            ((seed % 10) + 1) * 100000000 -
            (((seed % 10) + 1) * 100000000 * ((seed % 80) + 20)) / 100 -
            (((seed % 10) + 1) * 100000000 * (seed % 10)) / 100,
          percentCirculating: (seed % 80) + 20,
          percentBurned: seed % 10,
          percentLocked: 100 - ((seed % 80) + 20) - (seed % 10),
          description: `Description for Coin ${i + 1}`,
          website: `https://coin${i + 1}.com`,
          twitter: `https://twitter.com/coin${i + 1}`,
          telegram: `https://t.me/coin${i + 1}`,
          discord: `https://discord.gg/coin${i + 1}`,
          github: `https://github.com/coin${i + 1}`,
          trustVotes: (seed % 1000) + 100,
          distrustVotes: (seed % 200) + 10,
          totalVotes: (seed % 1000) + 100 + ((seed % 200) + 10),
          trustPercentage: Math.round((((seed % 1000) + 100) / ((seed % 1000) + 100 + ((seed % 200) + 10))) * 100),
          distrustPercentage: Math.round((((seed % 200) + 10) / ((seed % 1000) + 100 + ((seed % 200) + 10))) * 100),
          isLiquidityLocked: seed % 3 !== 0,
          lockPlatform: seed % 2 === 0 ? "PinkSale" : "Unicrypt",
          lockDuration: (seed % 12) + 1 + " months",
          lockAmount: `$${((seed % 50) + 10) * 10000}`,
          launchDate: new Date(Date.now() - (seed % 365) * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
          allTimeHigh: price * (1 + (seed % 100) / 100),
          allTimeLow: price * (1 - (seed % 50) / 100),
          hasBanner: seed % 5 === 0,
          hasLogo: seed % 3 === 0,
          trafficCount: seed % 2 === 0 ? (seed % 1000) * 1000 : undefined,
          poolCreatedTime,
          dexInfo: {
            primaryDex,
            priceImpact: Math.max(0.1, Math.min(20, (seed % 200) / 10)),
          },
          marketCap: (price * (((seed % 10) + 1) * 100000000 * ((seed % 80) + 20))) / 100,
        } as CoinData & {
          poolCreatedTime: string
          dexInfo: { primaryDex: string; priceImpact: number }
          marketCap: number
        }
      })

      let filteredCoins = [...mockCoins]

      if (filter === "trending") {
        // Sort by volume for trending
        filteredCoins = filteredCoins.sort((a, b) => b.volume - a.volume)
      } else if (filter === "gainers") {
        // Sort by 24h change for gainers
        filteredCoins = filteredCoins.sort((a, b) => b.change24h - a.change24h)
      } else if (filter === "new") {
        // Sort by launch date for new listings
        filteredCoins = filteredCoins.sort(
          (a, b) => new Date(b.launchDate).getTime() - new Date(a.launchDate).getTime(),
        )
      } else if (filter === "low-volume") {
        // Sort by volume ascending for low volume
        filteredCoins = filteredCoins.sort((a, b) => a.volume - b.volume)
      } else if (filter === "trusted") {
        // Filter by trust percentage
        filteredCoins = filteredCoins.filter((coin) => coin.trustPercentage > 70)
      }

      if (network && network !== "all") {
        // Filter by network
        filteredCoins = filteredCoins.filter((coin) => coin.network === network)
      }

      if (query) {
        // Filter by search query
        filteredCoins = filteredCoins.filter(
          (coin) =>
            coin.name.toLowerCase().includes(query.toLowerCase()) ||
            coin.symbol.toLowerCase().includes(query.toLowerCase()) ||
            coin.address.toLowerCase().includes(query.toLowerCase()),
        )
      }

      if (limit) {
        filteredCoins = filteredCoins.slice(0, limit)
      }

      setCoins(filteredCoins)
      setLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [filter, network, query, limit, propCoins])

  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return `$${(num / 1000000).toFixed(1)}M`
    } else if (num >= 1000) {
      return `$${(num / 1000).toFixed(1)}K`
    } else {
      return `$${num.toFixed(2)}`
    }
  }

  const formatPrice = (price: number) => {
    if (price < 0.001) {
      return `$${price.toFixed(8)}`
    } else if (price < 1) {
      return `$${price.toFixed(6)}`
    } else {
      return `$${price.toFixed(2)}`
    }
  }

  const renderChangeCell = (change: number) => {
    const color = change > 0 ? "text-green-500" : change < 0 ? "text-red-500" : "text-muted-foreground"
    const icon =
      change > 0 ? <ArrowUp className="h-3 w-3 inline" /> : change < 0 ? <ArrowDown className="h-3 w-3 inline" /> : null

    return (
      <TableCell className={color}>
        {icon} {Math.abs(change).toFixed(2)}%
      </TableCell>
    )
  }

  // Pagination
  const totalPages = Math.ceil(coins.length / itemsPerPage)
  const paginatedCoins = coins.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Tokens</CardTitle>
        </CardHeader>
        <CardContent>
          <Skeleton className="w-full h-[500px]" />
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Tokens</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[80px]">#</TableHead>
                <TableHead>Token</TableHead>
                {showCharts && <TableHead>Chart</TableHead>}
                <TableHead className="text-right">Price</TableHead>
                {showMarketCap && <TableHead className="text-right">Market Cap</TableHead>}
                {showDexInfo && <TableHead className="text-right">DEX</TableHead>}
                <TableHead className="text-right">TXNS</TableHead>
                <TableHead className="text-right">Volume</TableHead>
                {show24hChange && <TableHead className="text-right">24H</TableHead>}
                {showPoolCreated && <TableHead className="text-right">Pool Created</TableHead>}
                <TableHead className="text-right">Liquidity</TableHead>
                {showAudit && <TableHead className="text-right">Audit</TableHead>}
                <TableHead className="text-right">FDV</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedCoins.map((coin, index) => (
                <TableRow key={coin.address}>
                  <TableCell className="font-medium">#{(currentPage - 1) * itemsPerPage + index + 1}</TableCell>
                  <TableCell>
                    <Link href={`/coin/${coin.address}`} className="flex items-center hover:underline">
                      <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center mr-2">
                        {coin.symbol.charAt(0)}
                      </div>
                      <div>
                        <div className="font-medium flex items-center">
                          {coin.symbol}
                          <Badge variant="outline" className="ml-2">
                            <NetworkIcon network={coin.network} size="sm" className="mr-1" />
                            {coin.network.toUpperCase()}
                          </Badge>
                          {coin.trustPercentage > 70 && (
                            <Badge variant="secondary" className="ml-2">
                              Trusted
                            </Badge>
                          )}
                          {coin.trafficCount && coin.trafficCount > 500000 && (
                            <HotFireBadge coinData={coin} className="ml-2" />
                          )}
                          <CoinWatchlistCounter coinData={coin} className="ml-2" />
                        </div>
                        <div className="text-xs text-muted-foreground">{coin.pair}</div>
                      </div>
                    </Link>
                  </TableCell>
                  {showCharts && (
                    <TableCell>
                      <div className="w-24 h-16">
                        <MiniCandleChart data={generateMockChartData(coin.address)} positive={coin.change24h >= 0} />
                      </div>
                    </TableCell>
                  )}
                  <TableCell className="text-right font-medium">{formatPrice(coin.price)}</TableCell>
                  {showMarketCap && (
                    <TableCell className="text-right">
                      {formatNumber((coin as any).marketCap || coin.price * coin.circulatingSupply)}
                    </TableCell>
                  )}
                  {showDexInfo && (
                    <TableCell className="text-right">
                      <div className="flex flex-col items-end">
                        <span className="text-sm">{(coin as any).dexInfo?.primaryDex || "Unknown"}</span>
                        <span className="text-xs text-muted-foreground">
                          Impact: {((coin as any).dexInfo?.priceImpact || 0).toFixed(2)}%
                        </span>
                      </div>
                    </TableCell>
                  )}
                  <TableCell className="text-right">{Math.floor(coin.volume / 100).toLocaleString()}</TableCell>
                  <TableCell className="text-right">{formatNumber(coin.volume)}</TableCell>
                  {show24hChange && renderChangeCell(coin.change24h)}
                  {showPoolCreated && (
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end">
                        <Clock className="h-3 w-3 mr-1 text-muted-foreground" />
                        <span className="text-xs">
                          {(coin as any).poolCreatedTime
                            ? new Date((coin as any).poolCreatedTime).toLocaleDateString()
                            : coin.launchDate}
                        </span>
                      </div>
                    </TableCell>
                  )}
                  <TableCell className="text-right">{formatNumber(coin.liquidity)}</TableCell>
                  {showAudit && (
                    <TableCell className="text-right">
                      <CoinAuditButton coinData={coin} variant="ghost" size="sm" />
                    </TableCell>
                  )}
                  <TableCell className="text-right">{formatNumber(coin.price * coin.totalSupply)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between mt-4">
            <div className="text-sm text-muted-foreground">
              Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, coins.length)} of{" "}
              {coins.length} entries
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
              >
                Previous
              </Button>
              <div className="text-sm">
                Page {currentPage} of {totalPages}
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
              >
                Next
              </Button>
            </div>
          </div>
        )}
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
    const close = baseValue * (1 + (Math.random() - 0.5) * 0.05)
    const high = Math.max(open, close) * (1 + Math.random() * 0.03)
    const low = Math.min(open, close) * (1 - Math.random() * 0.03)

    data.push({ open, high, low, close })
    baseValue = close
  }

  return data
}


// Ensure default export in the component file
export default CoinTable;
