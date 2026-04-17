const SURAH_COUNT = 114;

type SurahSummary = {
    number: number;
    englishNameTranslation: string;
    revelationType: string;
};

export function SurahInfoCards({ surah }: { surah: SurahSummary }) {
    return (
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
                <p className="mt-2 text-2xl font-bold leading-tight text-stone-950">{surah.englishNameTranslation}</p>
                <p className="mt-1 text-sm text-stone-500">English translation of name</p>
            </div>
        </section>
    );
}
