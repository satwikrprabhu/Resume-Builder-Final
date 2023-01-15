const mongoose=require("mongoose");
const empSchema=new mongoose.Schema({
   email:{
    type:String,
    required:true,
    unique:true
   },
  
   password:{
    type:String,
    required:true,
   },
   confirmpassword:{
    type:String,
    required:true
   }
});

//creating collection

const Register=new mongoose.model("Register",empSchema);

module.exports=Register;