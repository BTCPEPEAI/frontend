"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"

// Mock data - would be replaced with API calls
const chains = [
  { id: "all", name: "All DEXes", icon: "🌐" },
  { id: "pancakeswap", name: "PancakeSwap", icon: "🥞" },
  { id: "uniswapv3-eth", name: "UniswapV3", icon: "🦄" },
  { id: "uniswapv3-arb", name: "UniswapV3", icon: "🦄" },
  { id: "apeswap", name: "ApeSwap", icon: "🦍" },
  { id: "uniswap", name: "Uniswap", icon: "🦄" },
  { id: "sushiswap", name: "SushiSwap", icon: "🍣" },
  { id: "pancakeswapv3", name: "PancakeSwapV3", icon: "🥞" },
  { id: "biswap", name: "Biswap", icon: "🔄" },
  { id: "sushiswap-alt", name: "SushiSwap", icon: "🍣" },
  { id: "raydium", name: "RaydiumAMM", icon: "🌊" },
]

export function SupportedChains() {
  const [selectedChain, setSelectedChain] = useState("all")

  return (
    <Card>
      <CardContent className="p-4">
        <ScrollArea className="w-full whitespace-nowrap">
          <div className="flex space-x-2">
            {chains.map((chain) => (
              <Button
                key={chain.id}
                variant={selectedChain === chain.id ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedChain(chain.id)}
                className="flex-shrink-0"
              >
                <span className="mr-1">{chain.icon}</span> {chain.name}
              </Button>
            ))}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </CardContent>
    </Card>
  )
}
