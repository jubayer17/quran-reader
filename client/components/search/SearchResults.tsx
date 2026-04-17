import { SearchResultCard, type SearchResult } from "./SearchResultCard";

type SearchResultsProps = {
    results: SearchResult[];
    query: string;
};

export function SearchResults({ results, query }: SearchResultsProps) {
    if (!query) {
        return (
            <p className="rounded-2xl border border-dashed border-stone-300 bg-white p-5 text-sm text-stone-600 shadow-sm">
                Start typing and submit the form to search in translation text.
            </p>
        );
    }

    return (
        <section className="space-y-4">
            <div className="flex items-center justify-between gap-3">
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-stone-500">Results</p>
                <p className="rounded-full border border-stone-200 bg-white px-4 py-2 text-sm font-semibold text-stone-950 shadow-sm">
                    {results.length} match{results.length === 1 ? "" : "es"}
                </p>
            </div>
            {results.length > 0 ? (
                <div className="space-y-4">
                    {results.map((result) => (
                        <SearchResultCard
                            key={`${result.surahNumber}-${result.ayahNumber}`}
                            result={result}
                            query={query}
                        />
                    ))}
                </div>
            ) : (
                <p className="rounded-2xl border border-dashed border-stone-300 bg-white p-5 text-sm text-stone-600 shadow-sm">
                    No ayahs found for this text.
                </p>
            )}
        </section>
    );
}
