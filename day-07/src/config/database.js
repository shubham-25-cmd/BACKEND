const mongoose = require('mongoose');   // ✅ mongoose import


function connectToDb() {
  mongoose.connect(
    process.env.MONGO_URI,
  )
  .then(() => {
    console.log('MongoDB connected successfully');
  })
}

module.exports = connectToDb;