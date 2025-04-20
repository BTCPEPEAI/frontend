import { Flame } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import type { CoinData } from "@/types/common"

interface HotFireBadgeProps {
  coinData: CoinData
  className?: string
  size?: "sm" | "md" | "lg"
}

export function HotFireBadge({ coinData, className = "", size = "md" }: HotFireBadgeProps) {
  // Only show for trending coins
  if (!coinData.trafficCount || coinData.trafficCount < 500000) {
    return null
  }

  const sizeClasses = {
    sm: "text-xs py-0 px-1.5",
    md: "text-xs py-0.5 px-2",
    lg: "text-sm py-1 px-2.5",
  }

  return (
    <Badge
      variant="outline"
      className={`bg-gradient-to-r from-orange-500/20 to-red-500/20 text-orange-500 border-orange-500/20 ${sizeClasses[size]} ${className}`}
    >
      <Flame className="h-3 w-3 mr-1 text-orange-500" />
      Hot
    </Badge>
  )
}
