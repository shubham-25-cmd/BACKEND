// server create krna

const express = require("express");
const Notemodel = require("../models/notes.models");
const cors = require("cors");
const path = require('path');
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static("./public"))

/* ================= CREATE NOTE ================= */
app.post("/api/notes", async (req, res) => {
  try {
    const { title, description } = req.body;

    if (!title || !description) {
      return res.status(400).json({
        message: "Title and description are required",
      });
    }

    const note = await Notemodel.create({
      title,
      description,
    });

    res.status(201).json({
      message: "note created successfully",
      note,
    });
  } catch (error) {
    console.error("CREATE NOTE ERROR:", error);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
});

/* ================= GET ALL NOTES ================= */
app.get("/api/notes", async (req, res) => {
  try {
    const notes = await Notemodel.find();

    res.status(200).json({
      message: "all notes fetched successfully",
      notes,
    });
  } catch (error) {
    console.error("FETCH NOTES ERROR:", error);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
});

/* ================= DELETE NOTE ================= */
app.delete("/api/notes/:id", async (req, res) => {
  try {
    const id = req.params.id.trim();

    await Notemodel.findByIdAndDelete(id);

    res.status(200).json({
      message: "note deleted successfully",
    });
  } catch (error) {
    console.error("DELETE NOTE ERROR:", error);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
});

/* ================= UPDATE NOTE ================= */
app.patch("/api/notes/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const { description } = req.body;

    if (!description) {
      return res.status(400).json({
        message: "Description is required",
      });
    }

    await Notemodel.findByIdAndUpdate(id, { description });

    res.status(200).json({
      message: "note updated successfully",
    });
  } catch (error) {
    console.error("UPDATE NOTE ERROR:", error);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
});
console.log(__dirname)
app.use('*name',(req,res)=>{
  res.sendFile(path.join(__dirname+'/index.html'))
})
module.exports = app;
