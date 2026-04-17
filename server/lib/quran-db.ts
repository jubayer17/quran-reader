import { join } from "node:path";

type Ayah = {
    numberInSurah: number;
    arabic: string;
    translation: string;
};

type Surah = {
    number: number;
    name: string;
    englishName: string;
    englishNameTranslation: string;
    numberOfAyahs: number;
    revelationType: string;
    ayahs: Ayah[];
};

type QuranData = {
    surahs: Surah[];
};

export type SurahSummary = {
    number: number;
    name: string;
    englishName: string;
    englishNameTranslation: string;
    numberOfAyahs: number;
    revelationType: string;
};

export type AyahPair = {
    numberInSurah: number;
    arabic: string;
    translation: string;
};

export type SurahDetails = {
    surah: SurahSummary;
    ayahs: AyahPair[];
};

export type SearchResult = {
    surahNumber: number;
    surahNameArabic: string;
    surahNameEnglish: string;
    ayahNumber: number;
    arabic: string;
    translation: string;
};

const dataPath = join(import.meta.dir, "../data/quran-data.json");

let cached: QuranData | null = null;

async function getQuranData(): Promise<QuranData> {
    if (cached) return cached;
    const raw = await Bun.file(dataPath).text();
    cached = JSON.parse(raw) as QuranData;
    return cached;
}

export async function getSurahList(): Promise<SurahSummary[]> {
    const quran = await getQuranData();
    return quran.surahs.map((surah) => ({
        number: surah.number,
        name: surah.name,
        englishName: surah.englishName,
        englishNameTranslation: surah.englishNameTranslation,
        numberOfAyahs: surah.numberOfAyahs ?? surah.ayahs.length,
        revelationType: surah.revelationType,
    }));
}

export async function getSurahDetails(surahNumber: number): Promise<SurahDetails | null> {
    const quran = await getQuranData();
    const surah = quran.surahs.find((s) => s.number === surahNumber);
    if (!surah) return null;
    return {
        surah: {
            number: surah.number,
            name: surah.name,
            englishName: surah.englishName,
            englishNameTranslation: surah.englishNameTranslation,
            numberOfAyahs: surah.numberOfAyahs ?? surah.ayahs.length,
            revelationType: surah.revelationType,
        },
        ayahs: surah.ayahs.map((ayah) => ({
            numberInSurah: ayah.numberInSurah,
            arabic: ayah.arabic,
            translation: ayah.translation,
        })),
    };
}

export async function searchAyahs(query: string): Promise<SearchResult[]> {
    const quran = await getQuranData();
    const q = query.toLowerCase();
    const results: SearchResult[] = [];
    for (const surah of quran.surahs) {
        for (const ayah of surah.ayahs) {
            if (ayah.translation.toLowerCase().includes(q)) {
                results.push({
                    surahNumber: surah.number,
                    surahNameArabic: surah.name,
                    surahNameEnglish: surah.englishName,
                    ayahNumber: ayah.numberInSurah,
                    arabic: ayah.arabic,
                    translation: ayah.translation,
                });
                if (results.length >= 120) return results;
            }
        }
    }
    return results;
}
