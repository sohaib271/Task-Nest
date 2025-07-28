const userAuth=require("../controller/user");

async function checkUser(req,res,next){
  const header=req.headers['authorization'];
  if(!header) return res.json({msg:"no headers"});
  const token=header.split(" ")[1];
  if(!token) return res.json({msg:"No token"});
  try {
    const user=await userAuth.decodeToken(token);
    req.user=user;
    next();
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

module.exports=checkUser;