"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { TrendingUp, BrainCircuit, Shield, BarChart3, Bell } from "lucide-react"
import Link from "next/link"

export function FeaturesSidebar() {
  const [activeTab, setActiveTab] = useState("analytics")

  return (
    <Card className="border border-slate-700/50 bg-slate-800/30 backdrop-blur-sm overflow-hidden">
      <div className="p-4 border-b border-slate-700/50">
        <h3 className="text-lg font-bold">Powerful Features</h3>
      </div>

      <Tabs defaultValue="analytics" value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-5 bg-slate-800/50 p-0 h-auto">
          <TabsTrigger
            value="analytics"
            className={`py-2 px-0 data-[state=active]:bg-blue-500/20 data-[state=active]:text-blue-400 data-[state=active]:shadow-none rounded-none border-r border-slate-700/50`}
          >
            <TrendingUp className="h-4 w-4" />
          </TabsTrigger>
          <TabsTrigger
            value="ai"
            className={`py-2 px-0 data-[state=active]:bg-purple-500/20 data-[state=active]:text-purple-400 data-[state=active]:shadow-none rounded-none border-r border-slate-700/50`}
          >
            <BrainCircuit className="h-4 w-4" />
          </TabsTrigger>
          <TabsTrigger
            value="security"
            className={`py-2 px-0 data-[state=active]:bg-green-500/20 data-[state=active]:text-green-400 data-[state=active]:shadow-none rounded-none border-r border-slate-700/50`}
          >
            <Shield className="h-4 w-4" />
          </TabsTrigger>
          <TabsTrigger
            value="trading"
            className={`py-2 px-0 data-[state=active]:bg-amber-500/20 data-[state=active]:text-amber-400 data-[state=active]:shadow-none rounded-none border-r border-slate-700/50`}
          >
            <BarChart3 className="h-4 w-4" />
          </TabsTrigger>
          <TabsTrigger
            value="alerts"
            className={`py-2 px-0 data-[state=active]:bg-pink-500/20 data-[state=active]:text-pink-400 data-[state=active]:shadow-none rounded-none`}
          >
            <Bell className="h-4 w-4" />
          </TabsTrigger>
        </TabsList>

        <TabsContent value="analytics" className="m-0 p-4">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="bg-blue-500/20 p-2 rounded-full">
                <TrendingUp className="h-5 w-5 text-blue-400" />
              </div>
              <h4 className="font-medium">Real-Time Analytics</h4>
            </div>
            <p className="text-sm text-slate-300">
              Track price movements, trading volume, and market trends as they happen across multiple networks.
            </p>
            <div className="bg-blue-500/10 rounded-lg p-3 border border-blue-500/20">
              <div className="text-sm font-medium text-blue-400 mb-2">Featured Tool</div>
              <div className="text-xs text-slate-300 mb-3">
                Try our advanced charting tools with technical indicators and pattern recognition.
              </div>
              <Button
                size="sm"
                variant="outline"
                className="w-full border-blue-500/30 text-blue-400 hover:bg-blue-950/30"
              >
                <Link href="/trending">Explore Charts</Link>
              </Button>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="ai" className="m-0 p-4">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="bg-purple-500/20 p-2 rounded-full">
                <BrainCircuit className="h-5 w-5 text-purple-400" />
              </div>
              <h4 className="font-medium">AI-Powered Insights</h4>
            </div>
            <p className="text-sm text-slate-300">
              Get intelligent predictions and analysis to help you identify opportunities and risks.
            </p>
            <div className="bg-purple-500/10 rounded-lg p-3 border border-purple-500/20">
              <div className="text-sm font-medium text-purple-400 mb-2">AI Assistant</div>
              <div className="text-xs text-slate-300 mb-3">
                Ask our AI about any token or market trend and get instant analysis.
              </div>
              <Button
                size="sm"
                variant="outline"
                className="w-full border-purple-500/30 text-purple-400 hover:bg-purple-950/30"
              >
                <Link href="/ai-insights">Try AI Insights</Link>
              </Button>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="security" className="m-0 p-4">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="bg-green-500/20 p-2 rounded-full">
                <Shield className="h-5 w-5 text-green-400" />
              </div>
              <h4 className="font-medium">Security Audits</h4>
            </div>
            <p className="text-sm text-slate-300">
              Verify token contracts and check for potential security risks before investing.
            </p>
            <div className="bg-green-500/10 rounded-lg p-3 border border-green-500/20">
              <div className="text-sm font-medium text-green-400 mb-2">Contract Scanner</div>
              <div className="text-xs text-slate-300 mb-3">
                Scan any token contract for vulnerabilities, backdoors, and honeypot risks.
              </div>
              <Button
                size="sm"
                variant="outline"
                className="w-full border-green-500/30 text-green-400 hover:bg-green-950/30"
              >
                <Link href="/security-scanner">Scan Contract</Link>
              </Button>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="trading" className="m-0 p-4">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="bg-amber-500/20 p-2 rounded-full">
                <BarChart3 className="h-5 w-5 text-amber-400" />
              </div>
              <h4 className="font-medium">Trading Tools</h4>
            </div>
            <p className="text-sm text-slate-300">
              Access advanced trading tools and DEX aggregators for the best swap rates.
            </p>
            <div className="bg-amber-500/10 rounded-lg p-3 border border-amber-500/20">
              <div className="text-sm font-medium text-amber-400 mb-2">DEX Aggregator</div>
              <div className="text-xs text-slate-300 mb-3">
                Find the best swap rates across multiple DEXes with minimal slippage.
              </div>
              <Button
                size="sm"
                variant="outline"
                className="w-full border-amber-500/30 text-amber-400 hover:bg-amber-950/30"
              >
                <Link href="/swap">Swap Tokens</Link>
              </Button>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="alerts" className="m-0 p-4">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="bg-pink-500/20 p-2 rounded-full">
                <Bell className="h-5 w-5 text-pink-400" />
              </div>
              <h4 className="font-medium">Price Alerts</h4>
            </div>
            <p className="text-sm text-slate-300">
              Set custom price alerts and get notified when tokens hit your target prices.
            </p>
            <div className="bg-pink-500/10 rounded-lg p-3 border border-pink-500/20">
              <div className="text-sm font-medium text-pink-400 mb-2">Alert System</div>
              <div className="text-xs text-slate-300 mb-3">
                Create custom alerts for price movements, volume spikes, and whale transactions.
              </div>
              <Button
                size="sm"
                variant="outline"
                className="w-full border-pink-500/30 text-pink-400 hover:bg-pink-950/30"
              >
                <Link href="/alerts">Set Alerts</Link>
              </Button>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </Card>
  )
}
