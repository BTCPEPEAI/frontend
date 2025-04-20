import { CoinTable } from "@/components/coin-table"

export default function NewListingsPage() {
  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-6">New Listings</h1>
      <CoinTable filter="new" />
    </div>
  )
}
