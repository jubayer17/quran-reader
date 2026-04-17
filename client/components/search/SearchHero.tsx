export function SearchHero({ query }: { query: string }) {
    return (
        <section className="relative overflow-hidden rounded-[2rem] border border-stone-200 bg-white p-6 shadow-[0_24px_70px_-44px_rgba(15,23,42,0.35)] sm:p-8">
            <div className="absolute inset-x-0 top-0 h-1 bg-[#8a6741]" />
            <div className="relative max-w-3xl space-y-4">
                <div className="inline-flex items-center rounded-full border border-stone-200 bg-stone-50 px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-stone-600">
                    Find ayahs by meaning
                </div>
                <h1 className="text-3xl font-bold tracking-tight text-stone-950 sm:text-4xl">
                    Search ayahs by translation text.
                </h1>
                <p className="max-w-2xl text-base leading-8 text-stone-600 sm:text-lg">
                    Enter a word or phrase from the English translation to surface matching verses.
                    The search runs on the server for speed and the results stay lightweight.
                </p>
            </div>
            <form className="relative mt-6 flex flex-col gap-3 sm:flex-row" action="/search" method="get">
                <input
                    name="q"
                    defaultValue={query}
                    placeholder="Example: mercy, believers, prayer..."
                    className="h-14 min-w-0 flex-1 rounded-2xl border border-stone-200 bg-white px-5 text-base text-stone-950 shadow-sm outline-none ring-stone-700 transition placeholder:text-stone-400 focus:ring-2"
                />
                <button
                    type="submit"
                    className="inline-flex h-14 items-center justify-center rounded-2xl bg-[#8a6741] px-6 text-sm font-semibold uppercase tracking-[0.16em] text-white shadow-lg shadow-[#8a6741]/20 transition hover:bg-[#6f5030]"
                >
                    Search
                </button>
            </form>
            <div className="relative mt-5 flex flex-wrap gap-2 text-xs font-semibold uppercase tracking-[0.12em] text-stone-600">
                <span className="rounded-full bg-stone-50 px-3 py-2">Mercy</span>
                <span className="rounded-full bg-stone-50 px-3 py-2">Faith</span>
                <span className="rounded-full bg-stone-50 px-3 py-2">Prayer</span>
                <span className="rounded-full bg-stone-50 px-3 py-2">Guidance</span>
            </div>
        </section>
    );
}
