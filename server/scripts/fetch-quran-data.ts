import { join } from "node:path";

const BASE = "https://api.alquran.cloud/v1/quran";

async function fetchEdition(edition: string) {
    const res = await fetch(`${BASE}/${edition}`);
    if (!res.ok) throw new Error(`Failed to fetch ${edition}: ${res.status}`);
    const json = await res.json();
    return json.data.surahs as any[];
}

console.log("Fetching Arabic text...");
const arabicSurahs = await fetchEdition("quran-uthmani");

console.log("Fetching English translation...");
const englishSurahs = await fetchEdition("en.sahih");

const surahs = arabicSurahs.map((surah: any, i: number) => ({
    number: surah.number,
    name: surah.name,
    englishName: surah.englishName,
    englishNameTranslation: surah.englishNameTranslation,
    revelationType: surah.revelationType,
    numberOfAyahs: surah.ayahs.length,
    ayahs: surah.ayahs.map((ayah: any, j: number) => ({
        numberInSurah: ayah.numberInSurah,
        arabic: ayah.text,
        translation: englishSurahs[i].ayahs[j].text,
    })),
}));

const outputPath = join(import.meta.dir, "../data/quran-data.json");
await Bun.write(outputPath, JSON.stringify({ surahs }));

console.log(`Done! Saved to ${outputPath}`);
