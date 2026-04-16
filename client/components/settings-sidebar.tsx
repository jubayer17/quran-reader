"use client";

import { useState } from "react";
import { useReaderSettings } from "@/components/settings-provider";

export function SettingsSidebar() {
    const [open, setOpen] = useState(false);
    const {
        settings,
        setArabicFont,
        setArabicFontSize,
        setTranslationFontSize,
    } = useReaderSettings();

    return (
        <>
            {open ? (
                <button
                    type="button"
                    aria-label="Close settings panel"
                    onClick={() => setOpen(false)}
                    className="fixed inset-0 z-20 cursor-default bg-[#4d3725]/20 backdrop-blur-[1px]"
                />
            ) : null}

            <button
                type="button"
                aria-expanded={open}
                aria-controls="reader-settings-panel"
                onClick={() => setOpen((prev) => !prev)}
                className="fixed bottom-5 right-5 z-40 inline-flex h-12 items-center justify-center rounded-full bg-[#8a6741] px-4 text-xs font-semibold uppercase tracking-[0.16em] text-white shadow-lg shadow-[#8a6741]/25 transition hover:-translate-y-0.5 hover:bg-[#6f5030]"
            >
                Settings
            </button>

            <aside
                id="reader-settings-panel"
                className={`fixed right-0 top-0 z-30 h-full w-[88%] max-w-sm transform border-l border-stone-200 bg-white p-5 shadow-2xl shadow-[#8a6741]/15 backdrop-blur-xl transition duration-300 sm:p-6 ${open ? "translate-x-0" : "translate-x-full"
                    }`}
            >
                <div className="space-y-6 pt-10">
                    <div className="flex items-start justify-between gap-4">
                        <div className="space-y-2">
                            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-stone-500">
                                Reader Controls
                            </p>
                            <h2 className="text-xl font-bold tracking-tight text-stone-950">
                                Reading Settings
                            </h2>
                            <p className="text-sm leading-7 text-stone-600">
                                Adjust typography for Arabic and translation text. Your choices are saved locally.
                            </p>
                        </div>

                        <button
                            type="button"
                            aria-label="Close settings"
                            onClick={() => setOpen(false)}
                            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-stone-200 bg-white text-stone-700 shadow-sm transition hover:bg-stone-50"
                        >
                            ×
                        </button>
                    </div>

                    <label className="block space-y-2 rounded-2xl border border-stone-200 bg-stone-50 p-4 shadow-sm">
                        <span className="text-sm font-semibold text-stone-950">Arabic Font</span>
                        <select
                            value={settings.arabicFont}
                            onChange={(event) =>
                                setArabicFont(event.target.value === "notoNaskh" ? "notoNaskh" : "amiri")
                            }
                            className="h-12 w-full rounded-xl border border-stone-200 bg-white px-3 text-sm text-stone-950 outline-none ring-stone-700 transition focus:ring-2"
                        >
                            <option value="amiri">Amiri</option>
                            <option value="notoNaskh">Noto Naskh Arabic</option>
                        </select>
                    </label>

                    <label className="block space-y-2 rounded-2xl border border-stone-200 bg-stone-50 p-4 shadow-sm">
                        <span className="text-sm font-semibold text-stone-950">
                            Arabic Font Size: {settings.arabicFontSize}px
                        </span>
                        <input
                            type="range"
                            min={22}
                            max={64}
                            value={settings.arabicFontSize}
                            onChange={(event) => setArabicFontSize(Number(event.target.value))}
                            className="w-full accent-stone-900"
                        />
                    </label>

                    <label className="block space-y-2 rounded-2xl border border-stone-200 bg-stone-50 p-4 shadow-sm">
                        <span className="text-sm font-semibold text-stone-950">
                            Translation Font Size: {settings.translationFontSize}px
                        </span>
                        <input
                            type="range"
                            min={14}
                            max={32}
                            value={settings.translationFontSize}
                            onChange={(event) => setTranslationFontSize(Number(event.target.value))}
                            className="w-full accent-stone-900"
                        />
                    </label>

                    <button
                        type="button"
                        onClick={() => setOpen(false)}
                        className="inline-flex h-11 items-center justify-center rounded-full bg-[#8a6741] px-5 text-sm font-semibold text-white shadow-md shadow-[#8a6741]/20 transition hover:bg-[#6f5030]"
                    >
                        Close Panel
                    </button>
                </div>
            </aside>
        </>
    );
}
