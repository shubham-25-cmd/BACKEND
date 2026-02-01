const mongoose = require('mongoose')


const noteSchema = new mongoose.Schema({
  title: String,
  description:String
})

const Notemodel=mongoose.model('notes',noteSchema)

module.exports = Notemodel