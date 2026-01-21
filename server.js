const express = require("express")
const app=express()// server instanc create krna

app.get('/', (req,res)=>{
  res.send("hello world")
})

app.get("/about", (req, res)=>{
  res.send("hello world shubham")
})
app.listen(3000)//server start karna