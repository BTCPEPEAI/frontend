"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Wallet, Copy, ExternalLink } from "lucide-react"
import { useWalletStore } from "@/lib/stores/wallet-store"
import { useToast } from "@/components/ui/use-toast"

export function WalletConnect() {
  const [isOpen, setIsOpen] = useState(false)
  const [activeTab, setActiveTab] = useState("connect")
  const { isConnected, connectWallet, disconnectWallet, walletAddress } = useWalletStore()
  const { toast } = useToast()

  const handleConnect = (walletType: string) => {
    connectWallet(`0x${Math.random().toString(16).slice(2, 10)}`)
    toast({
      title: "Wallet Connected",
      description: `Successfully connected to ${walletType}`,
    })
    setIsOpen(false)
  }

  const handleDisconnect = () => {
    disconnectWallet()
    toast({
      title: "Wallet Disconnected",
      description: "Your wallet has been disconnected",
    })
    setIsOpen(false)
  }

  const copyAddress = () => {
    if (walletAddress) {
      navigator.clipboard.writeText(walletAddress)
      toast({
        title: "Address Copied",
        description: "Wallet address copied to clipboard",
      })
    }
  }

  const formatAddress = (address: string) => {
    if (!address) return ""
    return `${address.slice(0, 6)}...${address.slice(-4)}`
  }

  return (
    <>
      <Button
        variant={isConnected ? "outline" : "default"}
        onClick={() => setIsOpen(true)}
        className={isConnected ? "border-green-500 text-green-500" : ""}
      >
        <Wallet className="mr-2 h-4 w-4" />
        {isConnected ? formatAddress(walletAddress || "") : "Connect Wallet"}
      </Button>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{isConnected ? "Wallet Connected" : "Connect Wallet"}</DialogTitle>
            <DialogDescription>
              {isConnected ? "Your wallet is connected to DEXPRICE AI" : "Connect your wallet to access all features"}
            </DialogDescription>
          </DialogHeader>

          {isConnected ? (
            <div className="space-y-4 py-4">
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div className="font-mono">{formatAddress(walletAddress || "")}</div>
                <div className="flex gap-2">
                  <Button variant="ghost" size="icon" onClick={copyAddress}>
                    <Copy className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" asChild>
                    <a href={`https://etherscan.io/address/${walletAddress}`} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  </Button>
                </div>
              </div>

              <Button variant="destructive" className="w-full" onClick={handleDisconnect}>
                Disconnect Wallet
              </Button>
            </div>
          ) : (
            <Tabs defaultValue="connect" value={activeTab} onValueChange={setActiveTab} className="py-4">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="connect">Connect</TabsTrigger>
                <TabsTrigger value="qr">QR Code</TabsTrigger>
              </TabsList>
              <TabsContent value="connect" className="space-y-4 mt-4">
                <div className="grid grid-cols-2 gap-4">
                  <Button
                    variant="outline"
                    className="flex flex-col items-center justify-center h-24 hover:border-primary"
                    onClick={() => handleConnect("MetaMask")}
                  >
                    <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center mb-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-orange-500"
                      >
                        <path d="M20.9 11.9c-.7-8.6-7.5-9.4-7.5-9.4s-6.8.8-7.5 9.4c0 0-8.4 4.5.5 10.7 0 0 3.5-3.5 4.2-6 0 0 4.3 1.3 5.6 0 1.3 2.5 4.2 6 4.2 6 8.9-6.2.5-10.7.5-10.7Z" />
                        <path d="M15.7 9.4c-.2-2.3-1.3-4-1.3-4s-1.1 1.7-1.3 4c0 0-2.2 1.2.1 2.9 0 0 .9-.9 1.1-1.6 0 0 1.1.4 1.5 0 .3.7 1.1 1.6 1.1 1.6 2.3-1.7.1-2.9.1-2.9Z" />
                      </svg>
                    </div>
                    <span>MetaMask</span>
                  </Button>

                  <Button
                    variant="outline"
                    className="flex flex-col items-center justify-center h-24 hover:border-primary"
                    onClick={() => handleConnect("WalletConnect")}
                  >
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mb-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-blue-500"
                      >
                        <path d="M6.5 11.5h11" />
                        <path d="M6.5 14.5h11" />
                        <path d="M3 5.5h18a1 1 0 0 1 1 1v11a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1v-11a1 1 0 0 1 1-1Z" />
                      </svg>
                    </div>
                    <span>WalletConnect</span>
                  </Button>

                  <Button
                    variant="outline"
                    className="flex flex-col items-center justify-center h-24 hover:border-primary"
                    onClick={() => handleConnect("Coinbase Wallet")}
                  >
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mb-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-blue-500"
                      >
                        <circle cx="12" cy="12" r="10" />
                        <path d="M8 14h8" />
                        <path d="M12 10v8" />
                        <path d="M9 7h6" />
                      </svg>
                    </div>
                    <span>Coinbase</span>
                  </Button>

                  <Button
                    variant="outline"
                    className="flex flex-col items-center justify-center h-24 hover:border-primary"
                    onClick={() => handleConnect("Trust Wallet")}
                  >
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mb-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-blue-500"
                      >
                        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
                      </svg>
                    </div>
                    <span>Trust Wallet</span>
                  </Button>
                </div>
              </TabsContent>
              <TabsContent value="qr" className="mt-4">
                <div className="flex flex-col items-center justify-center p-4">
                  <div className="w-48 h-48 bg-muted flex items-center justify-center mb-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="120"
                      height="120"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <rect width="5" height="5" x="3" y="3" rx="1" />
                      <rect width="5" height="5" x="16" y="3" rx="1" />
                      <rect width="5" height="5" x="3" y="16" rx="1" />
                      <path d="M21 16h-3a2 2 0 0 0-2 2v3" />
                      <path d="M21 21v.01" />
                      <path d="M12 7v3a2 2 0 0 1-2 2H7" />
                      <path d="M3 12h.01" />
                      <path d="M12 3h.01" />
                      <path d="M12 16v.01" />
                      <path d="M16 12h1" />
                      <path d="M21 12v.01" />
                      <path d="M12 21v-1" />
                    </svg>
                  </div>
                  <p className="text-sm text-muted-foreground text-center">Scan with your wallet app to connect</p>
                </div>
              </TabsContent>
            </Tabs>
          )}
        </DialogContent>
      </Dialog>
    </>
  )
}
