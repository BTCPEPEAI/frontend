"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { PlusCircle, Pencil, Trash2, Eye, EyeOff, ExternalLink, ImageIcon } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import type { Ad } from "@/components/ads-box"

export default function AdsManagementPage() {
  const { toast } = useToast()
  const [ads, setAds] = useState<Ad[]>([])
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [currentAd, setCurrentAd] = useState<Ad | null>(null)
  const [newAd, setNewAd] = useState<Partial<Ad>>({
    title: "",
    description: "",
    imageUrl: "/placeholder.svg?height=120&width=300",
    linkUrl: "",
    badge: "",
    isActive: true,
  })

  // In a real app, this would fetch from an API
  useEffect(() => {
    // Simulating API call to fetch ads
    const fetchAds = async () => {
      // This would be replaced with a real API call
      const mockAds: Ad[] = [
        {
          id: "ad1",
          title: "Launch Your Token",
          description: "Get your new token listed on major exchanges with our premium service",
          imageUrl: "/placeholder.svg?height=120&width=300",
          linkUrl: "https://example.com/launch",
          badge: "Featured",
          isActive: true,
        },
        {
          id: "ad2",
          title: "Crypto Trading Bot",
          description: "Automate your trading with our AI-powered crypto bot",
          imageUrl: "/placeholder.svg?height=120&width=300",
          linkUrl: "https://example.com/bot",
          isActive: true,
        },
        {
          id: "ad3",
          title: "NFT Marketplace",
          description: "Discover, collect, and sell extraordinary NFTs",
          imageUrl: "/placeholder.svg?height=120&width=300",
          linkUrl: "https://example.com/nft",
          badge: "New",
          isActive: false,
        },
      ]

      setAds(mockAds)
    }

    fetchAds()
  }, [])

  const handleAddAd = () => {
    if (!newAd.title || !newAd.description || !newAd.linkUrl) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive",
      })
      return
    }

    const id = `ad${Date.now()}`
    const adToAdd: Ad = {
      id,
      title: newAd.title || "",
      description: newAd.description || "",
      imageUrl: newAd.imageUrl || "/placeholder.svg?height=120&width=300",
      linkUrl: newAd.linkUrl || "",
      badge: newAd.badge || undefined,
      isActive: newAd.isActive !== undefined ? newAd.isActive : true,
    }

    setAds((prev) => [...prev, adToAdd])
    setIsAddDialogOpen(false)
    setNewAd({
      title: "",
      description: "",
      imageUrl: "/placeholder.svg?height=120&width=300",
      linkUrl: "",
      badge: "",
      isActive: true,
    })

    toast({
      title: "Ad Created",
      description: "The ad has been created successfully",
    })
  }

  const handleEditAd = () => {
    if (!currentAd) return

    setAds((prev) => prev.map((ad) => (ad.id === currentAd.id ? currentAd : ad)))

    setIsEditDialogOpen(false)
    setCurrentAd(null)

    toast({
      title: "Ad Updated",
      description: "The ad has been updated successfully",
    })
  }

  const handleDeleteAd = () => {
    if (!currentAd) return

    setAds((prev) => prev.filter((ad) => ad.id !== currentAd.id))
    setIsDeleteDialogOpen(false)
    setCurrentAd(null)

    toast({
      title: "Ad Deleted",
      description: "The ad has been deleted successfully",
    })
  }

  const handleToggleAdStatus = (id: string) => {
    setAds((prev) => prev.map((ad) => (ad.id === id ? { ...ad, isActive: !ad.isActive } : ad)))

    toast({
      title: "Ad Status Updated",
      description: "The ad status has been updated successfully",
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Ads Management</h2>
          <p className="text-muted-foreground">Manage advertisements displayed on the platform</p>
        </div>
        <Button onClick={() => setIsAddDialogOpen(true)}>
          <PlusCircle className="mr-2 h-4 w-4" />
          Add New Ad
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Advertisements</CardTitle>
          <CardDescription>Manage all ads that appear in the ads box on the homepage</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all">
            <TabsList className="mb-4">
              <TabsTrigger value="all">All Ads</TabsTrigger>
              <TabsTrigger value="active">Active</TabsTrigger>
              <TabsTrigger value="inactive">Inactive</TabsTrigger>
            </TabsList>

            <TabsContent value="all">
              <AdsList
                ads={ads}
                onEdit={(ad) => {
                  setCurrentAd(ad)
                  setIsEditDialogOpen(true)
                }}
                onDelete={(ad) => {
                  setCurrentAd(ad)
                  setIsDeleteDialogOpen(true)
                }}
                onToggleStatus={handleToggleAdStatus}
              />
            </TabsContent>

            <TabsContent value="active">
              <AdsList
                ads={ads.filter((ad) => ad.isActive)}
                onEdit={(ad) => {
                  setCurrentAd(ad)
                  setIsEditDialogOpen(true)
                }}
                onDelete={(ad) => {
                  setCurrentAd(ad)
                  setIsDeleteDialogOpen(true)
                }}
                onToggleStatus={handleToggleAdStatus}
              />
            </TabsContent>

            <TabsContent value="inactive">
              <AdsList
                ads={ads.filter((ad) => !ad.isActive)}
                onEdit={(ad) => {
                  setCurrentAd(ad)
                  setIsEditDialogOpen(true)
                }}
                onDelete={(ad) => {
                  setCurrentAd(ad)
                  setIsDeleteDialogOpen(true)
                }}
                onToggleStatus={handleToggleAdStatus}
              />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Add Ad Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Add New Advertisement</DialogTitle>
            <DialogDescription>Create a new ad to display in the ads box on the homepage</DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="title" className="text-right">
                Title*
              </Label>
              <Input
                id="title"
                value={newAd.title || ""}
                onChange={(e) => setNewAd({ ...newAd, title: e.target.value })}
                className="col-span-3"
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="description" className="text-right">
                Description*
              </Label>
              <Textarea
                id="description"
                value={newAd.description || ""}
                onChange={(e) => setNewAd({ ...newAd, description: e.target.value })}
                className="col-span-3"
                rows={3}
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="imageUrl" className="text-right">
                Image URL
              </Label>
              <Input
                id="imageUrl"
                value={newAd.imageUrl || ""}
                onChange={(e) => setNewAd({ ...newAd, imageUrl: e.target.value })}
                className="col-span-3"
                placeholder="/placeholder.svg?height=120&width=300"
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="linkUrl" className="text-right">
                Link URL*
              </Label>
              <Input
                id="linkUrl"
                value={newAd.linkUrl || ""}
                onChange={(e) => setNewAd({ ...newAd, linkUrl: e.target.value })}
                className="col-span-3"
                placeholder="https://example.com"
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="badge" className="text-right">
                Badge
              </Label>
              <Select value={newAd.badge || ""} onValueChange={(value) => setNewAd({ ...newAd, badge: value })}>
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select a badge (optional)" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">None</SelectItem>
                  <SelectItem value="New">New</SelectItem>
                  <SelectItem value="Featured">Featured</SelectItem>
                  <SelectItem value="Popular">Popular</SelectItem>
                  <SelectItem value="Limited">Limited</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="isActive" className="text-right">
                Active
              </Label>
              <div className="col-span-3 flex items-center space-x-2">
                <Switch
                  id="isActive"
                  checked={newAd.isActive}
                  onCheckedChange={(checked) => setNewAd({ ...newAd, isActive: checked })}
                />
                <Label htmlFor="isActive" className="cursor-pointer">
                  {newAd.isActive ? "Ad is active and will be displayed" : "Ad is inactive and will not be displayed"}
                </Label>
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddAd}>Create Ad</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Ad Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Edit Advertisement</DialogTitle>
            <DialogDescription>Update the details of this advertisement</DialogDescription>
          </DialogHeader>

          {currentAd && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-title" className="text-right">
                  Title*
                </Label>
                <Input
                  id="edit-title"
                  value={currentAd.title}
                  onChange={(e) => setCurrentAd({ ...currentAd, title: e.target.value })}
                  className="col-span-3"
                />
              </div>

              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-description" className="text-right">
                  Description*
                </Label>
                <Textarea
                  id="edit-description"
                  value={currentAd.description}
                  onChange={(e) => setCurrentAd({ ...currentAd, description: e.target.value })}
                  className="col-span-3"
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-imageUrl" className="text-right">
                  Image URL
                </Label>
                <Input
                  id="edit-imageUrl"
                  value={currentAd.imageUrl}
                  onChange={(e) => setCurrentAd({ ...currentAd, imageUrl: e.target.value })}
                  className="col-span-3"
                />
              </div>

              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-linkUrl" className="text-right">
                  Link URL*
                </Label>
                <Input
                  id="edit-linkUrl"
                  value={currentAd.linkUrl}
                  onChange={(e) => setCurrentAd({ ...currentAd, linkUrl: e.target.value })}
                  className="col-span-3"
                />
              </div>

              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-badge" className="text-right">
                  Badge
                </Label>
                <Select
                  value={currentAd.badge || ""}
                  onValueChange={(value) => setCurrentAd({ ...currentAd, badge: value || undefined })}
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select a badge (optional)" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">None</SelectItem>
                    <SelectItem value="New">New</SelectItem>
                    <SelectItem value="Featured">Featured</SelectItem>
                    <SelectItem value="Popular">Popular</SelectItem>
                    <SelectItem value="Limited">Limited</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-isActive" className="text-right">
                  Active
                </Label>
                <div className="col-span-3 flex items-center space-x-2">
                  <Switch
                    id="edit-isActive"
                    checked={currentAd.isActive}
                    onCheckedChange={(checked) => setCurrentAd({ ...currentAd, isActive: checked })}
                  />
                  <Label htmlFor="edit-isActive" className="cursor-pointer">
                    {currentAd.isActive
                      ? "Ad is active and will be displayed"
                      : "Ad is inactive and will not be displayed"}
                  </Label>
                </div>
              </div>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleEditAd}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Ad Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Advertisement</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this advertisement? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>

          {currentAd && (
            <div className="py-4">
              <div className="bg-muted p-3 rounded-md">
                <p className="font-medium">{currentAd.title}</p>
                <p className="text-sm text-muted-foreground">{currentAd.description}</p>
              </div>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDeleteAd}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

interface AdsListProps {
  ads: Ad[]
  onEdit: (ad: Ad) => void
  onDelete: (ad: Ad) => void
  onToggleStatus: (id: string) => void
}

function AdsList({ ads, onEdit, onDelete, onToggleStatus }: AdsListProps) {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Badge</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {ads.length > 0 ? (
            ads.map((ad) => (
              <TableRow key={ad.id}>
                <TableCell className="font-medium">
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-muted rounded-md flex items-center justify-center mr-2">
                      <ImageIcon className="h-4 w-4 text-muted-foreground" />
                    </div>
                    {ad.title}
                  </div>
                </TableCell>
                <TableCell className="max-w-[200px] truncate">{ad.description}</TableCell>
                <TableCell>
                  {ad.badge ? <Badge>{ad.badge}</Badge> : <span className="text-muted-foreground text-sm">None</span>}
                </TableCell>
                <TableCell>
                  <Badge variant={ad.isActive ? "default" : "secondary"}>{ad.isActive ? "Active" : "Inactive"}</Badge>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="sm" onClick={() => onEdit(ad)}>
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => onDelete(ad)}>
                      <Trash2 className="h-4 w-4 text-red-500" />
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => onToggleStatus(ad.id)}>
                      {ad.isActive ? (
                        <EyeOff className="h-4 w-4 text-amber-500" />
                      ) : (
                        <Eye className="h-4 w-4 text-green-500" />
                      )}
                    </Button>
                    <a
                      href={ad.linkUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-8 w-8 p-0"
                    >
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  </div>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={5} className="text-center py-6 text-muted-foreground">
                No advertisements found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  )
}
