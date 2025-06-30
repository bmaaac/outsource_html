// api/app.mjs
import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import serverless from "serverless-http";

const app = express();

// `__dirname` for ES Modules
const __dirname = path.dirname(fileURLToPath(import.meta.url));

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.get("/careers", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "careers.html"));
});

app.get("/about", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "about.html"));
});

// 404 handler
app.get("*", (req, res) => {
  res.status(404).send("404 - Not Found");
});

// Export the handler for serverless deployment (Vercel)
export const handler = serverless(app);
