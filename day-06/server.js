// server ko start krna 
//  aur database se connect krna 

const app =require('./src/app');
 const mongoose = require('mongoose');
 function connectToDb(){
mongoose.connect('mongodb+srv://shubham:qRMohs7v9lN1b3SB@cluster0.nhixilj.mongodb.net/day-06')//ye jo connect hai ye express server ko database se connect krta hai 
        .then(()=>{
          console.log("connected to database")  
      })
 }
connectToDb()

app.listen(3000,()=>{
  console.log("server is running on port 3000") 
})

// firstly install the mongoose package in terminal using npm i mongoose 
// secondly import mongoose in this file 