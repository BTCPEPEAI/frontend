"use client"

import { useState } from "react"
import { AdminLayout } from "@/components/layouts/admin-layout"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { useToast } from "@/components/ui/use-toast"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { Save, Plus, Trash2, Edit, RefreshCw, Database, BarChart3, Wallet, ShoppingCart } from "lucide-react"

export default function ApiManagementPage() {
  const { toast } = useToast()
  const [activeTab, setActiveTab] = useState("price-data")
  const [isAddApiDialogOpen, setIsAddApiDialogOpen] = useState(false)
  const [isEditApiDialogOpen, setIsEditApiDialogOpen] = useState(false)
  const [selectedApi, setSelectedApi] = useState<any>(null)
  const [newApiData, setNewApiData] = useState({
    name: "",
    url: "",
    apiKey: "",
    type: "price-data",
    isActive: true,
  })

  // Mock API data
  const [apis, setApis] = useState([
    {
      id: "1",
      name: "CoinGecko Pro",
      url: "https://pro-api.coingecko.com/api/v3",
      apiKey: "xxxxxxxxxxxxxxxxxxx",
      type: "price-data",
      isActive: true,
      status: "healthy",
      lastChecked: "2023-06-15T10:30:00Z",
      requestsToday: 15420,
      requestsLimit: 50000,
    },
    {
      id: "2",
      name: "CoinMarketCap",
      url: "https://pro-api.coinmarketcap.com/v1",
      apiKey: "xxxxxxxxxxxxxxxxxxx",
      type: "price-data",
      isActive: false,
      status: "rate-limited",
      lastChecked: "2023-06-15T09:45:00Z",
      requestsToday: 49850,
      requestsLimit: 50000,
    },
    {
      id: "3",
      name: "Etherscan",
      url: "https://api.etherscan.io/api",
      apiKey: "xxxxxxxxxxxxxxxxxxx",
      type: "blockchain-data",
      isActive: true,
      status: "healthy",
      lastChecked: "2023-06-15T10:15:00Z",
      requestsToday: 8750,
      requestsLimit: 100000,
    },
    {
      id: "4",
      name: "BscScan",
      url: "https://api.bscscan.com/api",
      apiKey: "xxxxxxxxxxxxxxxxxxx",
      type: "blockchain-data",
      isActive: true,
      status: "healthy",
      lastChecked: "2023-06-15T10:20:00Z",
      requestsToday: 12340,
      requestsLimit: 100000,
    },
    {
      id: "5",
      name: "PancakeSwap",
      url: "https://api.pancakeswap.info/api/v2",
      apiKey: "",
      type: "dex-data",
      isActive: true,
      status: "healthy",
      lastChecked: "2023-06-15T10:25:00Z",
      requestsToday: 5670,
      requestsLimit: 10000,
    },
    {
      id: "6",
      name: "Uniswap",
      url: "https://api.uniswap.org/v1",
      apiKey: "xxxxxxxxxxxxxxxxxxx",
      type: "dex-data",
      isActive: true,
      status: "healthy",
      lastChecked: "2023-06-15T10:10:00Z",
      requestsToday: 4320,
      requestsLimit: 10000,
    },
    {
      id: "7",
      name: "Moralis",
      url: "https://deep-index.moralis.io/api/v2",
      apiKey: "xxxxxxxxxxxxxxxxxxx",
      type: "wallet-data",
      isActive: true,
      status: "healthy",
      lastChecked: "2023-06-15T10:05:00Z",
      requestsToday: 7890,
      requestsLimit: 25000,
    },
    {
      id: "8",
      name: "Covalent",
      url: "https://api.covalenthq.com/v1",
      apiKey: "xxxxxxxxxxxxxxxxxxx",
      type: "wallet-data",
      isActive: false,
      status: "error",
      lastChecked: "2023-06-15T08:30:00Z",
      requestsToday: 0,
      requestsLimit: 25000,
    },
  ])

  const handleAddApi = () => {
    if (!newApiData.name || !newApiData.url) {
      toast({
        title: "Missing information",
        description: "Please provide a name and URL for the API",
        variant: "destructive",
      })
      return
    }

    const newApi = {
      id: (apis.length + 1).toString(),
      ...newApiData,
      status: "healthy",
      lastChecked: new Date().toISOString(),
      requestsToday: 0,
      requestsLimit: 50000,
    }

    setApis([...apis, newApi])
    setIsAddApiDialogOpen(false)
    setNewApiData({
      name: "",
      url: "",
      apiKey: "",
      type: "price-data",
      isActive: true,
    })

    toast({
      title: "API added",
      description: `${newApiData.name} has been added successfully`,
    })
  }

  const handleEditApi = () => {
    if (!selectedApi) return

    const updatedApis = apis.map((api) => (api.id === selectedApi.id ? selectedApi : api))

    setApis(updatedApis)
    setIsEditApiDialogOpen(false)
    setSelectedApi(null)

    toast({
      title: "API updated",
      description: `${selectedApi.name} has been updated successfully`,
    })
  }

  const handleDeleteApi = (id: string) => {
    setApis(apis.filter((api) => api.id !== id))

    toast({
      title: "API deleted",
      description: "The API has been deleted successfully",
    })
  }

  const handleToggleApiStatus = (id: string) => {
    const updatedApis = apis.map((api) => (api.id === id ? { ...api, isActive: !api.isActive } : api))

    setApis(updatedApis)

    const api = apis.find((api) => api.id === id)

    toast({
      title: api?.isActive ? "API disabled" : "API enabled",
      description: `${api?.name} has been ${api?.isActive ? "disabled" : "enabled"} successfully`,
    })
  }

  const handleTestApi = (id: string) => {
    // In a real implementation, you would test the API connection
    toast({
      title: "Testing API",
      description: "Testing API connection...",
    })

    // Simulate API test
    setTimeout(() => {
      const api = apis.find((api) => api.id === id)

      toast({
        title: "API test successful",
        description: `Successfully connected to ${api?.name}`,
      })
    }, 1500)
  }

  const filteredApis = apis.filter((api) => api.type === activeTab)

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold">API Management</h1>
            <p className="text-muted-foreground">Manage and configure APIs for fetching cryptocurrency data</p>
          </div>

          <Button onClick={() => setIsAddApiDialogOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Add New API
          </Button>
        </div>

        <Tabs defaultValue="price-data" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-4 mb-4">
            <TabsTrigger value="price-data">
              <BarChart3 className="mr-2 h-4 w-4" />
              Price Data
            </TabsTrigger>
            <TabsTrigger value="blockchain-data">
              <Database className="mr-2 h-4 w-4" />
              Blockchain Data
            </TabsTrigger>
            <TabsTrigger value="dex-data">
              <ShoppingCart className="mr-2 h-4 w-4" />
              DEX Data
            </TabsTrigger>
            <TabsTrigger value="wallet-data">
              <Wallet className="mr-2 h-4 w-4" />
              Wallet Data
            </TabsTrigger>
          </TabsList>

          <TabsContent value="price-data" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Price Data APIs</CardTitle>
                <CardDescription>
                  APIs for fetching cryptocurrency price data, market caps, and trading volumes
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>URL</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Usage</TableHead>
                        <TableHead>Active</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredApis.map((api) => (
                        <TableRow key={api.id}>
                          <TableCell className="font-medium">{api.name}</TableCell>
                          <TableCell className="font-mono text-xs">{api.url}</TableCell>
                          <TableCell>
                            <div className="flex items-center">
                              <div
                                className={`h-2 w-2 rounded-full mr-2 ${
                                  api.status === "healthy"
                                    ? "bg-green-500"
                                    : api.status === "rate-limited"
                                      ? "bg-yellow-500"
                                      : "bg-red-500"
                                }`}
                              />
                              <span className="capitalize">{api.status}</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex flex-col">
                              <span>
                                {api.requestsToday.toLocaleString()} / {api.requestsLimit.toLocaleString()}
                              </span>
                              <div className="w-32 h-2 bg-muted rounded-full mt-1">
                                <div
                                  className={`h-2 rounded-full ${
                                    (api.requestsToday / api.requestsLimit) > 0.9
                                      ? "bg-red-500"
                                      : api.requestsToday / api.requestsLimit > 0.7
                                        ? "bg-yellow-500"
                                        : "bg-green-500"
                                  }`}
                                  style={{ width: `${(api.requestsToday / api.requestsLimit) * 100}%` }}
                                />
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Switch checked={api.isActive} onCheckedChange={() => handleToggleApiStatus(api.id)} />
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => {
                                  setSelectedApi(api)
                                  setIsEditApiDialogOpen(true)
                                }}
                              >
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="icon" onClick={() => handleTestApi(api.id)}>
                                <RefreshCw className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => handleDeleteApi(api.id)}
                                className="text-red-500 hover:text-red-700 hover:bg-red-100"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}

                      {filteredApis.length === 0 && (
                        <TableRow>
                          <TableCell colSpan={6} className="text-center py-6 text-muted-foreground">
                            No APIs found for this category
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="blockchain-data" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Blockchain Data APIs</CardTitle>
                <CardDescription>
                  APIs for fetching blockchain data, transactions, and contract information
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>URL</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Usage</TableHead>
                        <TableHead>Active</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredApis.map((api) => (
                        <TableRow key={api.id}>
                          <TableCell className="font-medium">{api.name}</TableCell>
                          <TableCell className="font-mono text-xs">{api.url}</TableCell>
                          <TableCell>
                            <div className="flex items-center">
                              <div
                                className={`h-2 w-2 rounded-full mr-2 ${
                                  api.status === "healthy"
                                    ? "bg-green-500"
                                    : api.status === "rate-limited"
                                      ? "bg-yellow-500"
                                      : "bg-red-500"
                                }`}
                              />
                              <span className="capitalize">{api.status}</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex flex-col">
                              <span>
                                {api.requestsToday.toLocaleString()} / {api.requestsLimit.toLocaleString()}
                              </span>
                              <div className="w-32 h-2 bg-muted rounded-full mt-1">
                                <div
                                  className={`h-2 rounded-full ${
                                    (api.requestsToday / api.requestsLimit) > 0.9
                                      ? "bg-red-500"
                                      : api.requestsToday / api.requestsLimit > 0.7
                                        ? "bg-yellow-500"
                                        : "bg-green-500"
                                  }`}
                                  style={{ width: `${(api.requestsToday / api.requestsLimit) * 100}%` }}
                                />
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Switch checked={api.isActive} onCheckedChange={() => handleToggleApiStatus(api.id)} />
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => {
                                  setSelectedApi(api)
                                  setIsEditApiDialogOpen(true)
                                }}
                              >
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="icon" onClick={() => handleTestApi(api.id)}>
                                <RefreshCw className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => handleDeleteApi(api.id)}
                                className="text-red-500 hover:text-red-700 hover:bg-red-100"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}

                      {filteredApis.length === 0 && (
                        <TableRow>
                          <TableCell colSpan={6} className="text-center py-6 text-muted-foreground">
                            No APIs found for this category
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="dex-data" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>DEX Data APIs</CardTitle>
                <CardDescription>
                  APIs for fetching decentralized exchange data, liquidity, and trading information
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>URL</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Usage</TableHead>
                        <TableHead>Active</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredApis.map((api) => (
                        <TableRow key={api.id}>
                          <TableCell className="font-medium">{api.name}</TableCell>
                          <TableCell className="font-mono text-xs">{api.url}</TableCell>
                          <TableCell>
                            <div className="flex items-center">
                              <div
                                className={`h-2 w-2 rounded-full mr-2 ${
                                  api.status === "healthy"
                                    ? "bg-green-500"
                                    : api.status === "rate-limited"
                                      ? "bg-yellow-500"
                                      : "bg-red-500"
                                }`}
                              />
                              <span className="capitalize">{api.status}</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex flex-col">
                              <span>
                                {api.requestsToday.toLocaleString()} / {api.requestsLimit.toLocaleString()}
                              </span>
                              <div className="w-32 h-2 bg-muted rounded-full mt-1">
                                <div
                                  className={`h-2 rounded-full ${
                                    (api.requestsToday / api.requestsLimit) > 0.9
                                      ? "bg-red-500"
                                      : api.requestsToday / api.requestsLimit > 0.7
                                        ? "bg-yellow-500"
                                        : "bg-green-500"
                                  }`}
                                  style={{ width: `${(api.requestsToday / api.requestsLimit) * 100}%` }}
                                />
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Switch checked={api.isActive} onCheckedChange={() => handleToggleApiStatus(api.id)} />
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => {
                                  setSelectedApi(api)
                                  setIsEditApiDialogOpen(true)
                                }}
                              >
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="icon" onClick={() => handleTestApi(api.id)}>
                                <RefreshCw className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => handleDeleteApi(api.id)}
                                className="text-red-500 hover:text-red-700 hover:bg-red-100"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}

                      {filteredApis.length === 0 && (
                        <TableRow>
                          <TableCell colSpan={6} className="text-center py-6 text-muted-foreground">
                            No APIs found for this category
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="wallet-data" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Wallet Data APIs</CardTitle>
                <CardDescription>
                  APIs for fetching wallet balances, transactions, and portfolio information
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>URL</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Usage</TableHead>
                        <TableHead>Active</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredApis.map((api) => (
                        <TableRow key={api.id}>
                          <TableCell className="font-medium">{api.name}</TableCell>
                          <TableCell className="font-mono text-xs">{api.url}</TableCell>
                          <TableCell>
                            <div className="flex items-center">
                              <div
                                className={`h-2 w-2 rounded-full mr-2 ${
                                  api.status === "healthy"
                                    ? "bg-green-500"
                                    : api.status === "rate-limited"
                                      ? "bg-yellow-500"
                                      : "bg-red-500"
                                }`}
                              />
                              <span className="capitalize">{api.status}</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex flex-col">
                              <span>
                                {api.requestsToday.toLocaleString()} / {api.requestsLimit.toLocaleString()}
                              </span>
                              <div className="w-32 h-2 bg-muted rounded-full mt-1">
                                <div
                                  className={`h-2 rounded-full ${
                                    (api.requestsToday / api.requestsLimit) > 0.9
                                      ? "bg-red-500"
                                      : api.requestsToday / api.requestsLimit > 0.7
                                        ? "bg-yellow-500"
                                        : "bg-green-500"
                                  }`}
                                  style={{ width: `${(api.requestsToday / api.requestsLimit) * 100}%` }}
                                />
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Switch checked={api.isActive} onCheckedChange={() => handleToggleApiStatus(api.id)} />
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => {
                                  setSelectedApi(api)
                                  setIsEditApiDialogOpen(true)
                                }}
                              >
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="icon" onClick={() => handleTestApi(api.id)}>
                                <RefreshCw className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => handleDeleteApi(api.id)}
                                className="text-red-500 hover:text-red-700 hover:bg-red-100"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}

                      {filteredApis.length === 0 && (
                        <TableRow>
                          <TableCell colSpan={6} className="text-center py-6 text-muted-foreground">
                            No APIs found for this category
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Add API Dialog */}
      <Dialog open={isAddApiDialogOpen} onOpenChange={setIsAddApiDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New API</DialogTitle>
            <DialogDescription>Add a new API for fetching cryptocurrency data</DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input
                id="name"
                value={newApiData.name}
                onChange={(e) => setNewApiData({ ...newApiData, name: e.target.value })}
                className="col-span-3"
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="url" className="text-right">
                URL
              </Label>
              <Input
                id="url"
                value={newApiData.url}
                onChange={(e) => setNewApiData({ ...newApiData, url: e.target.value })}
                className="col-span-3"
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="apiKey" className="text-right">
                API Key
              </Label>
              <Input
                id="apiKey"
                value={newApiData.apiKey}
                onChange={(e) => setNewApiData({ ...newApiData, apiKey: e.target.value })}
                className="col-span-3"
                type="password"
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="type" className="text-right">
                Type
              </Label>
              <Select value={newApiData.type} onValueChange={(value) => setNewApiData({ ...newApiData, type: value })}>
                <SelectTrigger className="col-span-3">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="price-data">Price Data</SelectItem>
                  <SelectItem value="blockchain-data">Blockchain Data</SelectItem>
                  <SelectItem value="dex-data">DEX Data</SelectItem>
                  <SelectItem value="wallet-data">Wallet Data</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="isActive" className="text-right">
                Active
              </Label>
              <div className="col-span-3 flex items-center">
                <Switch
                  id="isActive"
                  checked={newApiData.isActive}
                  onCheckedChange={(checked) => setNewApiData({ ...newApiData, isActive: checked })}
                />
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddApiDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddApi}>
              <Save className="mr-2 h-4 w-4" />
              Add API
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit API Dialog */}
      <Dialog open={isEditApiDialogOpen} onOpenChange={setIsEditApiDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit API</DialogTitle>
            <DialogDescription>Edit API configuration</DialogDescription>
          </DialogHeader>

          {selectedApi && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-name" className="text-right">
                  Name
                </Label>
                <Input
                  id="edit-name"
                  value={selectedApi.name}
                  onChange={(e) => setSelectedApi({ ...selectedApi, name: e.target.value })}
                  className="col-span-3"
                />
              </div>

              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-url" className="text-right">
                  URL
                </Label>
                <Input
                  id="edit-url"
                  value={selectedApi.url}
                  onChange={(e) => setSelectedApi({ ...selectedApi, url: e.target.value })}
                  className="col-span-3"
                />
              </div>

              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-apiKey" className="text-right">
                  API Key
                </Label>
                <Input
                  id="edit-apiKey"
                  value={selectedApi.apiKey}
                  onChange={(e) => setSelectedApi({ ...selectedApi, apiKey: e.target.value })}
                  className="col-span-3"
                  type="password"
                />
              </div>

              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-type" className="text-right">
                  Type
                </Label>
                <Select
                  value={selectedApi.type}
                  onValueChange={(value) => setSelectedApi({ ...selectedApi, type: value })}
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="price-data">Price Data</SelectItem>
                    <SelectItem value="blockchain-data">Blockchain Data</SelectItem>
                    <SelectItem value="dex-data">DEX Data</SelectItem>
                    <SelectItem value="wallet-data">Wallet Data</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-isActive" className="text-right">
                  Active
                </Label>
                <div className="col-span-3 flex items-center">
                  <Switch
                    id="edit-isActive"
                    checked={selectedApi.isActive}
                    onCheckedChange={(checked) => setSelectedApi({ ...selectedApi, isActive: checked })}
                  />
                </div>
              </div>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditApiDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleEditApi}>
              <Save className="mr-2 h-4 w-4" />
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  )
}
