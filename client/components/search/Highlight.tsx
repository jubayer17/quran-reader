"use client";

export function Highlight({ text, query }: { text: string; query: string }) {
    if (!query.trim()) return <>{text}</>;

    const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`, "gi");
    const parts = text.split(regex);

    return (
        <>
            {parts.map((part, i) =>
                regex.test(part) ? (
                    <mark key={i} className="rounded bg-[#8a6741]/20 px-0.5 font-semibold not-italic text-[#5a3e20]">
                        {part}
                    </mark>
                ) : (
                    part
                )
            )}
        </>
    );
}
