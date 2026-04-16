import type { Metadata } from "next";
import { Amiri, Lora, Noto_Naskh_Arabic } from "next/font/google";
import Link from "next/link";
import "./globals.css";
import { SettingsProvider } from "@/components/settings-provider";
import { SettingsSidebar } from "@/components/settings-sidebar";

const lora = Lora({
  variable: "--font-lora",
  subsets: ["latin"],
});

const amiri = Amiri({
  variable: "--font-amiri",
  subsets: ["arabic", "latin"],
  weight: ["400", "700"],
});

const notoNaskh = Noto_Naskh_Arabic({
  variable: "--font-noto-naskh",
  subsets: ["arabic"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "Quran Reader",
  description: "Responsive Quran reader with surah listing, ayat pages, and search.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${lora.variable} ${amiri.variable} ${notoNaskh.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-canvas text-ink">
        <SettingsProvider>
          <div className="relative min-h-screen overflow-x-hidden bg-[#f5f1e8]">
            <header className="site-header relative mx-auto flex w-full max-w-7xl items-center justify-between gap-4 px-4 pt-5 sm:px-6 lg:px-8">
              <Link
                href="/"
                className="group inline-flex items-center gap-3 rounded-2xl border border-stone-200 bg-white px-4 py-3 shadow-[0_18px_40px_-28px_rgba(15,23,42,0.22)] transition hover:-translate-y-0.5 hover:bg-stone-50"
              >
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-[#8a6741] text-sm font-bold text-white shadow-lg shadow-[#8a6741]/25">
                  Quran
                </span>
                <span className="flex flex-col">
                  <span className="text-sm font-bold tracking-tight text-stone-950">
                    Quran Reader
                  </span>
                  <span className="text-xs text-stone-500">
                    Static generated, responsive, fast
                  </span>
                </span>
              </Link>

              <nav className="flex items-center gap-2 rounded-2xl border border-stone-200 bg-white p-1 shadow-[0_18px_40px_-30px_rgba(15,23,42,0.18)]">
                <Link
                  href="/"
                  className="rounded-xl px-4 py-2 text-sm font-semibold text-stone-950 transition hover:bg-[#8a6741] hover:text-white"
                >
                  Surahs
                </Link>
                <Link
                  href="/search"
                  className="rounded-xl px-4 py-2 text-sm font-semibold text-stone-950 transition hover:bg-[#8a6741] hover:text-white"
                >
                  Search
                </Link>
              </nav>
            </header>

            <SettingsSidebar />
            <main className="relative mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8 lg:py-10">
              {children}
            </main>
          </div>
        </SettingsProvider>
      </body>
    </html>
  );
}
