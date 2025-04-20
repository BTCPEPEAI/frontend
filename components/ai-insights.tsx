"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { BrainCircuit, TrendingUp, TrendingDown, AlertTriangle, Info, RefreshCw } from "lucide-react"
import type { CoinData } from "@/types/common"
import { Skeleton } from "@/components/ui/skeleton"

interface AIInsightsProps {
  coinData: CoinData | null
  loading?: boolean
  className?: string
}

export function AIInsights({ coinData, loading = false, className = "" }: AIInsightsProps) {
  const [isGenerating, setIsGenerating] = useState(false)
  const [insights, setInsights] = useState<{
    summary: string
    sentiment: "bullish" | "bearish" | "neutral"
    riskLevel: "low" | "medium" | "high"
    keyPoints: string[]
    prediction: string
  } | null>(null)

  const generateInsights = () => {
    if (!coinData) return

    setIsGenerating(true)

    // Simulate AI processing delay
    setTimeout(() => {
      // Generate mock insights based on coin data
      const change24h = coinData.change24h || 0
      const volume = coinData.volume || 0
      const liquidity = coinData.liquidity || 0
      const trustPercentage = coinData.trustPercentage || 0

      // Determine sentiment based on metrics
      let sentiment: "bullish" | "bearish" | "neutral" = "neutral"
      if (change24h > 5 && volume > 500000) {
        sentiment = "bullish"
      } else if (change24h < -5) {
        sentiment = "bearish"
      }

      // Determine risk level
      let riskLevel: "low" | "medium" | "high" = "medium"
      if (liquidity > 1000000 && trustPercentage > 80) {
        riskLevel = "low"
      } else if (liquidity < 100000 || trustPercentage < 50) {
        riskLevel = "high"
      }

      // Generate key points
      const keyPoints = []

      if (change24h > 0) {
        keyPoints.push(`Positive price movement of ${change24h.toFixed(2)}% in the last 24 hours.`)
      } else {
        keyPoints.push(`Negative price movement of ${Math.abs(change24h).toFixed(2)}% in the last 24 hours.`)
      }

      if (volume > 1000000) {
        keyPoints.push(`High trading volume of $${(volume / 1000000).toFixed(2)}M indicates strong market interest.`)
      } else if (volume < 100000) {
        keyPoints.push(`Low trading volume of $${(volume / 1000).toFixed(2)}K suggests limited market activity.`)
      }

      if (liquidity > 1000000) {
        keyPoints.push(`Strong liquidity pool of $${(liquidity / 1000000).toFixed(2)}M reduces slippage risk.`)
      } else {
        keyPoints.push(`Limited liquidity of $${(liquidity / 1000).toFixed(2)}K may lead to higher slippage.`)
      }

      if (trustPercentage > 70) {
        keyPoints.push(`High community trust score of ${trustPercentage}% indicates positive sentiment.`)
      } else {
        keyPoints.push(`Lower community trust score of ${trustPercentage}% suggests caution.`)
      }

      // Generate prediction
      let prediction = ""
      if (sentiment === "bullish") {
        prediction = `Based on current metrics, ${coinData.symbol} shows potential for short-term growth. Consider monitoring closely for entry points.`
      } else if (sentiment === "bearish") {
        prediction = `Current indicators suggest ${coinData.symbol} may experience downward pressure in the near term. Exercise caution.`
      } else {
        prediction = `${coinData.symbol} is showing mixed signals. Consider waiting for clearer market direction before making significant moves.`
      }

      // Generate summary
      const summary = `${coinData.symbol} currently displays ${sentiment} indicators with a ${riskLevel} risk profile. ${
        sentiment === "bullish"
          ? "Technical analysis suggests positive momentum."
          : sentiment === "bearish"
            ? "Market signals indicate potential downward pressure."
            : "Market signals are currently mixed."
      }`

      setInsights({
        summary,
        sentiment,
        riskLevel,
        keyPoints,
        prediction,
      })

      setIsGenerating(false)
    }, 2000)
  }

  if (loading) {
    return (
      <Card className={`ai-insight-card ${className}`}>
        <CardHeader>
          <CardTitle className="flex items-center">
            <BrainCircuit className="mr-2 h-5 w-5 text-brand-blue" />
            <span className="ai-gradient-text">AI Insights</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Skeleton className="h-[200px] w-full" />
        </CardContent>
      </Card>
    )
  }

  if (!coinData) {
    return null
  }

  return (
    <Card className={`ai-insight-card ${className}`}>
      <CardHeader>
        <CardTitle className="flex items-center">
          <BrainCircuit className="mr-2 h-5 w-5 text-brand-blue" />
          <span className="ai-gradient-text">AI Insights</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {!insights ? (
          <div className="flex flex-col items-center justify-center py-6">
            <BrainCircuit className="h-12 w-12 text-brand-blue mb-4" />
            <p className="text-center mb-4">Generate AI-powered insights and analysis for {coinData.symbol}</p>
            <Button
              onClick={generateInsights}
              disabled={isGenerating}
              className="bg-gradient-to-r from-brand-blue to-brand-green hover:opacity-90 transition-opacity"
            >
              {isGenerating ? (
                <>
                  <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                  Analyzing...
                </>
              ) : (
                <>
                  <BrainCircuit className="mr-2 h-4 w-4" />
                  Generate Insights
                </>
              )}
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="p-3 rounded-md bg-brand-blue/10 border border-brand-blue/20">
              <p className="font-medium">{insights.summary}</p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="flex items-center p-2 rounded-md bg-background border">
                <div
                  className={`p-1.5 rounded-full mr-2 ${
                    insights.sentiment === "bullish"
                      ? "bg-brand-green/20 text-brand-green"
                      : insights.sentiment === "bearish"
                        ? "bg-red-500/20 text-red-500"
                        : "bg-gray-500/20 text-gray-500"
                  }`}
                >
                  {insights.sentiment === "bullish" ? (
                    <TrendingUp className="h-4 w-4" />
                  ) : insights.sentiment === "bearish" ? (
                    <TrendingDown className="h-4 w-4" />
                  ) : (
                    <Info className="h-4 w-4" />
                  )}
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Market Sentiment</p>
                  <p className="font-medium capitalize">{insights.sentiment}</p>
                </div>
              </div>

              <div className="flex items-center p-2 rounded-md bg-background border">
                <div
                  className={`p-1.5 rounded-full mr-2 ${
                    insights.riskLevel === "low"
                      ? "bg-brand-green/20 text-brand-green"
                      : insights.riskLevel === "high"
                        ? "bg-red-500/20 text-red-500"
                        : "bg-brand-amber/20 text-brand-amber"
                  }`}
                >
                  <AlertTriangle className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Risk Level</p>
                  <p className="font-medium capitalize">{insights.riskLevel}</p>
                </div>
              </div>
            </div>

            <div>
              <h4 className="text-sm font-medium mb-2">Key Points:</h4>
              <ul className="space-y-1">
                {insights.keyPoints.map((point, index) => (
                  <li key={index} className="text-sm flex">
                    <span className="text-brand-blue mr-2">•</span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-3 rounded-md bg-brand-blue/5 border border-brand-blue/10">
              <h4 className="text-sm font-medium mb-1 ai-gradient-text">AI Prediction:</h4>
              <p className="text-sm">{insights.prediction}</p>
            </div>

            <div className="flex justify-between items-center pt-2">
              <p className="text-xs text-muted-foreground">Last updated: {new Date().toLocaleTimeString()}</p>
              <Button
                variant="outline"
                size="sm"
                onClick={generateInsights}
                disabled={isGenerating}
                className="text-xs"
              >
                {isGenerating ? <RefreshCw className="h-3 w-3 animate-spin" /> : <RefreshCw className="h-3 w-3" />}
                <span className="ml-1">Refresh</span>
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
