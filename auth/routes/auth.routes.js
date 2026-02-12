const express = require("express");
const authroutes = express.Router();
const usermodel = require("../models/user.model");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");

authroutes.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const isUserExist = await usermodel.findOne({ email });

    if (isUserExist) {
      return res.status(409).json({
        message: "User already exists with this email"
      });
    }

    const hashedPassword = crypto
      .createHash("sha256")
      .update(password)
      .digest("hex");

    const user = await usermodel.create({
      name,
      email,
      password: hashedPassword
    });

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.cookie("token", token, { httpOnly: true });

    res.status(201).json({
      message: "User registered successfully",
      user: {
        name: user.name,
        email: user.email
      },
      token
    });

  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
      error: error.message
    });
  }
});

authroutes.get("/get-me", async (req, res) => {
    const token = req.cookies.token;
    const decoded = jwt.verify(token,process.env.JWT_SECRET)
    const user = await usermodel.findById(decoded.id)
    res.json({
      name: user.name,
      email:user.email,
    })
});

 authroutes.post("/login",async(req,res)=>{
const {email,password}=req.body
const user = await usermodel.findOne({email})
if(!user){
  return res.status(404).json({
    message:"user not found"
  })
}
const hash = crypto
  .createHash("sha256")
  .update(password)
  .digest("hex");

const isPasswordValid = hash === user.password;

if (!isPasswordValid) {
  return res.status(401).json({
    message: "Invalid password"
  });
}

const token = jwt.sign(
  { id: user._id },           // payload
  process.env.JWT_SECRET,     // secret key
  { expiresIn: "1h" }         // options
);

res.cookie("token", token, { httpOnly: true });

res.json({
  message: "User login successfully",
  name: user.name,
  email: user.email
});

 })
module.exports = authroutes;
