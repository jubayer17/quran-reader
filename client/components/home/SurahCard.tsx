import Link from "next/link";
import type { SurahSummary } from "./SurahList";

export function SurahCard({ surah }: { surah: SurahSummary }) {
    return (
        <Link
            href={`/surah/${surah.number}`}
            className="group relative overflow-hidden rounded-3xl border border-stone-200 bg-white p-5 shadow-[0_16px_50px_-38px_rgba(15,23,42,0.28)] transition duration-300 hover:-translate-y-1 hover:border-stone-300 hover:shadow-[0_24px_65px_-36px_rgba(15,23,42,0.38)]"
        >
            <div className="relative flex items-start justify-between gap-4">
                <div className="space-y-2">
                    <div className="inline-flex rounded-full bg-[#8a6741] px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-white">
                        Surah {surah.number}
                    </div>
                    <div>
                        <h3 className="text-lg font-bold tracking-tight text-stone-950 transition group-hover:text-stone-700">
                            {surah.englishName}
                        </h3>
                        <p className="text-sm text-stone-600">{surah.englishNameTranslation}</p>
                    </div>
                </div>
                <span className="rounded-2xl border border-stone-200 bg-stone-50 px-3 py-2 text-xs font-semibold text-stone-700">
                    {surah.numberOfAyahs} ayahs
                </span>
            </div>
            <div className="relative mt-6 flex items-end justify-between gap-4">
                <p dir="rtl" className="text-right text-3xl font-semibold text-stone-950">
                    {surah.name}
                </p>
                <span className="text-sm font-semibold text-stone-500 transition group-hover:text-stone-700">
                    Open
                </span>
            </div>
        </Link>
    );
}
