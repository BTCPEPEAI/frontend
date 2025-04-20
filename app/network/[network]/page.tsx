import { Metadata } from "next";
import { MainLayout } from "../../../components/layouts/main-layout";
import TrendingColumn from "../../../components/trending-column";
import NetworkIcon from "../../../components/network-icon";
import NetworkSelector from "../../../components/network-selector";
import CoinTable from "../../../components/coin-table";

type PageProps = {
  params: {
    network: string;
  };
};

// Updated generateMetadata without await on params
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  // Ensure params.network is a string, no need to await
  const network = typeof params.network === "string" ? params.network.toLowerCase() : "unknown";

  return {
    title: `${network} Network Coins | CryptoFlowX`,
    description: `Explore top cryptocurrencies on the ${network} network.`,
  };
}

export default function NetworkPage({ params }: PageProps) {
  const network = params.network.toLowerCase();

  const networkNames: Record<string, string> = {
    bnb: "BNB Chain",
    eth: "Ethereum",
    sol: "Solana",
    trx: "Tron",
    matic: "Polygon",
  };

  const networkName = networkNames[network] || network.toUpperCase();

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-6 space-y-6">
        <TrendingColumn network={network} />
        <div className="flex items-center space-x-3">
          <NetworkIcon network={network} size="lg" />
          <div>
            <h1 className="text-3xl font-bold">{networkName}</h1>
            <p className="text-muted-foreground">
              All cryptocurrencies on the {networkName} network
            </p>
          </div>
        </div>
        <NetworkSelector activeNetwork={network} />
        <CoinTable network={network} showCharts />
      </div>
    </MainLayout>
  );
}
