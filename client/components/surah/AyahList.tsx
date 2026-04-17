import { AyahCard } from "./AyahCard";

type Ayah = {
    numberInSurah: number;
    arabic: string;
    translation: string;
};

export function AyahList({ ayahs }: { ayahs: Ayah[] }) {
    if (ayahs.length === 0) {
        return (
            <section className="rounded-2xl border border-dashed border-stone-300 bg-white p-5 text-sm text-stone-600 shadow-sm">
                No ayahs available for this Surah in the current dataset.
            </section>
        );
    }

    return (
        <section className="grid gap-4">
            {ayahs.map((ayah) => (
                <AyahCard key={ayah.numberInSurah} ayah={ayah} />
            ))}
        </section>
    );
}
