"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Globe, Twitter, MessageSquare, DiscIcon as Discord, Github } from "lucide-react"
import type { CoinData } from "@/types/common"
import { Skeleton } from "@/components/ui/skeleton"

interface CoinSocialProps {
  coinData: CoinData | null
  loading: boolean
  className?: string
}

export function CoinSocial({ coinData, loading, className = "" }: CoinSocialProps) {
  if (loading) {
    return (
      <Card className={className}>
        <CardHeader>
          <CardTitle>Social Links</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} className="w-full h-9" />
          ))}
        </CardContent>
      </Card>
    )
  }

  if (!coinData) return null

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>Social Links</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4">
        <Button variant="outline" className="justify-start" asChild>
          <a href={coinData.website} target="_blank" rel="noopener noreferrer">
            <Globe className="mr-2 h-4 w-4" />
            Website
          </a>
        </Button>
        <Button variant="outline" className="justify-start" asChild>
          <a href={coinData.twitter} target="_blank" rel="noopener noreferrer">
            <Twitter className="mr-2 h-4 w-4" />
            Twitter
          </a>
        </Button>
        <Button variant="outline" className="justify-start" asChild>
          <a href={coinData.telegram} target="_blank" rel="noopener noreferrer">
            <MessageSquare className="mr-2 h-4 w-4" />
            Telegram
          </a>
        </Button>
        <Button variant="outline" className="justify-start" asChild>
          <a href={coinData.discord} target="_blank" rel="noopener noreferrer">
            <Discord className="mr-2 h-4 w-4" />
            Discord
          </a>
        </Button>
        <Button variant="outline" className="justify-start" asChild>
          <a href={coinData.github} target="_blank" rel="noopener noreferrer">
            <Github className="mr-2 h-4 w-4" />
            Github
          </a>
        </Button>
      </CardContent>
    </Card>
  )
}
