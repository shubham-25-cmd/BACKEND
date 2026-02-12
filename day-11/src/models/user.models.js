const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: [true, "username already exists"],
    required: [true, "username is required"],
  },
  email: {
    type: String,
    unique: [true, "email already exists"],
    required: [true, "email is required"],
  },
  password: {
    type: String,
    required: [true, "password is required"]
  },
  bio: String,
  profileImage: {
    type: String,
    default: "https://imagekit.io/dashboard/media-library/detail/698d8b075c7cd75eb8b7bb54"
  }
});

const userModel = mongoose.model("User", userSchema);

module.exports = userModel;
