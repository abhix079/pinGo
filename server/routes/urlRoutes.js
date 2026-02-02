import express from "express";
import fs from "fs";
import path from "path";

const router = express.Router();
const urlsFile = path.resolve("backend/urls.json");

// POST - Add a new URL
router.post("/", (req, res) => {
  const { url } = req.body;
  if (!url) return res.status(400).json({ message: "URL is required" });

  let urls = [];
  if (fs.existsSync(urlsFile)) {
    urls = JSON.parse(fs.readFileSync(urlsFile, "utf-8"));
  }

  if (!urls.includes(url)) {
    urls.push(url);
    fs.writeFileSync(urlsFile, JSON.stringify(urls, null, 2));
  }

  res.json({ message: "URL saved successfully", urls });
});

// GET - Fetch all URLs
router.get("/", (req, res) => {
  if (!fs.existsSync(urlsFile)) return res.json([]);
  const urls = JSON.parse(fs.readFileSync(urlsFile, "utf-8"));
  res.json(urls);
});

export default router;
