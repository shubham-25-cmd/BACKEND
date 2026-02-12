const mongoose = require("mongoose");

function connectdb() {
  mongoose.connect(process.env.MONGO_URI)
    .then(() => {
      console.log("Database connected successfully");
    })
    .catch((err) => {
      console.log("Database not connected successfully");
      console.log(err);
    });
}

module.exports = connectdb;
