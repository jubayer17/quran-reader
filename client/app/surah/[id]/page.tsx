import Link from "next/link";
import { notFound } from "next/navigation";
import { SURAH_COUNT, getSurahDetails } from "@/lib/quran-db";

type SurahPageProps = {
    params: Promise<{ id: string }>;
};

export const dynamicParams = false;

export async function generateStaticParams() {
    return Array.from({ length: SURAH_COUNT }, (_, index) => ({
        id: String(index + 1),
    }));
}

export default async function SurahPage({ params }: SurahPageProps) {
    const resolvedParams = await params;
    const surahNumber = Number(resolvedParams.id);

    if (!Number.isInteger(surahNumber) || surahNumber < 1 || surahNumber > SURAH_COUNT) {
        notFound();
    }

    const details = await getSurahDetails(surahNumber);
    if (!details) {
        notFound();
    }

    const { surah } = details;

    return (
        <div className="page-shell space-y-6">

            {/* Top nav */}
            <div className="flex flex-wrap items-center justify-between gap-4">
                <Link
                    href="/"
                    className="inline-flex items-center gap-2 rounded-full border border-stone-200 bg-white px-4 py-2 text-sm font-semibold text-stone-950 shadow-sm transition hover:bg-stone-50"
                >
                    <span aria-hidden="true">←</span>
                    Back to Surah List
                </Link>
                <Link
                    href="/search"
                    className="inline-flex h-10 items-center justify-center rounded-full border border-stone-200 bg-white px-4 text-xs font-semibold uppercase tracking-[0.14em] text-stone-950 shadow-sm transition hover:bg-stone-50"
                >
                    Search
                </Link>
            </div>

            {/* Hero card */}
            <section className="relative overflow-hidden rounded-[2rem] border border-stone-200 bg-white p-6 shadow-[0_22px_70px_-48px_rgba(15,23,42,0.35)] sm:p-10">
                <div className="absolute inset-x-0 top-0 h-1 bg-[#8a6741]" />
                <div className="relative flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
                    <div className="space-y-2">
                        <span className="inline-flex items-center rounded-full bg-[#8a6741]/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-[#8a6741]">
                            Surah {surah.number} · {surah.revelationType}
                        </span>
                        <h1 className="text-4xl font-bold tracking-tight text-stone-950 sm:text-5xl">
                            {surah.englishName}
                        </h1>
                        <p className="text-lg text-stone-500">{surah.englishNameTranslation}</p>
                    </div>
                    <p dir="rtl" className="text-right text-5xl font-semibold text-stone-900 sm:text-6xl">
                        {surah.name}
                    </p>
                </div>
            </section>

            {/* Info cards */}
            <section className="grid gap-4 sm:grid-cols-3">
                <div className="rounded-2xl border border-stone-200 bg-white p-5 shadow-sm">
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-stone-400">Revealed In</p>
                    <p className="mt-2 text-2xl font-bold text-stone-950">{surah.revelationType}</p>
                    <p className="mt-1 text-sm text-stone-500">
                        {surah.revelationType === "Meccan" ? "Before the Hijra" : "After the Hijra"}
                    </p>
                </div>
                <div className="rounded-2xl border border-stone-200 bg-white p-5 shadow-sm">
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-stone-400">Position</p>
                    <p className="mt-2 text-2xl font-bold text-stone-950">
                        {surah.number}
                        <span className="ml-1 text-base font-medium text-stone-400">/ {SURAH_COUNT}</span>
                    </p>
                    <p className="mt-1 text-sm text-stone-500">Order in the Quran</p>
                </div>
                <div className="rounded-2xl border border-stone-200 bg-white p-5 shadow-sm">
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-stone-400">Meaning</p>
                    <p className="mt-2 text-2xl font-bold text-stone-950 leading-tight">{surah.englishNameTranslation}</p>
                    <p className="mt-1 text-sm text-stone-500">English translation of name</p>
                </div>
            </section>

            {/* Prev / Next navigation */}
            <div className="flex items-center justify-between gap-4">
                {surahNumber > 1 ? (
                    <Link
                        href={`/surah/${surahNumber - 1}`}
                        className="inline-flex items-center gap-2 rounded-full border border-stone-200 bg-white px-5 py-2.5 text-sm font-semibold text-stone-950 shadow-sm transition hover:bg-stone-50"
                    >
                        <span aria-hidden="true">←</span>
                        Previous Surah
                    </Link>
                ) : <span />}
                {surahNumber < SURAH_COUNT ? (
                    <Link
                        href={`/surah/${surahNumber + 1}`}
                        className="inline-flex items-center gap-2 rounded-full border border-stone-200 bg-white px-5 py-2.5 text-sm font-semibold text-stone-950 shadow-sm transition hover:bg-stone-50"
                    >
                        Next Surah
                        <span aria-hidden="true">→</span>
                    </Link>
                ) : <span />}
            </div>

            {details.ayahs.length > 0 ? (
                <section className="grid gap-4">
                    {details.ayahs.map((ayah) => (
                        <article
                            key={ayah.numberInSurah}
                            id={`ayah-${ayah.numberInSurah}`}
                            className="group rounded-[1.75rem] border border-stone-200 bg-white p-5 shadow-[0_16px_48px_-38px_rgba(15,23,42,0.3)] transition hover:-translate-y-0.5 hover:shadow-[0_24px_60px_-36px_rgba(15,23,42,0.38)] sm:p-6"
                        >
                            <div className="flex items-center justify-between gap-4">
                                <span className="inline-flex h-10 min-w-10 items-center justify-center rounded-full bg-[#8a6741] px-3 text-sm font-semibold text-white shadow-md shadow-[#8a6741]/15">
                                    {ayah.numberInSurah}
                                </span>
                                <span className="text-xs font-semibold uppercase tracking-[0.16em] text-stone-400 transition group-hover:text-stone-600">
                                    Ayah
                                </span>
                            </div>
                            <p dir="rtl" className="arabic-text mt-5 text-right text-stone-950">
                                {ayah.arabic}
                            </p>
                            <p className="translation-text mt-4 text-stone-700">{ayah.translation}</p>
                        </article>
                    ))}
                </section>
            ) : (
                <section className="rounded-2xl border border-dashed border-stone-300 bg-white p-5 text-sm text-stone-600 shadow-sm">
                    No ayahs available for this Surah in the current dataset.
                </section>
            )}

        </div>
    );
}
