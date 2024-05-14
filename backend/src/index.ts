import { Hono } from "hono";
import { Blog, Users } from "./routes";
import { cors } from "hono/cors";
const app = new Hono();

// users route
app.use("/*", cors());
app.route("api/v1/", Users);
app.route("api/v2/", Blog);

export default app;
