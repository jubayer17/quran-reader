type Ayah = {
    numberInSurah: number;
    arabic: string;
    translation: string;
};

export function AyahCard({ ayah }: { ayah: Ayah }) {
    return (
        <article
            id={`ayah-${ayah.numberInSurah}`}
            className="group rounded-[1.75rem] border border-stone-200 bg-white p-5 shadow-[0_16px_48px_-38px_rgba(15,23,42,0.3)] transition hover:-translate-y-0.5 hover:shadow-[0_24px_60px_-36px_rgba(15,23,42,0.38)] sm:p-6"
        >
            <div className="flex items-center justify-between gap-4">
                <span className="inline-flex h-10 min-w-10 items-center justify-center rounded-full bg-[#8a6741] px-3 text-sm font-semibold text-white shadow-md shadow-[#8a6741]/15">
                    {ayah.numberInSurah}
                </span>
            </div>
            <p dir="rtl" className="arabic-text mt-5 text-right text-stone-950">
                {ayah.arabic}
            </p>
            <p className="translation-text mt-4 text-stone-700">{ayah.translation}</p>
        </article>
    );
}
