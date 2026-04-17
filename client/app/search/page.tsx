import { SearchPageNav } from "@/components/search/SearchPageNav";
import { SearchHero } from "@/components/search/SearchHero";
import { SearchResults } from "@/components/search/SearchResults";
import type { SearchResult } from "@/components/search/SearchResultCard";

export const dynamic = "force-dynamic";

const API_URL = process.env.QURAN_API_URL ?? "http://localhost:3001";

export const metadata = {
    title: "Search Ayahs | Quran Reader",
};

async function searchAyahs(query: string): Promise<SearchResult[]> {
    const res = await fetch(`${API_URL}/api/search?q=${encodeURIComponent(query)}`);
    return res.json();
}

type SearchPageProps = {
    searchParams: Promise<{ q?: string }>;
};

export default async function SearchPage({ searchParams }: SearchPageProps) {
    const { q } = await searchParams;
    const query = q?.trim() ?? "";
    const results = query ? await searchAyahs(query) : [];

    return (
        <div className="page-shell space-y-6">
            <SearchPageNav />
            <SearchHero query={query} />
            <SearchResults results={results} query={query} />
        </div>
    );
}
