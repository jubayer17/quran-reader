type SurahSummary = {
    number: number;
    name: string;
    englishName: string;
    englishNameTranslation: string;
    revelationType: string;
};

export function SurahHero({ surah }: { surah: SurahSummary }) {
    return (
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
    );
}
