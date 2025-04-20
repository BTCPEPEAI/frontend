"use client"

import { SelectItem } from "@/components/ui/select"

import { SelectContent } from "@/components/ui/select"

import { SelectValue } from "@/components/ui/select"

import { SelectTrigger } from "@/components/ui/select"

import { Select } from "@/components/ui/select"

import { useState } from "react"
import { AdminLayout } from "@/components/layouts/admin-layout"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { useToast } from "@/components/ui/use-toast"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Plus, Edit, Trash2, Eye, MoreHorizontal, Save, RefreshCw, Globe, ImageIcon } from "lucide-react"

// Mock data for pages
const mockPages = [
  {
    id: "page-1",
    title: "About Us",
    slug: "about",
    status: "published",
    createdAt: "2023-05-15T10:30:00Z",
    updatedAt: "2023-06-20T14:45:00Z",
  },
  {
    id: "page-2",
    title: "Terms of Service",
    slug: "terms",
    status: "published",
    createdAt: "2023-04-10T09:15:00Z",
    updatedAt: "2023-06-18T11:20:00Z",
  },
  {
    id: "page-3",
    title: "Privacy Policy",
    slug: "privacy",
    status: "published",
    createdAt: "2023-04-10T09:30:00Z",
    updatedAt: "2023-06-18T11:25:00Z",
  },
  {
    id: "page-4",
    title: "FAQ",
    slug: "faq",
    status: "published",
    createdAt: "2023-05-22T13:45:00Z",
    updatedAt: "2023-06-15T10:10:00Z",
  },
  {
    id: "page-5",
    title: "Contact Us",
    slug: "contact",
    status: "draft",
    createdAt: "2023-06-05T15:20:00Z",
    updatedAt: "2023-06-05T15:20:00Z",
  },
]

export default function PagesManagementPage() {
  const { toast } = useToast()
  const [pages, setPages] = useState(mockPages)
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [currentPage, setCurrentPage] = useState<(typeof mockPages)[0] | null>(null)
  const [newPageTitle, setNewPageTitle] = useState("")
  const [newPageSlug, setNewPageSlug] = useState("")
  const [newPageContent, setNewPageContent] = useState("")
  const [saving, setSaving] = useState(false)

  // Handle create page
  const handleCreatePage = async () => {
    if (!newPageTitle || !newPageSlug) {
      toast({
        title: "Missing information",
        description: "Please enter both title and slug for the new page",
        variant: "destructive",
      })
      return
    }

    setSaving(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    const newPage = {
      id: `page-${pages.length + 1}`,
      title: newPageTitle,
      slug: newPageSlug,
      status: "draft",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    setPages([...pages, newPage])
    setIsCreateDialogOpen(false)
    setNewPageTitle("")
    setNewPageSlug("")
    setNewPageContent("")
    setSaving(false)

    toast({
      title: "Page created",
      description: `The page "${newPageTitle}" has been created successfully.`,
    })
  }

  // Handle edit page
  const handleEditPage = async () => {
    if (!currentPage || !newPageTitle || !newPageSlug) {
      toast({
        title: "Missing information",
        description: "Please enter both title and slug for the page",
        variant: "destructive",
      })
      return
    }

    setSaving(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    const updatedPages = pages.map((page) =>
      page.id === currentPage.id
        ? {
            ...page,
            title: newPageTitle,
            slug: newPageSlug,
            updatedAt: new Date().toISOString(),
          }
        : page,
    )

    setPages(updatedPages)
    setIsEditDialogOpen(false)
    setCurrentPage(null)
    setSaving(false)

    toast({
      title: "Page updated",
      description: `The page "${newPageTitle}" has been updated successfully.`,
    })
  }

  // Handle delete page
  const handleDeletePage = async () => {
    if (!currentPage) return

    setSaving(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const updatedPages = pages.filter((page) => page.id !== currentPage.id)
    setPages(updatedPages)
    setIsDeleteDialogOpen(false)
    setCurrentPage(null)
    setSaving(false)

    toast({
      title: "Page deleted",
      description: `The page "${currentPage.title}" has been deleted successfully.`,
    })
  }

  // Open edit dialog
  const openEditDialog = (page: (typeof mockPages)[0]) => {
    setCurrentPage(page)
    setNewPageTitle(page.title)
    setNewPageSlug(page.slug)
    setIsEditDialogOpen(true)
  }

  // Open delete dialog
  const openDeleteDialog = (page: (typeof mockPages)[0]) => {
    setCurrentPage(page)
    setIsDeleteDialogOpen(true)
  }

  // Handle publish/unpublish
  const handleTogglePublish = (page: (typeof mockPages)[0]) => {
    const updatedPages = pages.map((p) =>
      p.id === page.id
        ? {
            ...p,
            status: p.status === "published" ? "draft" : "published",
            updatedAt: new Date().toISOString(),
          }
        : p,
    )

    setPages(updatedPages)

    toast({
      title: page.status === "published" ? "Page unpublished" : "Page published",
      description: `The page "${page.title}" has been ${page.status === "published" ? "unpublished" : "published"} successfully.`,
    })
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold">Pages Management</h1>
            <p className="text-muted-foreground">Create and manage static pages on your platform</p>
          </div>

          <Button onClick={() => setIsCreateDialogOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Create New Page
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>All Pages</CardTitle>
            <CardDescription>Manage your static pages and their content</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Slug</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Last Updated</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {pages.map((page) => (
                    <TableRow key={page.id}>
                      <TableCell className="font-medium">{page.title}</TableCell>
                      <TableCell>/{page.slug}</TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <div
                            className={`h-2 w-2 rounded-full mr-2 ${page.status === "published" ? "bg-green-500" : "bg-amber-500"}`}
                          ></div>
                          {page.status === "published" ? "Published" : "Draft"}
                        </div>
                      </TableCell>
                      <TableCell>{new Date(page.updatedAt).toLocaleDateString()}</TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={() => openEditDialog(page)}>
                              <Edit className="h-4 w-4 mr-2" />
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem asChild>
                              <a href={`/${page.slug}`} target="_blank" rel="noopener noreferrer">
                                <Eye className="h-4 w-4 mr-2" />
                                View
                              </a>
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleTogglePublish(page)}>
                              <Globe className="h-4 w-4 mr-2" />
                              {page.status === "published" ? "Unpublish" : "Publish"}
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={() => openDeleteDialog(page)} className="text-red-600">
                              <Trash2 className="h-4 w-4 mr-2" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Create Page Dialog */}
      <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Create New Page</DialogTitle>
            <DialogDescription>Add a new static page to your platform. Fill in the details below.</DialogDescription>
          </DialogHeader>

          <Tabs defaultValue="content" className="w-full">
            <TabsList className="grid grid-cols-3 mb-4">
              <TabsTrigger value="content">Content</TabsTrigger>
              <TabsTrigger value="seo">SEO</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>

            <TabsContent value="content" className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Page Title</Label>
                <Input
                  id="title"
                  placeholder="Enter page title"
                  value={newPageTitle}
                  onChange={(e) => setNewPageTitle(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="slug">Page Slug</Label>
                <div className="flex items-center">
                  <span className="bg-muted px-3 py-2 rounded-l-md border border-r-0 text-muted-foreground">/</span>
                  <Input
                    id="slug"
                    placeholder="page-slug"
                    value={newPageSlug}
                    onChange={(e) => setNewPageSlug(e.target.value.toLowerCase().replace(/\s+/g, "-"))}
                    className="rounded-l-none"
                  />
                </div>
                <p className="text-xs text-muted-foreground">
                  This will be the URL of your page: example.com/{newPageSlug || "page-slug"}
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="content">Page Content</Label>
                <Textarea
                  id="content"
                  placeholder="Enter page content..."
                  value={newPageContent}
                  onChange={(e) => setNewPageContent(e.target.value)}
                  className="min-h-[200px]"
                />
              </div>
            </TabsContent>

            <TabsContent value="seo" className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="meta-title">Meta Title</Label>
                <Input id="meta-title" placeholder="Enter meta title" defaultValue={newPageTitle} />
                <p className="text-xs text-muted-foreground">The title that appears in search engine results.</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="meta-description">Meta Description</Label>
                <Textarea id="meta-description" placeholder="Enter meta description" className="min-h-[100px]" />
                <p className="text-xs text-muted-foreground">
                  A brief description of the page for search engine results.
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="og-image">Open Graph Image</Label>
                <div className="flex items-center gap-2">
                  <Input id="og-image" placeholder="Upload or enter image URL" />
                  <Button variant="outline" size="icon">
                    <ImageIcon className="h-4 w-4" />
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground">
                  The image that will be displayed when sharing this page on social media.
                </p>
              </div>
            </TabsContent>

            <TabsContent value="settings" className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="publish">Publish Page</Label>
                  <p className="text-sm text-muted-foreground">Make this page visible to users</p>
                </div>
                <Switch id="publish" />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="navigation">Show in Navigation</Label>
                  <p className="text-sm text-muted-foreground">Include this page in the site navigation</p>
                </div>
                <Switch id="navigation" />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="footer">Show in Footer</Label>
                  <p className="text-sm text-muted-foreground">Include this page in the site footer</p>
                </div>
                <Switch id="footer" defaultChecked />
              </div>

              <div className="space-y-2">
                <Label htmlFor="parent">Parent Page</Label>
                <Select>
                  <SelectTrigger id="parent">
                    <SelectValue placeholder="None (top level)" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">None (top level)</SelectItem>
                    <SelectItem value="about">About Us</SelectItem>
                    <SelectItem value="legal">Legal</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-xs text-muted-foreground">Set a parent page to create a hierarchy</p>
              </div>
            </TabsContent>
          </Tabs>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)} disabled={saving}>
              Cancel
            </Button>
            <Button onClick={handleCreatePage} disabled={saving}>
              {saving ? (
                <>
                  <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                  Creating...
                </>
              ) : (
                <>
                  <Save className="mr-2 h-4 w-4" />
                  Create Page
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Page Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Page</DialogTitle>
            <DialogDescription>Update the details of your page.</DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-title" className="text-right">
                Title
              </Label>
              <Input
                id="edit-title"
                value={newPageTitle}
                onChange={(e) => setNewPageTitle(e.target.value)}
                className="col-span-3"
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-slug" className="text-right">
                Slug
              </Label>
              <div className="flex items-center col-span-3">
                <span className="bg-muted px-3 py-2 rounded-l-md border border-r-0 text-muted-foreground">/</span>
                <Input
                  id="edit-slug"
                  value={newPageSlug}
                  onChange={(e) => setNewPageSlug(e.target.value.toLowerCase().replace(/\s+/g, "-"))}
                  className="rounded-l-none"
                />
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)} disabled={saving}>
              Cancel
            </Button>
            <Button onClick={handleEditPage} disabled={saving}>
              {saving ? (
                <>
                  <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="mr-2 h-4 w-4" />
                  Save Changes
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Page Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Page</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this page? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>

          <div className="py-4">
            <p className="text-center text-muted-foreground">
              You are about to delete the page: <span className="font-medium">{currentPage?.title}</span>
            </p>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)} disabled={saving}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDeletePage} disabled={saving}>
              {saving ? (
                <>
                  <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                  Deleting...
                </>
              ) : (
                <>
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete Page
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  )
}
