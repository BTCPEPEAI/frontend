"use client"

import type React from "react"

import { useState } from "react"
import { MainLayout } from "@/components/layouts/main-layout"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { MessageCircle } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

export default function ApplyTrendingPage() {
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      toast({
        title: "Application submitted",
        description: "Your application has been submitted successfully. We will review it shortly.",
      })
    }, 1500)
  }

  const handleContactSupport = () => {
    window.open("https://t.me/dexprice_support", "_blank")
  }

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-6">
        <h1 className="text-3xl font-bold mb-6">Apply for Free Trending</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Application Form</CardTitle>
                <CardDescription>
                  Fill out this form to apply for free trending placement for your project.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <form onSubmit={handleSubmit}>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="project-name">Project Name</Label>
                      <Input id="project-name" placeholder="Enter your project name" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="token-symbol">Token Symbol</Label>
                      <Input id="token-symbol" placeholder="Enter your token symbol" required />
                    </div>
                  </div>

                  <div className="space-y-2 mt-4">
                    <Label htmlFor="contract-address">Contract Address</Label>
                    <Input id="contract-address" placeholder="Enter your contract address" required />
                  </div>

                  <div className="grid grid-cols-2 gap-4 mt-4">
                    <div className="space-y-2">
                      <Label htmlFor="network">Network</Label>
                      <select
                        id="network"
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        required
                      >
                        <option value="">Select a network</option>
                        <option value="eth">Ethereum</option>
                        <option value="bnb">BNB Chain</option>
                        <option value="sol">Solana</option>
                        <option value="trx">Tron</option>
                        <option value="matic">Polygon</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="launch-date">Launch Date</Label>
                      <Input id="launch-date" type="date" required />
                    </div>
                  </div>

                  <div className="space-y-2 mt-4">
                    <Label htmlFor="project-description">Project Description</Label>
                    <Textarea id="project-description" placeholder="Tell us about your project" rows={4} required />
                  </div>

                  <div className="space-y-2 mt-4">
                    <Label htmlFor="website">Website</Label>
                    <Input id="website" placeholder="https://" required />
                  </div>

                  <div className="grid grid-cols-2 gap-4 mt-4">
                    <div className="space-y-2">
                      <Label htmlFor="telegram">Telegram Group</Label>
                      <Input id="telegram" placeholder="https://t.me/" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="twitter">Twitter</Label>
                      <Input id="twitter" placeholder="https://twitter.com/" />
                    </div>
                  </div>

                  {/* New fields for announcement channels */}
                  <div className="grid grid-cols-2 gap-4 mt-4">
                    <div className="space-y-2">
                      <Label htmlFor="telegram-announcement">Telegram Announcement Channel</Label>
                      <Input id="telegram-announcement" placeholder="https://t.me/" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="twitter-announcement">Twitter Announcement</Label>
                      <Input id="twitter-announcement" placeholder="https://twitter.com/" />
                    </div>
                  </div>

                  <div className="space-y-2 mt-4">
                    <Label htmlFor="reason">Why should your project be featured?</Label>
                    <Textarea
                      id="reason"
                      placeholder="Tell us why your project deserves to be featured"
                      rows={4}
                      required
                    />
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4 mt-6">
                    <Button
                      type="button"
                      variant="outline"
                      className="flex items-center gap-2"
                      onClick={handleContactSupport}
                    >
                      <MessageCircle className="h-4 w-4" />
                      Contact Support on Telegram
                    </Button>
                    <Button type="submit" className="w-full sm:w-auto" disabled={isSubmitting}>
                      {isSubmitting ? "Submitting..." : "Submit Application"}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>

          <div>
            <Card>
              <CardHeader>
                <CardTitle>Benefits of Trending</CardTitle>
                <CardDescription>Get your project in front of thousands of potential investors.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <span className="bg-primary/10 text-primary rounded-full p-1 mr-2 mt-0.5">✓</span>
                    <span>Increased visibility to thousands of daily visitors</span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-primary/10 text-primary rounded-full p-1 mr-2 mt-0.5">✓</span>
                    <span>Higher trading volume and liquidity</span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-primary/10 text-primary rounded-full p-1 mr-2 mt-0.5">✓</span>
                    <span>More community engagement and trust</span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-primary/10 text-primary rounded-full p-1 mr-2 mt-0.5">✓</span>
                    <span>Featured on our homepage and trending section</span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-primary/10 text-primary rounded-full p-1 mr-2 mt-0.5">✓</span>
                    <span>Detailed project information displayed to users</span>
                  </li>
                </ul>

                <div className="border-t pt-4 mt-4">
                  <p className="text-sm text-muted-foreground">
                    We review all applications carefully. Only legitimate projects with real utility will be considered.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </MainLayout>
  )
}
