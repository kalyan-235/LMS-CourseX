import User from "../models/User.js";

export const getProfile =
async(req,res)=>{

 try{

const user =
 await User.findById(
  req.user.id
 )
 .populate("enrolledCourses");

  res.json(user);

 }catch(error){

  res.status(500).json({
   message:"Failed"
  });

 }

};

export const updateProfile =
async(req,res)=>{

 try{

  const {
   name,
   profileImage
  } = req.body;

  const user =
   await User.findByIdAndUpdate(

    req.user.id,

    {
     name,
     profileImage
    },

    {
     new:true
    }

   );

  res.json(user);

 }catch(error){

  res.status(500).json({
   message:"Update Failed"
  });

 }

};