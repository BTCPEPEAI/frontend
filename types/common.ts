export type NetworkType = "eth" | "bnb" | "sol" | "trx" | "matic"

export interface CoinData {
  name: string
  symbol: string
  address: string
  network: NetworkType
  pair: string
  price: number
  change24h: number
  volume: number
  liquidity: number
  totalSupply: number
  circulatingSupply: number
  burnedSupply: number
  lockedSupply: number
  percentCirculating: number
  percentBurned: number
  percentLocked: number
  description: string
  website: string
  twitter: string
  telegram: string
  discord: string
  github: string
  trustVotes: number
  distrustVotes: number
  totalVotes: number
  trustPercentage: number
  distrustPercentage: number
  isLiquidityLocked: boolean
  lockPlatform: string
  lockDuration: string
  lockAmount: string
  launchDate: string
  allTimeHigh: number
  allTimeLow: number
  hasBanner: boolean
  hasLogo: boolean
  timeAgo?: string
  fromPumpFun?: boolean
  trafficCount?: number
}

export interface PairData {
  id: number
  pair: string
  token1: string
  token2: string
  address: string
  network: NetworkType
  price: number
  volume: number
  liquidity: number
  change24h: number
}

export interface WalletAsset {
  name: string
  symbol: string
  address: string
  network: NetworkType
  balance: number
  price: number
  value: number
  change24h: number
}

export interface ApplicationData {
  id: string
  type: "trending" | "info" | "advertising"
  status: "pending" | "approved" | "rejected"
  projectName: string
  symbol: string
  address: string
  network: NetworkType
  description: string
  website: string
  email: string
  telegram: string
  twitter: string
  submittedAt: string
  reviewedAt?: string
  reviewedBy?: string
  notes?: string
}

export interface AdminUser {
  id: string
  username: string
  email: string
  role: "admin" | "moderator" | "viewer"
  lastLogin?: string
  createdAt: string
}

export interface DashboardStats {
  totalUsers: number
  totalProjects: number
  pendingApplications: number
  dailyVisits: number
  weeklyGrowth: number
}
