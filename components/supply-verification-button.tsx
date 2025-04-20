"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Shield, AlertTriangle } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog"
import { useToast } from "@/components/ui/use-toast"
import { useWalletStore } from "@/lib/stores/wallet-store"
import type { CoinData } from "@/types/common"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { WalletConnectButton } from "@/components/wallet-connect-button"

interface SupplyVerificationButtonProps {
  coinData: CoinData
}

export function SupplyVerificationButton({ coinData }: SupplyVerificationButtonProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    email: "",
    telegram: "",
    additionalInfo: "",
    link: "", // Added link property
  })
  const { toast } = useToast()
  const { isConnected } = useWalletStore()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async () => {
    if (!isConnected) {
      toast({
        title: "Wallet not connected",
        description: "Please connect your wallet to submit verification application",
        variant: "destructive",
      })
      return
    }

    if (!formData.email || !formData.telegram) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    try {
      // Simulate payment processing
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Simulate API call to submit application
      await new Promise((resolve) => setTimeout(resolve, 1000))

      toast({
        title: "Application submitted",
        description: "Your supply verification application has been submitted successfully. We'll review it shortly.",
      })

      setIsDialogOpen(false)
      setFormData({
        email: "",
        telegram: "",
        additionalInfo: "",
        link: "",
      })
    } catch (error) {
      toast({
        title: "Submission failed",
        description: "There was an error submitting your application. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  if (coinData.isLiquidityLocked) {
    return null // Don't show button for already verified coins
  }

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="bg-yellow-500/10 hover:bg-yellow-500/20 border-yellow-500/20 text-yellow-500"
        >
          <AlertTriangle className="mr-2 h-4 w-4" />
          Apply for Supply Verification
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Supply Verification Application</DialogTitle>

        </DialogHeader>

        <div className="grid gap-4 py-4">
          {!isConnected ? (
            <div className="flex flex-col items-center justify-center space-y-4 p-4">
              <Shield className="h-12 w-12 text-muted-foreground mb-2" />
              <p className="text-center text-sm text-muted-foreground">
                Please connect your wallet to submit a verification application
              </p>
              <WalletConnectButton />
            </div>
          ) : (
            <>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="token" className="text-right">
                  Token
                </Label>
                <Input id="token" value={`${coinData.name} (${coinData.symbol})`} className="col-span-3" disabled />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="email" className="text-right">
                  Email*
                </Label>
                <Input
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="your@email.com"
                  className="col-span-3"
                  required
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="telegram" className="text-right">
                  Telegram*
                </Label>
                <Input
                  id="telegram"
                  name="telegram"
                  value={formData.telegram}
                  onChange={handleChange}
                  placeholder="@username"
                  className="col-span-3"
                  required
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="additionalInfo" className="text-right">
                  Additional Info
                </Label>
                <Textarea
                  id="additionalInfo"
                  name="additionalInfo"
                  value={formData.additionalInfo}
                  onChange={handleChange}
                  placeholder="Any additional information about your token's supply and liquidity"
                  className="col-span-3"
                  rows={3}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="email" className="text-right">
                  GitHub Audit Link*
                </Label>
                <Input
                  id="GitHub Audit Report"
                  name="Report"
                  value={formData.link}
                  onChange={handleChange}
                  placeholder="github.com/username/report"
                  className="col-span-3"
                  required
                />
              </div>
      
            </>
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => setIsDialogOpen(false)} disabled={isSubmitting}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={!isConnected || isSubmitting}>
            {isSubmitting ? "Processing..." : "Submit Application"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
