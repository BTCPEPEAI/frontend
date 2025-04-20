import { Star } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import type { CoinData } from "@/types/common"

interface CoinWatchlistCounterProps {
  coinData: CoinData
  className?: string
}

export function CoinWatchlistCounter({ coinData, className = "" }: CoinWatchlistCounterProps) {
  // Generate a random but consistent watchlist count based on the coin address
  const getWatchlistCount = (address: string) => {
    // Use the first 8 characters of the address as a seed
    const seed = Number.parseInt(address.slice(2, 10), 16)
    return seed % 10000
  }

  const watchlistCount = getWatchlistCount(coinData.address)

  // Only show if there are watchlists
  if (watchlistCount < 10) {
    return null
  }

  // Format the count
  const formatCount = (count: number) => {
    if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}K`
    }
    return count.toString()
  }

  return (
    <Badge variant="outline" className={`bg-yellow-500/10 text-yellow-500 border-yellow-500/20 ${className}`}>
      <Star className="h-3 w-3 mr-1 fill-yellow-500 text-yellow-500" />
      {formatCount(watchlistCount)}
    </Badge>
  )
}
