import { MainLayout } from "@/components/layouts/main-layout"
import { Card, CardContent } from "@/components/ui/card"

export default function AboutPage() {
  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-6">
        <h1 className="text-3xl font-bold mb-6">About CryptoTracker</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-6">
            <Card>
              <CardContent className="pt-6">
                <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
                <p className="text-muted-foreground mb-4">
                  CryptoTracker was founded with a simple mission: to provide crypto enthusiasts, investors, and traders
                  with accurate, real-time data on cryptocurrencies across multiple networks. We believe in
                  transparency, accessibility, and empowering users with the information they need to make informed
                  decisions in the fast-paced world of cryptocurrency.
                </p>
                <p className="text-muted-foreground">
                  Our platform aggregates data from various sources to offer comprehensive insights into token prices,
                  liquidity, supply, market cap, and trading history. We're committed to continuous improvement and
                  expanding our coverage to ensure you have access to the most relevant and up-to-date information.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <h2 className="text-2xl font-bold mb-4">What We Offer</h2>
                <ul className="space-y-4">
                  <li className="flex">
                    <div className="mr-4 mt-1">
                      <div className="bg-primary/10 text-primary rounded-full p-1">✓</div>
                    </div>
                    <div>
                      <h3 className="font-medium">Multi-Network Support</h3>
                      <p className="text-sm text-muted-foreground">
                        Track cryptocurrencies across Ethereum, BNB Chain, Solana, Tron, and Polygon networks.
                      </p>
                    </div>
                  </li>
                  <li className="flex">
                    <div className="mr-4 mt-1">
                      <div className="bg-primary/10 text-primary rounded-full p-1">✓</div>
                    </div>
                    <div>
                      <h3 className="font-medium">Real-Time Data</h3>
                      <p className="text-sm text-muted-foreground">
                        Access up-to-the-minute information on prices, trading volume, and market movements.
                      </p>
                    </div>
                  </li>
                  <li className="flex">
                    <div className="mr-4 mt-1">
                      <div className="bg-primary/10 text-primary rounded-full p-1">✓</div>
                    </div>
                    <div>
                      <h3 className="font-medium">Advanced Charts</h3>
                      <p className="text-sm text-muted-foreground">
                        Analyze price movements with our interactive candle charts and technical indicators.
                      </p>
                    </div>
                  </li>
                  <li className="flex">
                    <div className="mr-4 mt-1">
                      <div className="bg-primary/10 text-primary rounded-full p-1">✓</div>
                    </div>
                    <div>
                      <h3 className="font-medium">Community Trust System</h3>
                      <p className="text-sm text-muted-foreground">
                        Make informed decisions with our community-driven trust voting system.
                      </p>
                    </div>
                  </li>
                  <li className="flex">
                    <div className="mr-4 mt-1">
                      <div className="bg-primary/10 text-primary rounded-full p-1">✓</div>
                    </div>
                    <div>
                      <h3 className="font-medium">Project Verification</h3>
                      <p className="text-sm text-muted-foreground">
                        Verify token supply, liquidity locks, and other security features.
                      </p>
                    </div>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card>
              <CardContent className="pt-6">
                <h2 className="text-xl font-bold mb-4">Our Team</h2>
                <p className="text-sm text-muted-foreground mb-4">
                  CryptoTracker is built by a team of passionate blockchain enthusiasts, developers, and data analysts
                  who are committed to creating the best cryptocurrency tracking platform.
                </p>
                <p className="text-sm text-muted-foreground">
                  With backgrounds in finance, software development, and blockchain technology, our team brings diverse
                  expertise to deliver a comprehensive and user-friendly platform.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <h2 className="text-xl font-bold mb-4">Contact Us</h2>
                <div className="space-y-2">
                  <p className="text-sm">
                    <span className="font-medium">Email:</span>
                    <a href="mailto:info@cryptotracker.com" className="text-primary ml-2 hover:underline">
                      info@cryptotracker.com
                    </a>
                  </p>
                  <p className="text-sm">
                    <span className="font-medium">Telegram:</span>
                    <a href="https://t.me/cryptotracker" className="text-primary ml-2 hover:underline">
                      @cryptotracker
                    </a>
                  </p>
                  <p className="text-sm">
                    <span className="font-medium">Twitter:</span>
                    <a href="https://twitter.com/cryptotracker" className="text-primary ml-2 hover:underline">
                      @cryptotracker
                    </a>
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <h2 className="text-xl font-bold mb-4">Join Our Community</h2>
                <p className="text-sm text-muted-foreground mb-4">
                  Be part of our growing community of crypto enthusiasts. Stay updated on the latest features, token
                  listings, and market insights.
                </p>
                <div className="flex space-x-2">
                  <a
                    href="https://t.me/cryptotracker"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-primary/10 hover:bg-primary/20 text-primary rounded-md px-3 py-2 text-sm font-medium"
                  >
                    Join Telegram
                  </a>
                  <a
                    href="https://discord.gg/cryptotracker"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-primary/10 hover:bg-primary/20 text-primary rounded-md px-3 py-2 text-sm font-medium"
                  >
                    Join Discord
                  </a>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </MainLayout>
  )
}
