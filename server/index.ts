import { Hono } from "hono";
import { getSurahList, getSurahDetails, searchAyahs } from "./lib/quran-db";

const app = new Hono();

app.get("/", (c) => {
    return c.json({ status: "ok", timestamp: new Date().toISOString() });
});

app.get("/api/surahs", async (c) => {
    const surahs = await getSurahList();
    return c.json(surahs);
});

app.get("/api/surahs/:id", async (c) => {
    const id = Number(c.req.param("id"));
    if (!Number.isInteger(id) || id < 1 || id > 114) {
        return c.json({ error: "Not found" }, 404);
    }
    const details = await getSurahDetails(id);
    if (!details) return c.json({ error: "Not found" }, 404);
    return c.json(details);
});

app.get("/api/search", async (c) => {
    const query = c.req.query("q")?.trim() ?? "";
    if (!query) return c.json([]);
    const results = await searchAyahs(query);
    return c.json(results);
});

export default {
    port: 3001,
    fetch: app.fetch,
};
