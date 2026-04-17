"use client";

import { useState } from "react";
import { SurahCard } from "./SurahCard";

export type SurahSummary = {
    number: number;
    name: string;
    englishName: string;
    englishNameTranslation: string;
    numberOfAyahs: number;
    revelationType: string;
};

export function SurahList({ surahs }: { surahs: SurahSummary[] }) {
    const [query, setQuery] = useState("");

    const filtered = query.trim()
        ? surahs.filter(
              (s) =>
                  s.englishName.toLowerCase().includes(query.toLowerCase()) ||
                  s.englishNameTranslation.toLowerCase().includes(query.toLowerCase()) ||
                  String(s.number).includes(query.trim())
          )
        : surahs;

    return (
        <section className="space-y-4">
            <div className="flex flex-wrap items-end justify-between gap-3">
                <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.22em] text-stone-500">Explore</p>
                    <h2 className="mt-1 text-2xl font-bold text-stone-950 sm:text-3xl">Surah List</h2>
                </div>
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search surah name or number..."
                    className="h-10 w-full rounded-xl border border-stone-200 bg-white px-4 text-sm text-stone-950 shadow-sm outline-none ring-stone-700 transition placeholder:text-stone-400 focus:ring-2 sm:w-72"
                />
            </div>

            {filtered.length === 0 ? (
                <p className="rounded-2xl border border-dashed border-stone-300 bg-white p-5 text-sm text-stone-600 shadow-sm">
                    No surahs match &ldquo;{query}&rdquo;.
                </p>
            ) : (
                <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                    {filtered.map((surah) => (
                        <SurahCard key={surah.number} surah={surah} />
                    ))}
                </div>
            )}
        </section>
    );
}
