"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { AdminLayout } from "@/components/layouts/admin-layout"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { useToast } from "@/components/ui/use-toast"
import { Search, MessageSquare, Globe, Smartphone, Laptop, RefreshCw, Send, X, User } from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"

// Mock data for live visitors
const generateMockVisitors = () => {
  const countries = [
    "United States",
    "United Kingdom",
    "Germany",
    "Canada",
    "Australia",
    "Japan",
    "Brazil",
    "India",
    "France",
    "Spain",
  ]
  const pages = ["/", "/trending", "/coin/0x1234", "/top-gainers", "/watchlist", "/hot-pairs", "/new-listings"]
  const devices = ["Desktop", "Mobile", "Tablet"]
  const browsers = ["Chrome", "Firefox", "Safari", "Edge"]
  const referrers = ["Direct", "Google", "Twitter", "Facebook", "Reddit", "Telegram"]

  return Array.from({ length: 25 }, (_, i) => ({
    id: `visitor-${i + 1}`,
    ipAddress: `${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`,
    country: countries[Math.floor(Math.random() * countries.length)],
    currentPage: pages[Math.floor(Math.random() * pages.length)],
    device: devices[Math.floor(Math.random() * devices.length)],
    browser: browsers[Math.floor(Math.random() * browsers.length)],
    referrer: referrers[Math.floor(Math.random() * referrers.length)],
    timeOnSite: Math.floor(Math.random() * 30) + 1,
    pagesViewed: Math.floor(Math.random() * 10) + 1,
    isActive: Math.random() > 0.3,
    lastActive: new Date(Date.now() - Math.floor(Math.random() * 1000 * 60 * 30)).toISOString(),
  }))
}

export default function TrafficMonitoringPage() {
  const { toast } = useToast()
  const [visitors, setVisitors] = useState(generateMockVisitors())
  const [loading, setLoading] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState("live")
  const [selectedVisitor, setSelectedVisitor] = useState<string | null>(null)
  const [chatMessage, setChatMessage] = useState("")
  const [chatMessages, setChatMessages] = useState<{
    [key: string]: { id: number; content: string; sender: "admin" | "user"; timestamp: Date }[]
  }>({})
  const [refreshing, setRefreshing] = useState(false)

  // Filter visitors based on search query
  const filteredVisitors = visitors.filter(
    (visitor) =>
      visitor.ipAddress.includes(searchQuery) ||
      visitor.country.toLowerCase().includes(searchQuery.toLowerCase()) ||
      visitor.currentPage.toLowerCase().includes(searchQuery.toLowerCase()) ||
      visitor.device.toLowerCase().includes(searchQuery.toLowerCase()) ||
      visitor.browser.toLowerCase().includes(searchQuery.toLowerCase()) ||
      visitor.referrer.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  // Refresh visitors data
  const handleRefresh = async () => {
    setRefreshing(true)
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setVisitors(generateMockVisitors())
    setRefreshing(false)

    toast({
      title: "Data refreshed",
      description: "Live visitor data has been updated.",
    })
  }

  // Initialize chat with a visitor
  const handleInitChat = (visitorId: string) => {
    setSelectedVisitor(visitorId)

    // Initialize chat if it doesn't exist
    if (!chatMessages[visitorId]) {
      setChatMessages((prev) => ({
        ...prev,
        [visitorId]: [
          {
            id: 1,
            content: "Hello! How can I assist you with DEXPRICE AI today?",
            sender: "admin",
            timestamp: new Date(),
          },
        ],
      }))
    }
  }

  // Send a chat message
  const handleSendMessage = () => {
    if (!selectedVisitor || !chatMessage.trim()) return

    // Add admin message
    const newMessage = {
      id: (chatMessages[selectedVisitor]?.length || 0) + 1,
      content: chatMessage,
      sender: "admin" as const,
      timestamp: new Date(),
    }

    setChatMessages((prev) => ({
      ...prev,
      [selectedVisitor]: [...(prev[selectedVisitor] || []), newMessage],
    }))
    setChatMessage("")

    // Simulate user response after a delay
    setTimeout(
      () => {
        const userResponses = [
          "Thanks for reaching out! I'm just browsing the trending coins.",
          "I'm looking for information about new token listings.",
          "How do I connect my wallet to track my portfolio?",
          "Is there a way to get notifications for price alerts?",
          "I'm having trouble finding the audit information for this token.",
        ]

        const randomResponse = userResponses[Math.floor(Math.random() * userResponses.length)]

        const userMessage = {
          id: (chatMessages[selectedVisitor]?.length || 0) + 2,
          content: randomResponse,
          sender: "user" as const,
          timestamp: new Date(),
        }

        setChatMessages((prev) => ({
          ...prev,
          [selectedVisitor]: [...(prev[selectedVisitor] || []), userMessage],
        }))
      },
      1000 + Math.random() * 2000,
    )
  }

  // Handle key press in chat input
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  // Close chat
  const handleCloseChat = () => {
    setSelectedVisitor(null)
  }

  // Simulate periodic updates
  useEffect(() => {
    const interval = setInterval(() => {
      setVisitors((prev) => {
        const updated = [...prev]
        // Update a random visitor's activity
        const randomIndex = Math.floor(Math.random() * updated.length)
        updated[randomIndex] = {
          ...updated[randomIndex],
          isActive: Math.random() > 0.3,
          lastActive: new Date().toISOString(),
          currentPage: ["/", "/trending", "/coin/0x1234", "/top-gainers", "/watchlist"][Math.floor(Math.random() * 5)],
          timeOnSite: updated[randomIndex].timeOnSite + 1,
          pagesViewed: Math.min(updated[randomIndex].pagesViewed + (Math.random() > 0.7 ? 1 : 0), 20),
        }
        return updated
      })
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold">Traffic Monitoring</h1>
            <p className="text-muted-foreground">Monitor real-time visitor activity and engage with users</p>
          </div>

          <Button onClick={handleRefresh} disabled={refreshing}>
            {refreshing ? (
              <>
                <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                Refreshing...
              </>
            ) : (
              <>
                <RefreshCw className="mr-2 h-4 w-4" />
                Refresh Data
              </>
            )}
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Active Visitors</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{visitors.filter((v) => v.isActive).length}</div>
              <p className="text-sm text-muted-foreground">Currently browsing the platform</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Visitors Today</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1,247</div>
              <p className="text-sm text-muted-foreground">+12% from yesterday</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Active Chats</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{Object.keys(chatMessages).length}</div>
              <p className="text-sm text-muted-foreground">Ongoing support conversations</p>
            </CardContent>
          </Card>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList>
            <TabsTrigger value="live">Live Visitors</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="sources">Traffic Sources</TabsTrigger>
          </TabsList>

          <TabsContent value="live" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Live Visitors</CardTitle>
                <CardDescription>Real-time view of users currently on the platform</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col md:flex-row gap-4 mb-6">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search by IP, country, page..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>

                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Visitor</TableHead>
                        <TableHead>Current Page</TableHead>
                        <TableHead>Device</TableHead>
                        <TableHead>Time on Site</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredVisitors.map((visitor) => (
                        <TableRow key={visitor.id}>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Avatar className="h-8 w-8">
                                <AvatarFallback>{visitor.country.substring(0, 2)}</AvatarFallback>
                              </Avatar>
                              <div>
                                <div className="font-medium">{visitor.ipAddress}</div>
                                <div className="text-xs text-muted-foreground">{visitor.country}</div>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="font-medium">{visitor.currentPage}</div>
                            <div className="text-xs text-muted-foreground">{visitor.pagesViewed} pages viewed</div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center">
                              {visitor.device === "Desktop" && <Laptop className="h-4 w-4 mr-1" />}
                              {visitor.device === "Mobile" && <Smartphone className="h-4 w-4 mr-1" />}
                              {visitor.device === "Tablet" && <Tablet className="h-4 w-4 mr-1" />}
                              <span>{visitor.device}</span>
                            </div>
                            <div className="text-xs text-muted-foreground">{visitor.browser}</div>
                          </TableCell>
                          <TableCell>
                            <div className="font-medium">{visitor.timeOnSite} min</div>
                            <div className="text-xs text-muted-foreground">
                              {visitor.isActive
                                ? "Currently active"
                                : `Last active ${new Date(visitor.lastActive).toLocaleTimeString()}`}
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge variant={visitor.isActive ? "default" : "secondary"}>
                              {visitor.isActive ? "Active" : "Inactive"}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleInitChat(visitor.id)}
                              className="text-primary"
                            >
                              <MessageSquare className="h-4 w-4 mr-1" />
                              Chat
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Traffic Analytics</CardTitle>
                <CardDescription>Visitor statistics and trends</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Card>
                      <CardContent className="pt-6">
                        <div className="text-center">
                          <div className="text-2xl font-bold">28,945</div>
                          <p className="text-sm text-muted-foreground">Total Visits (30 days)</p>
                        </div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="pt-6">
                        <div className="text-center">
                          <div className="text-2xl font-bold">3:42</div>
                          <p className="text-sm text-muted-foreground">Avg. Session Duration</p>
                        </div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="pt-6">
                        <div className="text-center">
                          <div className="text-2xl font-bold">4.8</div>
                          <p className="text-sm text-muted-foreground">Pages per Session</p>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-lg font-medium">Most Visited Pages</h3>
                    <div className="rounded-md border">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Page</TableHead>
                            <TableHead className="text-right">Visitors</TableHead>
                            <TableHead className="text-right">Avg. Time</TableHead>
                            <TableHead className="text-right">Bounce Rate</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          <TableRow>
                            <TableCell>Homepage</TableCell>
                            <TableCell className="text-right">12,458</TableCell>
                            <TableCell className="text-right">2:15</TableCell>
                            <TableCell className="text-right">32%</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>Trending Coins</TableCell>
                            <TableCell className="text-right">8,932</TableCell>
                            <TableCell className="text-right">4:05</TableCell>
                            <TableCell className="text-right">18%</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>Top Gainers</TableCell>
                            <TableCell className="text-right">6,547</TableCell>
                            <TableCell className="text-right">3:22</TableCell>
                            <TableCell className="text-right">24%</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>Hot Pairs</TableCell>
                            <TableCell className="text-right">5,128</TableCell>
                            <TableCell className="text-right">2:58</TableCell>
                            <TableCell className="text-right">27%</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>Watchlist</TableCell>
                            <TableCell className="text-right">3,845</TableCell>
                            <TableCell className="text-right">5:12</TableCell>
                            <TableCell className="text-right">12%</TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="sources" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Traffic Sources</CardTitle>
                <CardDescription>Where your visitors are coming from</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <h3 className="text-lg font-medium mb-4">Top Referrers</h3>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <Globe className="h-4 w-4 mr-2 text-muted-foreground" />
                            <span>Direct</span>
                          </div>
                          <div className="flex items-center">
                            <span className="font-medium mr-2">42%</span>
                            <div className="w-24 h-2 bg-muted rounded-full overflow-hidden">
                              <div className="h-full bg-primary" style={{ width: "42%" }}></div>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <Globe className="h-4 w-4 mr-2 text-muted-foreground" />
                            <span>Google</span>
                          </div>
                          <div className="flex items-center">
                            <span className="font-medium mr-2">28%</span>
                            <div className="w-24 h-2 bg-muted rounded-full overflow-hidden">
                              <div className="h-full bg-primary" style={{ width: "28%" }}></div>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <Globe className="h-4 w-4 mr-2 text-muted-foreground" />
                            <span>Twitter</span>
                          </div>
                          <div className="flex items-center">
                            <span className="font-medium mr-2">15%</span>
                            <div className="w-24 h-2 bg-muted rounded-full overflow-hidden">
                              <div className="h-full bg-primary" style={{ width: "15%" }}></div>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <Globe className="h-4 w-4 mr-2 text-muted-foreground" />
                            <span>Telegram</span>
                          </div>
                          <div className="flex items-center">
                            <span className="font-medium mr-2">8%</span>
                            <div className="w-24 h-2 bg-muted rounded-full overflow-hidden">
                              <div className="h-full bg-primary" style={{ width: "8%" }}></div>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <Globe className="h-4 w-4 mr-2 text-muted-foreground" />
                            <span>Other</span>
                          </div>
                          <div className="flex items-center">
                            <span className="font-medium mr-2">7%</span>
                            <div className="w-24 h-2 bg-muted rounded-full overflow-hidden">
                              <div className="h-full bg-primary" style={{ width: "7%" }}></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-medium mb-4">Top Countries</h3>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <span>United States</span>
                          </div>
                          <div className="flex items-center">
                            <span className="font-medium mr-2">32%</span>
                            <div className="w-24 h-2 bg-muted rounded-full overflow-hidden">
                              <div className="h-full bg-primary" style={{ width: "32%" }}></div>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <span>United Kingdom</span>
                          </div>
                          <div className="flex items-center">
                            <span className="font-medium mr-2">18%</span>
                            <div className="w-24 h-2 bg-muted rounded-full overflow-hidden">
                              <div className="h-full bg-primary" style={{ width: "18%" }}></div>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <span>Germany</span>
                          </div>
                          <div className="flex items-center">
                            <span className="font-medium mr-2">12%</span>
                            <div className="w-24 h-2 bg-muted rounded-full overflow-hidden">
                              <div className="h-full bg-primary" style={{ width: "12%" }}></div>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <span>Canada</span>
                          </div>
                          <div className="flex items-center">
                            <span className="font-medium mr-2">8%</span>
                            <div className="w-24 h-2 bg-muted rounded-full overflow-hidden">
                              <div className="h-full bg-primary" style={{ width: "8%" }}></div>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <span>Other</span>
                          </div>
                          <div className="flex items-center">
                            <span className="font-medium mr-2">30%</span>
                            <div className="w-24 h-2 bg-muted rounded-full overflow-hidden">
                              <div className="h-full bg-primary" style={{ width: "30%" }}></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Chat Panel */}
        {selectedVisitor && (
          <Card className="fixed bottom-6 right-6 w-80 sm:w-96 h-96 shadow-xl z-50">
            <CardHeader className="p-3 border-b flex items-center justify-between bg-primary text-primary-foreground rounded-t-lg">
              <div className="flex items-center">
                <Avatar className="h-8 w-8 mr-2">
                  <AvatarFallback>
                    <User className="h-4 w-4" />
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-medium text-sm">{visitors.find((v) => v.id === selectedVisitor)?.ipAddress}</h3>
                  <p className="text-xs opacity-80">{visitors.find((v) => v.id === selectedVisitor)?.country}</p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-primary-foreground/80 hover:text-primary-foreground hover:bg-primary/80"
                onClick={handleCloseChat}
              >
                <X className="h-4 w-4" />
              </Button>
            </CardHeader>

            <ScrollArea className="flex-1 p-3 h-[calc(100%-128px)]">
              <div className="space-y-4">
                {chatMessages[selectedVisitor]?.map((msg) => (
                  <div key={msg.id} className={`flex ${msg.sender === "admin" ? "justify-end" : "justify-start"}`}>
                    {msg.sender === "user" && (
                      <Avatar className="h-8 w-8 mr-2 flex-shrink-0">
                        <AvatarFallback>
                          <User className="h-4 w-4" />
                        </AvatarFallback>
                      </Avatar>
                    )}
                    <div
                      className={`max-w-[80%] rounded-lg p-3 text-sm ${
                        msg.sender === "admin"
                          ? "bg-primary text-primary-foreground rounded-tr-none"
                          : "bg-muted rounded-tl-none"
                      }`}
                    >
                      {msg.content}
                      <div
                        className={`text-xs mt-1 ${
                          msg.sender === "admin" ? "text-primary-foreground/70" : "text-muted-foreground"
                        }`}
                      >
                        {msg.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                      </div>
                    </div>
                    {msg.sender === "admin" && (
                      <Avatar className="h-8 w-8 ml-2 flex-shrink-0">
                        <AvatarFallback>A</AvatarFallback>
                      </Avatar>
                    )}
                  </div>
                ))}
              </div>
            </ScrollArea>

            <div className="p-3 border-t flex items-center">
              <Input
                placeholder="Type your message..."
                value={chatMessage}
                onChange={(e) => setChatMessage(e.target.value)}
                onKeyDown={handleKeyDown}
                className="flex-1 mr-2"
              />
              <Button size="icon" onClick={handleSendMessage} disabled={!chatMessage.trim()}>
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </Card>
        )}
      </div>
    </AdminLayout>
  )
}

// Tablet icon component
function Tablet({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <rect width="16" height="20" x="4" y="2" rx="2" ry="2" />
      <line x1="12" x2="12.01" y1="18" y2="18" />
    </svg>
  )
}
