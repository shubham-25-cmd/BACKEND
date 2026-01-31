const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
  title:String,
  description:String,
})

 const noteModel = mongoose.model("notes", noteSchema);
// schema means ki ham kis type ke data ko store karenge isi ko schmea bolte hai 


module.exports = noteModel;