"use client";

import {
    createContext,
    useContext,
    useEffect,
    useMemo,
    useState,
    type ReactNode,
} from "react";

const STORAGE_KEY = "quran-reader-settings";

type ArabicFont = "amiri" | "notoNaskh";

type ReaderSettings = {
    arabicFont: ArabicFont;
    arabicFontSize: number;
    translationFontSize: number;
};

type SettingsContextValue = {
    settings: ReaderSettings;
    setArabicFont: (font: ArabicFont) => void;
    setArabicFontSize: (size: number) => void;
    setTranslationFontSize: (size: number) => void;
};

const defaultSettings: ReaderSettings = {
    arabicFont: "amiri",
    arabicFontSize: 36,
    translationFontSize: 19,
};

function normalizeFontSize(value: number, fallback: number) {
    return Number.isFinite(value) ? value : fallback;
}

function getInitialSettings(): ReaderSettings {
    if (typeof window === "undefined") {
        return defaultSettings;
    }

    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) {
        return defaultSettings;
    }

    try {
        const parsed = JSON.parse(raw) as Partial<ReaderSettings>;
        return {
            arabicFont:
                parsed.arabicFont === "notoNaskh" ? "notoNaskh" : defaultSettings.arabicFont,
            arabicFontSize:
                typeof parsed.arabicFontSize === "number"
                    ? normalizeFontSize(parsed.arabicFontSize, defaultSettings.arabicFontSize)
                    : defaultSettings.arabicFontSize,
            translationFontSize:
                typeof parsed.translationFontSize === "number"
                    ? normalizeFontSize(
                        parsed.translationFontSize,
                        defaultSettings.translationFontSize,
                    )
                    : defaultSettings.translationFontSize,
        };
    } catch {
        return defaultSettings;
    }
}

const SettingsContext = createContext<SettingsContextValue | null>(null);

function applySettingsToDocument(settings: ReaderSettings) {
    const arabicFontSize = normalizeFontSize(settings.arabicFontSize, defaultSettings.arabicFontSize);
    const translationFontSize = normalizeFontSize(
        settings.translationFontSize,
        defaultSettings.translationFontSize,
    );

    document.documentElement.dataset.arabicFont = settings.arabicFont;
    document.documentElement.style.setProperty(
        "--arabic-font-size",
        `${arabicFontSize / 16}rem`,
    );
    document.documentElement.style.setProperty(
        "--translation-font-size",
        `${translationFontSize / 16}rem`,
    );
}

export function SettingsProvider({ children }: { children: ReactNode }) {
    const [settings, setSettings] = useState<ReaderSettings>(getInitialSettings);

    useEffect(() => {
        applySettingsToDocument(settings);
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
    }, [settings]);

    const value = useMemo<SettingsContextValue>(
        () => ({
            settings,
            setArabicFont: (font) => setSettings((prev) => ({ ...prev, arabicFont: font })),
            setArabicFontSize: (size) =>
                setSettings((prev) => ({
                    ...prev,
                    arabicFontSize: Math.min(
                        64,
                        Math.max(22, normalizeFontSize(size, defaultSettings.arabicFontSize)),
                    ),
                })),
            setTranslationFontSize: (size) =>
                setSettings((prev) => ({
                    ...prev,
                    translationFontSize: Math.min(
                        32,
                        Math.max(
                            14,
                            normalizeFontSize(size, defaultSettings.translationFontSize),
                        ),
                    ),
                })),
        }),
        [settings],
    );

    return <SettingsContext.Provider value={value}>{children}</SettingsContext.Provider>;
}

export function useReaderSettings() {
    const context = useContext(SettingsContext);
    if (!context) {
        throw new Error("useReaderSettings must be used within SettingsProvider");
    }

    return context;
}
