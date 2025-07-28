const db=require("../model/db");
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");

class UserAuth{
  async hashPassword(password){
    return await bcrypt.hash(password,10);
  }

  async checkUser(email){
    return await db.query('select * from users where email=$1',[email]);
  }

  async register(fName,lName,email,password){
    const isUser=await this.checkUser(email);
    if(isUser.rowCount > 0) throw new Error('Email already exists');
    const hashPassword=await this.hashPassword(password);
    await db.query('insert into users(first_name, last_name, email, password) values($1, $2, $3, $4)',[fName,lName,email,hashPassword]);

    return 'User Registered';

  }

  async generateToken(email,password){
    const isUser=await this.checkUser(email);
   
    if(!isUser) throw new Error("Incorrect email");
     const user=isUser.rows[0];
    const isMatch=await bcrypt.compare(password,user.password);

    if(!isMatch) throw new Error("Incorrect password");

    const token=jwt.sign({id:user.id, email:user.email, first_name:user.first_name},process.env.SECRET_KEY,{expiresIn:'1h'});

    return token;
  }

  async decodeToken(token){
    try {
      return jwt.verify(token,process.env.SECRET_KEY);
    } catch (error) {
      return {};
    }
  }
}

module.exports=new UserAuth();