const userModel = require("../models/user.models");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
async function registerController(req, res) {
  try {
    const { username, email, password, bio, profileImage } = req.body;

    const isAlreadyExist = await userModel.findOne({
      $or: [{ username }, { email }]
    });

    if (isAlreadyExist) {
      return res.status(409).json({
        message: "User already exists"
      });
    }

    const hash = crypto
      .createHash("sha256")
      .update(password)
      .digest("hex");

    const user = await userModel.create({
      username,
      email,
      bio,
      profileImage,
      password: hash,
    });

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.cookie("token", token);

    res.status(201).json({
      message: "User registered successfully",
      user: {
        email: user.email,
        username: user.username,
        profileImage: user.profileImage,
        bio: user.bio
      }
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Server error"
    });
  }
}


async function logginController(req,res){
  const{username,email, password} = req.body
  const user = await userModel.findOne({
    $or:[
      {
      username:username
      },
      {
        email:email
      }
    ]
  })
  if(!user){
    return res.status(404).json({
      message:"user not found "
    })
  }
 const hash = crypto.createHash("sha256").update(password).digest("hex");
 const ispasswordvalid = hash ==user.password
 if(!ispasswordvalid){
  return res.status(404).json({
    message:"password invalid"
  })
 }
 const token = jwt.sign(
  {id:user._id},
  process.env.JWT_SECRET,
  {expiresIn:"1d"}
 )
 res.cookie("token",token)
 res.status(200).json({
  message:"user logged in sucessfully",
  user:{
    username:user.name,
    email:user.email,
    bio:user.bio,
    profileImage:user.profileImage,
  }
 })

}

module.exports={
  registerController,
  logginController
}
