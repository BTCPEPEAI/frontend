"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { AdminLayout } from "@/components/layouts/admin-layout"
import { Card, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/components/ui/use-toast"
import {
  MessageSquare,
  User,
  Clock,
  Send,
  Search,
  Filter,
  XCircle,
  RefreshCw,
  MoreHorizontal,
  ArrowUpRight,
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

// Mock data for active chats
const mockChats = [
  {
    id: "chat1",
    user: {
      id: "user1",
      name: "John Doe",
      email: "john@example.com",
      avatar: null,
      ip: "192.168.1.101",
      country: "United States",
      city: "New York",
      device: "Desktop",
      browser: "Chrome",
      currentPage: "/trending",
    },
    lastMessage: "How do I add my token to your platform?",
    timestamp: new Date(Date.now() - 5 * 60000),
    unread: 2,
    status: "active",
  },
  {
    id: "chat2",
    user: {
      id: "user2",
      name: "Jane Smith",
      email: "jane@example.com",
      avatar: null,
      ip: "192.168.1.102",
      country: "United Kingdom",
      city: "London",
      device: "Mobile",
      browser: "Safari",
      currentPage: "/coin/0x1234",
    },
    lastMessage: "I'm having trouble connecting my wallet",
    timestamp: new Date(Date.now() - 15 * 60000),
    unread: 0,
    status: "active",
  },
  {
    id: "chat3",
    user: {
      id: "user3",
      name: "Alex Johnson",
      email: "alex@example.com",
      avatar: null,
      ip: "192.168.1.103",
      country: "Germany",
      city: "Berlin",
      device: "Desktop",
      browser: "Firefox",
      currentPage: "/",
    },
    lastMessage: "Thanks for your help!",
    timestamp: new Date(Date.now() - 120 * 60000),
    unread: 0,
    status: "closed",
  },
  {
    id: "chat4",
    user: {
      id: "user4",
      name: "Sarah Williams",
      email: "sarah@example.com",
      avatar: null,
      ip: "192.168.1.104",
      country: "Canada",
      city: "Toronto",
      device: "Tablet",
      browser: "Chrome",
      currentPage: "/watchlist",
    },
    lastMessage: "Is there a way to get notifications for price alerts?",
    timestamp: new Date(Date.now() - 45 * 60000),
    unread: 1,
    status: "active",
  },
  {
    id: "chat5",
    user: {
      id: "user5",
      name: "Michael Brown",
      email: "michael@example.com",
      avatar: null,
      ip: "192.168.1.105",
      country: "Australia",
      city: "Sydney",
      device: "Mobile",
      browser: "Safari",
      currentPage: "/hot-pairs",
    },
    lastMessage: "How can I apply for trending?",
    timestamp: new Date(Date.now() - 180 * 60000),
    unread: 0,
    status: "closed",
  },
]

// Mock data for messages
const mockMessages = {
  chat1: [
    {
      id: "msg1",
      content: "Hello! How can I help you today?",
      sender: "admin",
      timestamp: new Date(Date.now() - 10 * 60000),
    },
    {
      id: "msg2",
      content: "I'm interested in adding my token to your platform",
      sender: "user",
      timestamp: new Date(Date.now() - 8 * 60000),
    },
    {
      id: "msg3",
      content:
        "Sure, I can help with that. You'll need to fill out an application form. You can find it at dexprice.ai/apply-trending",
      sender: "admin",
      timestamp: new Date(Date.now() - 7 * 60000),
    },
    {
      id: "msg4",
      content: "How do I add my token to your platform?",
      sender: "user",
      timestamp: new Date(Date.now() - 5 * 60000),
    },
  ],
  chat2: [
    {
      id: "msg1",
      content: "Hello! How can I help you today?",
      sender: "admin",
      timestamp: new Date(Date.now() - 20 * 60000),
    },
    {
      id: "msg2",
      content: "I'm having trouble connecting my wallet",
      sender: "user",
      timestamp: new Date(Date.now() - 15 * 60000),
    },
  ],
  chat3: [
    {
      id: "msg1",
      content: "Hello! How can I help you today?",
      sender: "admin",
      timestamp: new Date(Date.now() - 140 * 60000),
    },
    {
      id: "msg2",
      content: "I have a question about the trending section",
      sender: "user",
      timestamp: new Date(Date.now() - 135 * 60000),
    },
    {
      id: "msg3",
      content: "Of course, what would you like to know?",
      sender: "admin",
      timestamp: new Date(Date.now() - 130 * 60000),
    },
    { id: "msg4", content: "How often is it updated?", sender: "user", timestamp: new Date(Date.now() - 125 * 60000) },
    {
      id: "msg5",
      content:
        "The trending section is updated every hour based on trading volume, price action, and community engagement.",
      sender: "admin",
      timestamp: new Date(Date.now() - 122 * 60000),
    },
    { id: "msg6", content: "Thanks for your help!", sender: "user", timestamp: new Date(Date.now() - 120 * 60000) },
  ],
  chat4: [
    {
      id: "msg1",
      content: "Hello! How can I help you today?",
      sender: "admin",
      timestamp: new Date(Date.now() - 60 * 60000),
    },
    {
      id: "msg2",
      content: "Is there a way to get notifications for price alerts?",
      sender: "user",
      timestamp: new Date(Date.now() - 45 * 60000),
    },
  ],
  chat5: [
    {
      id: "msg1",
      content: "Hello! How can I help you today?",
      sender: "admin",
      timestamp: new Date(Date.now() - 200 * 60000),
    },
    {
      id: "msg2",
      content: "How can I apply for trending?",
      sender: "user",
      timestamp: new Date(Date.now() - 190 * 60000),
    },
    {
      id: "msg3",
      content:
        "You can apply for trending by filling out the form at dexprice.ai/apply-trending. We'll review your application and get back to you within 24-48 hours.",
      sender: "admin",
      timestamp: new Date(Date.now() - 185 * 60000),
    },
    { id: "msg4", content: "Great, thank you!", sender: "user", timestamp: new Date(Date.now() - 180 * 60000) },
  ],
}

// Quick response templates
const quickResponses = [
  "Hello! How can I help you today?",
  "Thank you for reaching out to us.",
  "To add your token to our platform, please fill out the application form at dexprice.ai/apply-trending",
  "For wallet connection issues, please try refreshing the page and reconnecting.",
  "Our trending section is updated hourly based on trading volume and community engagement.",
  "You can find more information about this in our documentation at dexprice.ai/docs",
  "Is there anything else I can help you with?",
  "I'll look into this issue and get back to you shortly.",
]

export default function LiveChatPage() {
  const { toast } = useToast()
  const [chats, setChats] = useState(mockChats)
  const [messages, setMessages] = useState<Record<string, any[]>>(mockMessages)
  const [selectedChat, setSelectedChat] = useState<string | null>(null)
  const [newMessage, setNewMessage] = useState("")
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [isRefreshing, setIsRefreshing] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Filter chats based on search query and status filter
  const filteredChats = chats.filter((chat) => {
    const matchesSearch =
      chat.user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      chat.user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      chat.lastMessage.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesStatus = statusFilter === "all" || chat.status === statusFilter

    return matchesSearch && matchesStatus
  })

  // Scroll to bottom of messages when new message is added
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }, [selectedChat, messages])

  // Handle sending a message
  const handleSendMessage = () => {
    if (!selectedChat || !newMessage.trim()) return

    const newMsg = {
      id: `msg${Date.now()}`,
      content: newMessage,
      sender: "admin",
      timestamp: new Date(),
    }

    setMessages((prev) => ({
      ...prev,
      [selectedChat]: [...(prev[selectedChat] || []), newMsg],
    }))

    // Update last message in chat list
    setChats((prev) =>
      prev.map((chat) =>
        chat.id === selectedChat ? { ...chat, lastMessage: newMessage, timestamp: new Date(), unread: 0 } : chat,
      ),
    )

    setNewMessage("")

    // Simulate user response after a delay
    setTimeout(
      () => {
        const userResponses = [
          "Thanks for the information!",
          "I understand now, thank you.",
          "That's helpful, I'll try that.",
          "Got it, thanks for your help!",
          "I'll check that out.",
          "Perfect, that's exactly what I needed to know.",
        ]

        if (Math.random() > 0.7) {
          // 30% chance of response
          const randomResponse = userResponses[Math.floor(Math.random() * userResponses.length)]

          const userMsg = {
            id: `msg${Date.now()}`,
            content: randomResponse,
            sender: "user",
            timestamp: new Date(),
          }

          setMessages((prev) => ({
            ...prev,
            [selectedChat]: [...(prev[selectedChat] || []), userMsg],
          }))

          // Update last message in chat list
          setChats((prev) =>
            prev.map((chat) =>
              chat.id === selectedChat
                ? { ...chat, lastMessage: randomResponse, timestamp: new Date(), unread: chat.unread + 1 }
                : chat,
            ),
          )
        }
      },
      5000 + Math.random() * 10000,
    ) // Random delay between 5-15 seconds
  }

  // Handle key press in chat input
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  // Handle selecting a chat
  const handleSelectChat = (chatId: string) => {
    setSelectedChat(chatId)

    // Mark as read
    setChats((prev) => prev.map((chat) => (chat.id === chatId ? { ...chat, unread: 0 } : chat)))
  }

  // Handle closing a chat
  const handleCloseChat = (chatId: string) => {
    setChats((prev) => prev.map((chat) => (chat.id === chatId ? { ...chat, status: "closed" } : chat)))

    if (selectedChat === chatId) {
      setSelectedChat(null)
    }

    toast({
      title: "Chat closed",
      description: "The chat has been marked as closed.",
    })
  }

  // Handle refreshing chats
  const handleRefresh = () => {
    setIsRefreshing(true)

    // Simulate API call
    setTimeout(() => {
      setIsRefreshing(false)
      toast({
        title: "Chats refreshed",
        description: "Chat list has been updated.",
      })
    }, 1000)
  }

  // Handle using a quick response
  const handleQuickResponse = (response: string) => {
    setNewMessage(response)
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold flex items-center">
              <MessageSquare className="mr-2 h-8 w-8 text-primary" />
              Live Chat
            </h1>
            <p className="text-muted-foreground">Manage and respond to user conversations in real-time</p>
          </div>

          <div className="flex items-center gap-2">
            <Badge variant="outline" className="text-green-500 border-green-500">
              <span className="h-2 w-2 rounded-full bg-green-500 mr-1"></span>
              {chats.filter((c) => c.status === "active").length} Active Chats
            </Badge>
            <Button variant="outline" size="sm" onClick={handleRefresh} disabled={isRefreshing}>
              {isRefreshing ? <RefreshCw className="h-4 w-4 animate-spin" /> : <RefreshCw className="h-4 w-4" />}
              <span className="ml-2">Refresh</span>
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-12rem)]">
          {/* Chat list */}
          <Card className="lg:col-span-1 flex flex-col h-full">
            <CardHeader className="pb-3">
              <CardTitle>Conversations</CardTitle>
              <CardDescription>
                {filteredChats.filter((c) => c.status === "active").length} active,{" "}
                {filteredChats.filter((c) => c.status === "closed").length} closed
              </CardDescription>
              <div className="flex flex-col gap-2 mt-2">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search conversations..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger>
                    <Filter className="h-4 w-4 mr-2" />
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Conversations</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="closed">Closed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>
            <ScrollArea className="flex-1">
              <div className="px-4 py-2">
                {filteredChats.length > 0 ? (
                  filteredChats.map((chat) => (
                    <div
                      key={chat.id}
                      className={`p-3 rounded-lg mb-2 cursor-pointer transition-colors ${
                        selectedChat === chat.id ? "bg-primary/10 hover:bg-primary/15" : "hover:bg-muted"
                      }`}
                      onClick={() => handleSelectChat(chat.id)}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <Avatar className="h-10 w-10 mr-3">
                            <AvatarFallback>{chat.user.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium flex items-center">
                              {chat.user.name}
                              {chat.status === "active" ? (
                                <span className="h-2 w-2 rounded-full bg-green-500 ml-2"></span>
                              ) : (
                                <span className="h-2 w-2 rounded-full bg-gray-300 ml-2"></span>
                              )}
                            </div>
                            <div className="text-xs text-muted-foreground">
                              {chat.user.ip} • {chat.user.country}
                            </div>
                          </div>
                        </div>
                        {chat.unread > 0 && (
                          <Badge
                            variant="default"
                            className="rounded-full h-5 min-w-[20px] flex items-center justify-center"
                          >
                            {chat.unread}
                          </Badge>
                        )}
                      </div>
                      <div className="mt-2 text-sm text-muted-foreground line-clamp-1">{chat.lastMessage}</div>
                      <div className="mt-1 text-xs text-muted-foreground flex items-center">
                        <Clock className="h-3 w-3 mr-1" />
                        {formatTimestamp(chat.timestamp)}
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8 text-muted-foreground">No conversations found</div>
                )}
              </div>
            </ScrollArea>
          </Card>

          {/* Chat window */}
          <Card className="lg:col-span-2 flex flex-col h-full">
            {selectedChat ? (
              <>
                <CardHeader className="pb-3 border-b">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Avatar className="h-10 w-10 mr-3">
                        <AvatarFallback>{chats.find((c) => c.id === selectedChat)?.user.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <CardTitle className="text-base">
                          {chats.find((c) => c.id === selectedChat)?.user.name}
                        </CardTitle>
                        <CardDescription>
                          {chats.find((c) => c.id === selectedChat)?.user.email} •{" "}
                          {chats.find((c) => c.id === selectedChat)?.user.country}
                        </CardDescription>
                      </div>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-5 w-5" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                          <User className="h-4 w-4 mr-2" />
                          View User Profile
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <ArrowUpRight className="h-4 w-4 mr-2" />
                          View Current Page
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => handleCloseChat(selectedChat)} className="text-red-500">
                          <XCircle className="h-4 w-4 mr-2" />
                          Close Conversation
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </CardHeader>
                <ScrollArea className="flex-1 p-4">
                  <div className="space-y-4">
                    {messages[selectedChat]?.map((message) => (
                      <div
                        key={message.id}
                        className={`flex ${message.sender === "admin" ? "justify-end" : "justify-start"}`}
                      >
                        {message.sender === "user" && (
                          <Avatar className="h-8 w-8 mr-2 flex-shrink-0">
                            <AvatarFallback>
                              {chats.find((c) => c.id === selectedChat)?.user.name.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                        )}
                        <div
                          className={`max-w-[80%] rounded-lg px-3 py-2 text-sm ${
                            message.sender === "admin" ? "bg-primary text-primary-foreground" : "bg-muted"
                          }`}
                        >
                          {message.content}
                          <div className="text-xs opacity-70 mt-1">{formatTimestamp(message.timestamp)}</div>
                        </div>
                        {message.sender === "admin" && (
                          <Avatar className="h-8 w-8 ml-2 flex-shrink-0">
                            <AvatarFallback>A</AvatarFallback>
                          </Avatar>
                        )}
                      </div>
                    ))}
                    <div ref={messagesEndRef} />
                  </div>
                </ScrollArea>
                <CardFooter className="border-t p-3 flex flex-col gap-3">
                  <ScrollArea className="w-full" orientation="horizontal">
                    <div className="flex gap-2 pb-2">
                      {quickResponses.map((response, index) => (
                        <Button
                          key={index}
                          variant="outline"
                          size="sm"
                          onClick={() => handleQuickResponse(response)}
                          className="whitespace-nowrap"
                        >
                          {response.length > 30 ? response.substring(0, 30) + "..." : response}
                        </Button>
                      ))}
                    </div>
                  </ScrollArea>
                  <div className="flex items-center gap-2">
                    <Input
                      placeholder="Type your message..."
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      onKeyDown={handleKeyDown}
                      className="flex-1"
                    />
                    <Button onClick={handleSendMessage} disabled={!newMessage.trim()}>
                      <Send className="h-4 w-4 mr-2" />
                      Send
                    </Button>
                  </div>
                </CardFooter>
              </>
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-center p-6">
                <MessageSquare className="h-16 w-16 text-muted-foreground mb-4" />
                <h3 className="text-xl font-medium mb-2">No Conversation Selected</h3>
                <p className="text-muted-foreground max-w-md">
                  Select a conversation from the list to view messages and respond to users.
                </p>
              </div>
            )}
          </Card>
        </div>
      </div>
    </AdminLayout>
  )
}

// Helper function to format timestamps
function formatTimestamp(date: Date): string {
  const now = new Date()
  const diffMs = now.getTime() - date.getTime()
  const diffMins = Math.round(diffMs / 60000)

  if (diffMins < 1) return "Just now"
  if (diffMins < 60) return `${diffMins}m ago`

  const diffHours = Math.floor(diffMins / 60)
  if (diffHours < 24) return `${diffHours}h ago`

  const diffDays = Math.floor(diffHours / 24)
  if (diffDays < 7) return `${diffDays}d ago`

  return date.toLocaleDateString()
}
