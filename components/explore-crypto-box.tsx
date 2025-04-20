"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { CoinTable } from "@/components/coin-table"
import { Button } from "@/components/ui/button"
import { BarChart3, TrendingUp, Clock, DollarSign, Shield, Zap, Building, ArrowUpDown, Flame } from "lucide-react"
import Link from "next/link"

export function ExploreCryptoBox() {
  const [activeCategory, setActiveCategory] = useState("trending")
  const [showAudit, setShowAudit] = useState(false)
  const [showMarketCap, setShowMarketCap] = useState(false)
  const [showDexInfo, setShowDexInfo] = useState(false)
  const [show24hChange, setShow24hChange] = useState(true)
  const [showPoolCreated, setShowPoolCreated] = useState(false)

  return (
    <Card className="explore-crypto-box w-full max-w-none px-4">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Explore Cryptocurrencies</CardTitle>
        <div className="flex gap-2">
          <Button variant={showAudit ? "default" : "outline"} size="sm" onClick={() => setShowAudit(!showAudit)}>
            <Shield className="mr-2 h-4 w-4" />
            Audit
          </Button>
          <Button
            variant={showMarketCap ? "default" : "outline"}
            size="sm"
            onClick={() => setShowMarketCap(!showMarketCap)}
          >
            <DollarSign className="mr-2 h-4 w-4" />
            Market Cap
          </Button>
          <Button variant={showDexInfo ? "default" : "outline"} size="sm" onClick={() => setShowDexInfo(!showDexInfo)}>
            <Building className="mr-2 h-4 w-4" />
            DEX Info
          </Button>
          <Button
            variant={show24hChange ? "default" : "outline"}
            size="sm"
            onClick={() => setShow24hChange(!show24hChange)}
          >
            <ArrowUpDown className="mr-2 h-4 w-4" />
            24h Change
          </Button>
          <Button
            variant={showPoolCreated ? "default" : "outline"}
            size="sm"
            onClick={() => setShowPoolCreated(!showPoolCreated)}
          >
            <Clock className="mr-2 h-4 w-4" />
            Pool Created
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="content-box">
          <Tabs defaultValue="trending" value={activeCategory} onValueChange={setActiveCategory}>
            <TabsList className="grid grid-cols-3 md:grid-cols-6 mb-4">
              <TabsTrigger value="trending">
                <BarChart3 className="mr-2 h-4 w-4" />
                Trending
              </TabsTrigger>
              <TabsTrigger value="gainers">
                <TrendingUp className="mr-2 h-4 w-4" />
                Top Gainers
              </TabsTrigger>
              <TabsTrigger value="new">
                <Clock className="mr-2 h-4 w-4" />
                New Listings
              </TabsTrigger>
              <TabsTrigger value="low-volume">
                <Zap className="mr-2 h-4 w-4" />
                Low Volume
              </TabsTrigger>
              <TabsTrigger value="trusted">
                <Shield className="mr-2 h-4 w-4" />
                Trusted
              </TabsTrigger>
              <TabsTrigger value="hot-pairs">
                <Flame className="mr-2 h-4 w-4" />
                Hot Pairs
              </TabsTrigger>
            </TabsList>

            <TabsContent value="trending">
              <CoinTable
                filter="trending"
                limit={100}
                showCharts={true}
                showAudit={showAudit}
                showMarketCap={showMarketCap}
                showDexInfo={showDexInfo}
                show24hChange={show24hChange}
                showPoolCreated={showPoolCreated}
              />
              <div className="mt-4 text-center">
                <Link href="/trending" className="text-primary hover:underline">
                  View All Trending Coins
                </Link>
              </div>
            </TabsContent>

            <TabsContent value="gainers">
              <CoinTable
                filter="gainers"
                limit={100}
                showCharts={true}
                showAudit={showAudit}
                showMarketCap={showMarketCap}
                showDexInfo={showDexInfo}
                show24hChange={show24hChange}
                showPoolCreated={showPoolCreated}
              />
              <div className="mt-4 text-center">
                <Link href="/top-gainers" className="text-primary hover:underline">
                  View All Top Gainers
                </Link>
              </div>
            </TabsContent>

            <TabsContent value="new">
              <CoinTable
                filter="new"
                limit={100}
                showCharts={true}
                showAudit={showAudit}
                showMarketCap={showMarketCap}
                showDexInfo={showDexInfo}
                show24hChange={show24hChange}
                showPoolCreated={showPoolCreated}
              />
              <div className="mt-4 text-center">
                <Link href="/recently-added" className="text-primary hover:underline">
                  View All New Listings
                </Link>
              </div>
            </TabsContent>

            <TabsContent value="low-volume">
              <CoinTable
                filter="low-volume"
                limit={100}
                showCharts={true}
                showAudit={showAudit}
                showMarketCap={showMarketCap}
                showDexInfo={showDexInfo}
                show24hChange={show24hChange}
                showPoolCreated={showPoolCreated}
              />
              <div className="mt-4 text-center">
                <Link href="/low-volume" className="text-primary hover:underline">
                  View All Low Volume Projects
                </Link>
              </div>
            </TabsContent>

            <TabsContent value="trusted">
              <CoinTable
                filter="trusted"
                limit={100}
                showCharts={true}
                showAudit={showAudit}
                showMarketCap={showMarketCap}
                showDexInfo={showDexInfo}
                show24hChange={show24hChange}
                showPoolCreated={showPoolCreated}
              />
              <div className="mt-4 text-center">
                <Link href="/trusted" className="text-primary hover:underline">
                  View All Trusted Projects
                </Link>
              </div>
            </TabsContent>

            <TabsContent value="hot-pairs">
              <CoinTable
                filter="hot-pairs"
                limit={100}
                showCharts={true}
                showAudit={showAudit}
                showMarketCap={showMarketCap}
                showDexInfo={showDexInfo}
                show24hChange={show24hChange}
                showPoolCreated={showPoolCreated}
              />
              <div className="mt-4 text-center">
                <Link href="/hot-pairs" className="text-primary hover:underline">
                  View All Hot Pairs
                </Link>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </CardContent>
    </Card>
  )
}
