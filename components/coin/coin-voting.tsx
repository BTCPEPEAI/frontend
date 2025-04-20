"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { ThumbsUp, ThumbsDown, AlertTriangle } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { WalletConnect } from "@/components/wallet-connect"
import type { CoinData } from "@/types/common"
import { Skeleton } from "@/components/ui/skeleton"

interface CoinVotingProps {
  coinData: CoinData | null
  loading: boolean
  className?: string
}

export function CoinVoting({ coinData, loading, className = "" }: CoinVotingProps) {
  const { toast } = useToast()
  const [isWalletConnected, setIsWalletConnected] = useState(false)
  const [hasVoted, setHasVoted] = useState(false)
  const [votingData, setVotingData] = useState<{
    trustVotes: number
    distrustVotes: number
    totalVotes: number
    trustPercentage: number
    distrustPercentage: number
  } | null>(null)

  // Initialize voting data when coin data is loaded
  useState(() => {
    if (coinData && !votingData) {
      setVotingData({
        trustVotes: coinData.trustVotes,
        distrustVotes: coinData.distrustVotes,
        totalVotes: coinData.totalVotes,
        trustPercentage: coinData.trustPercentage,
        distrustPercentage: coinData.distrustPercentage,
      })
    }
  })

  const handleVote = (isTrust: boolean) => {
    if (!isWalletConnected) {
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

    if (votingData) {
      if (isTrust) {
        setVotingData((prev) => {
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
        setVotingData((prev) => {
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

  // For demo purposes, simulate wallet connection
  const handleWalletConnect = (connected: boolean) => {
    setIsWalletConnected(connected)
  }

  if (loading) {
    return (
      <Card className={className}>
        <CardHeader>
          <CardTitle>Community Trust Vote</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <Skeleton className="w-24 h-4" />
              <Skeleton className="w-12 h-4" />
            </div>
            <Skeleton className="w-full h-2" />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <Skeleton className="w-24 h-4" />
              <Skeleton className="w-12 h-4" />
            </div>
            <Skeleton className="w-full h-2" />
          </div>

          <Skeleton className="w-full h-4" />

          <div className="grid grid-cols-2 gap-4">
            <Skeleton className="w-full h-10" />
            <Skeleton className="w-full h-10" />
          </div>
        </CardContent>
      </Card>
    )
  }

  if (!coinData || !votingData) return null

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>Community Trust Vote</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <div className="flex items-center text-green-500">
              <ThumbsUp className="h-4 w-4 mr-1" />
              <span>Trust ({votingData.trustVotes})</span>
            </div>
            <span>{votingData.trustPercentage}%</span>
          </div>
          <Progress value={votingData.trustPercentage} className="h-2" />
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <div className="flex items-center text-red-500">
              <ThumbsDown className="h-4 w-4 mr-1" />
              <span>Distrust ({votingData.distrustVotes})</span>
            </div>
            <span>{votingData.distrustPercentage}%</span>
          </div>
          <Progress value={votingData.distrustPercentage} className="h-2" />
        </div>

        <div className="flex items-center justify-center text-sm text-muted-foreground">
          <AlertTriangle className="h-4 w-4 mr-1" />
          <span>Total votes: {votingData.totalVotes}</span>
        </div>

        {isWalletConnected ? (
          <div className="grid grid-cols-2 gap-4">
            <Button
              variant="outline"
              className="bg-green-500/10 hover:bg-green-500/20 border-green-500/20"
              onClick={() => handleVote(true)}
              disabled={hasVoted}
            >
              <ThumbsUp className="mr-2 h-4 w-4" />
              Trust
            </Button>
            <Button
              variant="outline"
              className="bg-red-500/10 hover:bg-red-500/20 border-red-500/20"
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
            <WalletConnect onConnect={handleWalletConnect} />
          </div>
        )}
      </CardContent>
    </Card>
  )
}
