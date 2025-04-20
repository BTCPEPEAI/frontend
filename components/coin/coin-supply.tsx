"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ExternalLink, ShieldCheck, ShieldAlert } from "lucide-react"
import { Progress } from "@/components/ui/progress"
import type { CoinData } from "@/types/common"
import { Skeleton } from "@/components/ui/skeleton"
import { getDexUrl, getLockUrl } from "@/lib/api"

interface CoinSupplyProps {
  coinData: CoinData | null
  loading: boolean
}

export function CoinSupply({ coinData, loading }: CoinSupplyProps) {
  if (loading) {
    return (
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Supply Distribution</CardTitle>
          <Skeleton className="w-20 h-5" />
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <Skeleton className="w-20 h-4" />
              <Skeleton className="w-24 h-4" />
            </div>
            <Skeleton className="w-full h-2" />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <Skeleton className="w-20 h-4" />
              <Skeleton className="w-24 h-4" />
            </div>
            <Skeleton className="w-full h-2" />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <Skeleton className="w-20 h-4" />
              <Skeleton className="w-24 h-4" />
            </div>
            <Skeleton className="w-full h-2" />
          </div>

          <div className="pt-2 flex flex-col gap-2">
            <Skeleton className="w-full h-9" />
            <Skeleton className="w-full h-9" />
          </div>
        </CardContent>
      </Card>
    )
  }

  if (!coinData) return null

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Supply Distribution</CardTitle>
        {coinData.isLiquidityLocked ? (
          <div className="flex items-center text-green-500">
            <ShieldCheck className="h-4 w-4 mr-1" />
            <span className="text-xs">Verified</span>
          </div>
        ) : (
          <div className="flex items-center text-yellow-500">
            <ShieldAlert className="h-4 w-4 mr-1" />
            <span className="text-xs">Unverified</span>
          </div>
        )}
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Circulating</span>
            <span>
              {coinData.circulatingSupply.toLocaleString()} ({coinData.percentCirculating}%)
            </span>
          </div>
          <Progress value={coinData.percentCirculating} className="h-2" />
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Burned</span>
            <span>
              {coinData.burnedSupply.toLocaleString()} ({coinData.percentBurned}%)
            </span>
          </div>
          <Progress value={coinData.percentBurned} className="h-2" />
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Locked</span>
            <span>
              {coinData.lockedSupply.toLocaleString()} ({coinData.percentLocked}%)
            </span>
          </div>
          <Progress value={coinData.percentLocked} className="h-2" />
        </div>

        <div className="pt-2 flex flex-col gap-2">
          <Button variant="outline" size="sm" className="justify-start" asChild>
            <a href={getDexUrl(coinData.network, coinData.address)} target="_blank" rel="noopener noreferrer">
              <ExternalLink className="mr-2 h-4 w-4" />
              View Liquidity Pool
            </a>
          </Button>
          {coinData.isLiquidityLocked ? (
            <Button variant="outline" size="sm" className="justify-start" asChild>
              <a href={getLockUrl(coinData.lockPlatform, coinData.address)} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="mr-2 h-4 w-4" />
                View Token Lock ({coinData.lockPlatform})
              </a>
            </Button>
          ) : (
            <Button variant="outline" size="sm" className="justify-start text-yellow-500" disabled>
              <ShieldAlert className="mr-2 h-4 w-4" />
              No Token Lock Detected
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
