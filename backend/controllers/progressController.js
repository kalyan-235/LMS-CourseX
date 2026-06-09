import Progress
from "../models/progressModel.js";

export const updateProgress =
async(req,res)=>{

 try{

  const {
   courseId,
   progress,
  } = req.body;

  let record =
  await Progress.findOne({

   userId:req.user.id,
   courseId,

  });

  if(!record){

   record =
   await Progress.create({

    userId:req.user.id,
    courseId,
    progress,
    completed:
      progress >= 100,

   });

  }else{

   record.progress =
   progress;

   record.completed =
   progress >= 100;

   await record.save();

  }

  res.json(record);

 }catch(err){

  res.status(500).json({
   message:err.message,
  });

 }

};

export const getProgress =
async(req,res)=>{

 try{

  const data =
  await Progress.findOne({

   userId:req.user.id,
   courseId:req.params.courseId,

  });

  res.json(data);

 }catch(err){

  res.status(500).json({
   message:err.message,
  });

 }

};