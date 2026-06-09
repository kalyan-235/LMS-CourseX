import QuizResult
from "../models/quizResultModel.js";

import Course
from "../models/Course.js";

export const submitQuiz =
async(req,res)=>{

 try{

  const { courseId, answers } =
  req.body;

  const course =
  await Course.findById(courseId);

  if(!course){

   return res.status(404).json({
    message:"Course not found",
   });

  }

  let score = 0;

  course.quiz.forEach(
   (question,index)=>{

    if(
      answers[index] ===
      question.answer
    ){
      score++;
    }

   }
  );

  const passed =
  score >=
  Math.ceil(
   course.quiz.length * 0.6
  );

  const result =
  await QuizResult.create({

   userId:req.user.id,
   courseId,

   score,

   totalQuestions:
   course.quiz.length,

   passed,

  });

  res.status(201).json({

   score,

   totalQuestions:
   course.quiz.length,

   passed,

   result,

  });

 }catch(err){

  res.status(500).json({
   message:err.message,
  });

 }

};

export const getQuizResult =
async(req,res)=>{

 try{

  const result =
  await QuizResult.find({

   userId:req.user.id,
   courseId:
   req.params.courseId,

  });

  res.json(result);

 }catch(err){

  res.status(500).json({
   message:err.message,
  });

 }

};
export const updateQuiz =
async(req,res)=>{

 const { courseId } =
  req.params;

 const { quiz } =
  req.body;

 const course =
  await Course.findById(
   courseId
  );

 if(!course){

  return res.status(404)
  .json({
   message:
   "Course not found"
  });

 }

 course.quiz = quiz;

 await course.save();

 res.json({
  message:
  "Quiz Saved",
  course
 });

};

export const addQuiz =
async(req,res)=>{

 try{

  const course =
   await Course.findById(
    req.params.id
   );

  if(!course){

   return res.status(404)
   .json({
    message:
    "Course not found"
   });

  }

  course.quiz =
   req.body.quiz;

  await course.save();

  res.json({
   message:
   "Quiz Saved"
  });

 }catch(err){

  res.status(500)
  .json({
   message:
   err.message
  });

 }

};