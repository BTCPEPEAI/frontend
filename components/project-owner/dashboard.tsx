"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"
import { Upload, Save, Image } from "lucide-react"

interface ProjectOwnerDashboardProps {
  address: string
}

export function ProjectOwnerDashboard({ address }: ProjectOwnerDashboardProps) {
  const { toast } = useToast()
  const [activeTab, setActiveTab] = useState("info")

  const [projectInfo, setProjectInfo] = useState({
    name: "Longinus",
    symbol: "LGNS",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod, nisl eget aliquam ultricies, nunc nisl aliquet nunc, quis aliquam nisl nunc quis nisl.",
    website: "https://example.com",
    twitter: "https://twitter.com/example",
    telegram: "https://t.me/example",
    discord: "https://discord.gg/example",
    github: "https://github.com/example",
  })

  const handleInfoChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setProjectInfo((prev) => ({ ...prev, [name]: value }))
  }

  const handleSaveInfo = () => {
    // In a real implementation, you would send the data to an API
    toast({
      title: "Information saved",
      description: "Your project information has been updated",
    })
  }

  const handleUploadLogo = () => {
    // In a real implementation, you would handle file upload
    toast({
      title: "Logo uploaded",
      description: "Your project logo has been updated",
    })
  }

  const handleUploadBanner = () => {
    // In a real implementation, you would handle file upload
    toast({
      title: "Banner uploaded",
      description: "Your project banner has been updated",
    })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Project Owner Dashboard</CardTitle>
        <CardDescription>Manage your project information and assets</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="info" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="info">Project Info</TabsTrigger>
            <TabsTrigger value="assets">Assets</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="info" className="space-y-4 mt-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Project Name</Label>
                <Input id="name" name="name" value={projectInfo.name} onChange={handleInfoChange} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="symbol">Symbol</Label>
                <Input id="symbol" name="symbol" value={projectInfo.symbol} onChange={handleInfoChange} />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                value={projectInfo.description}
                onChange={handleInfoChange}
                rows={4}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="website">Website URL</Label>
              <Input id="website" name="website" value={projectInfo.website} onChange={handleInfoChange} />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="twitter">Twitter URL</Label>
                <Input id="twitter" name="twitter" value={projectInfo.twitter} onChange={handleInfoChange} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="telegram">Telegram URL</Label>
                <Input id="telegram" name="telegram" value={projectInfo.telegram} onChange={handleInfoChange} />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="discord">Discord URL</Label>
                <Input id="discord" name="discord" value={projectInfo.discord} onChange={handleInfoChange} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="github">GitHub URL</Label>
                <Input id="github" name="github" value={projectInfo.github} onChange={handleInfoChange} />
              </div>
            </div>

            <Button onClick={handleSaveInfo} className="w-full">
              <Save className="mr-2 h-4 w-4" />
              Save Information
            </Button>
          </TabsContent>

          <TabsContent value="assets" className="space-y-6 mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Project Logo</CardTitle>
                <CardDescription>Upload a logo for your project (recommended size: 256x256px)</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-center p-6 border-2 border-dashed rounded-lg">
                  <div className="flex flex-col items-center">
                    <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                      <Image className="h-12 w-12 text-primary/50" />
                    </div>
                    <Button onClick={handleUploadLogo}>
                      <Upload className="mr-2 h-4 w-4" />
                      Upload Logo
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Project Banner</CardTitle>
                <CardDescription>Upload a banner for your project page (recommended size: 1200x300px)</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-center p-6 border-2 border-dashed rounded-lg">
                  <div className="flex flex-col items-center">
                    <div className="w-full h-32 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                      <Image className="h-12 w-12 text-primary/50" />
                    </div>
                    <Button onClick={handleUploadBanner}>
                      <Upload className="mr-2 h-4 w-4" />
                      Upload Banner
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Project Analytics</CardTitle>
                <CardDescription>View statistics and analytics for your project</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <p className="text-muted-foreground">Analytics dashboard coming soon</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
