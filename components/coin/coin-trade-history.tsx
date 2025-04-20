"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { ArrowUp, ArrowDown, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { NetworkIcon } from "@/components/network-icon"
import type { CoinData } from "@/types/common"

interface CoinTradeHistoryProps {
  coinData: CoinData | null
  loading: boolean
}

interface Trade {
  id: string
  type: "buy" | "sell"
  amount: string
  tokenAmount: number
  price: number
  value: number
  time: string
  timestamp: number
  wallet: string
  txHash: string
  dex: string
}

export function CoinTradeHistory({ coinData, loading }: CoinTradeHistoryProps) {
  const [trades, setTrades] = useState<Trade[]>([])
  const [tradeLoading, setTradeLoading] = useState(true)
  const [timeframe, setTimeframe] = useState("recent")
  const [refreshing, setRefreshing] = useState(false)

  // Fetch trade history
  useEffect(() => {
    if (!coinData) return

    const fetchTradeHistory = async () => {
      setTradeLoading(true)
      try {
        // In a real implementation, you would fetch data from an API
        // This is just a mock implementation
        await new Promise((resolve) => setTimeout(resolve, 1000))

        // Generate mock trades
        const mockTrades = generateMockTrades(coinData, timeframe)
        setTrades(mockTrades)
      } catch (error) {
        console.error("Error fetching trade history:", error)
      } finally {
        setTradeLoading(false)
      }
    }

    fetchTradeHistory()
  }, [coinData, timeframe])

  const handleRefresh = async () => {
    if (!coinData) return

    setRefreshing(true)
    try {
      // In a real implementation, you would fetch fresh data from an API
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Generate new mock trades
      const mockTrades = generateMockTrades(coinData, timeframe)
      setTrades(mockTrades)
    } catch (error) {
      console.error("Error refreshing trade history:", error)
    } finally {
      setRefreshing(false)
    }
  }

  const formatValue = (value: number) => {
    return `$${value.toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`
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

  const formatTokenAmount = (amount: number, symbol = "") => {
    if (amount >= 1000000) {
      return `${(amount / 1000000).toFixed(2)}M ${symbol}`.trim()
    } else if (amount >= 1000) {
      return `${(amount / 1000).toFixed(2)}K ${symbol}`.trim()
    } else {
      return `${amount.toFixed(2)} ${symbol}`.trim()
    }
  }

  const getTimeAgo = (timestamp: number) => {
    const seconds = Math.floor((Date.now() - timestamp) / 1000)

    if (seconds < 60) return `${seconds}s ago`

    const minutes = Math.floor(seconds / 60)
    if (minutes < 60) return `${minutes}m ago`

    const hours = Math.floor(minutes / 60)
    if (hours < 24) return `${hours}h ago`

    const days = Math.floor(hours / 24)
    return `${days}d ago`
  }

  if (loading) {
    return (
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Trade History</CardTitle>
          <Skeleton className="h-8 w-32" />
        </CardHeader>
        <CardContent>
          <Skeleton className="h-[400px] w-full" />
        </CardContent>
      </Card>
    )
  }

  if (!coinData) return null

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Trade History</CardTitle>
        <div className="flex items-center gap-2">
          <Tabs defaultValue="recent" value={timeframe} onValueChange={setTimeframe}>
            <TabsList>
              <TabsTrigger value="recent">Recent</TabsTrigger>
              <TabsTrigger value="1h">1H</TabsTrigger>
              <TabsTrigger value="24h">24H</TabsTrigger>
              <TabsTrigger value="7d">7D</TabsTrigger>
            </TabsList>
          </Tabs>
          <Button variant="outline" size="icon" onClick={handleRefresh} disabled={refreshing || tradeLoading}>
            <RefreshCw className={`h-4 w-4 ${refreshing ? "animate-spin" : ""}`} />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {tradeLoading ? (
          <div className="space-y-2">
            {Array.from({ length: 10 }).map((_, i) => (
              <Skeleton key={i} className="h-12 w-full" />
            ))}
          </div>
        ) : (
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Type</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Value</TableHead>
                  <TableHead>Time</TableHead>
                  <TableHead>Wallet</TableHead>
                  <TableHead>DEX</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {trades.map((trade) => (
                  <TableRow key={trade.id}>
                    <TableCell>
                      <div className={`flex items-center ${trade.type === "buy" ? "text-green-500" : "text-red-500"}`}>
                        {trade.type === "buy" ? (
                          <ArrowUp className="mr-1 h-4 w-4" />
                        ) : (
                          <ArrowDown className="mr-1 h-4 w-4" />
                        )}
                        {trade.type.charAt(0).toUpperCase() + trade.type.slice(1)}
                      </div>
                    </TableCell>
                    <TableCell>{formatPrice(trade.price)}</TableCell>
                    <TableCell>{formatTokenAmount(trade.tokenAmount, coinData.symbol)}</TableCell>
                    <TableCell>{formatValue(trade.value)}</TableCell>
                    <TableCell>
                      <div className="flex flex-col">
                        <span>{getTimeAgo(trade.timestamp)}</span>
                        <span className="text-xs text-muted-foreground">{trade.time}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <a
                        href={`https://etherscan.io/address/${trade.wallet}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:underline text-primary"
                      >
                        {trade.wallet.slice(0, 6)}...{trade.wallet.slice(-4)}
                      </a>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="flex items-center gap-1">
                        <NetworkIcon network={coinData.network} size="sm" />
                        {trade.dex}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}

                {trades.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-6 text-muted-foreground">
                      No trades found for this timeframe
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

// Helper function to generate mock trades
function generateMockTrades(coinData: CoinData, timeframe: string): Trade[] {
  const now = Date.now()
  const trades: Trade[] = []

  // Determine time range based on timeframe
  let startTime: number
  let tradeCount: number

  switch (timeframe) {
    case "recent":
      startTime = now - 15 * 60 * 1000 // 15 minutes ago
      tradeCount = 10
      break
    case "1h":
      startTime = now - 60 * 60 * 1000 // 1 hour ago
      tradeCount = 20
      break
    case "24h":
      startTime = now - 24 * 60 * 60 * 1000 // 24 hours ago
      tradeCount = 50
      break
    case "7d":
      startTime = now - 7 * 24 * 60 * 60 * 1000 // 7 days ago
      tradeCount = 100
      break
    default:
      startTime = now - 15 * 60 * 1000
      tradeCount = 10
  }

  // Generate trades
  for (let i = 0; i < tradeCount; i++) {
    // Random timestamp between startTime and now
    const timestamp = startTime + Math.random() * (now - startTime)
    const date = new Date(timestamp)

    // Random trade type
    const type = Math.random() > 0.5 ? "buy" : "sell"

    // Random token amount based on price
    const tokenAmount = Math.random() * 10000 * (1 / Math.max(0.0001, coinData.price))

    // Random price variation around the current price
    const priceVariation = 0.05 // 5% variation
    const price = coinData.price * (1 + (Math.random() * 2 - 1) * priceVariation)

    // Calculate value
    const value = price * tokenAmount

    // Generate random wallet address
    const wallet = `0x${Math.random().toString(16).substring(2, 10)}${Math.random().toString(16).substring(2, 10)}`

    // Generate random transaction hash
    const txHash = `0x${Math.random().toString(16).substring(2, 10)}${Math.random().toString(16).substring(2, 50)}`

    // Determine DEX based on network
    let dex = "Unknown"
    switch (coinData.network) {
      case "eth":
        dex = Math.random() > 0.7 ? "SushiSwap" : "Uniswap"
        break
      case "bnb":
        dex = Math.random() > 0.7 ? "ApeSwap" : "PancakeSwap"
        break
      case "sol":
        dex = Math.random() > 0.7 ? "Orca" : "Raydium"
        break
      case "trx":
        dex = "SunSwap"
        break
      case "matic":
        dex = Math.random() > 0.7 ? "SushiSwap" : "QuickSwap"
        break
    }

    trades.push({
      id: `trade-${i}-${timestamp}`,
      type,
      amount: formatTokenAmount(tokenAmount, coinData.symbol),
      tokenAmount,
      price,
      value,
      time: date.toLocaleTimeString(),
      timestamp,
      wallet,
      txHash,
      dex,
    })
  }

  // Sort by timestamp (newest first)
  return trades.sort((a, b) => b.timestamp - a.timestamp)
}

function formatTokenAmount(amount: number, symbol: string): string {
  if (amount >= 1000000) {
    return `${(amount / 1000000).toFixed(2)}M ${symbol}`
  } else if (amount >= 1000) {
    return `${(amount / 1000).toFixed(2)}K ${symbol}`
  } else {
    return `${amount.toFixed(2)} ${symbol}`
  }
}
