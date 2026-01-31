// server start karne ke liye
// database se connect karna 
require('dotenv').config();
const mongoose = require('mongoose');   // ✅ mongoose import
const connectToDb = require('./src/config/database');
const app = require('./src/app');


connectToDb();

app.listen(3000, () => {
  console.log("Server started at port 3000");
});
