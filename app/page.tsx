"use client"

import type React from "react"

import { SearchBar } from "@/components/search-bar"
import { TrendingCoins } from "@/components/trending-coins"
import { NetworkSelector } from "@/components/network-selector"
import { ExploreCryptoBox } from "@/components/explore-crypto-box"
import { TopGainers } from "@/components/top-gainers"
import { RecentlyAdded } from "@/components/recently-added"
import { HotPairs } from "@/components/hot-pairs"
import { PumpFunCoins } from "@/components/pump-fun-coins"
import { MainLayout } from "@/components/layouts/main-layout"
import { WalletConnectButton } from "@/components/wallet-connect-button"
import { LiveChatButton } from "@/components/live-chat-button"
import { TrendingColumn } from "@/components/trending-column"
import { Button } from "@/components/ui/button"
import { ArrowRight, Zap, BarChart3, BrainCircuit } from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react"

export default function HomePage() {
  const [stars, setStars] = useState<React.ReactNode[]>([])

  // Generate stars on the client side only to avoid hydration errors
  useEffect(() => {
    const generatedStars = Array.from({ length: 100 }).map((_, i) => (
      <div
        key={i}
        className="absolute rounded-full bg-white"
        style={{
          width: `${Math.random() * 2 + 1}px`,
          height: `${Math.random() * 2 + 1}px`,
          top: `${Math.random() * 100}%`,
          left: `${Math.random() * 100}%`,
          opacity: Math.random() * 0.8 + 0.2,
          animation: `twinkle ${Math.random() * 5 + 5}s infinite ${Math.random() * 5}s`,
        }}
      />
    ))
    setStars(generatedStars)
  }, [])

  return (
    <MainLayout>
      {/* Hero Section with Animated Background */}
    
        {/* Animated particles */}
        <div className="absolute inset-0 z-1">
          <div className="stars-container">{stars}</div>
        </div>
      <div className="container mx-auto px-4 py-6 space-y-6">
        <TrendingColumn />

        {/* Hero content */}
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col items-center justify-center space-y-6 text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-sm mb-2">
              <Zap className="h-4 w-4 mr-2" />
              <span>Powered by AI-driven analytics</span>
            </div>

            <h1 className="text-5xl md:text-6xl font-bold tracking-tight bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 text-transparent bg-clip-text">
              Track Any Cryptocurrency Across Multiple Networks
            </h1>

            <p className="text-xl text-slate-300 max-w-3xl">
              Get real-time data, AI-powered insights, and comprehensive analytics for millions of tokens on BNB,
              Ethereum, Solana, Tron, and Polygon networks
            </p>

            <div className="w-full max-w-2xl mt-8 relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg blur-md opacity-70"></div>
              <div className="relative bg-slate-900 rounded-lg p-1">
                <SearchBar />
              </div>
            </div>
            </div>

            <div className="flex flex-wrap gap-4 justify-center mt-6">
              <Button
                size="lg"
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              >
                <Link href="/trending" className="flex items-center">
                  Explore Trending <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="border-blue-500/50 text-blue-400 hover:bg-blue-950/30">
                <Link href="/ai-insights" className="flex items-center">
                  AI Insights <BrainCircuit className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      

      {/* Network Selector with improved styling */}
      <div className="bg-slate-900/50 backdrop-blur-sm py-6 border-y border-slate-800/50">
        <div className="container mx-auto px-4">
          <NetworkSelector />
        </div>
      </div>

     

      {/* Main Content Section with Sidebar */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Content */}
          <div className="w-full lg:w-3/4 space-y-8">
          



            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-slate-800/30 backdrop-blur-sm rounded-xl border border-slate-700/50 p-6 hover:border-blue-500/30 transition-all duration-300">
                <TrendingCoins />
              </div>
              <div className="bg-slate-800/30 backdrop-blur-sm rounded-xl border border-slate-700/50 p-6 hover:border-purple-500/30 transition-all duration-300">
                <TopGainers />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-slate-800/30 backdrop-blur-sm rounded-xl border border-slate-700/50 p-6 hover:border-pink-500/30 transition-all duration-300">
                <RecentlyAdded />
              </div>
              <div className="bg-slate-800/30 backdrop-blur-sm rounded-xl border border-slate-700/50 p-6 hover:border-indigo-500/30 transition-all duration-300">
                <PumpFunCoins />
              </div>
            </div>

            <div className="w-screen px-0" style={{ width: '1370px' }}>
            <div className="bg-slate-800/30 backdrop-blur-sm rounded-xl border border-slate-700/50 p-6 hover:border-blue-500/30 transition-all duration-300">
              <ExploreCryptoBox />
            </div>
          </div>
          </div>

          {/* Right Sidebar */}
          <div className="w-full lg:w-1/4 space-y-8">
            {/* Features Sidebar with Tabs */}
          

            {/* Wallet Connect Card */}
            <div className="bg-gradient-to-br from-slate-800/60 to-indigo-900/40 backdrop-blur-sm rounded-xl border border-slate-700/50 p-6 hover:border-blue-500/30 transition-all duration-300">
              <div className="flex flex-col items-center space-y-4">
                <div className="bg-blue-500/20 p-3 rounded-full">
                  <BarChart3 className="h-6 w-6 text-blue-400" />
                </div>
                <h3 className="text-xl font-bold text-center">Connect Your Wallet</h3>
                <p className="text-sm text-slate-300 text-center mb-4">
                  Track your portfolio, create watchlists, and access premium features
                </p>
                <WalletConnectButton />
              </div>
            </div>

            {/* Hot Pairs */}
            <div className="bg-slate-800/30 backdrop-blur-sm rounded-xl border border-slate-700/50 p-6 hover:border-purple-500/30 transition-all duration-300">
              <HotPairs />
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="relative py-16 bg-gradient-to-b from-indigo-950/80 to-slate-900/80">
        <div className="container mx-auto px-4">
          <div className="bg-gradient-to-br from-slate-800/60 to-indigo-900/40 backdrop-blur-sm rounded-xl border border-slate-700/50 p-8 md:p-12 max-w-4xl mx-auto relative overflow-hidden">
            {/* Animated glow effect */}
            <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl blur opacity-20 animate-pulse-glow"></div>

            <div className="relative">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center bg-gradient-to-r from-blue-400 to-purple-400 text-transparent bg-clip-text">
                Ready to Elevate Your Crypto Trading?
              </h2>
              <p className="text-slate-300 text-center mb-8 max-w-2xl mx-auto">
                Join thousands of traders who use our platform to make smarter investment decisions with real-time data
                and AI-powered insights.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                >
                  <Link href="/apply-trending" className="flex items-center">
                    Apply for Free Trending
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="border-blue-500/50 text-blue-400 hover:bg-blue-950/30">
                  <Link href="/advertise" className="flex items-center">
                    Advertise With Us
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <LiveChatButton />

      {/* Animation keyframes for stars */}
      <style jsx global>{`
        @keyframes twinkle {
          0%, 100% { opacity: 0.2; }
          50% { opacity: 1; }
        }
        
        @keyframes pulse-glow {
          0%, 100% { opacity: 0.2; }
          50% { opacity: 0.4; }
        }
        
        .animate-pulse-glow {
          animation: pulse-glow 3s ease-in-out infinite;
        }
      `}</style>
    </MainLayout>
  )
}


