
class User{
  async register(firstName,lastName,email,password){
     const response=await fetch("http://localhost:8000/user/register",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({first_name:firstName,last_name:lastName,email:email,password:password})});

    const result=await response.json();
    if(result.register) return result.register;
    else return result.error
  }

  async generateToken(email,password){
    const response=await fetch("http://localhost:8000/user/login",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({email:email,password:password})});

    const result=await response.json();
    if(result.token) {
      return result;
    }else{
      return result.error;
    }
  }

  async userData(token){
    const response= await fetch("http://localhost:8000/user/access",{method:"GET", headers:{'Authorization':`Bearer ${token}`},credentials:'include'});

   try {
    const result=await response.json();
   return result;
   } catch (error) {
    return error.message;
   }
 }
}

export default new User();