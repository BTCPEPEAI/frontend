// This file simulates API calls to fetch cryptocurrency data
// In a real implementation, you would replace these with actual API calls

import type { NetworkType, CoinData, WalletAsset, ApplicationData, AdminUser, DashboardStats } from "@/types/common"

// Generate a deterministic but unique set of data for each address
export function generateUniqueDataForAddress(address: string) {
  // Use the address to seed the random data generation
  const addressSeed = Number.parseInt(address.slice(2, 10), 16)

  // Generate a unique name based on the address
  const nameOptions = [
    "Ethereum",
    "Bitcoin",
    "Solana",
    "Cardano",
    "Polkadot",
    "Avalanche",
    "Polygon",
    "Chainlink",
    "Uniswap",
    "Aave",
    "Compound",
    "Sushi",
    "Yearn",
    "Curve",
    "Balancer",
    "Synthetix",
    "Maker",
    "Ren",
    "Loopring",
    "1inch",
    "Bancor",
    "Kyber",
    "0x",
    "dYdX",
    "Perpetual",
    "Alpha",
    "Cream",
    "Badger",
    "Harvest",
    "Pickle",
  ]

  const symbolOptions = [
    "ETH",
    "BTC",
    "SOL",
    "ADA",
    "DOT",
    "AVAX",
    "MATIC",
    "LINK",
    "UNI",
    "AAVE",
    "COMP",
    "SUSHI",
    "YFI",
    "CRV",
    "BAL",
    "SNX",
    "MKR",
    "REN",
    "LRC",
    "1INCH",
    "BNT",
    "KNC",
    "ZRX",
    "DYDX",
    "PERP",
    "ALPHA",
    "CREAM",
    "BADGER",
    "FARM",
    "PICKLE",
  ]

  const nameIndex = addressSeed % nameOptions.length
  const symbolIndex = (addressSeed + 3) % symbolOptions.length

  // Generate a unique price based on the address
  const basePrice = (addressSeed % 1000) / 10
  const price = basePrice > 0 ? basePrice : 0.1

  // Generate a unique change percentage
  const change24h = ((addressSeed % 40) - 20) / 2

  // Generate unique volume and liquidity
  const volume = (addressSeed % 100) * 100000
  const liquidity = (addressSeed % 50) * 200000

  // Generate unique supply numbers
  const totalSupply = ((addressSeed % 10) + 1) * 100000000
  const circulatingSupply = (totalSupply * ((addressSeed % 80) + 20)) / 100
  const burnedSupply = (totalSupply * (addressSeed % 10)) / 100
  const lockedSupply = totalSupply - circulatingSupply - burnedSupply

  // Generate unique social links
  const projectName = nameOptions[nameIndex].toLowerCase()

  // Generate unique voting data
  const trustVotes = (addressSeed % 1000) + 100
  const distrustVotes = (addressSeed % 200) + 10
  const totalVotes = trustVotes + distrustVotes
  const trustPercentage = Math.round((trustVotes / totalVotes) * 100)
  const distrustPercentage = 100 - trustPercentage

  // Determine if liquidity is locked
  const isLiquidityLocked = addressSeed % 3 !== 0
  const lockPlatform = addressSeed % 2 === 0 ? "PinkSale" : "Unicrypt"
  const lockDuration = (addressSeed % 12) + 1 + " months"
  const lockAmount = `$${((addressSeed % 50) + 10) * 10000}`

  // Determine network based on address
  const networkOptions: NetworkType[] = ["eth", "bnb", "sol", "trx", "matic"]
  const network = networkOptions[addressSeed % networkOptions.length]

  // Generate pair based on network and symbol
  const stablecoins = {
    eth: "USDT",
    bnb: "BUSD",
    sol: "USDC",
    trx: "USDT",
    matic: "USDC",
  }

  const pair = `${symbolOptions[symbolIndex]}/${stablecoins[network]}`

  // Generate unique description
  const descriptions = [
    `${nameOptions[nameIndex]} is a decentralized finance protocol built on the blockchain, offering innovative solutions for digital asset management.`,
    `${nameOptions[nameIndex]} aims to revolutionize the way we interact with digital assets through its unique approach to decentralized finance.`,
    `${nameOptions[nameIndex]} provides a secure and efficient platform for trading, lending, and borrowing digital assets in a decentralized manner.`,
    `${nameOptions[nameIndex]} is building the future of finance with its innovative blockchain-based solutions for digital asset management.`,
    `${nameOptions[nameIndex]} offers a suite of decentralized financial products designed to maximize returns while minimizing risk.`,
  ]

  const description = descriptions[addressSeed % descriptions.length]

  // Generate traffic count for trending algorithm
  const trafficCount = (addressSeed % 1000) * 1000

  return {
    name: nameOptions[nameIndex],
    symbol: symbolOptions[symbolIndex],
    address,
    network,
    pair,
    price,
    change24h,
    volume,
    liquidity,
    totalSupply,
    circulatingSupply,
    burnedSupply,
    lockedSupply,
    percentCirculating: Math.round((circulatingSupply / totalSupply) * 100),
    percentBurned: Math.round((burnedSupply / totalSupply) * 100),
    percentLocked: Math.round((lockedSupply / totalSupply) * 100),
    description,
    website: `https://${projectName}.io`,
    twitter: `https://twitter.com/${projectName}`,
    telegram: `https://t.me/${projectName}`,
    discord: `https://discord.gg/${projectName}`,
    github: `https://github.com/${projectName}`,
    trustVotes,
    distrustVotes,
    totalVotes,
    trustPercentage,
    distrustPercentage,
    isLiquidityLocked,
    lockPlatform,
    lockDuration,
    lockAmount,
    launchDate: new Date(Date.now() - (addressSeed % 365) * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
    allTimeHigh: price * (1 + (addressSeed % 100) / 100),
    allTimeLow: price * (1 - (addressSeed % 50) / 100),
    hasBanner: addressSeed % 5 === 0,
    hasLogo: addressSeed % 3 === 0,
    trafficCount,
  }
}

// Fetch coin data by address
export async function fetchCoinData(address: string) {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500))

  return generateUniqueDataForAddress(address)
}

// Fetch trending coins
export async function fetchTrendingCoins() {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500))

  // Generate 100 random addresses for coins
  const coins = Array.from({ length: 100 }, (_, i) => {
    const randomHex = Math.floor(Math.random() * 0xffffff)
      .toString(16)
      .padStart(6, "0")
    const address = `0x${randomHex}${i.toString().padStart(4, "0")}`
    return generateUniqueDataForAddress(address)
  })

  // Filter coins with traffic over 500K and sort by traffic
  const trendingCoins = coins
    .filter((coin) => coin.trafficCount && coin.trafficCount > 500000)
    .sort((a, b) => (b.trafficCount || 0) - (a.trafficCount || 0))

  return trendingCoins
}

// Fetch top gainers
export async function fetchTopGainers() {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500))

  // Generate 10 random addresses for top gainers
  const coins = Array.from({ length: 10 }, (_, i) => {
    const randomHex = Math.floor(Math.random() * 0xffffff)
      .toString(16)
      .padStart(6, "0")
    const address = `0x${randomHex}${(i + 10).toString().padStart(4, "0")}`
    const data = generateUniqueDataForAddress(address)
    // Ensure positive change for top gainers
    data.change24h = Math.abs(data.change24h) + 5
    return data
  })

  // Sort by 24h change for gainers
  return coins.sort((a, b) => b.change24h - a.change24h)
}

// Fetch recently added coins
export async function fetchRecentlyAddedCoins() {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500))

  // Generate 10 random addresses for recently added coins
  const coins = Array.from({ length: 10 }, (_, i) => {
    const randomHex = Math.floor(Math.random() * 0xffffff)
      .toString(16)
      .padStart(6, "0")
    const address = `0x${randomHex}${(i + 20).toString().padStart(4, "0")}`
    const data = generateUniqueDataForAddress(address)
    // Set recent launch date
    const hoursAgo = i * 6 + 1
    data.launchDate = new Date(Date.now() - hoursAgo * 60 * 60 * 1000).toISOString().split("T")[0]
    return {
      ...data,
      timeAgo: hoursAgo <= 24 ? `${hoursAgo} hours ago` : `${Math.floor(hoursAgo / 24)} days ago`,
    }
  })

  return coins
}

// Fetch coins from Pump.fun
export async function fetchPumpFunCoins() {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500))

  // Generate 10 random addresses for Pump.fun coins
  const coins = Array.from({ length: 10 }, (_, i) => {
    const randomHex = Math.floor(Math.random() * 0xffffff)
      .toString(16)
      .padStart(6, "0")
    const address = `0x${randomHex}${(i + 30).toString().padStart(4, "0")}`
    const data = generateUniqueDataForAddress(address)
    // Set very recent launch date
    const hoursAgo = i * 2 + 1
    data.launchDate = new Date(Date.now() - hoursAgo * 60 * 60 * 1000).toISOString().split("T")[0]
    return {
      ...data,
      timeAgo: `${hoursAgo} hours ago`,
      fromPumpFun: true,
    }
  })

  return coins
}

// Fetch hot pairs
export async function fetchHotPairs() {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500))

  // Generate 10 random addresses for hot pairs
  const pairs = Array.from({ length: 10 }, (_, i) => {
    const randomHex = Math.floor(Math.random() * 0xffffff)
      .toString(16)
      .padStart(6, "0")
    const address = `0x${randomHex}${(i + 40).toString().padStart(4, "0")}`
    const data = generateUniqueDataForAddress(address)

    return {
      id: i + 1,
      pair: data.pair,
      token1: data.pair.split("/")[0],
      token2: data.pair.split("/")[1],
      address,
      network: data.network,
      price: data.price,
      volume: data.volume,
      liquidity: data.liquidity,
      change24h: data.change24h,
    }
  })

  // Sort by volume
  return pairs.sort((a, b) => b.volume - a.volume)
}

// Get DEX URL based on network and address
export function getDexUrl(network: NetworkType, address: string) {
  switch (network) {
    case "eth":
      return `https://app.uniswap.org/#/swap?outputCurrency=${address}`
    case "bnb":
      return `https://pancakeswap.finance/swap?outputCurrency=${address}`
    case "sol":
      return `https://raydium.io/swap/?inputCurrency=sol&outputCurrency=${address}`
    case "trx":
      return `https://sunswap.com/#/swap?outputCurrency=${address}`
    case "matic":
      return `https://quickswap.exchange/#/swap?outputCurrency=${address}`
    default:
      return `https://app.uniswap.org/#/swap?outputCurrency=${address}`
  }
}

// Get token lock URL based on platform and address
export function getLockUrl(platform: string, address: string) {
  if (platform === "PinkSale") {
    return `https://www.pinksale.finance/pinklock/${address}`
  } else if (platform === "Unicrypt") {
    return `https://app.unicrypt.network/amm/pancake-v2/locker/${address}`
  }
  return "#"
}

// Fetch wallet assets
export async function fetchWalletAssets(walletAddress: string): Promise<WalletAsset[]> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1000))

  // Generate a deterministic seed from the wallet address
  const addressSeed = Number.parseInt(walletAddress.slice(2, 10), 16)

  // Generate between 5-15 assets
  const assetCount = (addressSeed % 10) + 5

  // Generate assets
  const assets = Array.from({ length: assetCount }, (_, i) => {
    const randomHex = Math.floor(Math.random() * 0xffffff)
      .toString(16)
      .padStart(6, "0")
    const tokenAddress = `0x${randomHex}${i.toString().padStart(4, "0")}`
    const coinData = generateUniqueDataForAddress(tokenAddress)

    // Generate a balance based on the seed and index
    const balanceSeed = (addressSeed + i) % 1000
    const balance = balanceSeed / 10 + 0.1

    // Calculate value
    const value = balance * coinData.price

    return {
      name: coinData.name,
      symbol: coinData.symbol,
      address: tokenAddress,
      network: coinData.network,
      balance,
      price: coinData.price,
      value,
      change24h: coinData.change24h,
    }
  })

  // Sort by value (highest first)
  return assets.sort((a, b) => b.value - a.value)
}

// Fetch coins by addresses (for watchlist)
export async function fetchCoinsByAddresses(addresses: string[]): Promise<CoinData[]> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 800))

  // Generate data for each address
  const coins = addresses.map((address) => generateUniqueDataForAddress(address))

  return coins
}

// Fetch applications for admin panel
export async function fetchApplications(): Promise<ApplicationData[]> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 800))

  // Generate 20 random applications
  const applications = Array.from({ length: 20 }, (_, i) => {
    const randomHex = Math.floor(Math.random() * 0xffffff)
      .toString(16)
      .padStart(6, "0")
    const address = `0x${randomHex}${i.toString().padStart(4, "0")}`
    const coinData = generateUniqueDataForAddress(address)

    // Generate random status
    const statuses = ["pending", "approved", "rejected"] as const
    const statusIndex = Math.floor(Math.random() * 3)
    const status = statuses[statusIndex]

    // Generate random type
    const types = ["trending", "info", "advertising"] as const
    const typeIndex = Math.floor(Math.random() * 3)
    const type = types[typeIndex]

    // Generate dates
    const daysAgo = Math.floor(Math.random() * 30) + 1
    const submittedAt = new Date(Date.now() - daysAgo * 24 * 60 * 60 * 1000).toISOString()

    let reviewedAt = undefined
    let reviewedBy = undefined

    if (status !== "pending") {
      const reviewDaysAgo = Math.floor(Math.random() * daysAgo)
      reviewedAt = new Date(Date.now() - reviewDaysAgo * 24 * 60 * 60 * 1000).toISOString()
      reviewedBy = ["admin", "john.doe", "jane.smith"][Math.floor(Math.random() * 3)]
    }

    return {
      id: `APP-${i + 1000}`,
      type,
      status,
      projectName: coinData.name,
      symbol: coinData.symbol,
      address,
      network: coinData.network,
      description: coinData.description,
      website: coinData.website,
      email: `contact@${coinData.name.toLowerCase()}.com`,
      telegram: coinData.telegram,
      twitter: coinData.twitter,
      submittedAt,
      reviewedAt,
      reviewedBy,
      notes: status === "rejected" ? "Does not meet our requirements." : undefined,
    }
  })

  // Sort by submitted date (newest first)
  return applications.sort((a, b) => new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime())
}

// Fetch admin users
export async function fetchAdminUsers(): Promise<AdminUser[]> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 600))

  // Generate 5 admin users
  const users: AdminUser[] = [
    {
      id: "admin-1",
      username: "admin",
      email: "admin@cryptotracker.com",
      role: "admin",
      lastLogin: new Date().toISOString(),
      createdAt: new Date(Date.now() - 365 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: "admin-2",
      username: "john.doe",
      email: "john@cryptotracker.com",
      role: "moderator",
      lastLogin: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
      createdAt: new Date(Date.now() - 180 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: "admin-3",
      username: "jane.smith",
      email: "jane@cryptotracker.com",
      role: "moderator",
      lastLogin: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
      createdAt: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: "admin-4",
      username: "robert.johnson",
      email: "robert@cryptotracker.com",
      role: "viewer",
      lastLogin: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
      createdAt: new Date(Date.now() - 45 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: "admin-5",
      username: "sarah.williams",
      email: "sarah@cryptotracker.com",
      role: "viewer",
      lastLogin: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
      createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
    },
  ]

  return users
}

// Fetch dashboard stats
export async function fetchDashboardStats(): Promise<DashboardStats> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 700))

  return {
    totalUsers: 12458,
    totalProjects: 3567,
    pendingApplications: 42,
    dailyVisits: 28945,
    weeklyGrowth: 12.5,
  }
}
