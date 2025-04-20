"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import type { CoinData } from "@/types/common"
import { Skeleton } from "@/components/ui/skeleton"

interface CoinStatsProps {
  coinData: CoinData | null
  loading: boolean
}

export function CoinStats({ coinData, loading }: CoinStatsProps) {
  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Token Stats</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-2">
          {Array.from({ length: 11 }).map((_, i) => (
            <div key={i}>
              <div className="flex justify-between py-1">
                <Skeleton className="w-24 h-4" />
                <Skeleton className="w-20 h-4" />
              </div>
              {i < 10 && <Separator />}
            </div>
          ))}
        </CardContent>
      </Card>
    )
  }

  if (!coinData) return null

  return (
    <Card>
      <CardHeader>
        <CardTitle>Token Stats</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-2">
        <div className="flex justify-between py-1">
          <span className="text-muted-foreground">Price</span>
          <span className="font-medium">${coinData.price.toFixed(coinData.price < 0.001 ? 8 : 2)}</span>
        </div>
        <Separator />
        <div className="flex justify-between py-1">
          <span className="text-muted-foreground">Market Cap</span>
          <span className="font-medium">${(coinData.price * coinData.circulatingSupply).toLocaleString()}</span>
        </div>
        <Separator />
        <div className="flex justify-between py-1">
          <span className="text-muted-foreground">FDV</span>
          <span className="font-medium">${(coinData.price * coinData.totalSupply).toLocaleString()}</span>
        </div>
        <Separator />
        <div className="flex justify-between py-1">
          <span className="text-muted-foreground">24h Volume</span>
          <span className="font-medium">${coinData.volume.toLocaleString()}</span>
        </div>
        <Separator />
        <div className="flex justify-between py-1">
          <span className="text-muted-foreground">Liquidity</span>
          <span className="font-medium">${coinData.liquidity.toLocaleString()}</span>
        </div>
        <Separator />
        <div className="flex justify-between py-1">
          <span className="text-muted-foreground">Holders</span>
          <span className="font-medium">{(coinData.address.length * 10).toLocaleString()}</span>
        </div>
        <Separator />
        <div className="flex justify-between py-1">
          <span className="text-muted-foreground">Total Supply</span>
          <span className="font-medium">{coinData.totalSupply.toLocaleString()}</span>
        </div>
        <Separator />
        <div className="flex justify-between py-1">
          <span className="text-muted-foreground">Circulating Supply</span>
          <span className="font-medium">{coinData.circulatingSupply.toLocaleString()}</span>
        </div>
        <Separator />
        <div className="flex justify-between py-1">
          <span className="text-muted-foreground">Launch Date</span>
          <span className="font-medium">{coinData.launchDate}</span>
        </div>
        <Separator />
        <div className="flex justify-between py-1">
          <span className="text-muted-foreground">All Time High</span>
          <span className="font-medium">${coinData.allTimeHigh.toFixed(coinData.allTimeHigh < 0.001 ? 8 : 2)}</span>
        </div>
        <Separator />
        <div className="flex justify-between py-1">
          <span className="text-muted-foreground">All Time Low</span>
          <span className="font-medium">${coinData.allTimeLow.toFixed(coinData.allTimeLow < 0.001 ? 8 : 2)}</span>
        </div>
      </CardContent>
    </Card>
  )
}
