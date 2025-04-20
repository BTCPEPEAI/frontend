"use client"

import { useState, useEffect } from "react"
import { AdminLayout } from "@/components/layouts/admin-layout"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Users, FileText, Eye, Search, UserPlus, TrendingUp, Activity, PieChart } from "lucide-react"
import { fetchAdminUsers, fetchApplications } from "@/lib/api"
import type { AdminUser, ApplicationData } from "@/types/common"
import { useToast } from "@/components/ui/use-toast"

export default function AdminUsersPage() {
  const { toast } = useToast()
  const [users, setUsers] = useState<AdminUser[]>([])
  const [applications, setApplications] = useState<ApplicationData[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")

  // User statistics
  const [userStats, setUserStats] = useState({
    totalUsers: 0,
    activeUsers: 0,
    newUsersToday: 0,
    totalApplications: 0,
    applicationsByType: {
      info: 0,
      trending: 0,
      advertising: 0,
      verification: 0,
      other: 0,
    },
    totalVisits: 0,
    activeOnline: 0,
  })

  useEffect(() => {
    const loadData = async () => {
      setLoading(true)
      try {
        const [usersData, appsData] = await Promise.all([fetchAdminUsers(), fetchApplications()])

        setUsers(usersData)
        setApplications(appsData)

        // Calculate statistics
        const appsByType = appsData.reduce(
          (acc, app) => {
            if (app.type === "info") acc.info++
            else if (app.type === "trending") acc.trending++
            else if (app.type === "advertising") acc.advertising++
            else if (app.type === "verification") acc.verification++
            else acc.other++
            return acc
          },
          { info: 0, trending: 0, advertising: 0, verification: 0, other: 0 },
        )

        setUserStats({
          totalUsers: 12458, // Mock data
          activeUsers: 3245, // Mock data
          newUsersToday: 127, // Mock data
          totalApplications: appsData.length,
          applicationsByType: appsByType,
          totalVisits: 28945, // Mock data
          activeOnline: 342, // Mock data
        })
      } catch (error) {
        console.error("Failed to load users data:", error)
        toast({
          title: "Error",
          description: "Failed to load users data. Please try again.",
          variant: "destructive",
        })
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [toast])

  // Filter users based on search query
  const filteredUsers = users.filter(
    (user) =>
      user.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.role.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold">Users Management</h1>
            <p className="text-muted-foreground">Manage users and view statistics</p>
          </div>

          <Button>
            <UserPlus className="mr-2 h-4 w-4" />
            Add User
          </Button>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Users</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <Users className="h-5 w-5 text-blue-500 mr-2" />
                <div className="text-2xl font-bold">{userStats.totalUsers.toLocaleString()}</div>
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                <span className="text-green-500">+{userStats.newUsersToday}</span> new users today
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Applications</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <FileText className="h-5 w-5 text-green-500 mr-2" />
                <div className="text-2xl font-bold">{userStats.totalApplications.toLocaleString()}</div>
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                <span className="text-amber-500">
                  {applications.filter((app) => app.status === "pending").length} pending
                </span>{" "}
                applications
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Visits</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <TrendingUp className="h-5 w-5 text-purple-500 mr-2" />
                <div className="text-2xl font-bold">{userStats.totalVisits.toLocaleString()}</div>
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                <span className="text-green-500">+12.5%</span> from last week
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Active Users</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <Activity className="h-5 w-5 text-orange-500 mr-2" />
                <div className="text-2xl font-bold">{userStats.activeOnline.toLocaleString()}</div>
              </div>
              <p className="text-xs text-muted-foreground mt-2">Currently online</p>
            </CardContent>
          </Card>
        </div>

        {/* Application Categories */}
        <Card className="shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle>Application Categories</CardTitle>
            <CardDescription>Distribution of applications by type</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              <Card className="shadow-sm">
                <CardContent className="pt-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-500">{userStats.applicationsByType.info}</div>
                    <p className="text-sm text-muted-foreground">Info Applications</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-sm">
                <CardContent className="pt-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-orange-500">{userStats.applicationsByType.trending}</div>
                    <p className="text-sm text-muted-foreground">Trending Applications</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-sm">
                <CardContent className="pt-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-500">{userStats.applicationsByType.advertising}</div>
                    <p className="text-sm text-muted-foreground">Ads Applications</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-sm">
                <CardContent className="pt-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-500">
                      {userStats.applicationsByType.verification}
                    </div>
                    <p className="text-sm text-muted-foreground">Verification Applications</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-sm">
                <CardContent className="pt-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-500">{userStats.applicationsByType.other}</div>
                    <p className="text-sm text-muted-foreground">Other Applications</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Visual representation of application distribution */}
            <div className="mt-6">
              <div className="flex items-center mb-2">
                <PieChart className="h-5 w-5 text-muted-foreground mr-2" />
                <h3 className="text-sm font-medium">Application Distribution</h3>
              </div>
              <div className="h-4 w-full bg-muted rounded-full overflow-hidden">
                <div className="flex h-full">
                  <div
                    className="bg-blue-500"
                    style={{
                      width: `${(userStats.applicationsByType.info / userStats.totalApplications) * 100 || 0}%`,
                    }}
                  ></div>
                  <div
                    className="bg-orange-500"
                    style={{
                      width: `${(userStats.applicationsByType.trending / userStats.totalApplications) * 100 || 0}%`,
                    }}
                  ></div>
                  <div
                    className="bg-green-500"
                    style={{
                      width: `${(userStats.applicationsByType.advertising / userStats.totalApplications) * 100 || 0}%`,
                    }}
                  ></div>
                  <div
                    className="bg-purple-500"
                    style={{
                      width: `${(userStats.applicationsByType.verification / userStats.totalApplications) * 100 || 0}%`,
                    }}
                  ></div>
                  <div
                    className="bg-gray-500"
                    style={{
                      width: `${(userStats.applicationsByType.other / userStats.totalApplications) * 100 || 0}%`,
                    }}
                  ></div>
                </div>
              </div>
              <div className="flex flex-wrap gap-4 mt-2 text-xs">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-blue-500 rounded-full mr-1"></div>
                  <span>Info</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-orange-500 rounded-full mr-1"></div>
                  <span>Trending</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-green-500 rounded-full mr-1"></div>
                  <span>Advertising</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-purple-500 rounded-full mr-1"></div>
                  <span>Verification</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-gray-500 rounded-full mr-1"></div>
                  <span>Other</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Users Table */}
        <Card className="shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle>Admin Users</CardTitle>
            <CardDescription>Manage admin users and their permissions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by username, email or role..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            {loading ? (
              <div className="flex items-center justify-center h-64">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
              </div>
            ) : (
              <div className="rounded-md border overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-muted/50">
                      <TableHead>Username</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead>Last Login</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredUsers.length > 0 ? (
                      filteredUsers.map((user) => (
                        <TableRow key={user.id}>
                          <TableCell className="font-medium">{user.username}</TableCell>
                          <TableCell>{user.email}</TableCell>
                          <TableCell>
                            <Badge
                              variant={
                                user.role === "admin" ? "default" : user.role === "moderator" ? "secondary" : "outline"
                              }
                            >
                              {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                            </Badge>
                          </TableCell>
                          <TableCell>{user.lastLogin ? new Date(user.lastLogin).toLocaleString() : "Never"}</TableCell>
                          <TableCell className="text-right">
                            <Button variant="outline" size="sm" className="h-8">
                              <Eye className="h-3.5 w-3.5 mr-1" />
                              View Details
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={5} className="text-center py-6 text-muted-foreground">
                          No users found
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  )
}
