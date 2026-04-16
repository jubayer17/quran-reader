import { Hono } from "hono";

const app = new Hono();

app.get("/", (c) => {
    return c.json({
        message: "Hono server is running",
    });
});

app.get("/health", (c) => {
    return c.json({
        status: "ok",
        timestamp: new Date().toISOString(),
    });
});

export default {
    port: 3001,
    fetch: app.fetch,
};