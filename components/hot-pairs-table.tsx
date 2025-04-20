"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Flame } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { NetworkIcon } from "@/components/network-icon"
import { MiniCandleChart } from "@/components/charts/mini-candle-chart"

// Mock data - would be replaced with API calls
const mockHotPairs = [
  {
    id: 1,
    pair: "WBNB/BUSD",
    token1: "WBNB",
    token2: "BUSD",
    address: "0xpair1",
    network: "bnb",
    price: 623.49,
    volume: 5234567,
    liquidity: 12345678,
    change24h: 0.5,
  },
  {
    id: 2,
    pair: "ETH/USDT",
    token1: "ETH",
    token2: "USDT",
    address: "0xpair2",
    network: "eth",
    price: 1997.09,
    volume: 3456789,
    liquidity: 23456789,
    change24h: -0.3,
  },
  {
    id: 3,
    pair: "SOL/USDC",
    token1: "SOL",
    token2: "USDC",
    address: "0xpair3",
    network: "sol",
    price: 145.23,
    volume: 2345678,
    liquidity: 3456789,
    change24h: 1.2,
  },
  {
    id: 4,
    pair: "MATIC/USDT",
    token1: "MATIC",
    token2: "USDT",
    address: "0xpair4",
    network: "matic",
    price: 0.78,
    volume: 1234567,
    liquidity: 2345678,
    change24h: -0.8,
  },
  {
    id: 5,
    pair: "TRX/USDT",
    token1: "TRX",
    token2: "USDT",
    address: "0xpair5",
    network: "trx",
    price: 0.12,
    volume: 987654,
    liquidity: 1234567,
    change24h: 0.2,
  },
  {
    id: 6,
    pair: "BTC/USDT",
    token1: "BTC",
    token2: "USDT",
    address: "0xpair6",
    network: "eth",
    price: 67890.12,
    volume: 9876543,
    liquidity: 98765432,
    change24h: 1.5,
  },
  {
    id: 7,
    pair: "DOGE/USDT",
    token1: "DOGE",
    token2: "USDT",
    address: "0xpair7",
    network: "bnb",
    price: 0.15,
    volume: 876543,
    liquidity: 1987654,
    change24h: -1.2,
  },
  {
    id: 8,
    pair: "SHIB/USDT",
    token1: "SHIB",
    token2: "USDT",
    address: "0xpair8",
    network: "eth",
    price: 0.00002,
    volume: 765432,
    liquidity: 876543,
    change24h: 2.3,
  },
  {
    id: 9,
    pair: "AVAX/USDT",
    token1: "AVAX",
    token2: "USDT",
    address: "0xpair9",
    network: "eth",
    price: 34.56,
    volume: 654321,
    liquidity: 7654321,
    change24h: 0.7,
  },
  {
    id: 10,
    pair: "LINK/USDT",
    token1: "LINK",
    token2: "USDT",
    address: "0xpair10",
    network: "eth",
    price: 12.34,
    volume: 543210,
    liquidity: 6543210,
    change24h: -0.5,
  },
]

interface HotPairsTableProps {
  network?: string
  limit?: number
}

export function HotPairsTable({ network, limit }: HotPairsTableProps) {
  const [pairs, setPairs] = useState(mockHotPairs)

  // Simulate API fetch with filtering
  useEffect(() => {
    // In a real implementation, you would fetch data from an API with the appropriate filters
    let filteredPairs = [...mockHotPairs]

    if (network && network !== "all") {
      // Filter by network
      filteredPairs = filteredPairs.filter((pair) => pair.network === network)
    }

    // Sort by volume
    filteredPairs = filteredPairs.sort((a, b) => b.volume - a.volume)

    if (limit) {
      filteredPairs = filteredPairs.slice(0, limit)
    }

    setPairs(filteredPairs)
  }, [network, limit])

  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return `$${(num / 1000000).toFixed(1)}M`
    } else if (num >= 1000) {
      return `$${(num / 1000).toFixed(1)}K`
    } else {
      return `$${num.toFixed(2)}`
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Hot Trading Pairs</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[80px]">#</TableHead>
                <TableHead>Pair</TableHead>
                <TableHead>Chart</TableHead>
                <TableHead className="text-right">Price</TableHead>
                <TableHead className="text-right">24h Change</TableHead>
                <TableHead className="text-right">Volume</TableHead>
                <TableHead className="text-right">Liquidity</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {pairs.map((pair, index) => (
                <TableRow key={pair.id}>
                  <TableCell className="font-medium">#{index + 1}</TableCell>
                  <TableCell>
                    <Link href={`/pair/${pair.address}`} className="flex items-center hover:underline">
                      <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center mr-2">
                        <Flame className="h-4 w-4" />
                      </div>
                      <div>
                        <div className="font-medium flex items-center">
                          {pair.pair}
                          <Badge variant="outline" className="ml-2">
                            <NetworkIcon network={pair.network} size="sm" className="mr-1" />
                            {pair.network.toUpperCase()}
                          </Badge>
                        </div>
                        <div className="text-xs text-muted-foreground">
                          <Link href={`/coin/${pair.token1}`} className="hover:underline">
                            {pair.token1}
                          </Link>
                          {" / "}
                          <Link href={`/coin/${pair.token2}`} className="hover:underline">
                            {pair.token2}
                          </Link>
                        </div>
                      </div>
                    </Link>
                  </TableCell>
                  <TableCell>
                    <div className="w-24 h-16">
                      <MiniCandleChart data={generateMockChartData(pair.id)} positive={pair.change24h >= 0} />
                    </div>
                  </TableCell>
                  <TableCell className="text-right font-medium">
                    ${pair.price.toFixed(pair.price < 0.01 ? 8 : 2)}
                  </TableCell>
                  <TableCell className={`text-right ${pair.change24h >= 0 ? "text-green-500" : "text-red-500"}`}>
                    {pair.change24h >= 0 ? "+" : ""}
                    {pair.change24h}%
                  </TableCell>
                  <TableCell className="text-right">{formatNumber(pair.volume)}</TableCell>
                  <TableCell className="text-right">{formatNumber(pair.liquidity)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  )
}

// Helper function to generate mock chart data
function generateMockChartData(seed: number) {
  const data = []
  let baseValue = 100 + seed * 10

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
