// server ko create krna 
const express = require("express")

const app = express()
app.use(express.json())

 const notes = [
  // {
  //   title: "my first test 1",
  //   description: "my first description 1"
  // }
 ]

app.get("/",(req,res)=>{
  res.send("hello world shubham")
})

app.post("/notes", (req,res)=>{
  console.log(req.body)
  notes.push(req.body)
  console.log(notes)
  res.send("notes created")
})
//  get notes from clien sides 
app.get("/notes",(req,res)=>{
  res.send(notes)
})
// delete notes from cleint sides
// params
// 
app.delete("/notes/:index",(req,res)=>{
 delete notes[req.params.index]
 res.send("note deleted succesfully")
})

//  patch use for full update 
app.patch("/notes/:index",(req,res)=>{
  notes[req.params.index].description=req.body.description
 res.send("notes updates succesfully")

})
module.exports = app