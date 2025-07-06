// api/index.js
const express = require("express");
const path = require("path");
const app = express();

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, "../public")));

// Route for your home page (index.html)
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../public", "index.html"));
});

app.get("/about", (req, res) => {
  res.sendFile(path.join(__dirname, "../public", "about.html"));
});

app.get("/careers", (req, res) => {
  res.sendFile(path.join(__dirname, "../public", "careers.html"));
});

module.exports = app;
