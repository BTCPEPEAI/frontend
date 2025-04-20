"use client"

import { useState } from "react"
import { AdminLayout } from "@/components/layouts/admin-layout"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"
import {
  Save,
  RefreshCw,
  AlertTriangle,
  CheckCircle2,
  BrainCircuit,
  Zap,
  Database,
  BarChart3,
  LineChart,
  Sparkles,
  Shield,
  MessageSquare,
} from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { useRouter } from "next/navigation"

export default function AIInsightsControlPage() {
  const { toast } = useToast()
  const [aiEnabled, setAiEnabled] = useState(true)
  const [insightLength, setInsightLength] = useState(150)
  const [insightTone, setInsightTone] = useState("balanced")
  const [riskDetection, setRiskDetection] = useState(true)
  const [autoRefresh, setAutoRefresh] = useState(true)
  const [refreshInterval, setRefreshInterval] = useState("30")
  const [apiKey, setApiKey] = useState("sk-••••••••••••••••••••••••••••••")
  const [modelVersion, setModelVersion] = useState("gpt-4o")
  const [saving, setSaving] = useState(false)
  const [activeTab, setActiveTab] = useState("general")
  const [usageProgress, setUsageProgress] = useState(68)
  const router = useRouter()

  // AI Features state
  const [priceAnalysisEnabled, setPriceAnalysisEnabled] = useState(true)
  const [sentimentAnalysisEnabled, setSentimentAnalysisEnabled] = useState(true)
  const [tradingSignalsEnabled, setTradingSignalsEnabled] = useState(true)
  const [marketTrendsEnabled, setMarketTrendsEnabled] = useState(true)
  const [communityInsightsEnabled, setCommunityInsightsEnabled] = useState(true)
  const [predictionEnabled, setPredictionEnabled] = useState(false)

  const handleSaveSettings = async () => {
    setSaving(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setSaving(false)

    toast({
      title: "Settings saved",
      description: "AI Insights settings have been updated successfully.",
    })
  }

  const handleResetDefaults = () => {
    setInsightLength(150)
    setInsightTone("balanced")
    setRiskDetection(true)
    setAutoRefresh(true)
    setRefreshInterval("30")
    setModelVersion("gpt-4o")
    setPriceAnalysisEnabled(true)
    setSentimentAnalysisEnabled(true)
    setTradingSignalsEnabled(true)
    setMarketTrendsEnabled(true)
    setCommunityInsightsEnabled(true)
    setPredictionEnabled(false)

    toast({
      title: "Defaults restored",
      description: "AI Insights settings have been reset to default values.",
    })
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold flex items-center">
              <BrainCircuit className="mr-2 h-8 w-8 text-primary" />
              AI Insights Control
            </h1>
            <p className="text-muted-foreground">Manage AI-powered insights and analysis settings</p>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Label htmlFor="ai-enabled" className="font-medium">
                AI Insights
              </Label>
              <Switch id="ai-enabled" checked={aiEnabled} onCheckedChange={setAiEnabled} />
            </div>
            <Button variant="default" onClick={handleSaveSettings} disabled={saving}>
              {saving ? (
                <>
                  <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="mr-2 h-4 w-4" />
                  Save Settings
                </>
              )}
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="md:col-span-2">
            <CardHeader className="pb-3">
              <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid grid-cols-5 w-full">
                  <TabsTrigger value="general">General</TabsTrigger>
                  <TabsTrigger value="features">Features</TabsTrigger>
                  <TabsTrigger value="risk">Risk Analysis</TabsTrigger>
                  <TabsTrigger value="models">AI Models</TabsTrigger>
                  <TabsTrigger value="data">Data Sources</TabsTrigger>
                </TabsList>
              </Tabs>
            </CardHeader>
            <CardContent>
              <TabsContent value="general" className="mt-0 space-y-4">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="auto-refresh">Auto Refresh</Label>
                        <p className="text-sm text-muted-foreground">Automatically refresh insights periodically</p>
                      </div>
                      <Switch id="auto-refresh" checked={autoRefresh} onCheckedChange={setAutoRefresh} />
                    </div>

                    {autoRefresh && (
                      <div className="pt-2">
                        <Label htmlFor="refresh-interval">Refresh Interval (minutes)</Label>
                        <Select value={refreshInterval} onValueChange={setRefreshInterval}>
                          <SelectTrigger id="refresh-interval">
                            <SelectValue placeholder="Select interval" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="5">5 minutes</SelectItem>
                            <SelectItem value="15">15 minutes</SelectItem>
                            <SelectItem value="30">30 minutes</SelectItem>
                            <SelectItem value="60">1 hour</SelectItem>
                            <SelectItem value="360">6 hours</SelectItem>
                            <SelectItem value="720">12 hours</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="insight-length">Insight Length (words): {insightLength}</Label>
                    <Slider
                      id="insight-length"
                      min={50}
                      max={300}
                      step={10}
                      value={[insightLength]}
                      onValueChange={(value) => setInsightLength(value[0])}
                    />
                    <p className="text-sm text-muted-foreground">Adjust the length of AI-generated insights</p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="insight-tone">Insight Tone</Label>
                    <Select value={insightTone} onValueChange={setInsightTone}>
                      <SelectTrigger id="insight-tone">
                        <SelectValue placeholder="Select tone" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="conservative">Conservative</SelectItem>
                        <SelectItem value="balanced">Balanced</SelectItem>
                        <SelectItem value="bullish">Bullish</SelectItem>
                        <SelectItem value="technical">Technical</SelectItem>
                        <SelectItem value="simplified">Simplified</SelectItem>
                      </SelectContent>
                    </Select>
                    <p className="text-sm text-muted-foreground">Set the tone and style of AI-generated insights</p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="disclaimer">AI Disclaimer Text</Label>
                    <Textarea
                      id="disclaimer"
                      placeholder="Disclaimer text shown with AI insights"
                      defaultValue="AI-generated insights are for informational purposes only and should not be considered financial advice."
                      rows={3}
                    />
                    <p className="text-sm text-muted-foreground">This text will be displayed alongside AI insights</p>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="features" className="mt-0 space-y-4">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="bg-primary/10 p-2 rounded-full">
                        <BarChart3 className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <Label>Price Analysis</Label>
                        <p className="text-sm text-muted-foreground">AI-powered price predictions and analysis</p>
                      </div>
                    </div>
                    <Switch
                      checked={priceAnalysisEnabled}
                      onCheckedChange={setPriceAnalysisEnabled}
                      disabled={!aiEnabled}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="bg-primary/10 p-2 rounded-full">
                        <MessageSquare className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <Label>Sentiment Analysis</Label>
                        <p className="text-sm text-muted-foreground">Social media and community sentiment tracking</p>
                      </div>
                    </div>
                    <Switch
                      checked={sentimentAnalysisEnabled}
                      onCheckedChange={setSentimentAnalysisEnabled}
                      disabled={!aiEnabled}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="bg-primary/10 p-2 rounded-full">
                        <Shield className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <Label>Risk Analysis</Label>
                        <p className="text-sm text-muted-foreground">Token risk assessment and security alerts</p>
                      </div>
                    </div>
                    <Switch checked={riskDetection} onCheckedChange={setRiskDetection} disabled={!aiEnabled} />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="bg-primary/10 p-2 rounded-full">
                        <LineChart className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <Label>Trading Signals</Label>
                        <p className="text-sm text-muted-foreground">Buy/sell signals based on technical analysis</p>
                      </div>
                    </div>
                    <Switch
                      checked={tradingSignalsEnabled}
                      onCheckedChange={setTradingSignalsEnabled}
                      disabled={!aiEnabled}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="bg-primary/10 p-2 rounded-full">
                        <Zap className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <Label>Market Trends</Label>
                        <p className="text-sm text-muted-foreground">AI-generated market trend analysis</p>
                      </div>
                    </div>
                    <Switch
                      checked={marketTrendsEnabled}
                      onCheckedChange={setMarketTrendsEnabled}
                      disabled={!aiEnabled}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="bg-primary/10 p-2 rounded-full">
                        <Sparkles className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <Label>Price Predictions</Label>
                        <p className="text-sm text-muted-foreground">AI-generated price forecasts</p>
                      </div>
                    </div>
                    <Switch checked={predictionEnabled} onCheckedChange={setPredictionEnabled} disabled={!aiEnabled} />
                  </div>

                  {predictionEnabled && (
                    <div className="flex items-center p-3 bg-amber-50 text-amber-800 rounded-md">
                      <AlertTriangle className="h-5 w-5 mr-2 flex-shrink-0" />
                      <p className="text-sm">
                        Price predictions are experimental and should be used with caution. Always include appropriate
                        disclaimers.
                      </p>
                    </div>
                  )}
                </div>
              </TabsContent>

              <TabsContent value="risk" className="mt-0 space-y-4">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Risk Sensitivity</Label>
                    <div className="flex items-center gap-4">
                      <Slider min={1} max={5} step={1} defaultValue={[3]} className="flex-1" />
                      <span className="w-12 text-center">3/5</span>
                    </div>
                    <p className="text-sm text-muted-foreground">Adjust how sensitive the risk detection should be</p>
                  </div>

                  <div className="space-y-2">
                    <Label>Risk Alert Display</Label>
                    <Select defaultValue="banner">
                      <SelectTrigger>
                        <SelectValue placeholder="Select display type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="banner">Top Banner</SelectItem>
                        <SelectItem value="modal">Modal Popup</SelectItem>
                        <SelectItem value="inline">Inline Warning</SelectItem>
                        <SelectItem value="badge">Risk Badge Only</SelectItem>
                      </SelectContent>
                    </Select>
                    <p className="text-sm text-muted-foreground">How risk warnings are displayed to users</p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="high-risk-message">High Risk Warning Message</Label>
                    <Textarea
                      id="high-risk-message"
                      placeholder="Warning message for high-risk tokens"
                      defaultValue="CAUTION: This token has been flagged as high-risk by our AI analysis. Trade with extreme caution."
                      rows={3}
                    />
                  </div>

                  <div className="space-y-4 pt-2">
                    <Label>Risk Factors to Analyze</Label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-2">
                      <div className="flex items-center space-x-2">
                        <Switch id="contract-analysis" defaultChecked />
                        <Label htmlFor="contract-analysis">Contract Analysis</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Switch id="liquidity-analysis" defaultChecked />
                        <Label htmlFor="liquidity-analysis">Liquidity Analysis</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Switch id="ownership-analysis" defaultChecked />
                        <Label htmlFor="ownership-analysis">Ownership Analysis</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Switch id="trading-pattern" defaultChecked />
                        <Label htmlFor="trading-pattern">Trading Pattern Analysis</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Switch id="social-signals" defaultChecked />
                        <Label htmlFor="social-signals">Social Signals</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Switch id="team-verification" defaultChecked />
                        <Label htmlFor="team-verification">Team Verification</Label>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="models" className="mt-0 space-y-4">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>AI Model</Label>
                    <Select value={modelVersion} onValueChange={setModelVersion}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select AI model" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="gpt-4o">GPT-4o (Recommended)</SelectItem>
                        <SelectItem value="gpt-4">GPT-4</SelectItem>
                        <SelectItem value="gpt-3.5-turbo">GPT-3.5 Turbo</SelectItem>
                        <SelectItem value="claude-3-opus">Claude 3 Opus</SelectItem>
                        <SelectItem value="claude-3-sonnet">Claude 3 Sonnet</SelectItem>
                      </SelectContent>
                    </Select>
                    <p className="text-sm text-muted-foreground">
                      Select which AI model to use for generating insights
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="api-key">API Key</Label>
                    <Input id="api-key" value={apiKey} onChange={(e) => setApiKey(e.target.value)} type="password" />
                    <p className="text-sm text-muted-foreground">Your OpenAI API key for generating insights</p>
                  </div>

                  <div className="space-y-2">
                    <Label>Temperature</Label>
                    <div className="flex items-center gap-4">
                      <Slider min={0} max={1} step={0.1} defaultValue={[0.7]} className="flex-1" />
                      <span className="w-12 text-center">0.7</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Lower values produce more consistent, conservative insights. Higher values produce more creative,
                      varied insights.
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="max-tokens">Max Tokens per Response</Label>
                    <Input id="max-tokens" type="number" defaultValue="1024" min="256" max="4096" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="custom-prompt">Custom System Prompt</Label>
                    <Textarea
                      id="custom-prompt"
                      placeholder="Custom system prompt for AI model"
                      rows={4}
                      defaultValue="You are an expert cryptocurrency analyst providing insights on tokens. Focus on technical analysis, on-chain metrics, and market sentiment. Be balanced in your assessment and highlight both potential risks and opportunities."
                    />
                    <p className="text-xs text-muted-foreground mt-1">Customize the base prompt used for AI analysis</p>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="data" className="mt-0 space-y-4">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Price Data Source</Label>
                    <Select defaultValue="internal">
                      <SelectTrigger>
                        <SelectValue placeholder="Select data source" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="internal">Internal Data (Default)</SelectItem>
                        <SelectItem value="coingecko">CoinGecko API</SelectItem>
                        <SelectItem value="coinmarketcap">CoinMarketCap API</SelectItem>
                        <SelectItem value="dexscreener">DexScreener API</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Social Data Sources</Label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-2">
                      <div className="flex items-center space-x-2">
                        <Switch id="twitter-data" defaultChecked />
                        <Label htmlFor="twitter-data">Twitter/X</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Switch id="telegram-data" defaultChecked />
                        <Label htmlFor="telegram-data">Telegram</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Switch id="reddit-data" defaultChecked />
                        <Label htmlFor="reddit-data">Reddit</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Switch id="discord-data" defaultChecked />
                        <Label htmlFor="discord-data">Discord</Label>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Data Refresh Rate</Label>
                    <Select defaultValue="hourly">
                      <SelectTrigger>
                        <SelectValue placeholder="Select refresh rate" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="realtime">Real-time</SelectItem>
                        <SelectItem value="hourly">Hourly</SelectItem>
                        <SelectItem value="daily">Daily</SelectItem>
                        <SelectItem value="manual">Manual Only</SelectItem>
                      </SelectContent>
                    </Select>
                    <p className="text-sm text-muted-foreground">How often to refresh data from external sources</p>
                  </div>

                  <div className="space-y-2">
                    <Label>Historical Data Range</Label>
                    <Select defaultValue="30d">
                      <SelectTrigger>
                        <SelectValue placeholder="Select data range" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="7d">7 days</SelectItem>
                        <SelectItem value="30d">30 days</SelectItem>
                        <SelectItem value="90d">90 days</SelectItem>
                        <SelectItem value="1y">1 year</SelectItem>
                        <SelectItem value="all">All available data</SelectItem>
                      </SelectContent>
                    </Select>
                    <p className="text-sm text-muted-foreground">How much historical data to include in analysis</p>
                  </div>
                </div>
              </TabsContent>
            </CardContent>
            <CardFooter className="border-t pt-6 flex justify-between">
              <Button variant="outline" onClick={handleResetDefaults}>
                <RefreshCw className="mr-2 h-4 w-4" />
                Reset to Defaults
              </Button>
              <Button variant="default" onClick={handleSaveSettings} disabled={saving}>
                {saving ? (
                  <>
                    <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="mr-2 h-4 w-4" />
                    Save Settings
                  </>
                )}
              </Button>
            </CardFooter>
          </Card>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>AI Usage</CardTitle>
                <CardDescription>Current usage and limits</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>API Usage</span>
                    <span className="font-medium">{usageProgress}%</span>
                  </div>
                  <Progress value={usageProgress} className="h-2" />
                  <p className="text-xs text-muted-foreground">
                    {usageProgress < 80 ? "Usage within limits" : "Approaching usage limit"}
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Tokens Used</span>
                    <span className="font-medium">1.2M / 2M</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Requests</span>
                    <span className="font-medium">8,432 / 10,000</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Reset Date</span>
                    <span className="font-medium">May 1, 2025</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>AI Insights Status</CardTitle>
                <CardDescription>Current operational status</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {aiEnabled ? (
                    <div className="flex items-center p-3 bg-green-50 text-green-800 rounded-md">
                      <CheckCircle2 className="h-5 w-5 mr-2 flex-shrink-0" />
                      <div>
                        <p className="font-medium">AI Insights are enabled</p>
                        <p className="text-sm">Users can see AI-powered analysis</p>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center p-3 bg-amber-50 text-amber-800 rounded-md">
                      <AlertTriangle className="h-5 w-5 mr-2 flex-shrink-0" />
                      <div>
                        <p className="font-medium">AI Insights are disabled</p>
                        <p className="text-sm">Users will not see any AI analysis</p>
                      </div>
                    </div>
                  )}

                  <div className="space-y-2">
                    <Label>Active Features</Label>
                    <ScrollArea className="h-[120px] rounded-md border p-2">
                      <div className="space-y-2">
                        {priceAnalysisEnabled && (
                          <Badge variant="outline" className="mr-2 mb-2">
                            Price Analysis
                          </Badge>
                        )}
                        {sentimentAnalysisEnabled && (
                          <Badge variant="outline" className="mr-2 mb-2">
                            Sentiment Analysis
                          </Badge>
                        )}
                        {riskDetection && (
                          <Badge variant="outline" className="mr-2 mb-2">
                            Risk Analysis
                          </Badge>
                        )}
                        {tradingSignalsEnabled && (
                          <Badge variant="outline" className="mr-2 mb-2">
                            Trading Signals
                          </Badge>
                        )}
                        {marketTrendsEnabled && (
                          <Badge variant="outline" className="mr-2 mb-2">
                            Market Trends
                          </Badge>
                        )}
                        {communityInsightsEnabled && (
                          <Badge variant="outline" className="mr-2 mb-2">
                            Community Insights
                          </Badge>
                        )}
                        {predictionEnabled && (
                          <Badge variant="outline" className="mr-2 mb-2">
                            Price Predictions
                          </Badge>
                        )}
                        {!priceAnalysisEnabled &&
                          !sentimentAnalysisEnabled &&
                          !riskDetection &&
                          !tradingSignalsEnabled &&
                          !marketTrendsEnabled &&
                          !communityInsightsEnabled &&
                          !predictionEnabled && (
                            <div className="text-sm text-muted-foreground py-2">No features currently active</div>
                          )}
                      </div>
                    </ScrollArea>
                  </div>

                  <div className="pt-2">
                    <Button variant="outline" className="w-full" onClick={() => router.push("/admin/ai-logs")}>
                      <Database className="mr-2 h-4 w-4" />
                      View AI Logs
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}
