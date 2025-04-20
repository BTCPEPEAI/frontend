"use client"

import { useState, useEffect } from "react"
import { Area, AreaChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart } from "recharts"

interface CandleChartProps {
  address: string
  timeframe: string
  type: "candle" | "line"
}

// Generate mock chart data
const generateChartData = (days: number, trend: "up" | "down" | "volatile") => {
  const data = []
  const now = new Date()

  let baseValue = 100
  const volatility = trend === "volatile" ? 0.1 : 0.03
  const trendFactor = trend === "up" ? 0.01 : trend === "down" ? -0.01 : 0

  for (let i = days; i >= 0; i--) {
    const date = new Date(now)
    date.setDate(date.getDate() - i)

    // Add some randomness to the price
    const change = (Math.random() - 0.5) * volatility + trendFactor
    baseValue = baseValue * (1 + change)

    const open = baseValue
    const close = baseValue * (1 + (Math.random() - 0.5) * 0.02)
    const high = Math.max(open, close) * (1 + Math.random() * 0.01)
    const low = Math.min(open, close) * (1 - Math.random() * 0.01)
    const volume = Math.random() * 1000000

    data.push({
      date: date.toISOString().split("T")[0],
      value: baseValue,
      open,
      high,
      low,
      close,
      volume,
    })
  }

  return data
}

export function CandleChart({ address, timeframe, type }: CandleChartProps) {
  const [chartData, setChartData] = useState<any[]>([])

  useEffect(() => {
    // In a real implementation, you would fetch chart data from an API
    let days = 1
    let trend: "up" | "down" | "volatile" = "volatile"

    switch (timeframe) {
      case "24h":
        days = 1
        trend = "down"
        break
      case "7d":
        days = 7
        trend = "volatile"
        break
      case "30d":
        days = 30
        trend = "up"
        break
      case "90d":
        days = 90
        trend = "up"
        break
      case "1y":
        days = 365
        trend = "up"
        break
      case "all":
        days = 730
        trend = "up"
        break
    }

    setChartData(generateChartData(days, trend))
  }, [timeframe, address])

  const formatYAxis = (value: number) => {
    return `$${value.toFixed(2)}`
  }

  // Custom tooltip for candle chart
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-background border rounded-md p-3 shadow-md">
          <p className="font-medium">{label}</p>
          <p className="text-sm">Open: ${payload[0].payload.open.toFixed(2)}</p>
          <p className="text-sm">High: ${payload[0].payload.high.toFixed(2)}</p>
          <p className="text-sm">Low: ${payload[0].payload.low.toFixed(2)}</p>
          <p className="text-sm">Close: ${payload[0].payload.close.toFixed(2)}</p>
          <p className="text-sm">Volume: ${payload[0].payload.volume.toLocaleString()}</p>
        </div>
      )
    }
    return null
  }

  // Render candle chart
  if (type === "candle") {
    return (
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="date"
            tickFormatter={(value) => {
              if (timeframe === "24h") {
                return new Date(value).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
              }
              return value
            }}
          />
          <YAxis tickFormatter={formatYAxis} domain={["auto", "auto"]} />
          <Tooltip content={<CustomTooltip />} />
          <Bar dataKey="high" fill="transparent" stroke="transparent" />
          <Bar dataKey="low" fill="transparent" stroke="transparent" />
          <Bar dataKey="open" fill="transparent" stroke="transparent" />
          <Bar
            dataKey="close"
            shape={(props: any) => {
              const { x, y, width, height, open, close, low, high } = props

              const isPositive = close >= open
              const color = isPositive ? "rgba(34, 197, 94, 1)" : "rgba(239, 68, 68, 1)"
              const wickY1 = Math.min(y, y + height)
              const wickY2 = Math.max(y, y + height)

              return (
                <g>
                  {/* Wick */}
                  <line x1={x + width / 2} y1={low} x2={x + width / 2} y2={high} stroke={color} strokeWidth={1} />
                  {/* Body */}
                  <rect
                    x={x}
                    y={isPositive ? close : open}
                    width={width}
                    height={Math.abs(open - close)}
                    fill={color}
                    stroke="none"
                  />
                </g>
              )
            }}
          />
        </BarChart>
      </ResponsiveContainer>
    )
  }

  // Render line chart
  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart
        data={chartData}
        margin={{
          top: 10,
          right: 30,
          left: 0,
          bottom: 0,
        }}
      >
        <defs>
          <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.8} />
            <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey="date"
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => {
            if (timeframe === "24h") {
              return new Date(value).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
            }
            return value
          }}
        />
        <YAxis tickFormatter={formatYAxis} axisLine={false} tickLine={false} domain={["auto", "auto"]} />
        <Tooltip
          formatter={(value: number) => [`$${value.toFixed(2)}`, "Price"]}
          labelFormatter={(label) => {
            if (timeframe === "24h") {
              return new Date(label).toLocaleString()
            }
            return new Date(label).toLocaleDateString()
          }}
        />
        <Area type="monotone" dataKey="value" stroke="hsl(var(--primary))" fillOpacity={1} fill="url(#colorValue)" />
      </AreaChart>
    </ResponsiveContainer>
  )
}
