"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowDown, Settings, RefreshCw, Sparkles } from "lucide-react"
import { NetworkIcon } from "@/components/network-icon"
import { Skeleton } from "@/components/ui/skeleton"
import { useWalletStore } from "@/lib/stores/wallet-store"
import { useToast } from "@/components/ui/use-toast"
import type { CoinData } from "@/types/common"

interface CoinSwapBoxProps {
  coinData: CoinData | null
  loading?: boolean
}

export function CoinSwapBox({ coinData, loading = false }: CoinSwapBoxProps) {
  const { isConnected } = useWalletStore()
  const { toast } = useToast()
  const [fromAmount, setFromAmount] = useState("")
  const [toAmount, setToAmount] = useState("")
  const [slippage, setSlippage] = useState("0.5")
  const [showSettings, setShowSettings] = useState(false)
  const [swapping, setSwapping] = useState(false)
  const [useAI, setUseAI] = useState(false)
  const [priceImpact, setPriceImpact] = useState("0.12")
  const [bestRoute, setBestRoute] = useState<string | null>(null)

  // Get the base token based on network
  const getBaseToken = (network?: string) => {
    switch (network) {
      case "eth":
        return "ETH"
      case "bnb":
        return "BNB"
      case "sol":
        return "SOL"
      case "matic":
        return "MATIC"
      case "trx":
        return "TRX"
      default:
        return "ETH"
    }
  }

  // Get DEX name based on network
  const getDexName = (network?: string) => {
    switch (network) {
      case "eth":
        return "Uniswap"
      case "bnb":
        return "PancakeSwap"
      case "sol":
        return "Raydium"
      case "matic":
        return "QuickSwap"
      case "trx":
        return "SunSwap"
      default:
        return "Uniswap"
    }
  }

  // Calculate to amount based on from amount
  useEffect(() => {
    if (!fromAmount || !coinData) return

    const baseAmount = Number.parseFloat(fromAmount)
    if (isNaN(baseAmount)) {
      setToAmount("")
      return
    }

    // Calculate based on current price
    const calculatedAmount = baseAmount / coinData.price
    setToAmount(calculatedAmount.toFixed(6))

    // Calculate price impact
    const impact = (baseAmount / coinData.liquidity) * 100
    setPriceImpact(impact > 0.01 ? impact.toFixed(2) : "0.01")

    // Set best route if AI is enabled
    if (useAI) {
      const dexes = [getDexName(coinData.network), "1inch", "0x Protocol"]

      // Simulate AI finding the best route
      setTimeout(() => {
        setBestRoute(dexes[Math.floor(Math.random() * dexes.length)])
      }, 500)
    } else {
      setBestRoute(null)
    }
  }, [fromAmount, coinData, useAI])

  const handleSwap = () => {
    if (!isConnected) {
      toast({
        title: "Wallet not connected",
        description: "Please connect your wallet to swap tokens",
        variant: "destructive",
      })
      return
    }

    if (!fromAmount || !coinData) return

    setSwapping(true)

    // Simulate swap delay
    setTimeout(() => {
      toast({
        title: "Swap successful",
        description: `Successfully swapped ${fromAmount} ${getBaseToken(coinData.network)} for ${toAmount} ${coinData.symbol}`,
      })
      setSwapping(false)
      setFromAmount("")
      setToAmount("")
    }, 2000)
  }

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Swap</CardTitle>
        </CardHeader>
        <CardContent>
          <Skeleton className="h-[250px] w-full" />
        </CardContent>
      </Card>
    )
  }

  if (!coinData) return null

  const baseToken = getBaseToken(coinData.network)
  const dexName = getDexName(coinData.network)

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="flex items-center">
          <span>Swap on {dexName}</span>
        </CardTitle>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            className={useAI ? "bg-brand-blue/10 border-brand-blue/20 text-brand-blue" : ""}
            onClick={() => setUseAI(!useAI)}
          >
            <Sparkles className="mr-1 h-4 w-4" />
            AI Routing {useAI ? "ON" : "OFF"}
          </Button>
          <Button variant="ghost" size="icon" onClick={() => setShowSettings(!showSettings)}>
            <Settings className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {showSettings && (
          <div className="mb-4 p-3 border rounded-md bg-muted/50">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Slippage Tolerance</span>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className={slippage === "0.1" ? "bg-primary text-primary-foreground" : ""}
                  onClick={() => setSlippage("0.1")}
                >
                  0.1%
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className={slippage === "0.5" ? "bg-primary text-primary-foreground" : ""}
                  onClick={() => setSlippage("0.5")}
                >
                  0.5%
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className={slippage === "1.0" ? "bg-primary text-primary-foreground" : ""}
                  onClick={() => setSlippage("1.0")}
                >
                  1.0%
                </Button>
                <Input
                  value={slippage}
                  onChange={(e) => setSlippage(e.target.value)}
                  className="w-16 h-8 text-center"
                />
                <span className="text-sm">%</span>
              </div>
            </div>
          </div>
        )}

        <div className="space-y-4">
          <div className="p-4 border rounded-md">
            <div className="flex justify-between mb-2">
              <span className="text-sm text-muted-foreground">From</span>
              <span className="text-sm text-muted-foreground">
                Balance: {isConnected ? "1.245" : "0.00"} {baseToken}
              </span>
            </div>
            <div className="flex gap-2">
              <Input
                type="number"
                placeholder="0.0"
                value={fromAmount}
                onChange={(e) => setFromAmount(e.target.value)}
                className="text-lg"
              />
              <Select defaultValue={baseToken}>
                <SelectTrigger className="w-[120px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={baseToken}>
                    <div className="flex items-center">
                      <NetworkIcon network={coinData.network} size="sm" className="mr-2" />
                      {baseToken}
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex justify-center">
            <Button variant="ghost" size="icon" className="rounded-full bg-muted">
              <ArrowDown className="h-4 w-4" />
            </Button>
          </div>

          <div className="p-4 border rounded-md">
            <div className="flex justify-between mb-2">
              <span className="text-sm text-muted-foreground">To</span>
              <span className="text-sm text-muted-foreground">
                Balance: {isConnected ? "0.00" : "0.00"} {coinData.symbol}
              </span>
            </div>
            <div className="flex gap-2">
              <Input
                type="text"
                placeholder="0.0"
                value={toAmount}
                onChange={(e) => setToAmount(e.target.value)}
                className="text-lg"
                readOnly
              />
              <Select defaultValue={coinData.symbol}>
                <SelectTrigger className="w-[120px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={coinData.symbol}>
                    <div className="flex items-center">
                      <div className="w-4 h-4 bg-primary/10 rounded-full flex items-center justify-center mr-2">
                        {coinData.symbol.charAt(0)}
                      </div>
                      {coinData.symbol}
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {useAI && bestRoute && (
            <div className="p-3 rounded-md bg-brand-blue/10 border border-brand-blue/20">
              <div className="flex items-center">
                <Sparkles className="h-4 w-4 text-brand-blue mr-2" />
                <span className="text-sm font-medium">AI Optimal Route:</span>
                <span className="text-sm ml-2">{bestRoute}</span>
              </div>
            </div>
          )}

          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Price</span>
              <span>
                1 {baseToken} = {coinData.price.toFixed(6)} {coinData.symbol}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Price Impact</span>
              <span className={Number.parseFloat(priceImpact) > 5 ? "text-red-500" : ""}>{priceImpact}%</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Fee (0.02%)</span>
              <span>
                {fromAmount ? (Number.parseFloat(fromAmount) * 0.0002).toFixed(6) : "0.00"} {baseToken}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Slippage Tolerance</span>
              <span>{slippage}%</span>
            </div>
          </div>

          <Button
            className="w-full bg-gradient-to-r from-brand-blue to-brand-green hover:opacity-90 transition-opacity"
            disabled={!fromAmount || swapping || !isConnected}
            onClick={handleSwap}
          >
            {swapping ? (
              <>
                <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                Swapping...
              </>
            ) : !isConnected ? (
              "Connect Wallet to Swap"
            ) : (
              "Swap"
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
