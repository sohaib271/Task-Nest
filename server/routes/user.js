const express=require("express");
const router=express.Router();
const user=require("../controller/user");
const checkUser=require("../middleware/auth");

router.post("/register",async(req,res)=>{
  const {first_name,last_name,email,password}=req.body;

  try {
    const register=await user.register(first_name,last_name,email,password);
    return res.json({register});
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});

router.post("/login",async(req,res)=>{
  const {email,password}=req.body;

  try {
    const token=await user.generateToken(email,password);
    return res.json({token});
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});

router.get("/access",checkUser,(req,res)=>{
  try {
    return res.json(req.user);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});

module.exports=router;