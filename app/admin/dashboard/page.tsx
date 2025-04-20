"use client"

import { useState, useEffect } from "react"
import { AdminLayout } from "@/components/layouts/admin-layout"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Users,
  FileText,
  TrendingUp,
  Activity,
  DollarSign,
  BarChart3,
  ArrowUpRight,
  ArrowDownRight,
  Clock,
} from "lucide-react"
import { useRouter } from "next/navigation"
import { fetchApplications, fetchAdminUsers, fetchTrendingCoins } from "@/lib/api"
import type { ApplicationData, AdminUser, CoinData } from "@/types/common"
import { useToast } from "@/components/ui/use-toast"

export default function AdminDashboardPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [activeTab, setActiveTab] = useState("dashboard")
  const [applications, setApplications] = useState<ApplicationData[]>([])
  const [users, setUsers] = useState<AdminUser[]>([])
  const [stats, setStats] = useState({
    users: {
      total: 12458,
      active: 3245,
      newToday: 127,
      growth: 12.5,
    },
    applications: {
      total: 342,
      pending: 48,
      approved: 278,
      rejected: 16,
    },
    traffic: {
      totalVisits: 28945,
      uniqueVisitors: 15678,
      pageViews: 87432,
      bounceRate: 42.3,
    },
    revenue: {
      total: 24895,
      thisMonth: 4325,
      lastMonth: 3890,
      growth: 11.2,
    },
  })
  const [trendingCoins, setTrendingCoins] = useState<CoinData[]>([])
  const [loading, setLoading] = useState(true)
  const [timeframe, setTimeframe] = useState("week")

  useEffect(() => {
    const loadData = async () => {
      setLoading(true)
      try {
        const [appsData, usersData, trendingData] = await Promise.all([
          fetchApplications(),
          fetchAdminUsers(),
          fetchTrendingCoins(),
        ])

        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 500))

        setApplications(appsData)
        setUsers(usersData)
        setTrendingCoins(trendingData)
      } catch (error) {
        console.error("Failed to load admin data:", error)
        toast({
          title: "Error",
          description: "Failed to load data. Please try again.",
          variant: "destructive",
        })
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [toast, timeframe])

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">Overview of your platform's performance</p>
        </div>

        <div className="flex justify-end">
          <Tabs defaultValue="week" value={timeframe} onValueChange={setTimeframe} className="w-[400px]">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="week">Week</TabsTrigger>
              <TabsTrigger value="month">Month</TabsTrigger>
              <TabsTrigger value="year">Year</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Users</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <Users className="h-5 w-5 text-blue-500 mr-2" />
                <div className="text-2xl font-bold">{stats.users.total.toLocaleString()}</div>
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                <span className="text-green-500">+{stats.users.newToday}</span> new users today
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
                <div className="text-2xl font-bold">{stats.applications.total.toLocaleString()}</div>
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                <span className="text-amber-500">{stats.applications.pending}</span> pending applications
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
                <div className="text-2xl font-bold">{stats.traffic.totalVisits.toLocaleString()}</div>
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                <span className="text-green-500">+{stats.users.growth}%</span> from last {timeframe}
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Revenue</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <DollarSign className="h-5 w-5 text-orange-500 mr-2" />
                <div className="text-2xl font-bold">${stats.revenue.total.toLocaleString()}</div>
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                <span className="text-green-500">+{stats.revenue.growth}%</span> from last {timeframe}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle>Recent Applications</CardTitle>
              <CardDescription>Latest applications submitted to your platform</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0">
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                        <FileText className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <div className="font-medium">Project {i}</div>
                        <div className="text-sm text-muted-foreground">
                          {i % 2 === 0 ? "Trending Application" : "Info Application"}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <div className="text-sm text-muted-foreground mr-4">
                        <Clock className="h-3 w-3 inline mr-1" />
                        {i} hour{i !== 1 ? "s" : ""} ago
                      </div>
                      <div className="bg-amber-100 text-amber-800 text-xs px-2 py-1 rounded-full">Pending</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle>Traffic Overview</CardTitle>
              <CardDescription>User traffic statistics for your platform</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="text-sm font-medium leading-none">Unique Visitors</p>
                    <p className="text-sm text-muted-foreground">Total unique users</p>
                  </div>
                  <div className="flex items-center">
                    <ArrowUpRight className="mr-1 h-4 w-4 text-green-500" />
                    <div className="font-bold">{stats.traffic.uniqueVisitors.toLocaleString()}</div>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="text-sm font-medium leading-none">Page Views</p>
                    <p className="text-sm text-muted-foreground">Total page views</p>
                  </div>
                  <div className="flex items-center">
                    <ArrowUpRight className="mr-1 h-4 w-4 text-green-500" />
                    <div className="font-bold">{stats.traffic.pageViews.toLocaleString()}</div>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="text-sm font-medium leading-none">Bounce Rate</p>
                    <p className="text-sm text-muted-foreground">Average bounce rate</p>
                  </div>
                  <div className="flex items-center">
                    <ArrowDownRight className="mr-1 h-4 w-4 text-red-500" />
                    <div className="font-bold">{stats.traffic.bounceRate}%</div>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="text-sm font-medium leading-none">Active Users</p>
                    <p className="text-sm text-muted-foreground">Currently online</p>
                  </div>
                  <div className="flex items-center">
                    <Activity className="mr-1 h-4 w-4 text-blue-500" />
                    <div className="font-bold">{stats.users.active.toLocaleString()}</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Revenue Chart */}
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle>Revenue Overview</CardTitle>
            <CardDescription>Revenue statistics for your platform</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] flex items-center justify-center">
              <div className="text-center">
                <BarChart3 className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">Revenue chart visualization would appear here</p>
                <p className="text-sm text-muted-foreground mt-2">
                  This month: ${stats.revenue.thisMonth.toLocaleString()} | Last month: $
                  {stats.revenue.lastMonth.toLocaleString()}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  )
}
