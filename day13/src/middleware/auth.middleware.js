const jwt= require("jsonwebtoken");

async function IdentifyUser(req,res,next){
  const token = req.cookies.token
  if(!token){
    return res.status(401).json({
      message:"token not provided,unauthroized acess"
    })
  }
  let decoded;
  try{
    decoded=jwt.verify(token,process.env.JWT_SECRET);
  }catch(err){
    return res.status(401).json({
      message:"user not authorize"
    })
  }
  req.user= decoded
  next()
}
module.exports=IdentifyUser