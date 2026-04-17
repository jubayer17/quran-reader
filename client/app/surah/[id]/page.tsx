import { notFound } from "next/navigation";
import { SurahPageNav } from "@/components/surah/SurahPageNav";
import { SurahHero } from "@/components/surah/SurahHero";
import { SurahInfoCards } from "@/components/surah/SurahInfoCards";
import { SurahPrevNext } from "@/components/surah/SurahPrevNext";
import { AyahList } from "@/components/surah/AyahList";

const API_URL = process.env.QURAN_API_URL ?? "http://localhost:3001";

type SurahDetails = {
    surah: {
        number: number;
        name: string;
        englishName: string;
        englishNameTranslation: string;
        numberOfAyahs: number;
        revelationType: string;
    };
    ayahs: { numberInSurah: number; arabic: string; translation: string }[];
};

async function getSurahDetails(surahNumber: number): Promise<SurahDetails | null> {
    const res = await fetch(`${API_URL}/api/surahs/${surahNumber}`);
    if (!res.ok) return null;
    return res.json();
}

type SurahPageProps = {
    params: Promise<{ id: string }>;
};

export const dynamic = "force-dynamic";

export default async function SurahPage({ params }: SurahPageProps) {
    const { id } = await params;
    const surahNumber = Number(id);

    if (!Number.isInteger(surahNumber) || surahNumber < 1 || surahNumber > 114) {
        notFound();
    }

    const details = await getSurahDetails(surahNumber);
    if (!details) notFound();

    return (
        <div className="page-shell space-y-6">
            <SurahPageNav />
            <SurahHero surah={details.surah} />
            <SurahInfoCards surah={details.surah} />
            <SurahPrevNext surahNumber={surahNumber} />
            <AyahList ayahs={details.ayahs} />
        </div>
    );
}
