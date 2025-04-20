"use client"

import React, { useState, useEffect, use } from "react"
import { CoinHeader } from "@/components/coin/coin-header"
import { CoinChart } from "@/components/coin/coin-chart"
import { CoinStats } from "@/components/coin/coin-stats"
import { CoinTrades } from "@/components/coin/coin-trades"
import { CoinSocial } from "@/components/coin/coin-social"
import { CoinSupply } from "@/components/coin/coin-supply"
import { CoinAudit } from "@/components/coin/coin-audit"
import { CoinCommunityVote } from "@/components/coin/coin-community-vote"
import { CoinExchangeListings } from "@/components/coin/coin-exchange-listings"
import { CoinTradeHistory } from "@/components/coin/coin-trade-history"
import { CoinSwapBox } from "@/components/coin/coin-swap-box"
import { AIInsights } from "@/components/ai-insights"
import { SupplyVerificationButton } from "@/components/supply-verification-button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MainLayout } from "@/components/layouts/main-layout"
import { Separator } from "@/components/ui/separator"
import { fetchCoinData } from "@/lib/api"
import type { CoinData } from "@/types/common"

export default function CoinDetailPage({ params }: { params: Promise<{ address: string }> }) {
  const { address } = use(params)
  const [coinData, setCoinData] = useState<CoinData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const getCoinData = async () => {
      try {
        setLoading(true)
        const data = await fetchCoinData(address)
        setCoinData(data)
      } catch (error) {
        console.error("Error fetching coin data:", error)
      } finally {
        setLoading(false)
      }
    }

    getCoinData()
  }, [address])

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-6">
        <CoinHeader coinData={coinData} loading={loading} />

        {!loading && coinData && !coinData.isLiquidityLocked && (
          <div className="mt-4 flex justify-end">
            <SupplyVerificationButton coinData={coinData} />
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
          <div className="lg:col-span-2">
            <CoinChart address={address} />

            <div className="mt-6">
              <AIInsights coinData={coinData} loading={loading} />
            </div>

            <Tabs defaultValue="trades" className="mt-6">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="trades">Trades</TabsTrigger>
                <TabsTrigger value="holders">Holders</TabsTrigger>
                <TabsTrigger value="contract">Contract</TabsTrigger>
                <TabsTrigger value="info">Project Info</TabsTrigger>
              </TabsList>

              <TabsContent value="trades" className="border rounded-md p-4">
                <CoinTrades address={address} />
              </TabsContent>

              <TabsContent value="holders" className="border rounded-md p-4">
                <div className="text-sm">
                  <h3 className="font-medium text-lg mb-4">Top Token Holders</h3>
                  <table className="w-full">
                    <thead>
                      <tr className="text-left border-b">
                        <th className="pb-2">Rank</th>
                        <th className="pb-2">Address</th>
                        <th className="pb-2 text-right">Quantity</th>
                        <th className="pb-2 text-right">Percentage</th>
                      </tr>
                    </thead>
                    <tbody>
                      {Array.from({ length: 10 }).map((_, i) => (
                        <tr key={i} className="border-b">
                          <td className="py-3">{i + 1}</td>
                          <td className="py-3">
                            <a href="#" className="hover:underline">
                              0x{Math.random().toString(16).substring(2, 10)}...
                              {Math.random().toString(16).substring(2, 6)}
                            </a>
                          </td>
                          <td className="py-3 text-right">
                            {(Math.random() * 1000000).toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                          </td>
                          <td className="py-3 text-right">{(Math.random() * 10).toFixed(2)}%</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </TabsContent>

              <TabsContent value="contract" className="border rounded-md p-4">
                <div className="text-sm">
                  <h3 className="font-medium text-lg mb-4">Contract Details</h3>
                  <p className="font-medium">Contract Address:</p>
                  <p className="font-mono text-xs break-all mt-1">{address}</p>
                  <div className="mt-4">
                    <p className="font-medium">Contract Details:</p>
                    <ul className="mt-2 space-y-2">
                      <li className="flex justify-between">
                        <span>Token Type:</span>
                        <span>ERC-20</span>
                      </li>
                      <li className="flex justify-between">
                        <span>Decimals:</span>
                        <span>18</span>
                      </li>
                      <li className="flex justify-between">
                        <span>Total Supply:</span>
                        <span>{coinData?.totalSupply.toLocaleString() || "Loading..."}</span>
                      </li>
                      <li className="flex justify-between">
                        <span>Owner:</span>
                        <a href="#" className="hover:underline">
                          0x1234...5678
                        </a>
                      </li>
                      <li className="flex justify-between">
                        <span>Creation Date:</span>
                        <span>{coinData?.launchDate || "Loading..."}</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="info" className="border rounded-md p-4">
                <div className="text-sm">
                  <h3 className="font-medium text-lg mb-4">Project Information</h3>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium">Description</h4>
                      <p className="mt-1 text-muted-foreground">
                        {coinData?.description || "No description available."}
                      </p>
                    </div>
                    <Separator />
                    <div>
                      <h4 className="font-medium">Website</h4>
                      <a
                        href={coinData?.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-1 text-primary hover:underline"
                      >
                        {coinData?.website || "No website available."}
                      </a>
                    </div>
                    <Separator />
                    <div>
                      <h4 className="font-medium">Social Media</h4>
                      <div className="mt-1 flex flex-wrap gap-2">
                        <a href={coinData?.twitter} className="text-primary hover:underline">
                          Twitter
                        </a>
                        <a href={coinData?.telegram} className="text-primary hover:underline">
                          Telegram
                        </a>
                        <a href={coinData?.discord} className="text-primary hover:underline">
                          Discord
                        </a>
                        <a href={coinData?.github} className="text-primary hover:underline">
                          Github
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>

            <div className="mt-6">
              <CoinTradeHistory coinData={coinData} loading={loading} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              <CoinAudit coinData={coinData} loading={loading} />
              <CoinExchangeListings coinData={coinData} loading={loading} />
            </div>

            <CoinCommunityVote coinData={coinData} loading={loading} className="mt-6" />
          </div>

          <div className="space-y-6">
            <CoinStats coinData={coinData} loading={loading} />
            <CoinSupply coinData={coinData} loading={loading} />
            <CoinSocial coinData={coinData} loading={loading} />
            <CoinSwapBox coinData={coinData} loading={loading} />
          </div>
        </div>
      </div>
    </MainLayout>
  )
}
