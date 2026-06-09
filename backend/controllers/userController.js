import Enrollment from "../models/Enrollment.js";

export const getStudents =
async(req,res)=>{

 try{

  const students =
   await Enrollment.find()

   .populate(
    "userId",
    "name email profileImage streak"
   )

   .populate(
    "courseId",
    "title"
   );

  res.json(students);

 }catch(error){

  console.log(error);

  res.status(500).json({
   message:
   "Failed to fetch students"
  });

 }

};