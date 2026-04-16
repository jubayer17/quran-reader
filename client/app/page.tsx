import Link from "next/link";
import { getSurahList } from "@/lib/quran-db";

export default async function Home() {
  const surahs = await getSurahList();
  const featuredSurah = surahs[0];
return (
    <div className="page-shell space-y-8">
      <section className="relative overflow-hidden rounded-[2rem] border border-stone-200 bg-white p-6 shadow-[0_26px_80px_-52px_rgba(15,23,42,0.35)] sm:p-8 lg:p-10">
        <div className="absolute inset-x-0 top-0 h-1 bg-[#8a6741]" />
        <div className="relative grid gap-8 lg:grid-cols-[1.3fr_0.7fr] lg:items-end">
          <div className="space-y-5">
            <div className="inline-flex items-center gap-2 rounded-full border border-stone-200 bg-stone-50 px-4 py-2 text-xs font-semibold uppercase tracking-[0.28em] text-stone-700">
              SSG Quran Explorer
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
                href={`/surah/${featuredSurah?.number ?? 1}`}
                className="inline-flex h-12 items-center justify-center rounded-xl border border-stone-200 bg-white px-6 text-sm font-semibold uppercase tracking-[0.16em] text-stone-950 transition hover:bg-stone-50"
              >
                Read First Surah
              </Link>
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
            <div className="rounded-2xl border border-stone-200 bg-stone-50 p-4 shadow-sm">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-stone-500">
                Surahs
              </p>
              <p className="mt-2 text-3xl font-bold text-stone-950">114</p>
            </div>
            <div className="rounded-2xl border border-stone-200 bg-stone-50 p-4 shadow-sm">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-stone-500">
                Juz
              </p>
              <p className="mt-2 text-3xl font-bold text-stone-950">30</p>
            </div>
            <div className="rounded-2xl border border-stone-200 bg-stone-50 p-4 shadow-sm">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-stone-500">
                Reader Mode
              </p>
              <p className="mt-2 text-lg font-semibold text-stone-950">Custom fonts + sizes</p>
            </div>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-stone-500">
              Explore
            </p>
            <h2 className="mt-1 text-2xl font-bold text-stone-950 sm:text-3xl">
              Surah List
            </h2>
          </div>
          <p className="rounded-full border border-stone-200 bg-white px-4 py-2 text-sm text-stone-600 shadow-sm">
            Tap any Surah to open its ayat page
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {surahs.map((surah) => (
            <Link
              key={surah.number}
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
                    <p className="text-sm text-stone-600">
                      {surah.englishNameTranslation}
                    </p>
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
          ))}
        </div>
      </section>
    </div>
  );
}
