import { create } from "zustand"
import { persist } from "zustand/middleware"
import { fetchWalletAssets } from "@/lib/api"
import type { WalletAsset } from "@/types/common"

interface WalletState {
  isConnected: boolean
  walletAddress: string
  connectingWallet: boolean
  assets: WalletAsset[]
  totalValue: number
  watchlist: string[]
  connect: (walletType: string) => Promise<void>
  disconnect: () => void
  fetchAssets: () => Promise<void>
  addToWatchlist: (address: string) => void
  removeFromWatchlist: (address: string) => void
  isInWatchlist: (address: string) => boolean
}

export const useWalletStore = create<WalletState>()(
  persist(
    (set, get) => ({
      isConnected: false,
      walletAddress: "",
      connectingWallet: false,
      assets: [],
      totalValue: 0,
      watchlist: [],

      connect: async (walletType: string) => {
        try {
          set({ connectingWallet: true })

          // Simulate wallet connection
          await new Promise((resolve) => setTimeout(resolve, 1000))

          // Generate a random wallet address
          const randomHex = Math.floor(Math.random() * 0xffffff)
            .toString(16)
            .padStart(6, "0")
          const walletAddress = `0x${randomHex}${Date.now().toString().slice(-8)}`

          set({
            isConnected: true,
            walletAddress,
            connectingWallet: false,
          })

          // Fetch assets after connecting
          await get().fetchAssets()
        } catch (error) {
          set({ connectingWallet: false })
          throw error
        }
      },

      disconnect: () => {
        set({
          isConnected: false,
          walletAddress: "",
          assets: [],
          totalValue: 0,
        })
      },

      fetchAssets: async () => {
        if (!get().isConnected) return

        try {
          const assets = await fetchWalletAssets(get().walletAddress)
          const totalValue = assets.reduce((sum, asset) => sum + asset.value, 0)

          set({ assets, totalValue })
        } catch (error) {
          console.error("Failed to fetch wallet assets:", error)
        }
      },

      addToWatchlist: (address: string) => {
        if (!get().isConnected) return
        if (get().watchlist.includes(address)) return

        set({ watchlist: [...get().watchlist, address] })
      },

      removeFromWatchlist: (address: string) => {
        set({ watchlist: get().watchlist.filter((a) => a !== address) })
      },

      isInWatchlist: (address: string) => {
        return get().watchlist.includes(address)
      },
    }),
    {
      name: "wallet-storage",
      partialize: (state) => ({
        isConnected: state.isConnected,
        walletAddress: state.walletAddress,
        watchlist: state.watchlist,
      }),
    },
  ),
)
