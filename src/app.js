const express=require("express");
const path=require("path");
const fs=require("fs");

// const bcrypt=require("bcryptjs")
// const crypto=require("crypto");
// const multer=require("multer");
// const gridstorage=require("multer-gridfs-storage");
// const grid=require("gridfs-stream");
// const methover=require("method-override");
const app=express();
const ejs=require('ejs');
const session= require('express-session');
const cookieParser = require('cookie-parser');
const flash = require('connect-flash');
 
require("./db/conn");

const Register=require("./models/registers");

const port=process.env.PORT || 3000;
const static_path=path.join(__dirname,"../public");
const template_path=path.join(__dirname,"../templates/views");
//  const partials_path=path.join(__dirname,"../templates/partials");

app.use(express.json());
// app.use(methover('__method'))
app.use(express.urlencoded({extended:false}));

// Set Cookie Parser, sessions and flash
app.use(cookieParser('NotSoSecret'));
app.use(session({
  secret : 'something',
  cookie: { maxAge: 60000 },
  resave: true,
  saveUninitialized: true
}));
app.use(flash());

app.use(express.static(static_path));
 app.set("view engine",'ejs');
app.set("views",template_path);
//  ejs.registerPartials(partials_path);

app.get("/",(req,res)=>{
    res.render("index");
});
app.get("/signup",(req,res)=>{
  res.render("signup",{info:req.flash('info')});
});

app.get("/signin",(req,res)=>{
  // const info = req.flash('user');
  res.render("signin",{info:req.flash('info')});
});






//creating new user
app.post("/register",async(req,res)=>{
  try {
   const password=req.body.password;
   const cpassword=req.body.confirmpassword;
   const email=req.body.email;

   const useremail= await Register.findOne({email:email});

   if(useremail){
    // res.send("nope")
    req.flash('info', '*This user already exists');
    res.redirect("signup");
   }
  
  
   if(password===cpassword){
    const registeremp=new Register({
        email:req.body.email,
        password:password,
        confirmpassword:cpassword
    });

   const registered= await registeremp.save();
   req.flash('info', '1');
  //  res.redirect("signin");
  //  res.status(201).render("signin");
    res.redirect("signin");
   }else{
    req.flash('info',"*password not matching");
    res.redirect("signup")
   }

  }
   catch (error) {
    // res.status(404).send(`<h1>This user already exists</h1>`);
    console.log(error);
  }
});

//user athuntication
app.post("/signin",async(req,res)=>{
  
  try {
    const email=req.body.email;
    const password=req.body.password;

   const useremail= await Register.findOne({email:email});

   if (useremail.password==password) {

    res.status(201).render("resedit");

   }else{
    // const message = req.flash('*Invalid login credentials!');
    req.flash('info', '*Invalid login credentials');
    res.redirect("signin");
    // res.send("invalid login details")
   }

  } catch (error) {
    // res.status(400).send("invalid login details");
    // req.flash('info', '*Invalid login credentials');
    // res.redirect("signin");
  }
});

app.listen(port,()=>{
    console.log(`server running at ${port}`);
})



