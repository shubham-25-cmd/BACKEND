const express = require("express");
const Notemodel = require("../models/notes.models");
const cors = require("cors");
const path = require("path");

const app = express();

app.use(cors());
app.use(express.json());

// ✅ Serve Vite build correctly
app.use(express.static(path.join(__dirname, "./public")));// for acces static files like css and js saare file ko publicaly acess krne ke liye use krte hai 

/* ================= CREATE NOTE ================= */
app.post("/api/notes", async (req, res) => {
  try {
    const { title, description } = req.body;

    if (!title || !description) {
      return res.status(400).json({
        message: "Title and description are required",
      });
    }

    const note = await Notemodel.create({ title, description });

    res.status(201).json({
      message: "note created successfully",
      note,
    });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

/* ================= GET ALL NOTES ================= */
app.get("/api/notes", async (req, res) => {
  try {
    const notes = await Notemodel.find();
    res.status(200).json({ notes });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

/* ================= DELETE NOTE ================= */
app.delete("/api/notes/:id", async (req, res) => {
  try {
    await Notemodel.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "note deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

/* ================= UPDATE NOTE ================= */
app.patch("/api/notes/:id", async (req, res) => {
  try {
    const { description } = req.body;
    if (!description) {
      return res.status(400).json({ message: "Description is required" });
    }

    await Notemodel.findByIdAndUpdate(req.params.id, { description });
    res.status(200).json({ message: "note updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// ✅ Serve frontend ONLY for root
app.get("/", (req, res) => {
  res.sendFile(
    path.join(__dirname, "../public/dist/index.html")
  );
});

module.exports = app;
