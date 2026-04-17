import Link from "next/link";

type HeroCardProps = {
    firstSurahNumber: number;
};

export function HeroCard({ firstSurahNumber }: HeroCardProps) {
    return (
        <section className="relative overflow-hidden rounded-[2rem] border border-stone-200 bg-white p-6 shadow-[0_26px_80px_-52px_rgba(15,23,42,0.35)] sm:p-8 lg:p-10">
            <div className="absolute inset-x-0 top-0 h-1 bg-[#8a6741]" />
            <div className="relative grid gap-8 lg:grid-cols-[1.3fr_0.7fr] lg:items-end">
                <div className="space-y-5">
                    <div className="inline-flex items-center gap-2 rounded-full border border-stone-200 bg-stone-50 px-4 py-2 text-xs font-semibold uppercase tracking-[0.28em] text-stone-700">
                        Quran Explorer
                    </div>
                    <div className="space-y-4">
                        <h1 className="max-w-3xl text-4xl font-bold tracking-tight text-stone-950 sm:text-5xl lg:text-6xl">
                            Read the Quran in a refined, fast, and timeless static experience.
                        </h1>
                        <p className="max-w-2xl text-base leading-8 text-stone-600 sm:text-lg">
                            Browse all 114 Surahs, open any ayat page, search translation text,
                            and tune Arabic typography with persistent reader settings.
                        </p>
                    </div>
                    <div className="flex flex-wrap gap-3">
                        <Link
                            href="/search"
                            className="inline-flex h-12 items-center justify-center rounded-xl bg-[#8a6741] px-6 text-sm font-semibold uppercase tracking-[0.16em] text-white transition hover:bg-[#6f5030]"
                        >
                            Search Ayahs
                        </Link>
                        <Link
                            href={`/surah/${firstSurahNumber}`}
                            className="inline-flex h-12 items-center justify-center rounded-xl border border-stone-200 bg-white px-6 text-sm font-semibold uppercase tracking-[0.16em] text-stone-950 transition hover:bg-stone-50"
                        >
                            Read First Surah
                        </Link>
                    </div>
                </div>

                <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
                    <div className="rounded-2xl border border-stone-200 bg-stone-50 p-4 shadow-sm">
                        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-stone-500">Surahs</p>
                        <p className="mt-2 text-3xl font-bold text-stone-950">114</p>
                    </div>
                    <div className="rounded-2xl border border-stone-200 bg-stone-50 p-4 shadow-sm">
                        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-stone-500">Juz</p>
                        <p className="mt-2 text-3xl font-bold text-stone-950">30</p>
                    </div>
                    <Link
                        href="/search"
                        className="flex flex-col justify-between rounded-2xl border border-[#8a6741] bg-[#8a6741] p-4 shadow-sm transition hover:bg-[#6f5030]"
                    >
                        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-white/70">Search</p>
                        <p className="mt-2 text-lg font-semibold text-white">Search by Translation</p>
                    </Link>
                </div>
            </div>
        </section>
    );
}
