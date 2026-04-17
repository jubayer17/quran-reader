import { HeroCard } from "@/components/home/HeroCard";
import { SurahList, type SurahSummary } from "@/components/home/SurahList";

export const dynamic = "force-dynamic";

const API_URL = process.env.QURAN_API_URL ?? "http://localhost:3001";

async function getSurahList(): Promise<SurahSummary[]> {
    const res = await fetch(`${API_URL}/api/surahs`);
    return res.json();
}

export default async function Home() {
    const surahs = await getSurahList();

    return (
        <div className="page-shell space-y-8">
            <HeroCard firstSurahNumber={surahs[0]?.number ?? 1} />
            <SurahList surahs={surahs} />
        </div>
    );
}
