"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"

interface CoinChartProps {
  address: string
}

export function CoinChart({ address }: CoinChartProps) {
  const [timeframe, setTimeframe] = useState("24h")
  const [chartType, setChartType] = useState<"candle" | "line">("candle")
  const [loading, setLoading] = useState(true)

  // Simulate loading TradingView widget
  useEffect(() => {
    setLoading(true)
    const timer = setTimeout(() => {
      setLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [timeframe, chartType])

  // Load TradingView widget
  useEffect(() => {
    if (typeof window !== "undefined" && !loading) {
      const script = document.createElement("script")
      script.src = "https://s3.tradingview.com/tv.js"
      script.async = true
      script.onload = () => {
        if (typeof window.TradingView !== "undefined") {
          new window.TradingView.widget({
            autosize: true,
            symbol: `BINANCE:BTCUSDT`,
            interval: timeframe === "24h" ? "60" : timeframe === "7d" ? "240" : timeframe === "30d" ? "D" : "W",
            timezone: "Etc/UTC",
            theme: "dark",
            style: chartType === "candle" ? "1" : "2",
            locale: "en",
            toolbar_bg: "#f1f3f6",
            enable_publishing: false,
            hide_top_toolbar: false,
            hide_legend: false,
            save_image: false,
            container_id: "tradingview_chart",
          })
        }
      }
      document.head.appendChild(script)

      return () => {
        document.head.removeChild(script)
      }
    }
  }, [address, timeframe, chartType, loading])

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Price Chart</CardTitle>
        <div className="flex items-center gap-4">
          <div className="flex items-center">
            <Button
              variant={chartType === "candle" ? "default" : "outline"}
              size="sm"
              onClick={() => setChartType("candle")}
              className="rounded-r-none"
            >
              Candle
            </Button>
            <Button
              variant={chartType === "line" ? "default" : "outline"}
              size="sm"
              onClick={() => setChartType("line")}
              className="rounded-l-none"
            >
              Line
            </Button>
          </div>
          <Tabs defaultValue="24h" value={timeframe} onValueChange={setTimeframe}>
            <TabsList>
              <TabsTrigger value="24h">24h</TabsTrigger>
              <TabsTrigger value="7d">7d</TabsTrigger>
              <TabsTrigger value="30d">30d</TabsTrigger>
              <TabsTrigger value="90d">90d</TabsTrigger>
              <TabsTrigger value="1y">1y</TabsTrigger>
              <TabsTrigger value="all">All</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </CardHeader>
      <CardContent>
        {loading ? <Skeleton className="h-[400px] w-full" /> : <div id="tradingview_chart" className="h-[400px]"></div>}
      </CardContent>
    </Card>
  )
}
