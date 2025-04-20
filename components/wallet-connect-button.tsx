"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Wallet, ChevronDown, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useToast } from "@/components/ui/use-toast"
import { useWalletStore } from "@/lib/stores/wallet-store"

export function WalletConnectButton() {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const router = useRouter()
  const { toast } = useToast()
  const { isConnected, walletAddress, connect, disconnect, connectingWallet } = useWalletStore()

  const handleConnect = async (walletType: string) => {
    try {
      await connect(walletType)
      setIsDialogOpen(false)
      toast({
        title: "Wallet Connected",
        description: "Your wallet has been successfully connected.",
      })
    } catch (error) {
      toast({
        title: "Connection Failed",
        description: "Failed to connect wallet. Please try again.",
        variant: "destructive",
      })
    }
  }

  const handleDisconnect = () => {
    disconnect()
    toast({
      title: "Wallet Disconnected",
      description: "Your wallet has been disconnected.",
    })
  }

  const navigateToDashboard = () => {
    router.push("/dashboard")
  }

  const navigateToWatchlist = () => {
    router.push("/watchlist")
  }

  if (isConnected) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="flex items-center gap-2">
            <Wallet className="h-4 w-4" />
            {walletAddress.slice(0, 6)}...{walletAddress.slice(-4)}
            <ChevronDown className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Wallet</DropdownMenuLabel>
          <DropdownMenuItem onClick={navigateToDashboard}>Dashboard</DropdownMenuItem>
          <DropdownMenuItem onClick={navigateToWatchlist}>Watchlist</DropdownMenuItem>
          <DropdownMenuItem onClick={() => navigator.clipboard.writeText(walletAddress)}>Copy Address</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleDisconnect} className="text-red-500">
            <LogOut className="h-4 w-4 mr-2" />
            Disconnect
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    )
  }

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button>
          <Wallet className="mr-2 h-4 w-4" />
          Connect Wallet
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Connect Wallet</DialogTitle>
          <DialogDescription>Connect your wallet to track your portfolio, save watchlists, and more.</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <Button
            onClick={() => handleConnect("MetaMask")}
            className="flex justify-start items-center gap-4"
            disabled={connectingWallet}
          >
            <div className="w-8 h-8 bg-orange-500/20 rounded-full flex items-center justify-center">
              <span className="text-orange-500">M</span>
            </div>
            MetaMask
          </Button>
          <Button
            onClick={() => handleConnect("WalletConnect")}
            className="flex justify-start items-center gap-4"
            disabled={connectingWallet}
          >
            <div className="w-8 h-8 bg-blue-500/20 rounded-full flex items-center justify-center">
              <span className="text-blue-500">W</span>
            </div>
            WalletConnect
          </Button>
          <Button
            onClick={() => handleConnect("Coinbase")}
            className="flex justify-start items-center gap-4"
            disabled={connectingWallet}
          >
            <div className="w-8 h-8 bg-blue-500/20 rounded-full flex items-center justify-center">
              <span className="text-blue-500">C</span>
            </div>
            Coinbase Wallet
          </Button>
          <Button
            onClick={() => handleConnect("Trust")}
            className="flex justify-start items-center gap-4"
            disabled={connectingWallet}
          >
            <div className="w-8 h-8 bg-green-500/20 rounded-full flex items-center justify-center">
              <span className="text-green-500">T</span>
            </div>
            Trust Wallet
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
