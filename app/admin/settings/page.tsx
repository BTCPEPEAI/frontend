"use client"

import { useState } from "react"
import { AdminLayout } from "@/components/layouts/admin-layout"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Palette, Globe, Bell, Shield, Database, Save, Check } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

export default function AdminSettingsPage() {
  const { toast } = useToast()
  const [activeTab, setActiveTab] = useState("general")
  const [primaryColor, setPrimaryColor] = useState("#3b82f6") // Default blue
  const [accentColor, setAccentColor] = useState("#8b5cf6") // Default purple
  const [darkMode, setDarkMode] = useState(true)
  const [fontFamily, setFontFamily] = useState("inter")
  const [borderRadius, setBorderRadius] = useState(8)
  const [saving, setSaving] = useState(false)
  const [themePreset, setThemePreset] = useState("custom")

  const presetThemes = [
    { name: "Default Blue", primary: "#3b82f6", accent: "#8b5cf6" },
    { name: "Forest Green", primary: "#10b981", accent: "#6366f1" },
    { name: "Ruby Red", primary: "#ef4444", accent: "#f59e0b" },
    { name: "Ocean Blue", primary: "#0ea5e9", accent: "#6366f1" },
    { name: "Dark Purple", primary: "#8b5cf6", accent: "#ec4899" },
  ]

  const handleSaveSettings = () => {
    setSaving(true)

    // Simulate API call
    setTimeout(() => {
      setSaving(false)
      toast({
        title: "Settings Saved",
        description: "Your settings have been saved successfully.",
      })
    }, 1000)
  }

  const applyPresetTheme = (preset: { primary: string; accent: string }) => {
    setPrimaryColor(preset.primary)
    setAccentColor(preset.accent)
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold">Settings</h1>
            <p className="text-muted-foreground">Configure your platform settings</p>
          </div>

          <Button onClick={handleSaveSettings} disabled={saving}>
            {saving ? (
              <>
                <span className="animate-spin mr-2">⏳</span>
                Saving...
              </>
            ) : (
              <>
                <Save className="mr-2 h-4 w-4" />
                Save Settings
              </>
            )}
          </Button>
        </div>

        <Tabs defaultValue="general" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-2 md:grid-cols-5 mb-4">
            <TabsTrigger value="general" className="flex items-center">
              <Globe className="mr-2 h-4 w-4" />
              <span className="hidden md:inline">General</span>
            </TabsTrigger>
            <TabsTrigger value="appearance" className="flex items-center">
              <Palette className="mr-2 h-4 w-4" />
              <span className="hidden md:inline">Appearance</span>
            </TabsTrigger>
            <TabsTrigger value="notifications" className="flex items-center">
              <Bell className="mr-2 h-4 w-4" />
              <span className="hidden md:inline">Notifications</span>
            </TabsTrigger>
            <TabsTrigger value="security" className="flex items-center">
              <Shield className="mr-2 h-4 w-4" />
              <span className="hidden md:inline">Security</span>
            </TabsTrigger>
            <TabsTrigger value="api" className="flex items-center">
              <Database className="mr-2 h-4 w-4" />
              <span className="hidden md:inline">API</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="general">
            <Card className="shadow-sm">
              <CardHeader className="pb-3">
                <CardTitle>General Settings</CardTitle>
                <CardDescription>Configure general platform settings</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="site-name">Site Name</Label>
                  <Input id="site-name" defaultValue="DEXPRICE AI" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="site-description">Site Description</Label>
                  <Input
                    id="site-description"
                    defaultValue="The ultimate platform for cryptocurrency tracking and analysis"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="contact-email">Contact Email</Label>
                  <Input id="contact-email" type="email" defaultValue="support@dexprice.ai" />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="maintenance-mode">Maintenance Mode</Label>
                    <p className="text-sm text-muted-foreground">Put the site in maintenance mode</p>
                  </div>
                  <Switch id="maintenance-mode" />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="auto-approve">Auto Approve Applications</Label>
                    <p className="text-sm text-muted-foreground">Automatically approve new applications</p>
                  </div>
                  <Switch id="auto-approve" />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="appearance">
            <Card className="shadow-sm">
              <CardHeader className="pb-3">
                <CardTitle>Appearance Settings</CardTitle>
                <CardDescription>Customize the look and feel of your platform</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <Label>Theme Presets</Label>
                  <RadioGroup
                    value={themePreset}
                    onValueChange={(value) => {
                      setThemePreset(value)
                      if (value !== "custom") {
                        const preset = presetThemes.find(
                          (theme) => theme.name.toLowerCase().replace(/\s+/g, "-") === value,
                        )
                        if (preset) {
                          applyPresetTheme(preset)
                        }
                      }
                    }}
                    className="grid grid-cols-1 md:grid-cols-3 gap-4"
                  >
                    {presetThemes.map((theme) => (
                      <div key={theme.name.toLowerCase().replace(/\s+/g, "-")}>
                        <RadioGroupItem
                          value={theme.name.toLowerCase().replace(/\s+/g, "-")}
                          id={theme.name.toLowerCase().replace(/\s+/g, "-")}
                          className="sr-only"
                        />
                        <Label
                          htmlFor={theme.name.toLowerCase().replace(/\s+/g, "-")}
                          className={`flex flex-col items-center justify-center border rounded-md p-4 cursor-pointer hover:bg-muted/50 ${
                            themePreset === theme.name.toLowerCase().replace(/\s+/g, "-")
                              ? "border-primary bg-primary/10"
                              : "border-muted"
                          }`}
                        >
                          <div className="flex gap-2 mb-2">
                            <div className="w-6 h-6 rounded-full" style={{ backgroundColor: theme.primary }}></div>
                            <div className="w-6 h-6 rounded-full" style={{ backgroundColor: theme.accent }}></div>
                          </div>
                          <span className="text-sm font-medium">{theme.name}</span>
                          {themePreset === theme.name.toLowerCase().replace(/\s+/g, "-") && (
                            <Check className="h-4 w-4 text-primary mt-1" />
                          )}
                        </Label>
                      </div>
                    ))}
                    <div>
                      <RadioGroupItem value="custom" id="custom" className="sr-only" />
                      <Label
                        htmlFor="custom"
                        className={`flex flex-col items-center justify-center border rounded-md p-4 cursor-pointer hover:bg-muted/50 ${
                          themePreset === "custom" ? "border-primary bg-primary/10" : "border-muted"
                        }`}
                      >
                        <div className="flex gap-2 mb-2">
                          <div className="w-6 h-6 rounded-full" style={{ backgroundColor: primaryColor }}></div>
                          <div className="w-6 h-6 rounded-full" style={{ backgroundColor: accentColor }}></div>
                        </div>
                        <span className="text-sm font-medium">Custom</span>
                        {themePreset === "custom" && <Check className="h-4 w-4 text-primary mt-1" />}
                      </Label>
                    </div>
                  </RadioGroup>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="primary-color">Primary Color</Label>
                  <div className="flex items-center gap-4">
                    <Input
                      id="primary-color"
                      type="color"
                      value={primaryColor}
                      onChange={(e) => {
                        setPrimaryColor(e.target.value)
                        setThemePreset("custom")
                      }}
                      className="w-16 h-10 p-1"
                    />
                    <Input
                      value={primaryColor}
                      onChange={(e) => {
                        setPrimaryColor(e.target.value)
                        setThemePreset("custom")
                      }}
                      className="flex-1"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="accent-color">Accent Color</Label>
                  <div className="flex items-center gap-4">
                    <Input
                      id="accent-color"
                      type="color"
                      value={accentColor}
                      onChange={(e) => {
                        setAccentColor(e.target.value)
                        setThemePreset("custom")
                      }}
                      className="w-16 h-10 p-1"
                    />
                    <Input
                      value={accentColor}
                      onChange={(e) => {
                        setAccentColor(e.target.value)
                        setThemePreset("custom")
                      }}
                      className="flex-1"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="dark-mode">Dark Mode</Label>
                    <p className="text-sm text-muted-foreground">Enable dark mode by default</p>
                  </div>
                  <Switch id="dark-mode" checked={darkMode} onCheckedChange={setDarkMode} />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="font-family">Font Family</Label>
                  <Select value={fontFamily} onValueChange={setFontFamily}>
                    <SelectTrigger id="font-family">
                      <SelectValue placeholder="Select font family" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="inter">Inter</SelectItem>
                      <SelectItem value="roboto">Roboto</SelectItem>
                      <SelectItem value="poppins">Poppins</SelectItem>
                      <SelectItem value="opensans">Open Sans</SelectItem>
                      <SelectItem value="montserrat">Montserrat</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label htmlFor="border-radius">Border Radius: {borderRadius}px</Label>
                  </div>
                  <Slider
                    id="border-radius"
                    min={0}
                    max={20}
                    step={1}
                    value={[borderRadius]}
                    onValueChange={(value) => setBorderRadius(value[0])}
                  />
                </div>

                <div className="pt-4">
                  <h3 className="text-sm font-medium mb-3">Preview</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div
                      className="p-4 rounded-md flex items-center justify-center"
                      style={{
                        backgroundColor: primaryColor,
                        color: "white",
                        borderRadius: `${borderRadius}px`,
                        fontFamily:
                          fontFamily === "inter"
                            ? "Inter, sans-serif"
                            : fontFamily === "roboto"
                              ? "Roboto, sans-serif"
                              : fontFamily === "poppins"
                                ? "Poppins, sans-serif"
                                : fontFamily === "opensans"
                                  ? "Open Sans, sans-serif"
                                  : "Montserrat, sans-serif",
                      }}
                    >
                      Primary Button
                    </div>
                    <div
                      className="p-4 rounded-md flex items-center justify-center"
                      style={{
                        backgroundColor: accentColor,
                        color: "white",
                        borderRadius: `${borderRadius}px`,
                        fontFamily:
                          fontFamily === "inter"
                            ? "Inter, sans-serif"
                            : fontFamily === "roboto"
                              ? "Roboto, sans-serif"
                              : fontFamily === "poppins"
                                ? "Poppins, sans-serif"
                                : fontFamily === "opensans"
                                  ? "Open Sans, sans-serif"
                                  : "Montserrat, sans-serif",
                      }}
                    >
                      Accent Button
                    </div>
                  </div>
                </div>

                <div className="pt-4">
                  <h3 className="text-sm font-medium mb-3">Component Preview</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Card className="shadow-sm" style={{ borderRadius: `${borderRadius}px` }}>
                      <CardHeader className="pb-2">
                        <CardTitle>Card Example</CardTitle>
                        <CardDescription>This is how cards will look</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm">Content inside the card with your selected styling.</p>
                      </CardContent>
                    </Card>
                    <div className="space-y-2">
                      <Button
                        style={{
                          backgroundColor: primaryColor,
                          borderRadius: `${borderRadius}px`,
                        }}
                      >
                        Primary Button
                      </Button>
                      <div className="h-2"></div>
                      <Button
                        variant="outline"
                        style={{
                          borderRadius: `${borderRadius}px`,
                          borderColor: accentColor,
                          color: accentColor,
                        }}
                      >
                        Outline Button
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="notifications">
            <Card className="shadow-sm">
              <CardHeader className="pb-3">
                <CardTitle>Notification Settings</CardTitle>
                <CardDescription>Configure how notifications are sent</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Email Notifications</Label>
                    <p className="text-sm text-muted-foreground">Send notifications via email</p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Telegram Notifications</Label>
                    <p className="text-sm text-muted-foreground">Send notifications via Telegram</p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>New Application Alerts</Label>
                    <p className="text-sm text-muted-foreground">Get notified when new applications are submitted</p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>User Registration Alerts</Label>
                    <p className="text-sm text-muted-foreground">Get notified when new users register</p>
                  </div>
                  <Switch />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="security">
            <Card className="shadow-sm">
              <CardHeader className="pb-3">
                <CardTitle>Security Settings</CardTitle>
                <CardDescription>Configure security settings for your platform</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Two-Factor Authentication</Label>
                    <p className="text-sm text-muted-foreground">Require 2FA for admin users</p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>IP Restriction</Label>
                    <p className="text-sm text-muted-foreground">Restrict admin access to specific IPs</p>
                  </div>
                  <Switch />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="session-timeout">Session Timeout (minutes)</Label>
                  <Input id="session-timeout" type="number" defaultValue="30" min="5" max="120" />
                </div>

                <div className="pt-4">
                  <Button variant="outline" className="w-full">
                    <Shield className="mr-2 h-4 w-4" />
                    Security Audit Log
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="api">
            <Card className="shadow-sm">
              <CardHeader className="pb-3">
                <CardTitle>API Settings</CardTitle>
                <CardDescription>Configure API settings and keys</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="api-key">API Key</Label>
                  <div className="flex gap-2">
                    <Input
                      id="api-key"
                      value="sk_live_51KjLqWErtF6VGVyTNzrNvfDDkjJLk7fQe"
                      readOnly
                      className="flex-1"
                    />
                    <Button variant="outline">Regenerate</Button>
                  </div>
                  <p className="text-xs text-muted-foreground">This key provides access to your API. Keep it secure.</p>
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Enable API Access</Label>
                    <p className="text-sm text-muted-foreground">Allow external applications to access your API</p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="rate-limit">Rate Limit (requests per minute)</Label>
                  <Input id="rate-limit" type="number" defaultValue="60" min="10" max="1000" />
                </div>

                <div className="pt-4">
                  <Button variant="outline" className="w-full">
                    <Database className="mr-2 h-4 w-4" />
                    View API Documentation
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  )
}
