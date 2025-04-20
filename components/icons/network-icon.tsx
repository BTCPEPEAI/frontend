"use client"
import { cn } from "@/lib/utils"

interface NetworkIconProps {
  network: string
  size?: "sm" | "md" | "lg"
  className?: string
}

export function NetworkIcon({ network, size = "md", className }: NetworkIconProps) {
  const sizeMap = {
    sm: "w-4 h-4",
    md: "w-5 h-5",
    lg: "w-8 h-8",
  }

  const networkIcons: Record<string, string> = {
    bnb: "🟨", // Yellow square for BNB
    eth: "🟦", // Blue square for Ethereum
    sol: "🟪", // Purple square for Solana
    trx: "🟥", // Red square for Tron
    matic: "🟩", // Green square for Polygon
  }

  // In a real implementation, you would use actual network logos
  return (
    <div className={cn(sizeMap[size], "flex items-center justify-center rounded-full", className)}>
      {networkIcons[network] || "🌐"}
    </div>
  )
}
