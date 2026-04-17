import Link from "next/link";

const SURAH_COUNT = 114;

export function SurahPrevNext({ surahNumber }: { surahNumber: number }) {
    return (
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
    );
}
