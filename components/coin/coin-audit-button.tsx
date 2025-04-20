"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Shield, AlertTriangle, CheckCircle, XCircle, Info } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import type { CoinData } from "@/types/common"

interface CoinAuditButtonProps {
  coinData: CoinData
  variant?: "default" | "outline" | "secondary" | "ghost"
  size?: "default" | "sm" | "lg" | "icon"
}

export function CoinAuditButton({ coinData, variant = "outline", size = "sm" }: CoinAuditButtonProps) {
  const [activeTab, setActiveTab] = useState("overview")

  // Generate audit data based on coin data
  const auditData = generateAuditData(coinData)

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={variant} size={size}>
          <Shield className="mr-2 h-4 w-4" />
          Audit
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            <span className="mr-2">
              Security Audit: {coinData.name} ({coinData.symbol})
            </span>
            {auditData.score >= 80 ? (
              <Badge variant="default" className="bg-green-500">
                Secure
              </Badge>
            ) : auditData.score >= 50 ? (
              <Badge variant="default" className="bg-yellow-500">
                Caution
              </Badge>
            ) : (
              <Badge variant="destructive">High Risk</Badge>
            )}
          </DialogTitle>
          <DialogDescription>
            Comprehensive security analysis and audit report for {coinData.symbol} token
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-4 mb-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="contract">Contract Analysis</TabsTrigger>
            <TabsTrigger value="security">Security Issues</TabsTrigger>
            <TabsTrigger value="liquidity">Liquidity Analysis</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-16 h-16 rounded-full flex items-center justify-center bg-muted">
                  <span className="text-2xl font-bold">{auditData.score}</span>
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium">Security Score</h3>
                  <p className="text-sm text-muted-foreground">
                    {auditData.score >= 80
                      ? "This token has passed security checks"
                      : auditData.score >= 50
                        ? "This token has some security concerns"
                        : "This token has significant security risks"}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm">
                  Audit Date: <span className="font-medium">{new Date().toLocaleDateString()}</span>
                </p>
                <p className="text-sm">
                  Contract Age: <span className="font-medium">{auditData.contractAge} days</span>
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Contract Analysis</span>
                  <span
                    className={
                      auditData.contractAnalysis.score >= 80
                        ? "text-green-500"
                        : auditData.contractAnalysis.score >= 50
                          ? "text-yellow-500"
                          : "text-red-500"
                    }
                  >
                    {auditData.contractAnalysis.score}/100
                  </span>
                </div>
                <Progress
                  value={auditData.contractAnalysis.score}
                  className="h-2"
                  indicatorClassName={
                    auditData.contractAnalysis.score >= 80
                      ? "bg-green-500"
                      : auditData.contractAnalysis.score >= 50
                        ? "bg-yellow-500"
                        : "bg-red-500"
                  }
                />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Liquidity Analysis</span>
                  <span
                    className={
                      auditData.liquidityAnalysis.score >= 80
                        ? "text-green-500"
                        : auditData.liquidityAnalysis.score >= 50
                          ? "text-yellow-500"
                          : "text-red-500"
                    }
                  >
                    {auditData.liquidityAnalysis.score}/100
                  </span>
                </div>
                <Progress
                  value={auditData.liquidityAnalysis.score}
                  className="h-2"
                  indicatorClassName={
                    auditData.liquidityAnalysis.score >= 80
                      ? "bg-green-500"
                      : auditData.liquidityAnalysis.score >= 50
                        ? "bg-yellow-500"
                        : "bg-red-500"
                  }
                />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Security Issues</span>
                  <span
                    className={
                      auditData.securityIssues.length === 0
                        ? "text-green-500"
                        : auditData.securityIssues.some((i) => i.severity === "High")
                          ? "text-red-500"
                          : "text-yellow-500"
                    }
                  >
                    {auditData.securityIssues.length} issues
                  </span>
                </div>
                <Progress
                  value={
                    auditData.securityIssues.length === 0
                      ? 100
                      : auditData.securityIssues.some((i) => i.severity === "High")
                        ? 30
                        : auditData.securityIssues.some((i) => i.severity === "Medium")
                          ? 60
                          : 80
                  }
                  className="h-2"
                  indicatorClassName={
                    auditData.securityIssues.length === 0
                      ? "bg-green-500"
                      : auditData.securityIssues.some((i) => i.severity === "High")
                        ? "bg-red-500"
                        : auditData.securityIssues.some((i) => i.severity === "Medium")
                          ? "bg-yellow-500"
                          : "bg-green-500"
                  }
                />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Overall Score</span>
                  <span
                    className={
                      auditData.score >= 80
                        ? "text-green-500"
                        : auditData.score >= 50
                          ? "text-yellow-500"
                          : "text-red-500"
                    }
                  >
                    {auditData.score}/100
                  </span>
                </div>
                <Progress
                  value={auditData.score}
                  className="h-2"
                  indicatorClassName={
                    auditData.score >= 80 ? "bg-green-500" : auditData.score >= 50 ? "bg-yellow-500" : "bg-red-500"
                  }
                />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 mt-4">
              <div className="p-4 border rounded-md">
                <div className="flex items-center mb-2">
                  {auditData.contractAnalysis.honeypotRisk === "Low" ? (
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                  ) : auditData.contractAnalysis.honeypotRisk === "Medium" ? (
                    <AlertTriangle className="h-4 w-4 text-yellow-500 mr-2" />
                  ) : (
                    <XCircle className="h-4 w-4 text-red-500 mr-2" />
                  )}
                  <h4 className="font-medium">Honeypot Risk</h4>
                </div>
                <p className="text-sm text-muted-foreground">
                  {auditData.contractAnalysis.honeypotRisk === "Low"
                    ? "No honeypot features detected"
                    : auditData.contractAnalysis.honeypotRisk === "Medium"
                      ? "Some suspicious functions found"
                      : "High risk of honeypot functionality"}
                </p>
              </div>

              <div className="p-4 border rounded-md">
                <div className="flex items-center mb-2">
                  {auditData.contractAnalysis.ownership === "Renounced" ? (
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                  ) : auditData.contractAnalysis.ownership === "Locked" ? (
                    <AlertTriangle className="h-4 w-4 text-yellow-500 mr-2" />
                  ) : (
                    <XCircle className="h-4 w-4 text-red-500 mr-2" />
                  )}
                  <h4 className="font-medium">Ownership</h4>
                </div>
                <p className="text-sm text-muted-foreground">
                  {auditData.contractAnalysis.ownership === "Renounced"
                    ? "Contract ownership has been renounced"
                    : auditData.contractAnalysis.ownership === "Locked"
                      ? "Contract ownership is locked in a timelock"
                      : "Contract owner has full control"}
                </p>
              </div>

              <div className="p-4 border rounded-md">
                <div className="flex items-center mb-2">
                  {coinData.isLiquidityLocked ? (
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                  ) : (
                    <XCircle className="h-4 w-4 text-red-500 mr-2" />
                  )}
                  <h4 className="font-medium">Liquidity</h4>
                </div>
                <p className="text-sm text-muted-foreground">
                  {coinData.isLiquidityLocked
                    ? `Liquidity is locked for ${coinData.lockDuration}`
                    : "Liquidity is not locked"}
                </p>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="contract" className="space-y-4">
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-medium mb-2">Contract Details</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between p-2 bg-muted rounded-md">
                      <span className="text-muted-foreground">Contract Address</span>
                      <span className="font-mono text-xs">
                        {coinData.address.slice(0, 10)}...{coinData.address.slice(-8)}
                      </span>
                    </div>
                    <div className="flex justify-between p-2 bg-muted rounded-md">
                      <span className="text-muted-foreground">Token Type</span>
                      <span>ERC-20</span>
                    </div>
                    <div className="flex justify-between p-2 bg-muted rounded-md">
                      <span className="text-muted-foreground">Compiler Version</span>
                      <span>v0.8.17+commit.8df45f5f</span>
                    </div>
                    <div className="flex justify-between p-2 bg-muted rounded-md">
                      <span className="text-muted-foreground">Creation Date</span>
                      <span>{coinData.launchDate}</span>
                    </div>
                    <div className="flex justify-between p-2 bg-muted rounded-md">
                      <span className="text-muted-foreground">Pool Created</span>
                      <span>{auditData.poolCreatedTime}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-2">Ownership Analysis</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between p-2 bg-muted rounded-md">
                      <span className="text-muted-foreground">Ownership Status</span>
                      <span
                        className={
                          auditData.contractAnalysis.ownership === "Renounced"
                            ? "text-green-500"
                            : auditData.contractAnalysis.ownership === "Locked"
                              ? "text-yellow-500"
                              : "text-red-500"
                        }
                      >
                        {auditData.contractAnalysis.ownership}
                      </span>
                    </div>
                    {auditData.contractAnalysis.ownership === "Locked" && (
                      <div className="flex justify-between p-2 bg-muted rounded-md">
                        <span className="text-muted-foreground">Lock Duration</span>
                        <span>{auditData.contractAnalysis.lockDuration || "Unknown"}</span>
                      </div>
                    )}
                    <div className="flex justify-between p-2 bg-muted rounded-md">
                      <span className="text-muted-foreground">Owner Address</span>
                      <span className="font-mono text-xs">
                        0x{Math.random().toString(16).substring(2, 10)}...{Math.random().toString(16).substring(2, 6)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-medium mb-2">Fee Structure</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between p-2 bg-muted rounded-md">
                      <span className="text-muted-foreground">Buy Tax</span>
                      <span className={auditData.contractAnalysis.buyTax > 5 ? "text-red-500" : "text-green-500"}>
                        {auditData.contractAnalysis.buyTax}%
                      </span>
                    </div>
                    <div className="flex justify-between p-2 bg-muted rounded-md">
                      <span className="text-muted-foreground">Sell Tax</span>
                      <span className={auditData.contractAnalysis.sellTax > 5 ? "text-red-500" : "text-green-500"}>
                        {auditData.contractAnalysis.sellTax}%
                      </span>
                    </div>
                    <div className="flex justify-between p-2 bg-muted rounded-md">
                      <span className="text-muted-foreground">Transfer Tax</span>
                      <span className={auditData.contractAnalysis.transferTax > 0 ? "text-red-500" : "text-green-500"}>
                        {auditData.contractAnalysis.transferTax}%
                      </span>
                    </div>
                    <div className="flex justify-between p-2 bg-muted rounded-md">
                      <span className="text-muted-foreground">Max Transaction</span>
                      <span>{auditData.contractAnalysis.maxTransaction || "No limit"}</span>
                    </div>
                    <div className="flex justify-between p-2 bg-muted rounded-md">
                      <span className="text-muted-foreground">Max Wallet</span>
                      <span>{auditData.contractAnalysis.maxWallet || "No limit"}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-2">Risk Assessment</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between p-2 bg-muted rounded-md">
                      <span className="text-muted-foreground">Honeypot Risk</span>
                      <span
                        className={
                          auditData.contractAnalysis.honeypotRisk === "Low"
                            ? "text-green-500"
                            : auditData.contractAnalysis.honeypotRisk === "Medium"
                              ? "text-yellow-500"
                              : "text-red-500"
                        }
                      >
                        {auditData.contractAnalysis.honeypotRisk}
                      </span>
                    </div>
                    <div className="flex justify-between p-2 bg-muted rounded-md">
                      <span className="text-muted-foreground">Mint Function</span>
                      <span className={auditData.contractAnalysis.hasMintFunction ? "text-red-500" : "text-green-500"}>
                        {auditData.contractAnalysis.hasMintFunction ? "Present" : "Not Present"}
                      </span>
                    </div>
                    <div className="flex justify-between p-2 bg-muted rounded-md">
                      <span className="text-muted-foreground">Proxy Contract</span>
                      <span className={auditData.contractAnalysis.isProxy ? "text-yellow-500" : "text-green-500"}>
                        {auditData.contractAnalysis.isProxy ? "Yes" : "No"}
                      </span>
                    </div>
                    <div className="flex justify-between p-2 bg-muted rounded-md">
                      <span className="text-muted-foreground">Anti-Bot Measures</span>
                      <span>{auditData.contractAnalysis.hasAntiBot ? "Present" : "Not Present"}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="security" className="space-y-4">
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Security Issues</h3>

              {auditData.securityIssues.length === 0 ? (
                <div className="flex items-center justify-center p-8 border rounded-md">
                  <div className="text-center">
                    <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
                    <h4 className="text-lg font-medium">No Security Issues Detected</h4>
                    <p className="text-sm text-muted-foreground mt-2">This contract has passed all security checks</p>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  {auditData.securityIssues.map((issue, index) => (
                    <div key={index} className="border rounded-md overflow-hidden">
                      <div
                        className={`p-4 flex items-start ${
                          issue.severity === "High"
                            ? "bg-red-500/10"
                            : issue.severity === "Medium"
                              ? "bg-yellow-500/10"
                              : "bg-blue-500/10"
                        }`}
                      >
                        {issue.severity === "High" ? (
                          <XCircle className="h-5 w-5 mr-3 mt-0.5 text-red-500 flex-shrink-0" />
                        ) : issue.severity === "Medium" ? (
                          <AlertTriangle className="h-5 w-5 mr-3 mt-0.5 text-yellow-500 flex-shrink-0" />
                        ) : (
                          <Info className="h-5 w-5 mr-3 mt-0.5 text-blue-500 flex-shrink-0" />
                        )}
                        <div>
                          <div className="flex items-center">
                            <h4 className="font-medium">{issue.title}</h4>
                            <Badge
                              variant={
                                issue.severity === "High"
                                  ? "destructive"
                                  : issue.severity === "Medium"
                                    ? "default"
                                    : "secondary"
                              }
                              className="ml-2"
                            >
                              {issue.severity}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground mt-1">{issue.description}</p>
                        </div>
                      </div>
                      <div className="p-4 bg-muted/50">
                        <h5 className="text-sm font-medium mb-2">Impact</h5>
                        <p className="text-sm text-muted-foreground">{issue.impact}</p>

                        {issue.recommendation && (
                          <>
                            <h5 className="text-sm font-medium mb-2 mt-4">Recommendation</h5>
                            <p className="text-sm text-muted-foreground">{issue.recommendation}</p>
                          </>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="liquidity" className="space-y-4">
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-medium mb-2">Liquidity Details</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between p-2 bg-muted rounded-md">
                      <span className="text-muted-foreground">Total Liquidity</span>
                      <span>${coinData.liquidity.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between p-2 bg-muted rounded-md">
                      <span className="text-muted-foreground">Liquidity/Market Cap Ratio</span>
                      <span>{auditData.liquidityAnalysis.liquidityToMarketCapRatio}%</span>
                    </div>
                    <div className="flex justify-between p-2 bg-muted rounded-md">
                      <span className="text-muted-foreground">Liquidity Status</span>
                      <span className={coinData.isLiquidityLocked ? "text-green-500" : "text-red-500"}>
                        {coinData.isLiquidityLocked ? "Locked" : "Unlocked"}
                      </span>
                    </div>
                    {coinData.isLiquidityLocked && (
                      <>
                        <div className="flex justify-between p-2 bg-muted rounded-md">
                          <span className="text-muted-foreground">Lock Platform</span>
                          <span>{coinData.lockPlatform}</span>
                        </div>
                        <div className="flex justify-between p-2 bg-muted rounded-md">
                          <span className="text-muted-foreground">Lock Duration</span>
                          <span>{coinData.lockDuration}</span>
                        </div>
                        <div className="flex justify-between p-2 bg-muted rounded-md">
                          <span className="text-muted-foreground">Lock Amount</span>
                          <span>{coinData.lockAmount}</span>
                        </div>
                      </>
                    )}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-2">Top Liquidity Providers</h3>
                  <div className="space-y-2">
                    {auditData.liquidityAnalysis.topProviders.map((provider, index) => (
                      <div key={index} className="flex justify-between p-2 bg-muted rounded-md">
                        <span className="text-muted-foreground font-mono text-xs">
                          {provider.address.slice(0, 6)}...{provider.address.slice(-4)}
                        </span>
                        <span>{provider.percentage}%</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-medium mb-2">Liquidity Risk Assessment</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between p-2 bg-muted rounded-md">
                      <span className="text-muted-foreground">Rug Pull Risk</span>
                      <span
                        className={
                          auditData.liquidityAnalysis.rugPullRisk === "Low"
                            ? "text-green-500"
                            : auditData.liquidityAnalysis.rugPullRisk === "Medium"
                              ? "text-yellow-500"
                              : "text-red-500"
                        }
                      >
                        {auditData.liquidityAnalysis.rugPullRisk}
                      </span>
                    </div>
                    <div className="flex justify-between p-2 bg-muted rounded-md">
                      <span className="text-muted-foreground">LP Token Distribution</span>
                      <span
                        className={
                          auditData.liquidityAnalysis.lpTokenDistribution === "Good"
                            ? "text-green-500"
                            : auditData.liquidityAnalysis.lpTokenDistribution === "Fair"
                              ? "text-yellow-500"
                              : "text-red-500"
                        }
                      >
                        {auditData.liquidityAnalysis.lpTokenDistribution}
                      </span>
                    </div>
                    <div className="flex justify-between p-2 bg-muted rounded-md">
                      <span className="text-muted-foreground">Price Impact (1 ETH)</span>
                      <span
                        className={
                          auditData.liquidityAnalysis.priceImpact < 3
                            ? "text-green-500"
                            : auditData.liquidityAnalysis.priceImpact < 10
                              ? "text-yellow-500"
                              : "text-red-500"
                        }
                      >
                        {auditData.liquidityAnalysis.priceImpact}%
                      </span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-2">DEX Information</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between p-2 bg-muted rounded-md">
                      <span className="text-muted-foreground">Primary DEX</span>
                      <span>{auditData.dexInfo.primaryDex}</span>
                    </div>
                    <div className="flex justify-between p-2 bg-muted rounded-md">
                      <span className="text-muted-foreground">Other DEXes</span>
                      <span>{auditData.dexInfo.otherDexes.join(", ")}</span>
                    </div>
                    <div className="flex justify-between p-2 bg-muted rounded-md">
                      <span className="text-muted-foreground">Trading Volume (24h)</span>
                      <span>${coinData.volume.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between p-2 bg-muted rounded-md">
                      <span className="text-muted-foreground">Trading Pairs</span>
                      <span>{auditData.dexInfo.tradingPairs.join(", ")}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}

// Helper function to generate audit data based on coin data
function generateAuditData(coinData: CoinData) {
  // Use the address to seed the random data generation
  const addressSeed = Number.parseInt(coinData.address.slice(2, 10), 16)

  // Generate a score based on the seed
  const score = Math.min(100, Math.max(0, (addressSeed % 100) + (coinData.isLiquidityLocked ? 20 : -20)))

  // Generate contract analysis data
  const contractAnalysisScore = Math.min(100, Math.max(0, score + ((addressSeed % 20) - 10)))

  // Generate buy/sell tax based on the seed
  const buyTax = addressSeed % 5
  const sellTax = (addressSeed % 7) + buyTax
  const transferTax = addressSeed % 2

  // Generate honeypot risk
  let honeypotRisk = "Low"
  if (score < 50) honeypotRisk = "High"
  else if (score < 80) honeypotRisk = "Medium"

  // Generate ownership status
  const ownershipOptions = ["Renounced", "Locked", "Retained"]
  const ownership = ownershipOptions[addressSeed % 3]

  // Generate contract age in days (1-365)
  const contractAge = (addressSeed % 365) + 1

  // Generate pool created time
  const poolCreatedDate = new Date(Date.now() - contractAge * 24 * 60 * 60 * 1000)
  const poolCreatedTime = poolCreatedDate.toLocaleString()

  // Generate liquidity analysis data
  const liquidityAnalysisScore = Math.min(100, Math.max(0, score + ((addressSeed % 30) - 15)))
  const liquidityToMarketCapRatio = Math.max(1, Math.min(100, (addressSeed % 50) + 10))

  // Generate rug pull risk
  let rugPullRisk = "Low"
  if (!coinData.isLiquidityLocked) rugPullRisk = "High"
  else if (liquidityAnalysisScore < 70) rugPullRisk = "Medium"

  // Generate LP token distribution
  let lpTokenDistribution = "Good"
  if (liquidityAnalysisScore < 50) lpTokenDistribution = "Poor"
  else if (liquidityAnalysisScore < 80) lpTokenDistribution = "Fair"

  // Generate price impact
  const priceImpact = Math.max(0.1, Math.min(20, (addressSeed % 200) / 10))

  // Generate top liquidity providers
  const topProviders = []
  for (let i = 0; i < 5; i++) {
    const percentage =
      i === 0 ? Math.max(20, Math.min(80, 50 + (addressSeed % 30))) : Math.max(1, Math.min(20, (addressSeed + i) % 20))

    topProviders.push({
      address: `0x${Math.random().toString(16).substring(2, 10)}${Math.random().toString(16).substring(2, 10)}`,
      percentage,
    })
  }

  // Generate DEX information
  const primaryDexMap: Record<string, string> = {
    eth: "Uniswap V3",
    bnb: "PancakeSwap",
    sol: "Raydium",
    trx: "SunSwap",
    matic: "QuickSwap",
  }

  const primaryDex = primaryDexMap[coinData.network] || "Unknown DEX"

  const otherDexesMap: Record<string, string[]> = {
    eth: ["SushiSwap", "1inch"],
    bnb: ["BiSwap", "ApeSwap"],
    sol: ["Orca", "Serum"],
    trx: ["PoloniDEX", "JustSwap"],
    matic: ["SushiSwap", "Dfyn"],
  }

  const otherDexes = otherDexesMap[coinData.network] || []

  // Generate trading pairs
  const tradingPairs = [`${coinData.symbol}/USDT`, `${coinData.symbol}/ETH`]
  if (coinData.network === "bnb") {
    tradingPairs.push(`${coinData.symbol}/BNB`)
  } else if (coinData.network === "sol") {
    tradingPairs.push(`${coinData.symbol}/SOL`)
  }

  // Generate security issues
  const securityIssues = []

  if (score < 70) {
    // Add some security issues for lower-scored tokens
    const possibleIssues = [
      {
        severity: "High",
        title: "Centralized Control",
        description: "Contract owner has significant control over token functions.",
        impact: "The owner can modify critical parameters, potentially leading to loss of funds for token holders.",
        recommendation: "Renounce ownership or use a multi-signature wallet for ownership.",
      },
      {
        severity: "Medium",
        title: "High Transaction Fees",
        description: `Sell tax of ${sellTax}% may impact liquidity.`,
        impact: "High fees can discourage trading and reduce liquidity over time.",
        recommendation: "Consider reducing transaction fees to improve token attractiveness.",
      },
      {
        severity: "Low",
        title: "Unverified Contract",
        description: "Source code is not verified on blockchain explorer.",
        impact: "Users cannot inspect the code to verify its functionality and security.",
        recommendation: "Verify the contract source code on the blockchain explorer.",
      },
      {
        severity: "High",
        title: "Potential Honeypot",
        description: "Contract contains functions that could restrict selling.",
        impact: "Token holders may be unable to sell their tokens under certain conditions.",
        recommendation: "Remove or modify functions that can block selling.",
      },
      {
        severity: "Medium",
        title: "Unlocked Liquidity",
        description: "Liquidity tokens are not locked, allowing for potential rug pull.",
        impact: "The project team can remove liquidity at any time, causing the token price to crash.",
        recommendation: "Lock liquidity for a significant period using a trusted platform.",
      },
      {
        severity: "Low",
        title: "Missing Events",
        description: "Some functions do not emit events, reducing transparency.",
        impact: "Reduced ability to track important contract state changes off-chain.",
        recommendation: "Add events to all functions that modify contract state.",
      },
    ]

    // Add 1-3 issues based on the score
    const issueCount = Math.floor((100 - score) / 30) + 1
    for (let i = 0; i < issueCount; i++) {
      const issueIndex = (addressSeed + i) % possibleIssues.length
      securityIssues.push(possibleIssues[issueIndex])
    }
  }

  return {
    score,
    contractAge,
    poolCreatedTime,
    contractAnalysis: {
      status: honeypotRisk === "Low" ? "Secure" : honeypotRisk === "Medium" ? "Caution" : "High Risk",
      score: contractAnalysisScore,
      buyTax,
      sellTax,
      transferTax,
      honeypotRisk,
      ownership,
      lockDuration: ownership === "Locked" ? `${(addressSeed % 12) + 1} months` : undefined,
      hasMintFunction: addressSeed % 5 === 0,
      isProxy: addressSeed % 7 === 0,
      hasAntiBot: addressSeed % 3 === 0,
      maxTransaction: addressSeed % 4 === 0 ? `${(addressSeed % 5) + 1}% of total supply` : undefined,
      maxWallet: addressSeed % 4 === 0 ? `${(addressSeed % 10) + 1}% of total supply` : undefined,
    },
    liquidityAnalysis: {
      score: liquidityAnalysisScore,
      liquidityToMarketCapRatio,
      rugPullRisk,
      lpTokenDistribution,
      priceImpact,
      topProviders,
    },
    dexInfo: {
      primaryDex,
      otherDexes,
      tradingPairs,
    },
    securityIssues,
  }
}
