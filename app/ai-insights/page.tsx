"use client"

import { useState } from "react"
import { MainLayout } from "@/components/layouts/main-layout"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BrainCircuit, Search, TrendingUp, BarChart3, Sparkles, RefreshCw } from "lucide-react"
import { AIInsights } from "@/components/ai-insights"
import { CoinTable } from "@/components/coin-table"
import type { CoinData } from "@/types/common"

export default function AIInsightsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [searchResults, setSearchResults] = useState<CoinData[]>([])
  const [selectedCoin, setSelectedCoin] = useState<CoinData | null>(null)
  const [loading, setLoading] = useState(false)
  const [activeTab, setActiveTab] = useState("market")

  const handleSearch = async () => {
    if (!searchQuery) return

    setLoading(true)

    try {
      // In a real app, this would be an API call
      // For demo, we'll simulate a delay and return mock data
      await new Promise((resolve) => setTimeout(resolve, 1000))

      const mockCoin: CoinData = {
        name: searchQuery,
        symbol: searchQuery.toUpperCase().substring(0, 4),
        address: `0x${Math.random().toString(16).substring(2, 42)}`,
        network: "eth",
        pair: `${searchQuery.toUpperCase().substring(0, 4)}/USDT`,
        price: Math.random() * 100,
        change24h: Math.random() * 20 - 10,
        volume: Math.random() * 1000000,
        liquidity: Math.random() * 500000,
        totalSupply: Math.random() * 1000000000,
        circulatingSupply: Math.random() * 800000000,
        burnedSupply: Math.random() * 100000000,
        lockedSupply: Math.random() * 100000000,
        percentCirculating: 80,
        percentBurned: 10,
        percentLocked: 10,
        description: `${searchQuery} is a cryptocurrency token.`,
        website: `https://${searchQuery.toLowerCase()}.com`,
        twitter: `https://twitter.com/${searchQuery.toLowerCase()}`,
        telegram: `https://t.me/${searchQuery.toLowerCase()}`,
        discord: `https://discord.gg/${searchQuery.toLowerCase()}`,
        github: `https://github.com/${searchQuery.toLowerCase()}`,
        trustVotes: Math.floor(Math.random() * 1000) + 100,
        distrustVotes: Math.floor(Math.random() * 200) + 10,
        totalVotes: Math.floor(Math.random() * 1200) + 110,
        trustPercentage: 75,
        distrustPercentage: 25,
        isLiquidityLocked: Math.random() > 0.5,
        lockPlatform: "PinkSale",
        lockDuration: "6 months",
        lockAmount: "$500,000",
        launchDate: new Date().toISOString().split("T")[0],
        allTimeHigh: Math.random() * 200,
        allTimeLow: Math.random() * 50,
        hasBanner: false,
        hasLogo: false,
      }

      setSearchResults([mockCoin])
      setSelectedCoin(mockCoin)
    } catch (error) {
      console.error("Error searching:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col items-center text-center mb-8">
          <div className="inline-flex items-center justify-center p-2 bg-brand-blue/10 rounded-full mb-4">
            <BrainCircuit className="h-8 w-8 text-brand-blue" />
          </div>
          <h1 className="text-4xl font-bold font-heading mb-2">
            <span>DEXPRICE </span>
            <span className="ai-gradient-text">AI Insights</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Leverage advanced AI to analyze cryptocurrency markets, predict trends, and make data-driven decisions
          </p>
        </div>

        <Card className="mb-8">
          <CardContent className="pt-6">
            <div className="flex gap-2 max-w-2xl mx-auto">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search for a token by name or address..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                  onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                />
              </div>
              <Button
                onClick={handleSearch}
                disabled={loading || !searchQuery}
                className="bg-gradient-to-r from-brand-blue to-brand-green hover:opacity-90 transition-opacity"
              >
                {loading ? <RefreshCw className="mr-2 h-4 w-4 animate-spin" /> : <Sparkles className="mr-2 h-4 w-4" />}
                Analyze
              </Button>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="market" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="w-full max-w-md mx-auto grid grid-cols-3 mb-8">
            <TabsTrigger value="market">
              <BarChart3 className="mr-2 h-4 w-4" />
              Market Analysis
            </TabsTrigger>
            <TabsTrigger value="trending">
              <TrendingUp className="mr-2 h-4 w-4" />
              Trending Insights
            </TabsTrigger>
            <TabsTrigger value="custom">
              <BrainCircuit className="mr-2 h-4 w-4" />
              Custom Analysis
            </TabsTrigger>
          </TabsList>

          <TabsContent value="market">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <Card className="ai-insight-card">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <BarChart3 className="mr-2 h-5 w-5 text-brand-blue" />
                    Market Overview
                  </CardTitle>
                  <CardDescription>AI-powered market sentiment analysis</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-3 rounded-md bg-brand-blue/10 border border-brand-blue/20">
                      <p className="font-medium">
                        The market is currently showing <span className="text-brand-green font-semibold">bullish</span>{" "}
                        indicators with moderate volatility.
                      </p>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="p-3 rounded-md border">
                        <p className="text-sm font-medium">BTC Dominance</p>
                        <p className="text-2xl font-bold">42.8%</p>
                        <p className="text-xs text-brand-green">+1.2% (24h)</p>
                      </div>
                      <div className="p-3 rounded-md border">
                        <p className="text-sm font-medium">Market Sentiment</p>
                        <p className="text-2xl font-bold">Greed</p>
                        <p className="text-xs text-brand-green">Score: 72/100</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="ai-insight-card">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <TrendingUp className="mr-2 h-5 w-5 text-brand-blue" />
                    Top Movers
                  </CardTitle>
                  <CardDescription>Tokens with significant price action</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <div key={i} className="flex justify-between items-center p-2 border-b last:border-0">
                        <div className="flex items-center">
                          <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center mr-2">
                            {String.fromCharCode(65 + i)}
                          </div>
                          <div>
                            <p className="font-medium">Token {String.fromCharCode(65 + i)}</p>
                            <p className="text-xs text-muted-foreground">#{i + 1} Trending</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-medium text-brand-green">+{(Math.random() * 30 + 10).toFixed(2)}%</p>
                          <p className="text-xs text-muted-foreground">24h</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="ai-insight-card">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <BrainCircuit className="mr-2 h-5 w-5 text-brand-blue" />
                    AI Predictions
                  </CardTitle>
                  <CardDescription>24-hour market forecasts</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-3 rounded-md bg-brand-blue/10 border border-brand-blue/20">
                      <p className="font-medium">
                        AI predicts a <span className="text-brand-green font-semibold">3.2% increase</span> in overall
                        market cap in the next 24 hours.
                      </p>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span>BTC</span>
                        <span className="text-brand-green">+2.1%</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>ETH</span>
                        <span className="text-brand-green">+4.3%</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>BNB</span>
                        <span className="text-brand-green">+1.8%</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>SOL</span>
                        <span className="text-red-500">-0.7%</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="mb-8">
              <CoinTable filter="trending" limit={10} showCharts={true} showAudit={true} showMarketCap={true} />
            </div>
          </TabsContent>

          <TabsContent value="trending">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <Card className="ai-insight-card col-span-1 md:col-span-2">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <TrendingUp className="mr-2 h-5 w-5 text-brand-blue" />
                    Trending Analysis
                  </CardTitle>
                  <CardDescription>AI-powered insights on trending tokens</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="p-4 rounded-md bg-brand-blue/10 border border-brand-blue/20">
                    <p className="mb-4">
                      Based on current market data, social media sentiment, and on-chain metrics, DEXPRICE AI has
                      identified the following trends:
                    </p>
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <span className="text-brand-blue mr-2">•</span>
                        <span>
                          Meme tokens are showing increased activity with 43% higher trading volume in the last 24 hours
                        </span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-brand-blue mr-2">•</span>
                        <span>DeFi protocols are experiencing renewed interest with a 28% increase in TVL</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-brand-blue mr-2">•</span>
                        <span>Gaming and metaverse tokens are underperforming with an average decline of 12%</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-brand-blue mr-2">•</span>
                        <span>Layer-2 solutions are gaining traction with increased adoption metrics</span>
                      </li>
                    </ul>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Top Trending by Volume</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <div key={i} className="flex justify-between items-center p-2 border-b last:border-0">
                        <div className="flex items-center">
                          <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center mr-2">
                            {String.fromCharCode(65 + i)}
                          </div>
                          <div>
                            <p className="font-medium">Token {String.fromCharCode(65 + i)}</p>
                            <p className="text-xs text-muted-foreground">
                              24h Vol: ${(Math.random() * 10 + 1).toFixed(2)}M
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p
                            className={
                              Math.random() > 0.5 ? "font-medium text-brand-green" : "font-medium text-red-500"
                            }
                          >
                            {Math.random() > 0.5 ? "+" : "-"}
                            {(Math.random() * 20).toFixed(2)}%
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Social Media Sentiment</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <div key={i} className="flex justify-between items-center p-2 border-b last:border-0">
                        <div className="flex items-center">
                          <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center mr-2">
                            {String.fromCharCode(65 + i)}
                          </div>
                          <div>
                            <p className="font-medium">Token {String.fromCharCode(65 + i)}</p>
                            <p className="text-xs text-muted-foreground">
                              Mentions: {Math.floor(Math.random() * 10000) + 1000}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">
                            {["Bullish", "Very Bullish", "Neutral", "Bearish", "Mixed"][Math.floor(Math.random() * 5)]}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="custom">
            <div className="grid grid-cols-1 gap-6">
              {selectedCoin ? (
                <AIInsights coinData={selectedCoin} loading={loading} />
              ) : (
                <Card>
                  <CardHeader>
                    <CardTitle>Custom Token Analysis</CardTitle>
                    <CardDescription>
                      Search for a specific token above to get detailed AI insights and analysis
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="flex flex-col items-center justify-center py-12">
                    <BrainCircuit className="h-16 w-16 text-muted-foreground mb-4" />
                    <p className="text-center text-muted-foreground max-w-md">
                      Enter a token name or address in the search bar above and click "Analyze" to get AI-powered
                      insights for that specific token.
                    </p>
                  </CardContent>
                </Card>
              )}

              {searchResults.length > 0 && (
                <div className="mt-4">
                  <h3 className="text-lg font-medium mb-4">Search Results</h3>
                  <CoinTable coins={searchResults} showCharts={true} showAudit={true} showMarketCap={true} />
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  )
}
