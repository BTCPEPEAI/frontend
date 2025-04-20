"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { ArrowUp, ArrowDown, ExternalLink, Star } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { NetworkIcon } from "@/components/network-icon"
import type { CoinData } from "@/types/common"
import { Skeleton } from "@/components/ui/skeleton"
import { getDexUrl } from "@/lib/api"
import { useWalletStore } from "@/lib/stores/wallet-store"
import { useToast } from "@/components/ui/use-toast"

interface CoinHeaderProps {
  coinData: CoinData | null
  loading: boolean
}

export function CoinHeader({ coinData, loading }: CoinHeaderProps) {
  const router = useRouter()
  const { toast } = useToast()
  const { isConnected, addToWatchlist, removeFromWatchlist, isInWatchlist } = useWalletStore()
  const [inWatchlist, setInWatchlist] = useState(false)

  useEffect(() => {
    if (coinData && isConnected) {
      setInWatchlist(isInWatchlist(coinData.address))
    }
  }, [coinData, isConnected, isInWatchlist])

  const toggleWatchlist = () => {
    if (!isConnected) {
      toast({
        title: "Wallet not connected",
        description: "Please connect your wallet to add coins to your watchlist",
        variant: "destructive",
      })
      return
    }

    if (!coinData) return

    if (inWatchlist) {
      removeFromWatchlist(coinData.address)
      setInWatchlist(false)
      toast({
        title: "Removed from watchlist",
        description: `${coinData.name} has been removed from your watchlist`,
      })
    } else {
      addToWatchlist(coinData.address)
      setInWatchlist(true)
      toast({
        title: "Added to watchlist",
        description: `${coinData.name} has been added to your watchlist`,
      })
    }
  }

  const handleAddInformation = () => {
    if (coinData) {
      router.push(`/submit-info/${coinData.address}`)
    }
  }

  if (loading) {
    return (
      <div className="flex flex-col gap-6">
        {/* Project banner skeleton */}
        <Skeleton className="w-full h-40 rounded-lg" />

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="flex items-center gap-4">
            <Skeleton className="w-16 h-16 rounded-full" />
            <div>
              <Skeleton className="w-48 h-8 mb-2" />
              <Skeleton className="w-64 h-4" />
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div>
              <Skeleton className="w-32 h-8 mb-2" />
              <Skeleton className="w-24 h-4" />
            </div>
            <Skeleton className="w-10 h-10 rounded-md" />
          </div>
        </div>
      </div>
    )
  }

  if (!coinData) return null

  return (
    <div className="flex flex-col gap-6">
      {/* Project banner - would be uploaded by project owner */}
      {coinData.hasBanner ? (
        <div
          className="w-full h-40 rounded-lg bg-cover bg-center flex items-end p-4"
          style={{
            backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.1), rgba(0,0,0,0.7)), url('/placeholder.svg?height=160&width=1200')`,
          }}
        >
          <span className="text-white font-medium">{coinData.name} - Official Banner</span>
        </div>
      ) : (
        <div className="w-full h-40 bg-gradient-to-r from-primary/20 to-primary/5 rounded-lg flex items-center justify-center">
          <span className="text-lg text-muted-foreground">No Project Banner Available</span>
        </div>
      )}

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
            <span className="text-2xl font-bold">{coinData.symbol.charAt(0)}</span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-3xl font-bold">{coinData.name}</h1>
              <Badge variant="outline" className="text-base">
                {coinData.symbol}
              </Badge>
              <Badge variant="secondary">
                <NetworkIcon network={coinData.network} size="sm" className="mr-1" />
                {coinData.network.toUpperCase()}
              </Badge>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
              <span>{coinData.pair}</span>
              <a
                href={getDexUrl(coinData.network, coinData.address)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center hover:text-primary"
              >
                {coinData.address.slice(0, 6)}...{coinData.address.slice(-4)} <ExternalLink className="ml-1 h-3 w-3" />
              </a>
              <Button variant="outline" size="sm" className="ml-2 h-6 text-xs" onClick={handleAddInformation}>
                Add Information
              </Button>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div>
            <div className="text-3xl font-bold">${coinData.price.toFixed(coinData.price < 0.001 ? 8 : 2)}</div>
            <div className={`flex items-center ${coinData.change24h >= 0 ? "text-green-500" : "text-red-500"}`}>
              {coinData.change24h >= 0 ? <ArrowUp className="h-4 w-4 mr-1" /> : <ArrowDown className="h-4 w-4 mr-1" />}
              {Math.abs(coinData.change24h).toFixed(2)}% (24h)
            </div>
          </div>
          <Button
            variant="outline"
            size="icon"
            onClick={toggleWatchlist}
            className={inWatchlist ? "text-yellow-500" : ""}
          >
            <Star className="h-4 w-4" fill={inWatchlist ? "currentColor" : "none"} />
          </Button>
        </div>
      </div>
    </div>
  )
}
