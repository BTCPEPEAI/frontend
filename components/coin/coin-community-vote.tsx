"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Skeleton } from "@/components/ui/skeleton"
import type { CoinData } from "@/types/common"
import { ThumbsUp, ThumbsDown, AlertTriangle, Users, Shield } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { useWalletStore } from "@/lib/stores/wallet-store"
import { WalletConnectButton } from "@/components/wallet-connect-button"

interface CoinCommunityVoteProps {
  coinData: CoinData | null
  loading: boolean
}

export function CoinCommunityVote({ coinData, loading }: CoinCommunityVoteProps) {
  const { toast } = useToast()
  const { isConnected } = useWalletStore()
  const [hasVoted, setHasVoted] = useState(false)
  const [voteData, setVoteData] = useState<{
    trustVotes: number
    distrustVotes: number
    totalVotes: number
    trustPercentage: number
    distrustPercentage: number
  } | null>(null)

  // Initialize voting data when coin data is loaded
  useEffect(() => {
    if (coinData && !voteData) {
      setVoteData({
        trustVotes: coinData.trustVotes,
        distrustVotes: coinData.distrustVotes,
        totalVotes: coinData.totalVotes,
        trustPercentage: coinData.trustPercentage,
        distrustPercentage: coinData.distrustPercentage,
      })
    }
  }, [coinData, voteData])

  const handleVote = (isTrust: boolean) => {
    if (!isConnected) {
      toast({
        title: "Wallet not connected",
        description: "Please connect your wallet to vote",
        variant: "destructive",
      })
      return
    }

    if (hasVoted) {
      toast({
        title: "Already voted",
        description: "You have already voted for this project",
        variant: "destructive",
      })
      return
    }

    // In a real implementation, you would send the vote to an API
    setHasVoted(true)

    if (voteData) {
      if (isTrust) {
        setVoteData((prev) => {
          if (!prev) return null
          const newTrustVotes = prev.trustVotes + 1
          const newTotalVotes = prev.totalVotes + 1
          return {
            ...prev,
            trustVotes: newTrustVotes,
            totalVotes: newTotalVotes,
            trustPercentage: Math.round((newTrustVotes / newTotalVotes) * 100),
            distrustPercentage: Math.round((prev.distrustVotes / newTotalVotes) * 100),
          }
        })

        toast({
          title: "Vote submitted",
          description: "You have voted that you trust this project",
        })
      } else {
        setVoteData((prev) => {
          if (!prev) return null
          const newDistrustVotes = prev.distrustVotes + 1
          const newTotalVotes = prev.totalVotes + 1
          return {
            ...prev,
            distrustVotes: newDistrustVotes,
            totalVotes: newTotalVotes,
            trustPercentage: Math.round((prev.trustVotes / newTotalVotes) * 100),
            distrustPercentage: Math.round((newDistrustVotes / newTotalVotes) * 100),
          }
        })

        toast({
          title: "Vote submitted",
          description: "You have voted that you distrust this project",
        })
      }
    }
  }

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Community Trust Vote</CardTitle>
        </CardHeader>
        <CardContent>
          <Skeleton className="h-[200px] w-full" />
        </CardContent>
      </Card>
    )
  }

  if (!coinData || !voteData) return null

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Community Trust Vote</CardTitle>
        <div className="flex items-center text-muted-foreground">
          <Users className="h-4 w-4 mr-1" />
          <span className="text-xs">{voteData.totalVotes.toLocaleString()} votes</span>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center justify-center">
          <div className="relative w-32 h-32">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-3xl font-bold">{voteData.trustPercentage}%</div>
            </div>
            <svg className="w-full h-full" viewBox="0 0 100 100">
              {/* Background circle */}
              <circle cx="50" cy="50" r="45" fill="none" stroke="hsl(var(--muted))" strokeWidth="10" />
              {/* Progress circle */}
              <circle
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke={
                  voteData.trustPercentage >= 70
                    ? "hsl(var(--success))"
                    : voteData.trustPercentage >= 40
                      ? "hsl(var(--warning))"
                      : "hsl(var(--destructive))"
                }
                strokeWidth="10"
                strokeDasharray={`${voteData.trustPercentage * 2.83} 283`}
                strokeDashoffset="0"
                transform="rotate(-90 50 50)"
              />
            </svg>
          </div>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <div className="flex items-center text-green-500">
                <ThumbsUp className="h-4 w-4 mr-1" />
                <span>Trust ({voteData.trustVotes.toLocaleString()})</span>
              </div>
              <span>{voteData.trustPercentage}%</span>
            </div>
            <Progress value={voteData.trustPercentage} className="h-2 bg-muted" indicatorClassName="bg-green-500" />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <div className="flex items-center text-red-500">
                <ThumbsDown className="h-4 w-4 mr-1" />
                <span>Distrust ({voteData.distrustVotes.toLocaleString()})</span>
              </div>
              <span>{voteData.distrustPercentage}%</span>
            </div>
            <Progress value={voteData.distrustPercentage} className="h-2 bg-muted" indicatorClassName="bg-red-500" />
          </div>
        </div>

        <div className="pt-2">
          {voteData.trustPercentage >= 70 ? (
            <div className="flex items-center justify-center text-green-500 text-sm mb-4">
              <Shield className="h-4 w-4 mr-1" />
              <span>This project has high community trust</span>
            </div>
          ) : voteData.trustPercentage <= 30 ? (
            <div className="flex items-center justify-center text-red-500 text-sm mb-4">
              <AlertTriangle className="h-4 w-4 mr-1" />
              <span>This project has low community trust</span>
            </div>
          ) : (
            <div className="flex items-center justify-center text-yellow-500 text-sm mb-4">
              <AlertTriangle className="h-4 w-4 mr-1" />
              <span>Exercise caution with this project</span>
            </div>
          )}

          {isConnected ? (
            <div className="grid grid-cols-2 gap-4">
              <Button
                variant="outline"
                className="bg-green-500/10 hover:bg-green-500/20 border-green-500/20 text-green-500"
                onClick={() => handleVote(true)}
                disabled={hasVoted}
              >
                <ThumbsUp className="mr-2 h-4 w-4" />
                Trust
              </Button>
              <Button
                variant="outline"
                className="bg-red-500/10 hover:bg-red-500/20 border-red-500/20 text-red-500"
                onClick={() => handleVote(false)}
                disabled={hasVoted}
              >
                <ThumbsDown className="mr-2 h-4 w-4" />
                Distrust
              </Button>
            </div>
          ) : (
            <div className="text-center">
              <p className="text-sm text-muted-foreground mb-2">Connect your wallet to vote</p>
              <WalletConnectButton />
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
