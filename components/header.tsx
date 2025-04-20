"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X, Star, Sparkles, BrainCircuit, Home, TrendingUp, ListPlus, BarChart, Shield, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import { WalletConnectButton } from "@/components/wallet-connect-button"
import { cn } from "@/lib/utils"
import { useWalletStore } from "@/lib/stores/wallet-store"
import { Logo } from "@/components/logo"

export const navigationRoutes = [
  { href: "/", label: "Home", icon: Home },
  { href: "/trending", label: "Trending", icon: Sparkles },
  { href: "/top-gainers", label: "Top Gainers", icon: TrendingUp },
  { href: "/recently-added", label: "New Listings", icon: ListPlus },
  { href: "/low-volume", label: "Low Volume", icon: BarChart },
  { href: "/trusted", label: "Trusted", icon: Shield },
  { href: "/hot-pairs", label: "Hot Pairs", icon: Zap },
  { href: "/ai-insights", label: "AI Insights", icon: BrainCircuit },
]

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const pathname = usePathname()
  const { isConnected } = useWalletStore()

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <div className="mr-4">
          <Link href="/">
            <Logo />
          </Link>
        </div>

        <div className="hidden md:flex flex-1 items-center gap-6 px-6">
          <nav className="flex items-center space-x-4 lg:space-x-6">
            {navigationRoutes.map((route) => (
              <Link
                key={route.href}
                href={route.href}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-brand-blue flex items-center",
                  pathname === route.href
                    ? "text-foreground relative after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-brand-blue"
                    : "text-muted-foreground",
                )}
              >
                {route.icon && <route.icon className="mr-1 h-4 w-4" />}
                {route.label}
                {route.href === "/ai-insights" && <Sparkles className="ml-1 h-3 w-3 text-brand-green" />}
              </Link>
            ))}

            {isConnected && (
              <Link
                href="/watchlist"
                className={cn(
                  "text-sm font-medium transition-colors hover:text-brand-blue flex items-center",
                  pathname === "/watchlist"
                    ? "text-foreground relative after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-brand-blue"
                    : "text-muted-foreground",
                )}
              >
                <Star className="mr-1 h-4 w-4" />
                Watchlist
              </Link>
            )}
          </nav>

      
        </div>

        <div className="flex flex-1 items-center justify-end space-x-4">
          <nav className="flex items-center space-x-2">
            <ThemeToggle />
            <WalletConnectButton />

            <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </nav>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-50 bg-background md:hidden">
          <div className="container flex h-16 items-center justify-between">
            <div className="flex items-center gap-2">
              <Logo size="sm" />
            </div>
            <Button variant="ghost" size="icon" onClick={() => setIsMenuOpen(false)}>
              <X className="h-5 w-5" />
              <span className="sr-only">Close menu</span>
            </Button>
          </div>

          <div className="container mt-4 pb-4">
            <div className="mb-4">
            
            </div>

            <nav className="flex flex-col space-y-4">
              {navigationRoutes.map((route) => (
                <Link
                  key={route.href}
                  href={route.href}
                  className={cn(
                    "text-lg font-medium transition-colors hover:text-brand-blue py-2 flex items-center",
                    pathname === route.href ? "text-foreground" : "text-muted-foreground",
                  )}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {route.icon && <route.icon className="mr-2 h-4 w-4" />}
                  {route.label}
                  {route.href === "/ai-insights" && <Sparkles className="ml-1 h-3 w-3 text-brand-green" />}
                </Link>
              ))}

              {isConnected && (
                <Link
                  href="/watchlist"
                  className={cn(
                    "text-lg font-medium transition-colors hover:text-brand-blue py-2 flex items-center",
                    pathname === "/watchlist" ? "text-foreground" : "text-muted-foreground",
                  )}
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Star className="mr-2 h-4 w-4" />
                  Watchlist
                </Link>
              )}
            </nav>
          </div>
        </div>
      )}
    </header>
  )
}
