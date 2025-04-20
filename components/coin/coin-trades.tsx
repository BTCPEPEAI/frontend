"use client"

import { useState, useEffect } from "react"
import { ArrowDown, ArrowUp } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

interface CoinTradesProps {
  address: string
}

// Mock data - would be replaced with API calls
const mockTrades = [
  {
    id: 1,
    type: "buy",
    amount: "1,250 LGNS",
    value: "$20,975",
    price: "$16.78",
    time: "2 mins ago",
    wallet: "0x1234...5678",
  },
  {
    id: 2,
    type: "sell",
    amount: "500 LGNS",
    value: "$8,390",
    price: "$16.78",
    time: "5 mins ago",
    wallet: "0xabcd...efgh",
  },
  {
    id: 3,
    type: "buy",
    amount: "750 LGNS",
    value: "$12,585",
    price: "$16.78",
    time: "10 mins ago",
    wallet: "0x8765...4321",
  },
  {
    id: 4,
    type: "sell",
    amount: "100 LGNS",
    value: "$1,678",
    price: "$16.78",
    time: "15 mins ago",
    wallet: "0xijkl...mnop",
  },
  {
    id: 5,
    type: "buy",
    amount: "2,000 LGNS",
    value: "$33,560",
    price: "$16.78",
    time: "20 mins ago",
    wallet: "0x9876...5432",
  },
  {
    id: 6,
    type: "buy",
    amount: "300 LGNS",
    value: "$5,034",
    price: "$16.78",
    time: "25 mins ago",
    wallet: "0xqrst...uvwx",
  },
  {
    id: 7,
    type: "sell",
    amount: "1,500 LGNS",
    value: "$25,170",
    price: "$16.78",
    time: "30 mins ago",
    wallet: "0x5432...1098",
  },
  {
    id: 8,
    type: "buy",
    amount: "800 LGNS",
    value: "$13,424",
    price: "$16.78",
    time: "35 mins ago",
    wallet: "0xyzab...cdef",
  },
]

export function CoinTrades({ address }: CoinTradesProps) {
  const [trades, setTrades] = useState(mockTrades)

  // Simulate API fetch
  useEffect(() => {
    // In a real implementation, you would fetch data from an API
    setTrades(mockTrades)
  }, [address])

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Type</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Value</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Time</TableHead>
            <TableHead>Wallet</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {trades.map((trade) => (
            <TableRow key={trade.id}>
              <TableCell>
                <div className={`flex items-center ${trade.type === "buy" ? "text-green-500" : "text-red-500"}`}>
                  {trade.type === "buy" ? <ArrowUp className="mr-1 h-4 w-4" /> : <ArrowDown className="mr-1 h-4 w-4" />}
                  {trade.type.charAt(0).toUpperCase() + trade.type.slice(1)}
                </div>
              </TableCell>
              <TableCell>{trade.amount}</TableCell>
              <TableCell>{trade.value}</TableCell>
              <TableCell>{trade.price}</TableCell>
              <TableCell>{trade.time}</TableCell>
              <TableCell>
                <a href="#" className="hover:underline">
                  {trade.wallet}
                </a>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
