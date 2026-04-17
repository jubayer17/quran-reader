import Link from "next/link";
import { Highlight } from "./Highlight";

export type SearchResult = {
    surahNumber: number;
    surahNameArabic: string;
    surahNameEnglish: string;
    ayahNumber: number;
    arabic: string;
    translation: string;
};

export function SearchResultCard({ result, query }: { result: SearchResult; query: string }) {
    return (
        <article className="group rounded-3xl border border-stone-200 bg-white p-5 shadow-[0_18px_50px_-36px_rgba(15,23,42,0.28)] transition hover:-translate-y-0.5 hover:shadow-[0_24px_65px_-36px_rgba(15,23,42,0.35)]">
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
                <Highlight text={result.translation} query={query} />
            </p>
        </article>
    );
}
