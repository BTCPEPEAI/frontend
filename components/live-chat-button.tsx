"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { MessageSquare, X, Send, User } from "lucide-react"
import { Input } from "@/components/ui/input"
import { useToast } from "@/components/ui/use-toast"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"

export function LiveChatButton() {
  const [isChatOpen, setIsChatOpen] = useState(false)
  const [message, setMessage] = useState("")
  const [messages, setMessages] = useState<
    {
      id: number
      content: string
      sender: "user" | "admin"
      timestamp: Date
    }[]
  >([
    {
      id: 1,
      content: "👋 Hi there! How can we help you today?",
      sender: "admin",
      timestamp: new Date(),
    },
  ])
  const { toast } = useToast()

  const handleSendMessage = () => {
    if (!message.trim()) return

    // Add user message
    const newMessage = {
      id: messages.length + 1,
      content: message,
      sender: "user" as const,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, newMessage])
    setMessage("")

    // Simulate admin response after a delay
    setTimeout(
      () => {
        const adminResponses = [
          "Thanks for reaching out! Our team will get back to you shortly.",
          "I understand your question. Let me check that for you.",
          "That's a great question! The answer is that our platform supports multiple networks including Ethereum, BSC, and more.",
          "We're currently experiencing high volume, but we'll address your inquiry as soon as possible.",
          "Have you checked our documentation? It might have the answer you're looking for.",
        ]

        const randomResponse = adminResponses[Math.floor(Math.random() * adminResponses.length)]

        const adminMessage = {
          id: messages.length + 2,
          content: randomResponse,
          sender: "admin" as const,
          timestamp: new Date(),
        }

        setMessages((prev) => [...prev, adminMessage])
      },
      1000 + Math.random() * 2000,
    )
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  return (
    <>
      {/* Chat button */}
      <Button
        className={cn(
          "fixed bottom-6 right-6 rounded-full w-14 h-14 shadow-lg z-50",
          isChatOpen ? "bg-red-500 hover:bg-red-600" : "bg-primary hover:bg-primary/90",
        )}
        onClick={() => setIsChatOpen(!isChatOpen)}
      >
        {isChatOpen ? <X className="h-6 w-6" /> : <MessageSquare className="h-6 w-6" />}
      </Button>

      {/* Chat window */}
      {isChatOpen && (
        <div className="fixed bottom-24 right-6 w-80 sm:w-96 h-96 bg-background border rounded-lg shadow-xl flex flex-col z-50">
          {/* Chat header */}
          <div className="p-3 border-b flex items-center justify-between bg-primary text-primary-foreground rounded-t-lg">
            <div className="flex items-center">
              <Avatar className="h-8 w-8 mr-2">
                <AvatarImage src="/placeholder.svg?height=32&width=32" alt="Support" />
                <AvatarFallback>CT</AvatarFallback>
              </Avatar>
              <div>
                <h3 className="font-medium text-sm">CryptoTracker Support</h3>
                <p className="text-xs opacity-80">Typically replies in a few minutes</p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-primary-foreground/80 hover:text-primary-foreground hover:bg-primary/80"
              onClick={() => setIsChatOpen(false)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          {/* Chat messages */}
          <div className="flex-1 overflow-y-auto p-3 space-y-4">
            {messages.map((msg) => (
              <div key={msg.id} className={cn("flex", msg.sender === "user" ? "justify-end" : "justify-start")}>
                {msg.sender === "admin" && (
                  <Avatar className="h-8 w-8 mr-2 flex-shrink-0">
                    <AvatarImage src="/placeholder.svg?height=32&width=32" alt="Support" />
                    <AvatarFallback>CT</AvatarFallback>
                  </Avatar>
                )}
                <div
                  className={cn(
                    "max-w-[80%] rounded-lg p-3 text-sm",
                    msg.sender === "user"
                      ? "bg-primary text-primary-foreground rounded-tr-none"
                      : "bg-muted rounded-tl-none",
                  )}
                >
                  {msg.content}
                  <div
                    className={cn(
                      "text-xs mt-1",
                      msg.sender === "user" ? "text-primary-foreground/70" : "text-muted-foreground",
                    )}
                  >
                    {msg.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                  </div>
                </div>
                {msg.sender === "user" && (
                  <Avatar className="h-8 w-8 ml-2 flex-shrink-0">
                    <AvatarFallback>
                      <User className="h-4 w-4" />
                    </AvatarFallback>
                  </Avatar>
                )}
              </div>
            ))}
          </div>

          {/* Chat input */}
          <div className="p-3 border-t flex items-center">
            <Input
              placeholder="Type your message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-1 mr-2"
            />
            <Button size="icon" onClick={handleSendMessage} disabled={!message.trim()}>
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
    </>
  )
}
