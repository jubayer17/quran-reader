import Link from "next/link";

export function SearchPageNav() {
    return (
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
    );
}
