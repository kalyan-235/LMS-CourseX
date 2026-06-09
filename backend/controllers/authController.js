import User from "../models/User.js";

import bcrypt from "bcryptjs";

import generateToken
from "../utils/generateToken.js";

import sendEmail 
from "../utils/sendEmail.js";

// REGISTER

export const register = async (req,res) => {
  try{
    const { name, email, password } = req.body;

    if(!name || !email || !password){
      return res.status(400).json({
        message:"All fields required",
      });
    }
    if(password.length < 6){
      return res.status(400).json({
        message:"Password minimum 6 characters",
      });
    }

    const normalizedEmail = email.trim().toLowerCase();

    const existingUser = await User.findOne({
        email:normalizedEmail,
      });

    if(existingUser){
      return res.status(400).json({
        message:"User already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password,10);
    const user = await User.create({
        name:name.trim(),
        email:normalizedEmail,
        password:hashedPassword,
        isAdmin:normalizedEmail === process.env.ADMIN_EMAIL,
      });

    const token = generateToken(user);

    res.status(201).json({
      message: "Registration successful",
      
      token,

      user:{

        id:user._id,

        name:user.name,

        email:user.email,

        isAdmin:user.isAdmin,

      }

    });

  }catch(err){

    console.log(err);

    res.status(500).json({

      message:
      "Registration failed",

    });

  }

};


// LOGIN

export const login =
async (req,res) => {

  try{

    const {
      email,
      password,
    } = req.body;

    if(
      !email ||
      !password
    ){

      return res
      .status(400)
      .json({

        message:
        "Email and password required",

      });

    }

    const normalizedEmail =
      email.trim().toLowerCase();

    const user =
      await User.findOne({

        email:normalizedEmail,

      });

    if(!user){

      return res
      .status(400)
      .json({

        message:
        "User not found",

      });

    }

    const isMatch =
      await bcrypt.compare(
        password,
        user.password
      );

    if(!isMatch){

      return res
      .status(400)
      .json({

        message:
        "Invalid password",

      });

    }

    const token =
      generateToken(user);

    res.status(200).json({

      message:
      "Login successful",

      token,

      user:{

        id:user._id,

        name:user.name,

        email:user.email,

        isAdmin:user.isAdmin,

      }

    });

  }catch(err){

    console.log(err);

    res.status(500).json({

      message:
      "Login failed",

    });

  }

};

export const forgotPassword =
async(req,res)=>{

 try{

  const { email } =
   req.body;

  const user =
   await User.findOne({
    email
   });

  if(!user){

   return res.status(404).json({
    message:"User not found"
   });

  }

  const otp =
   Math.floor(
    100000 +
    Math.random()*900000
   ).toString();

  user.otp = otp;

  user.otpExpiry =
   Date.now() +
   10*60*1000;

  await user.save();

  await sendEmail(
   email,
   "Reset Password OTP",
   `Your OTP is ${otp}`
  );

  res.json({
   message:
   "OTP sent successfully"
  });

 }catch(error){

  res.status(500).json({
   message:
   "Failed to send OTP"
  });

 }

};

export const resetPassword =
async(req,res)=>{

 try{

  const {
   email,
   otp,
   password
  } = req.body;

  const user =
   await User.findOne({
    email
   });

  if(!user){

   return res.status(404).json({
    message:"User not found"
   });

  }

  if(
   user.otp !== otp ||
   user.otpExpiry <
   Date.now()
  ){

   return res.status(400).json({
    message:
    "Invalid OTP"
   });

  }

  const hashedPassword =
   await bcrypt.hash(
    password,
    10
   );

  user.password =
   hashedPassword;

  user.otp = null;

  user.otpExpiry = null;

  await user.save();

  res.json({
   message:
   "Password Reset Success"
  });

 }catch(error){

  res.status(500).json({
   message:
   "Reset Failed"
  });

 }

};