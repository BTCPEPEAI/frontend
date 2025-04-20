import Link from "next/link"
import { Button } from "@/components/ui/button"
import { NetworkIcon } from "@/components/network-icon"

interface NetworkSelectorProps {
  activeNetwork?: string
  activePage?: string
}

export function NetworkSelector({ activeNetwork = "all", activePage = "" }: NetworkSelectorProps) {
  const networks = [
    { id: "all", name: "All Networks", color: "bg-gray-500" },
    { id: "eth", name: "Ethereum", color: "bg-blue-500" },
    { id: "bnb", name: "BNB Chain", color: "bg-yellow-500" },
    { id: "sol", name: "Solana", color: "bg-purple-500" },
    { id: "trx", name: "Tron", color: "bg-red-500" },
    { id: "matic", name: "Polygon", color: "bg-green-500" },
  ]

  const getHref = (networkId: string) => {
    if (activePage) {
      return networkId === "all" ? `/${activePage}` : `/network/${networkId}/${activePage}`
    } else {
      return networkId === "all" ? "/" : `/network/${networkId}`
    }
  }

  return (
    <div className="flex flex-wrap gap-2">
      {networks.map((network) => (
        <Button key={network.id} variant={activeNetwork === network.id ? "default" : "outline"} size="sm" asChild>
          <Link href={getHref(network.id)}>
            {network.id !== "all" && <NetworkIcon network={network.id} size="sm" className="mr-2" />}
            {network.name}
          </Link>
        </Button>
      ))}
    </div>
  )
}

export default NetworkSelector;