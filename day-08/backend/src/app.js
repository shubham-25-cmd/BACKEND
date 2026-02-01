// server create krna 

const express = require('express');
const Notemodel=require('../models/notes.models');
const app = express();
app.use(express.json());
//post api create krna
// create new note and save new data in mongoodb
// req.body = { title, description}

app.post("/api/notes",async(req,res)=>{
  const {title,description} = req.body;
  const note = await Notemodel.create({
    title, description
  })
  res.status(201).json({
    message:"note created succesfully",
    note
  })
})
app.get('/api/notes',async(req,res)=>{
  const {title,description} = req.body;
  const note = await Notemodel.find();
  res.status(200).json({
    message:"all notes fetched succesfully",
    note
  })
})
// delete api create kna 
app.delete('/api/notes/:id', async (req, res) => {
  const id = req.params.id.trim();

  await Notemodel.findByIdAndDelete(id);

  res.status(200).json({
    message: "note deleted successfully"
  });
});
//patch for update note
//update the description of note 
app.patch('/api/notes/:id', async (req, res) => {
  const id = req.params.id
  const {description} = req.body;
  await Notemodel.findByIdAndUpdate(id, {description})
    res.status(200).json({
    message: "note updated successfully"
  })

})
module.exports = app;