import { CoinTable } from "@/components/coin-table";

interface SearchResultsPageProps {
  searchParams?: {
    q?: string;
  };
}

export default function SearchResultsPage({ searchParams }: SearchResultsPageProps) {
  const query = searchParams?.q?.toString() || "";

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-6">
        Search Results for "{query}"
      </h1>
      <CoinTable query={query} />
    </div>
  );
}
