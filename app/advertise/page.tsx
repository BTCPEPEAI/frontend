import { MainLayout } from "@/components/layouts/main-layout"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

export default function AdvertisePage() {
  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-6">
        <h1 className="text-3xl font-bold mb-6">Advertise with Us</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Advertising Inquiry</CardTitle>
                <CardDescription>
                  Fill out this form to inquire about advertising opportunities on our platform.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Your Name</Label>
                    <Input id="name" placeholder="Enter your name" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input id="email" type="email" placeholder="Enter your email" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="company">Company/Project Name</Label>
                  <Input id="company" placeholder="Enter your company or project name" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="website">Website</Label>
                  <Input id="website" placeholder="https://" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="ad-type">Advertising Type</Label>
                  <select
                    id="ad-type"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <option value="">Select advertising type</option>
                    <option value="banner">Banner Ad</option>
                    <option value="featured">Featured Project</option>
                    <option value="sponsored">Sponsored Content</option>
                    <option value="newsletter">Newsletter Mention</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="budget">Budget Range</Label>
                  <select
                    id="budget"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <option value="">Select budget range</option>
                    <option value="0-1000">$0 - $1,000</option>
                    <option value="1000-5000">$1,000 - $5,000</option>
                    <option value="5000-10000">$5,000 - $10,000</option>
                    <option value="10000+">$10,000+</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Additional Information</Label>
                  <Textarea id="message" placeholder="Tell us more about your advertising goals" rows={4} />
                </div>

                <Button className="w-full">Submit Inquiry</Button>
              </CardContent>
            </Card>
          </div>

          <div>
            <Card>
              <CardHeader>
                <CardTitle>Advertising Options</CardTitle>
                <CardDescription>Reach thousands of crypto enthusiasts and investors.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <h3 className="font-medium">Banner Ads</h3>
                  <p className="text-sm text-muted-foreground">
                    Display your project with eye-catching banners on our high-traffic pages.
                  </p>
                </div>

                <div className="space-y-3">
                  <h3 className="font-medium">Featured Projects</h3>
                  <p className="text-sm text-muted-foreground">
                    Get premium placement in our featured projects section for maximum visibility.
                  </p>
                </div>

                <div className="space-y-3">
                  <h3 className="font-medium">Sponsored Content</h3>
                  <p className="text-sm text-muted-foreground">
                    Detailed write-ups about your project shared with our community.
                  </p>
                </div>

                <div className="space-y-3">
                  <h3 className="font-medium">Newsletter Mentions</h3>
                  <p className="text-sm text-muted-foreground">
                    Reach our subscriber base directly through our regular newsletters.
                  </p>
                </div>

                <div className="border-t pt-4 mt-4">
                  <p className="text-sm text-muted-foreground">
                    Our team will contact you within 24 hours to discuss your advertising needs and provide custom
                    quotes.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </MainLayout>
  )
}
