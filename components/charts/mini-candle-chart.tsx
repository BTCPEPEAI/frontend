"use client"

import { useEffect, useRef } from "react"

interface CandleData {
  open: number
  high: number
  low: number
  close: number
}

interface MiniCandleChartProps {
  data: CandleData[]
  positive?: boolean
}

export function MiniCandleChart({ data, positive = true }: MiniCandleChartProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (!canvasRef.current) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Set dimensions
    const width = canvas.width
    const height = canvas.height
    const candleWidth = (width / data.length) * 0.8
    const spacing = (width / data.length) * 0.2

    // Find min and max values for scaling
    let minValue = Math.min(...data.map((d) => d.low))
    let maxValue = Math.max(...data.map((d) => d.high))
    const padding = (maxValue - minValue) * 0.1
    minValue -= padding
    maxValue += padding

    // Scale function
    const scaleY = (value: number) => {
      return height - ((value - minValue) / (maxValue - minValue)) * height
    }

    // Draw candles
    data.forEach((candle, i) => {
      const x = i * (candleWidth + spacing) + spacing / 2

      // Draw wick
      ctx.beginPath()
      ctx.moveTo(x + candleWidth / 2, scaleY(candle.high))
      ctx.lineTo(x + candleWidth / 2, scaleY(candle.low))
      ctx.strokeStyle = positive ? "rgba(34, 197, 94, 0.5)" : "rgba(239, 68, 68, 0.5)"
      ctx.stroke()

      // Draw body
      const candleHeight = Math.abs(scaleY(candle.open) - scaleY(candle.close))
      const y = candle.open > candle.close ? scaleY(candle.close) : scaleY(candle.open)

      ctx.fillStyle =
        candle.open > candle.close
          ? "rgba(239, 68, 68, 0.8)" // Red for bearish
          : "rgba(34, 197, 94, 0.8)" // Green for bullish

      ctx.fillRect(x, y, candleWidth, candleHeight > 1 ? candleHeight : 1)
    })
  }, [data, positive])

  return <canvas ref={canvasRef} width={100} height={60} className="w-full h-full" />
}
