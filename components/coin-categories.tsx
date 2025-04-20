"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { CoinTable } from "@/components/coin-table"
import { fetchTrendingCoins, fetchTopGainers, fetchRecentlyAddedCoins } from "@/lib/api"
import type { CoinData } from "@/types/common"
import { Skeleton } from "@/components/ui/skeleton"

export function CoinCategories() {
  const [activeCategory, setActiveCategory] = useState("trending")
  const [coins, setCoins] = useState<CoinData[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchCoins = async () => {
      setLoading(true)
      try {
        let data: CoinData[] = []

        switch (activeCategory) {
          case "trending":
            data = await fetchTrendingCoins()
            break
          case "gainers":
            data = await fetchTopGainers()
            break
          case "new":
            data = await fetchRecentlyAddedCoins()
            break
          default:
            data = await fetchTrendingCoins()
        }

        setCoins(data)
      } catch (error) {
        console.error(`Error fetching ${activeCategory} coins:`, error)
      } finally {
        setLoading(false)
      }
    }

    fetchCoins()
  }, [activeCategory])

  return (
    <Card>
      <CardHeader>
        <CardTitle>Explore Cryptocurrencies</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="trending" value={activeCategory} onValueChange={setActiveCategory}>
          <TabsList className="grid grid-cols-3 md:grid-cols-6 mb-4">
            <TabsTrigger value="trending">Trending</TabsTrigger>
            <TabsTrigger value="gainers">Top Gainers</TabsTrigger>
            <TabsTrigger value="new">New Listings</TabsTrigger>
            <TabsTrigger value="low-volume">Low Volume</TabsTrigger>
            <TabsTrigger value="trusted">Trusted</TabsTrigger>
            <TabsTrigger value="hot-pairs">Hot Pairs</TabsTrigger>
          </TabsList>

          <TabsContent value="trending">
            {loading ? (
              <Skeleton className="h-[500px] w-full" />
            ) : (
              <>
                <CoinTable coins={coins.slice(0, 100)} limit={100} />
                <div className="mt-4 text-center">
                  <Link href="/trending" className="text-primary hover:underline">
                    View All Trending Coins
                  </Link>
                </div>
              </>
            )}
          </TabsContent>

          <TabsContent value="gainers">
            {loading ? (
              <Skeleton className="h-[500px] w-full" />
            ) : (
              <>
                <CoinTable coins={coins.slice(0, 100)} limit={100} />
                <div className="mt-4 text-center">
                  <Link href="/top-gainers" className="text-primary hover:underline">
                    View All Top Gainers
                  </Link>
                </div>
              </>
            )}
          </TabsContent>

          <TabsContent value="new">
            {loading ? (
              <Skeleton className="h-[500px] w-full" />
            ) : (
              <>
                <CoinTable coins={coins.slice(0, 100)} limit={100} />
                <div className="mt-4 text-center">
                  <Link href="/recently-added" className="text-primary hover:underline">
                    View All New Listings
                  </Link>
                </div>
              </>
            )}
          </TabsContent>

          <TabsContent value="low-volume">
            {loading ? (
              <Skeleton className="h-[500px] w-full" />
            ) : (
              <>
                <CoinTable coins={coins.slice(0, 100)} limit={100} />
                <div className="mt-4 text-center">
                  <Link href="/low-volume" className="text-primary hover:underline">
                    View All Low Volume Projects
                  </Link>
                </div>
              </>
            )}
          </TabsContent>

          <TabsContent value="trusted">
            {loading ? (
              <Skeleton className="h-[500px] w-full" />
            ) : (
              <>
                <CoinTable coins={coins.slice(0, 100)} limit={100} />
                <div className="mt-4 text-center">
                  <Link href="/trusted" className="text-primary hover:underline">
                    View All Trusted Projects
                  </Link>
                </div>
              </>
            )}
          </TabsContent>

          <TabsContent value="hot-pairs">
            {loading ? (
              <Skeleton className="h-[500px] w-full" />
            ) : (
              <>
                <CoinTable coins={coins.slice(0, 100)} limit={100} />
                <div className="mt-4 text-center">
                  <Link href="/hot-pairs" className="text-primary hover:underline">
                    View All Hot Pairs
                  </Link>
                </div>
              </>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
