import Link from "next/link";
import { getSearchIndex } from "@/lib/quran-db";

export const metadata = {
    title: "Search Ayahs | Quran Reader",
};

type SearchPageProps = {
    searchParams: Promise<{ q?: string }>;
};

export default async function SearchPage({ searchParams }: SearchPageProps) {
    const resolvedSearchParams = await searchParams;
    const query = resolvedSearchParams.q?.trim() ?? "";
    const searchIndex = query ? await getSearchIndex() : [];
    const results = query
        ? searchIndex
            .filter((item) => item.translation.toLowerCase().includes(query.toLowerCase()))
            .slice(0, 120)
        : [];

    return (
        <div className="page-shell space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
                <Link
                    href="/"
                    className="inline-flex items-center gap-2 rounded-full border border-stone-200 bg-white px-4 py-2 text-sm font-semibold text-stone-950 shadow-sm transition hover:bg-stone-50"
                >
                    <span aria-hidden="true">←</span>
                    Back to Surah List
                </Link>

                <p className="rounded-full border border-stone-200 bg-white px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-stone-600 shadow-sm">
                    Fast translation search
                </p>
            </div>

            <section className="relative overflow-hidden rounded-[2rem] border border-stone-200 bg-white p-6 shadow-[0_24px_70px_-44px_rgba(15,23,42,0.35)] sm:p-8">
                <div className="absolute inset-x-0 top-0 h-1 bg-[#8a6741]" />
                <div className="relative max-w-3xl space-y-4">
                    <div className="inline-flex items-center rounded-full border border-stone-200 bg-stone-50 px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-stone-600">
                        Find ayahs by meaning
                    </div>
                    <h1 className="text-3xl font-bold tracking-tight text-stone-950 sm:text-4xl">
                        Search ayahs by translation text.
                    </h1>
                    <p className="max-w-2xl text-base leading-8 text-stone-600 sm:text-lg">
                        Enter a word or phrase from the English translation to surface matching verses.
                        The search runs on the server for speed and the results stay lightweight.
                    </p>
                </div>
                <form className="relative mt-6 flex flex-col gap-3 sm:flex-row" action="/search" method="get">
                    <input
                        name="q"
                        defaultValue={query}
                        placeholder="Example: mercy, believers, prayer..."
                        className="h-14 min-w-0 flex-1 rounded-2xl border border-stone-200 bg-white px-5 text-base text-stone-950 shadow-sm outline-none ring-stone-700 transition placeholder:text-stone-400 focus:ring-2"
                    />
                    <button
                        type="submit"
                        className="inline-flex h-14 items-center justify-center rounded-2xl bg-[#8a6741] px-6 text-sm font-semibold uppercase tracking-[0.16em] text-white shadow-lg shadow-[#8a6741]/20 transition hover:bg-[#6f5030]"
                    >
                        Search
                    </button>
                </form>

                <div className="relative mt-5 flex flex-wrap gap-2 text-xs font-semibold uppercase tracking-[0.12em] text-stone-600">
                    <span className="rounded-full bg-stone-50 px-3 py-2">Mercy</span>
                    <span className="rounded-full bg-stone-50 px-3 py-2">Faith</span>
                    <span className="rounded-full bg-stone-50 px-3 py-2">Prayer</span>
                    <span className="rounded-full bg-stone-50 px-3 py-2">Guidance</span>
                </div>
            </section>

            {query ? (
                <section className="space-y-4">
                    <div className="flex items-center justify-between gap-3">
                        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-stone-500">
                            Results
                        </p>
                        <p className="rounded-full border border-stone-200 bg-white px-4 py-2 text-sm font-semibold text-stone-950 shadow-sm">
                            {results.length} match{results.length === 1 ? "" : "es"}
                        </p>
                    </div>
                    {results.length > 0 ? (
                        <div className="space-y-4">
                            {results.map((result) => (
                                <article
                                    key={`${result.surahNumber}-${result.ayahNumber}-${result.translation.slice(0, 20)}`}
                                    className="group rounded-3xl border border-stone-200 bg-white p-5 shadow-[0_18px_50px_-36px_rgba(15,23,42,0.28)] transition hover:-translate-y-0.5 hover:shadow-[0_24px_65px_-36px_rgba(15,23,42,0.35)]"
                                >
                                    <div className="flex flex-wrap items-center justify-between gap-3">
                                        <div className="space-y-1">
                                            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-stone-500">
                                                Surah {result.surahNumber}
                                            </p>
                                            <p className="text-lg font-bold text-stone-950">
                                                {result.surahNameEnglish}
                                                <span className="ml-2 text-sm font-medium text-stone-600">
                                                    Ayah {result.ayahNumber}
                                                </span>
                                            </p>
                                        </div>
                                        <Link
                                            href={`/surah/${result.surahNumber}#ayah-${result.ayahNumber}`}
                                            className="inline-flex h-10 items-center justify-center rounded-xl border border-stone-200 bg-[#8a6741] px-4 text-xs font-semibold uppercase tracking-[0.14em] text-white transition hover:bg-[#6f5030]"
                                        >
                                            Open Surah
                                        </Link>
                                    </div>
                                    <p dir="rtl" className="arabic-text mt-4 text-right text-stone-950">
                                        {result.arabic}
                                    </p>
                                    <p className="translation-text mt-3 text-stone-700">
                                        {result.translation}
                                    </p>
                                </article>
                            ))}
                        </div>
                    ) : (
                        <p className="rounded-2xl border border-dashed border-stone-300 bg-white p-5 text-sm text-stone-600 shadow-sm">
                            No ayahs found for this text.
                        </p>
                    )}
                </section>
            ) : (
                <p className="rounded-2xl border border-dashed border-stone-300 bg-white p-5 text-sm text-stone-600 shadow-sm">
                    Start typing and submit the form to search in translation text.
                </p>
            )}
        </div>
    );
}
