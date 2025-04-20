import Link from "next/link"
import { Twitter, MessageSquare, DiscIcon as Discord } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Footer() {
  return (
    <footer className="border-t py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <h3 className="text-lg font-bold">CryptoTracker</h3>
            <p className="text-sm text-muted-foreground">
              Track cryptocurrency prices, liquidity, supply, trade history, and more across multiple networks.
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-bold">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/trending" className="text-sm text-muted-foreground hover:text-primary">
                  Trending Coins
                </Link>
              </li>
              <li>
                <Link href="/top-gainers" className="text-sm text-muted-foreground hover:text-primary">
                  Top Gainers
                </Link>
              </li>
              <li>
                <Link href="/recently-added" className="text-sm text-muted-foreground hover:text-primary">
                  Recently Added
                </Link>
              </li>
              <li>
                <Link href="/pump-fun" className="text-sm text-muted-foreground hover:text-primary">
                  Pump.fun Coins
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-bold">Resources</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/apply-trending" className="text-sm text-muted-foreground hover:text-primary">
                  Apply for Free Trending
                </Link>
              </li>
              <li>
                <Link href="/advertise" className="text-sm text-muted-foreground hover:text-primary">
                  Advertise with Us
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-sm text-muted-foreground hover:text-primary">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-sm text-muted-foreground hover:text-primary">
                  Terms & Conditions
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-bold">Connect With Us</h3>
            <div className="flex space-x-2">
              <Button variant="outline" size="icon" asChild>
                <a href="https://twitter.com/cryptotracker" target="_blank" rel="noopener noreferrer">
                  <Twitter className="h-4 w-4" />
                </a>
              </Button>
              <Button variant="outline" size="icon" asChild>
                <a href="https://t.me/cryptotracker" target="_blank" rel="noopener noreferrer">
                  <MessageSquare className="h-4 w-4" />
                </a>
              </Button>
              <Button variant="outline" size="icon" asChild>
                <a href="https://discord.gg/cryptotracker" target="_blank" rel="noopener noreferrer">
                  <Discord className="h-4 w-4" />
                </a>
              </Button>
            </div>
            <p className="text-sm text-muted-foreground">Join our community for the latest updates and discussions.</p>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t text-center">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} CryptoTracker. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
