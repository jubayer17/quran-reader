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
