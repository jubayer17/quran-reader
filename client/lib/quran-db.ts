import "server-only";

import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { cache } from "react";

export const SURAH_COUNT = 114;

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

const quranDataPath = join(process.cwd(), "data", "quran-data.json");

const getQuranData = cache(async (): Promise<QuranData> => {
    const raw = await readFile(quranDataPath, "utf8");
    return JSON.parse(raw) as QuranData;
});

export const getSurahList = cache(async (): Promise<SurahSummary[]> => {
    const quran = await getQuranData();

    return quran.surahs.map((surah) => ({
        number: surah.number,
        name: surah.name,
        englishName: surah.englishName,
        englishNameTranslation: surah.englishNameTranslation,
        numberOfAyahs: surah.numberOfAyahs ?? surah.ayahs.length,
        revelationType: surah.revelationType,
    }));
});

export const getSurahDetails = cache(
    async (surahNumber: number): Promise<SurahDetails | null> => {
        const quran = await getQuranData();
        const surah = quran.surahs.find((item) => item.number === surahNumber);

        if (!surah) {
            return null;
        }

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
    },
);

export const getSearchIndex = cache(async (): Promise<SearchResult[]> => {
    const quran = await getQuranData();

    return quran.surahs.flatMap((surah) =>
        surah.ayahs.map((ayah) => ({
            surahNumber: surah.number,
            surahNameArabic: surah.name,
            surahNameEnglish: surah.englishName,
            ayahNumber: ayah.numberInSurah,
            arabic: ayah.arabic,
            translation: ayah.translation,
        })),
    );
});
