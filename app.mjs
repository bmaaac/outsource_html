import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const express = require("express");
const serverless = require("serverless-http");

const app = express();

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

app.get("*", (req, res) => {
  res.status(404).send("404 - Not Found");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});

export const handler = serverless(app);
