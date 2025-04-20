"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import type { CoinData } from "@/types/common"
import { ExternalLink, Building, Globe } from "lucide-react"
import { Button } from "@/components/ui/button"

interface CoinExchangeListingsProps {
  coinData: CoinData | null
  loading: boolean
}

export function CoinExchangeListings({ coinData, loading }: CoinExchangeListingsProps) {
  const [listings, setListings] = useState<{
    cex: { name: string; url: string; tier: "major" | "medium" | "small" }[]
    dex: { name: string; url: string; network: string }[]
  }>({ cex: [], dex: [] })

  useEffect(() => {
    if (coinData) {
      // In a real implementation, you would fetch this data from an API
      // For now, we'll generate mock data based on the coin address
      const mockListings = generateMockListings(coinData)
      setListings(mockListings)
    }
  }, [coinData])

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Exchange Listings</CardTitle>
        </CardHeader>
        <CardContent>
          <Skeleton className="h-[200px] w-full" />
        </CardContent>
      </Card>
    )
  }

  if (!coinData) return null

  return (
    <Card>
      <CardHeader>
        <CardTitle>Exchange Listings</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <h3 className="text-sm font-medium mb-3 flex items-center">
            <Building className="h-4 w-4 mr-2" />
            Centralized Exchanges
          </h3>

          {listings.cex.length > 0 ? (
            <div className="grid grid-cols-2 gap-2">
              {listings.cex.map((exchange, index) => (
                <a
                  key={index}
                  href={exchange.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-2 border rounded-md hover:bg-accent transition-colors"
                >
                  <div className="flex items-center">
                    <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center mr-2">
                      <span className="text-primary text-xs font-medium">{exchange.name.charAt(0)}</span>
                    </div>
                    <span className="text-sm">{exchange.name}</span>
                  </div>
                  <Badge
                    variant={
                      exchange.tier === "major" ? "default" : exchange.tier === "medium" ? "secondary" : "outline"
                    }
                    className="text-xs"
                  >
                    {exchange.tier === "major" ? "Tier 1" : exchange.tier === "medium" ? "Tier 2" : "Tier 3"}
                  </Badge>
                </a>
              ))}
            </div>
          ) : (
            <div className="text-center py-3 border rounded-md text-muted-foreground text-sm">
              No centralized exchange listings found
            </div>
          )}
        </div>

        <div>
          <h3 className="text-sm font-medium mb-3 flex items-center">
            <Globe className="h-4 w-4 mr-2" />
            Decentralized Exchanges
          </h3>

          {listings.dex.length > 0 ? (
            <div className="grid grid-cols-2 gap-2">
              {listings.dex.map((exchange, index) => (
                <a
                  key={index}
                  href={exchange.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-2 border rounded-md hover:bg-accent transition-colors"
                >
                  <div className="flex items-center">
                    <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center mr-2">
                      <span className="text-primary text-xs font-medium">{exchange.name.charAt(0)}</span>
                    </div>
                    <span className="text-sm">{exchange.name}</span>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {exchange.network}
                  </Badge>
                </a>
              ))}
            </div>
          ) : (
            <div className="text-center py-3 border rounded-md text-muted-foreground text-sm">
              No decentralized exchange listings found
            </div>
          )}
        </div>

        <Button variant="outline" size="sm" className="w-full" asChild>
          <a
            href={`https://www.coingecko.com/en/coins/${coinData.symbol.toLowerCase()}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center"
          >
            <ExternalLink className="h-4 w-4 mr-2" />
            View All Listings on CoinGecko
          </a>
        </Button>
      </CardContent>
    </Card>
  )
}

// Helper function to generate mock exchange listings
function generateMockListings(coinData: CoinData) {
  // Use the address to seed the random data generation
  const addressSeed = Number.parseInt(coinData.address.slice(2, 10), 16)

  const cexListings = []
  const dexListings = []

  // Major CEXes
  const majorCEXes = [
    { name: "Binance", url: "https://binance.com" },
    { name: "Coinbase", url: "https://coinbase.com" },
    { name: "Kraken", url: "https://kraken.com" },
    { name: "KuCoin", url: "https://kucoin.com" },
    { name: "Bybit", url: "https://bybit.com" },
  ]

  // Medium CEXes
  const mediumCEXes = [
    { name: "Gate.io", url: "https://gate.io" },
    { name: "Huobi", url: "https://huobi.com" },
    { name: "OKX", url: "https://okx.com" },
    { name: "Bitfinex", url: "https://bitfinex.com" },
    { name: "Gemini", url: "https://gemini.com" },
  ]

  // Small CEXes
  const smallCEXes = [
    { name: "BitMart", url: "https://bitmart.com" },
    { name: "MEXC", url: "https://mexc.com" },
    { name: "Bittrex", url: "https://bittrex.com" },
    { name: "Poloniex", url: "https://poloniex.com" },
    { name: "Bitstamp", url: "https://bitstamp.net" },
  ]

  // DEXes
  const dexes = [
    { name: "Uniswap", url: "https://uniswap.org", network: "Ethereum" },
    { name: "PancakeSwap", url: "https://pancakeswap.finance", network: "BNB Chain" },
    { name: "SushiSwap", url: "https://sushi.com", network: "Ethereum" },
    { name: "Raydium", url: "https://raydium.io", network: "Solana" },
    { name: "QuickSwap", url: "https://quickswap.exchange", network: "Polygon" },
    { name: "TraderJoe", url: "https://traderjoexyz.com", network: "Avalanche" },
    { name: "Curve", url: "https://curve.fi", network: "Ethereum" },
    { name: "dYdX", url: "https://dydx.exchange", network: "Ethereum" },
  ]

  // Determine how many exchanges to include based on the seed
  const majorCexCount = addressSeed % 3 // 0-2 major CEXes
  const mediumCexCount = (addressSeed % 3) + (majorCexCount > 0 ? 0 : 1) // 0-3 medium CEXes
  const smallCexCount = (addressSeed % 4) + (majorCexCount + mediumCexCount > 0 ? 0 : 1) // 0-4 small CEXes
  const dexCount = (addressSeed % 4) + 1 // 1-4 DEXes

  // Add major CEXes
  for (let i = 0; i < majorCexCount; i++) {
    const index = (addressSeed + i) % majorCEXes.length
    cexListings.push({ ...majorCEXes[index], tier: "major" as const })
  }

  // Add medium CEXes
  for (let i = 0; i < mediumCexCount; i++) {
    const index = (addressSeed + i) % mediumCEXes.length
    cexListings.push({ ...mediumCEXes[index], tier: "medium" as const })
  }

  // Add small CEXes
  for (let i = 0; i < smallCexCount; i++) {
    const index = (addressSeed + i) % smallCEXes.length
    cexListings.push({ ...smallCEXes[index], tier: "small" as const })
  }

  // Add DEXes
  // Always include the DEX for the coin's network
  const networkDexMap: Record<string, { name: string; url: string; network: string }> = {
    eth: { name: "Uniswap", url: "https://uniswap.org", network: "Ethereum" },
    bnb: { name: "PancakeSwap", url: "https://pancakeswap.finance", network: "BNB Chain" },
    sol: { name: "Raydium", url: "https://raydium.io", network: "Solana" },
    trx: { name: "SunSwap", url: "https://sunswap.com", network: "Tron" },
    matic: { name: "QuickSwap", url: "https://quickswap.exchange", network: "Polygon" },
  }

  if (networkDexMap[coinData.network]) {
    dexListings.push(networkDexMap[coinData.network])
  }

  // Add additional DEXes
  for (let i = 0; i < dexCount - 1; i++) {
    const index = (addressSeed + i) % dexes.length
    // Avoid duplicates
    if (!dexListings.some((dex) => dex.name === dexes[index].name)) {
      dexListings.push(dexes[index])
    }
  }

  return {
    cex: cexListings,
    dex: dexListings,
  }
}
