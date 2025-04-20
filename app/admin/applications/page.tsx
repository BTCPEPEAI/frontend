"use client"

import { useState, useEffect } from "react"
import { AdminLayout } from "@/components/layouts/admin-layout"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CheckCircle, XCircle, Clock, Search, ChevronLeft, ChevronRight, Eye, Copy, Filter } from "lucide-react"
import { fetchApplications } from "@/lib/api"
import type { ApplicationData } from "@/types/common"
import { useToast } from "@/components/ui/use-toast"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"

export default function AdminApplicationsPage() {
  const { toast } = useToast()
  const [applications, setApplications] = useState<ApplicationData[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [currentPage, setCurrentPage] = useState(1)
  const [activeTab, setActiveTab] = useState("all")
  const [selectedApplication, setSelectedApplication] = useState<ApplicationData | null>(null)
  const [isDetailsDialogOpen, setIsDetailsDialogOpen] = useState(false)
  const [appTypeFilter, setAppTypeFilter] = useState("all")
  const itemsPerPage = 10

  useEffect(() => {
    const loadData = async () => {
      setLoading(true)
      try {
        const appsData = await fetchApplications()
        setApplications(appsData)
      } catch (error) {
        console.error("Failed to load applications:", error)
        toast({
          title: "Error",
          description: "Failed to load applications. Please try again.",
          variant: "destructive",
        })
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [toast])

  const handleApproveApplication = (id: string) => {
    setApplications((prev) =>
      prev.map((app) =>
        app.id === id
          ? {
              ...app,
              status: "approved",
              reviewedAt: new Date().toISOString(),
              reviewedBy: "admin",
            }
          : app,
      ),
    )

    toast({
      title: "Application Approved",
      description: `Application ${id} has been approved successfully.`,
    })
  }

  const handleRejectApplication = (id: string) => {
    setApplications((prev) =>
      prev.map((app) =>
        app.id === id
          ? {
              ...app,
              status: "rejected",
              reviewedAt: new Date().toISOString(),
              reviewedBy: "admin",
              notes: "Does not meet our requirements.",
            }
          : app,
      ),
    )

    toast({
      title: "Application Rejected",
      description: `Application ${id} has been rejected.`,
    })
  }

  const handleViewDetails = (id: string) => {
    const app = applications.find((app) => app.id === id)
    if (app) {
      setSelectedApplication(app)
      setIsDetailsDialogOpen(true)
    }
  }

  // Filter applications based on search query, status filter, and type filter
  const getFilteredApplications = () => {
    return applications.filter((app) => {
      const matchesSearch =
        app.projectName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        app.symbol.toLowerCase().includes(searchQuery.toLowerCase()) ||
        app.id.toLowerCase().includes(searchQuery.toLowerCase())

      const matchesStatus = statusFilter === "all" || app.status === statusFilter

      const matchesAppType =
        appTypeFilter === "all" ||
        (appTypeFilter === "info" && app.type === "info") ||
        (appTypeFilter === "trending" && app.type === "trending") ||
        (appTypeFilter === "advertising" && app.type === "advertising") ||
        (appTypeFilter === "verification" && app.type === "verification") ||
        (appTypeFilter === "others" && !["info", "trending", "advertising", "verification"].includes(app.type))

      const matchesTab =
        activeTab === "all" ||
        (activeTab === "pending" && app.status === "pending") ||
        (activeTab === "approved" && app.status === "approved") ||
        (activeTab === "rejected" && app.status === "rejected")

      return matchesSearch && matchesStatus && matchesAppType && matchesTab
    })
  }

  const filteredApplications = getFilteredApplications()

  // Paginate applications
  const paginatedApplications = filteredApplications.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  const totalPages = Math.ceil(filteredApplications.length / itemsPerPage)

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold">Application Management</h1>
            <p className="text-muted-foreground">Review and manage project applications</p>
          </div>
        </div>

        <Card className="shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle>Applications</CardTitle>
            <CardDescription>Manage and review all project applications</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="mb-6">
              <TabsList className="grid grid-cols-4 mb-4">
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="pending">Pending</TabsTrigger>
                <TabsTrigger value="approved">Approved</TabsTrigger>
                <TabsTrigger value="rejected">Rejected</TabsTrigger>
              </TabsList>

              <div className="flex flex-col md:flex-row gap-4 mb-6">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search by project name, symbol or ID..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>

                <div className="flex gap-2">
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-full md:w-[180px]">
                      <Filter className="h-4 w-4 mr-2" />
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="approved">Approved</SelectItem>
                      <SelectItem value="rejected">Rejected</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mb-6">
                <Button
                  variant={appTypeFilter === "all" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setAppTypeFilter("all")}
                >
                  All Types
                </Button>
                <Button
                  variant={appTypeFilter === "info" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setAppTypeFilter("info")}
                >
                  Info Application
                </Button>
                <Button
                  variant={appTypeFilter === "verification" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setAppTypeFilter("verification")}
                >
                  Supply Verification
                </Button>
                <Button
                  variant={appTypeFilter === "trending" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setAppTypeFilter("trending")}
                >
                  Trending Application
                </Button>
                <Button
                  variant={appTypeFilter === "advertising" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setAppTypeFilter("advertising")}
                >
                  Ads Application
                </Button>
                <Button
                  variant={appTypeFilter === "others" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setAppTypeFilter("others")}
                >
                  Others
                </Button>
              </div>

              <TabsContent value={activeTab} className="mt-0">
                {loading ? (
                  <div className="flex items-center justify-center h-64">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                  </div>
                ) : (
                  <>
                    <div className="rounded-md border overflow-hidden">
                      <Table>
                        <TableHeader>
                          <TableRow className="bg-muted/50">
                            <TableHead>App Name</TableHead>
                            <TableHead>Type</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Submitted</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {paginatedApplications.length > 0 ? (
                            paginatedApplications.map((app) => (
                              <TableRow key={app.id}>
                                <TableCell>
                                  <div>
                                    <div className="font-medium">{app.projectName}</div>
                                    <div className="text-xs text-muted-foreground">{app.symbol}</div>
                                  </div>
                                </TableCell>
                                <TableCell>
                                  <Badge variant="outline" className="capitalize">
                                    {app.type}
                                  </Badge>
                                </TableCell>
                                <TableCell>
                                  <Badge
                                    variant={
                                      app.status === "approved"
                                        ? "default"
                                        : app.status === "rejected"
                                          ? "destructive"
                                          : "secondary"
                                    }
                                    className="flex w-fit items-center gap-1"
                                  >
                                    {app.status === "approved" && <CheckCircle className="h-3 w-3" />}
                                    {app.status === "rejected" && <XCircle className="h-3 w-3" />}
                                    {app.status === "pending" && <Clock className="h-3 w-3" />}
                                    <span className="capitalize">{app.status}</span>
                                  </Badge>
                                </TableCell>
                                <TableCell>{new Date(app.submittedAt).toLocaleDateString()}</TableCell>
                                <TableCell className="text-right">
                                  <div className="flex justify-end gap-2">
                                    <Button
                                      variant="outline"
                                      size="sm"
                                      onClick={() => handleViewDetails(app.id)}
                                      className="h-8"
                                    >
                                      <Eye className="h-3.5 w-3.5 mr-1" />
                                      View Details
                                    </Button>
                                    <DropdownMenu>
                                      <DropdownMenuTrigger asChild>
                                        <Button variant="ghost" size="sm" className="h-8">
                                          Actions
                                        </Button>
                                      </DropdownMenuTrigger>
                                      <DropdownMenuContent align="end">
                                        <DropdownMenuItem
                                          onClick={() => handleApproveApplication(app.id)}
                                          disabled={app.status === "approved"}
                                          className="text-green-600"
                                        >
                                          <CheckCircle className="h-4 w-4 mr-2" />
                                          Approve
                                        </DropdownMenuItem>
                                        <DropdownMenuItem
                                          onClick={() => handleRejectApplication(app.id)}
                                          disabled={app.status === "rejected"}
                                          className="text-red-600"
                                        >
                                          <XCircle className="h-4 w-4 mr-2" />
                                          Reject
                                        </DropdownMenuItem>
                                      </DropdownMenuContent>
                                    </DropdownMenu>
                                  </div>
                                </TableCell>
                              </TableRow>
                            ))
                          ) : (
                            <TableRow>
                              <TableCell colSpan={5} className="text-center py-6 text-muted-foreground">
                                No applications found
                              </TableCell>
                            </TableRow>
                          )}
                        </TableBody>
                      </Table>
                    </div>

                    {/* Pagination */}
                    {filteredApplications.length > 0 && (
                      <div className="flex items-center justify-between mt-4">
                        <div className="text-sm text-muted-foreground">
                          Showing {(currentPage - 1) * itemsPerPage + 1} to{" "}
                          {Math.min(currentPage * itemsPerPage, filteredApplications.length)} of{" "}
                          {filteredApplications.length} entries
                        </div>
                        <div className="flex items-center space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                            disabled={currentPage === 1}
                          >
                            <ChevronLeft className="h-4 w-4" />
                          </Button>
                          <div className="text-sm">
                            Page {currentPage} of {totalPages}
                          </div>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                            disabled={currentPage === totalPages}
                          >
                            <ChevronRight className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    )}
                  </>
                )}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>

      {/* Application Details Dialog */}
      <Dialog open={isDetailsDialogOpen} onOpenChange={setIsDetailsDialogOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Application Details</DialogTitle>
            <DialogDescription>Detailed information about the selected application</DialogDescription>
          </DialogHeader>

          {selectedApplication && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-4">
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold">
                    {selectedApplication.projectName} ({selectedApplication.symbol})
                  </h3>
                  <div className="flex gap-2 mt-1">
                    <Badge
                      variant={
                        selectedApplication.status === "approved"
                          ? "default"
                          : selectedApplication.status === "rejected"
                            ? "destructive"
                            : "secondary"
                      }
                      className="capitalize"
                    >
                      {selectedApplication.status}
                    </Badge>
                    <Badge variant="outline" className="capitalize">
                      {selectedApplication.type}
                    </Badge>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="text-sm font-medium">Project Description</div>
                  <p className="text-sm text-muted-foreground">{selectedApplication.description}</p>
                </div>

                <div className="space-y-2">
                  <div className="text-sm font-medium">Contract Address</div>
                  <div className="flex items-center">
                    <code className="text-xs bg-muted p-1 rounded">{selectedApplication.address}</code>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="ml-2 h-6 w-6 p-0"
                      onClick={() => {
                        navigator.clipboard.writeText(selectedApplication.address)
                        toast({
                          title: "Address Copied",
                          description: "Contract address copied to clipboard",
                        })
                      }}
                    >
                      <Copy className="h-3 w-3" />
                    </Button>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Network: {selectedApplication.network.toUpperCase()}
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="text-sm font-medium">Application Timeline</div>
                  <div className="text-xs">
                    <div className="flex justify-between">
                      <span>Submitted:</span>
                      <span>{new Date(selectedApplication.submittedAt).toLocaleString()}</span>
                    </div>
                    {selectedApplication.reviewedAt && (
                      <div className="flex justify-between mt-1">
                        <span>Reviewed:</span>
                        <span>{new Date(selectedApplication.reviewedAt).toLocaleString()}</span>
                      </div>
                    )}
                    {selectedApplication.reviewedBy && (
                      <div className="flex justify-between mt-1">
                        <span>Reviewed by:</span>
                        <span>{selectedApplication.reviewedBy}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="text-sm font-medium">Contact Information</div>
                  <div className="text-xs">
                    <div className="flex justify-between">
                      <span>Email:</span>
                      <span>{selectedApplication.email}</span>
                    </div>
                    <div className="flex justify-between mt-1">
                      <span>Website:</span>
                      <a
                        href={selectedApplication.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 hover:underline"
                      >
                        {selectedApplication.website}
                      </a>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="text-sm font-medium">Social Media</div>
                  <div className="text-xs">
                    <div className="flex justify-between">
                      <span>Telegram:</span>
                      <a
                        href={selectedApplication.telegram}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 hover:underline"
                      >
                        {selectedApplication.telegram}
                      </a>
                    </div>
                    <div className="flex justify-between mt-1">
                      <span>Twitter:</span>
                      <a
                        href={selectedApplication.twitter}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 hover:underline"
                      >
                        {selectedApplication.twitter}
                      </a>
                    </div>
                  </div>
                </div>

                {selectedApplication.notes && (
                  <div className="space-y-2">
                    <div className="text-sm font-medium">Review Notes</div>
                    <p className="text-sm text-muted-foreground">{selectedApplication.notes}</p>
                  </div>
                )}
              </div>
            </div>
          )}

          <DialogFooter className="flex justify-between">
            <div>
              {selectedApplication && selectedApplication.status === "pending" && (
                <>
                  <Button
                    variant="destructive"
                    onClick={() => {
                      if (selectedApplication) {
                        handleRejectApplication(selectedApplication.id)
                        setIsDetailsDialogOpen(false)
                      }
                    }}
                    className="mr-2"
                  >
                    Reject
                  </Button>
                  <Button
                    onClick={() => {
                      if (selectedApplication) {
                        handleApproveApplication(selectedApplication.id)
                        setIsDetailsDialogOpen(false)
                      }
                    }}
                  >
                    Approve
                  </Button>
                </>
              )}
            </div>
            <Button variant="outline" onClick={() => setIsDetailsDialogOpen(false)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  )
}
