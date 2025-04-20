"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Skeleton } from "@/components/ui/skeleton"
import type { CoinData } from "@/types/common"
import { ShieldCheck, ShieldAlert, AlertTriangle, CheckCircle, XCircle, Info } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface CoinAuditProps {
  coinData: CoinData | null
  loading: boolean
}

export function CoinAudit({ coinData, loading }: CoinAuditProps) {
  const [expanded, setExpanded] = useState(false)

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Security Audit</CardTitle>
        </CardHeader>
        <CardContent>
          <Skeleton className="h-[200px] w-full" />
        </CardContent>
      </Card>
    )
  }

  if (!coinData) return null

  // Generate audit data based on coin data
  const auditData = generateAuditData(coinData)

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Security Audit</CardTitle>
        {auditData.score >= 80 ? (
          <div className="flex items-center text-green-500">
            <ShieldCheck className="h-4 w-4 mr-1" />
            <span className="text-xs">Secure</span>
          </div>
        ) : auditData.score >= 50 ? (
          <div className="flex items-center text-yellow-500">
            <AlertTriangle className="h-4 w-4 mr-1" />
            <span className="text-xs">Caution</span>
          </div>
        ) : (
          <div className="flex items-center text-red-500">
            <ShieldAlert className="h-4 w-4 mr-1" />
            <span className="text-xs">High Risk</span>
          </div>
        )}
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <span className="text-sm font-medium mr-2">Security Score:</span>
            <Badge
              variant={auditData.score >= 80 ? "default" : auditData.score >= 50 ? "secondary" : "destructive"}
              className="text-xs"
            >
              {auditData.score}/100
            </Badge>
          </div>
          <span className="text-xs text-primary cursor-pointer hover:underline" onClick={() => setExpanded(!expanded)}>
            {expanded ? "Show Less" : "Show Details"}
          </span>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <div className="flex items-center">
              <span className="text-muted-foreground">Contract Analysis</span>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <Info className="h-3 w-3 ml-1 text-muted-foreground" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="text-xs max-w-xs">
                      Analysis of contract code quality, security practices, and potential vulnerabilities
                    </p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <div className="flex items-center">
              {auditData.contractAnalysis.status === "Secure" ? (
                <CheckCircle className="h-3 w-3 mr-1 text-green-500" />
              ) : auditData.contractAnalysis.status === "Caution" ? (
                <AlertTriangle className="h-3 w-3 mr-1 text-yellow-500" />
              ) : (
                <XCircle className="h-3 w-3 mr-1 text-red-500" />
              )}
              <span
                className={
                  auditData.contractAnalysis.status === "Secure"
                    ? "text-green-500"
                    : auditData.contractAnalysis.status === "Caution"
                      ? "text-yellow-500"
                      : "text-red-500"
                }
              >
                {auditData.contractAnalysis.status}
              </span>
            </div>
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

        {expanded && (
          <>
            <div className="space-y-2 pt-2">
              <div className="text-sm font-medium">Contract Details</div>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="flex justify-between p-2 bg-muted rounded-md">
                  <span className="text-muted-foreground">Buy Tax</span>
                  <span>{auditData.contractAnalysis.buyTax}%</span>
                </div>
                <div className="flex justify-between p-2 bg-muted rounded-md">
                  <span className="text-muted-foreground">Sell Tax</span>
                  <span>{auditData.contractAnalysis.sellTax}%</span>
                </div>
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
                  <span className="text-muted-foreground">Ownership</span>
                  <span>{auditData.contractAnalysis.ownership}</span>
                </div>
              </div>
            </div>

            <div className="space-y-2 pt-2">
              <div className="text-sm font-medium">Security Issues</div>
              <div className="space-y-2">
                {auditData.securityIssues.map((issue, index) => (
                  <div key={index} className="flex items-start p-2 bg-muted rounded-md text-xs">
                    {issue.severity === "High" ? (
                      <XCircle className="h-3 w-3 mr-2 mt-0.5 text-red-500 flex-shrink-0" />
                    ) : issue.severity === "Medium" ? (
                      <AlertTriangle className="h-3 w-3 mr-2 mt-0.5 text-yellow-500 flex-shrink-0" />
                    ) : (
                      <Info className="h-3 w-3 mr-2 mt-0.5 text-blue-500 flex-shrink-0" />
                    )}
                    <div>
                      <div className="font-medium">{issue.title}</div>
                      <div className="text-muted-foreground">{issue.description}</div>
                    </div>
                  </div>
                ))}

                {auditData.securityIssues.length === 0 && (
                  <div className="flex items-center p-2 bg-muted rounded-md text-xs">
                    <CheckCircle className="h-3 w-3 mr-2 text-green-500" />
                    <span>No security issues detected</span>
                  </div>
                )}
              </div>
            </div>
          </>
        )}
      </CardContent>
    </Card>
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
  let contractAnalysisStatus = "Secure"
  if (contractAnalysisScore < 50) contractAnalysisStatus = "High Risk"
  else if (contractAnalysisScore < 80) contractAnalysisStatus = "Caution"

  // Generate buy/sell tax based on the seed
  const buyTax = addressSeed % 5
  const sellTax = (addressSeed % 7) + buyTax

  // Generate honeypot risk
  let honeypotRisk = "Low"
  if (score < 50) honeypotRisk = "High"
  else if (score < 80) honeypotRisk = "Medium"

  // Generate ownership status
  const ownershipOptions = ["Renounced", "Locked", "Retained"]
  const ownership = ownershipOptions[addressSeed % 3]

  // Generate security issues
  const securityIssues = []

  if (score < 70) {
    // Add some security issues for lower-scored tokens
    const possibleIssues = [
      {
        severity: "High",
        title: "Centralized Control",
        description: "Contract owner has significant control over token functions.",
      },
      {
        severity: "Medium",
        title: "High Transaction Fees",
        description: `Sell tax of ${sellTax}% may impact liquidity.`,
      },
      {
        severity: "Low",
        title: "Unverified Contract",
        description: "Source code is not verified on blockchain explorer.",
      },
      {
        severity: "High",
        title: "Potential Honeypot",
        description: "Contract contains functions that could restrict selling.",
      },
      {
        severity: "Medium",
        title: "Unlocked Liquidity",
        description: "Liquidity tokens are not locked, allowing for potential rug pull.",
      },
      {
        severity: "Low",
        title: "Missing Events",
        description: "Some functions do not emit events, reducing transparency.",
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
    contractAnalysis: {
      status: contractAnalysisStatus,
      score: contractAnalysisScore,
      buyTax,
      sellTax,
      honeypotRisk,
      ownership,
    },
    securityIssues,
  }
}
