"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { MainLayout } from "@/components/layouts/main-layout";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import { Upload, Save, ImageIcon, ArrowLeft } from "lucide-react";
import { fetchCoinData } from "@/lib/api";
import type { CoinData } from "@/types/common";
import { MessageCircle } from "lucide-react"
import { Skeleton } from "@/components/ui/skeleton";

export default function SubmitInfoPage({ params }: { params: Promise<{ address: string }> }) {
  const { toast } = useToast();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("info");
  const [coinData, setCoinData] = useState<CoinData | null>(null);
  const [loading, setLoading] = useState(true);
  const [address, setAddress] = useState<string | null>(null);

  const [projectInfo, setProjectInfo] = useState({
    name: "",
    symbol: "",
    description: "",
    website: "",
    twitter: "",
    telegram: "",
    discord: "",
    github: "",
    twitterAnnouncement: "",
    telegramAnnouncement: "",
  });

  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [bannerFile, setBannerFile] = useState<File | null>(null);

  const logoInputRef = useRef<HTMLInputElement | null>(null);
  const bannerInputRef = useRef<HTMLInputElement | null>(null);

  // Unwrap params using React.use()
  useEffect(() => {
    params.then((resolvedParams) => {
      setAddress(resolvedParams.address);
    });
  }, [params]);

  // Fetch coin data
  useEffect(() => {
    if (!address) return;

    const getCoinData = async () => {
      try {
        setLoading(true);
        const data = await fetchCoinData(address);
        setCoinData(data);

        // Initialize form with coin data
        setProjectInfo({
          name: data.name || "",
          symbol: data.symbol || "",
          description: data.description || "",
          website: data.website || "",
          twitter: data.twitter || "",
          telegram: data.telegram || "",
          discord: data.discord || "",
          github: data.github || "",
          twitterAnnouncement: "",
          telegramAnnouncement: "",
        });
      } catch (error) {
        console.error("Error fetching coin data:", error);
        toast({
          title: "Error",
          description: "Failed to fetch coin data. Please try again later.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    getCoinData();
  }, [address, toast]);

  const handleInfoChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProjectInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveInfo = () => {
    if (!address) return;

    // Simulate API submission
    toast({
      title: "Information submitted",
      description: "Your project information has been submitted for review.",
    });

    // Redirect back to coin page
    setTimeout(() => {
      router.push(`/coin/${address}`);
    }, 2000);
  };

  const handleUploadLogo = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setLogoFile(e.target.files[0]);
      toast({
        title: "Logo selected",
        description: "Your project logo has been selected for upload.",
      });
    }
  };

  const handleUploadBanner = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setBannerFile(e.target.files[0]);
      toast({
        title: "Banner selected",
        description: "Your project banner has been selected for upload.",
      });
    }
  };

  const handleGoBack = () => {
    if (!address) return;
    router.push(`/coin/${address}`);
  };

  const handleContactSupport = () => {
    window.open("https://t.me/dexprice_support", "_blank")
  }


  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-6">
        <Button variant="ghost" className="mb-4 pl-0" onClick={handleGoBack} disabled={!address}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Project
        </Button>

        <Card>
          <CardHeader>
            <CardTitle>Submit Project Information</CardTitle>
            <CardDescription>
              Provide accurate information about your project. All submissions will be reviewed before being published.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="space-y-6">
                <Skeleton className="w-full h-8" />
                <Skeleton className="w-full h-32" />
                <Skeleton className="w-full h-8" />
                <Skeleton className="w-full h-8" />
              </div>
            ) : (
              <Tabs defaultValue="info" value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="info">Project Info</TabsTrigger>
                  <TabsTrigger value="assets">Project Assets</TabsTrigger>
                </TabsList>

                <TabsContent value="info" className="space-y-4 mt-6">
                  {/* Project Info Form */}
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

                  <div className="space-y-2 mt-4">
                    <Label htmlFor="twitterAnnouncement">Twitter Announcement Link</Label>
                    <Input
                      id="twitterAnnouncement"
                      name="twitterAnnouncement"
                      value={projectInfo.twitterAnnouncement}
                      onChange={handleInfoChange}
                      placeholder="https://twitter.com/username/status/123456789"
                    />
                  </div>

                  <div className="space-y-2 mt-4">
                    <Label htmlFor="telegramAnnouncement">Telegram Announcement Link</Label>
                    <Input
                      id="telegramAnnouncement"
                      name="telegramAnnouncement"
                      value={projectInfo.telegramAnnouncement}
                      onChange={handleInfoChange}
                      placeholder="https://t.me/channel/123"
                    />
                  </div>

                  <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-950 rounded-lg border border-blue-200 dark:border-blue-800">
                    <p className="text-sm text-blue-800 dark:text-blue-300">
                      <strong>Note:</strong> Please tag our social media accounts in your announcement. Our team will
                      review your submission and update your project information within 15 minutes of verification.
                    </p>
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
                    
                  </div>
                
                  


                  <Button onClick={handleSaveInfo} className="w-full" disabled={!address}>
                    <Save className="mr-2 h-4 w-4" />
                    Submit Information
                  </Button>
                </TabsContent>

                <TabsContent value="assets" className="space-y-6 mt-6">
                  {/* Project Logo Card */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Project Logo</CardTitle>
                      <CardDescription>Upload a logo for your project (recommended size: 256x256px)</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center justify-center p-6 border-2 border-dashed rounded-lg">
                        <div className="flex flex-col items-center">
                          <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mb-4 overflow-hidden">
                            {logoFile ? (
                              <img
                                src={URL.createObjectURL(logoFile)}
                                alt="Logo preview"
                                className="w-24 h-24 rounded-full object-cover"
                              />
                            ) : (
                              <ImageIcon className="h-12 w-12 text-primary/50" />
                            )}
                          </div>
                          <input
                            ref={logoInputRef}
                            type="file"
                            className="hidden"
                            accept="image/png, image/jpeg, image/gif"
                            onChange={handleUploadLogo}
                          />
                          <Button onClick={() => logoInputRef.current?.click()}>
                            <Upload className="mr-2 h-4 w-4" />
                            {logoFile ? "Change Logo" : "Upload Logo"}
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Project Banner Card */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Project Banner</CardTitle>
                      <CardDescription>Upload a banner for your project (recommended size: 1024x256px)</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center justify-center p-6 border-2 border-dashed rounded-lg">
                        <div className="flex flex-col items-center">
                          <div className="w-full h-32 bg-primary/10 rounded-lg flex items-center justify-center mb-4 overflow-hidden">
                            {bannerFile ? (
                              <img
                                src={URL.createObjectURL(bannerFile)}
                                alt="Banner preview"
                                className="w-full h-32 object-cover"
                              />
                            ) : (
                              <ImageIcon className="h-12 w-12 text-primary/50" />
                            )}
                          </div>
                          <input
                            ref={bannerInputRef}
                            type="file"
                            className="hidden"
                            accept="image/png, image/jpeg, image/gif"
                            onChange={handleUploadBanner}
                          />
                          <Button onClick={() => bannerInputRef.current?.click()}>
                            <Upload className="mr-2 h-4 w-4" />
                            {bannerFile ? "Change Banner" : "Upload Banner"}
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  

                  <Button onClick={handleSaveInfo} className="w-full" disabled={!address}>
                    <Save className="mr-2 h-4 w-4" />
                    Submit Assets
                  </Button>
                </TabsContent>
              </Tabs>
            )}
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}