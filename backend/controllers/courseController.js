import Course from "../models/Course.js";

export const getCourses =
async(req,res)=>{

 try{

  const {
   search,
   category,
   sort
  } = req.query;

  let query = {};

  if(search){

   query.title = {
    $regex:search,
    $options:"i"
   };

  }

  if(
   category &&
   category !== "all"
  ){

   query.category =
    category;

  }

  let courseQuery =
   Course.find(query);

  if(sort==="priceLow"){

   courseQuery =
    courseQuery.sort({
      price:1
    });

  }

  if(sort==="priceHigh"){

   courseQuery =
    courseQuery.sort({
      price:-1
    });

  }

  if(sort==="latest"){

   courseQuery =
    courseQuery.sort({
      createdAt:-1
    });

  }

  const courses =
   await courseQuery;

  res.json(courses);

 }catch(error){

  res.status(500).json({
   message:
   "Failed to fetch courses"
  });

 }

};

export const getSingleCourse =
  async (req, res) => {

    try {

      const course =
        await Course.findById(
          req.params.id
        );

      if (!course) {

        return res.status(404).json({
          message:
            "Course not found",
        });

      }

      res.status(200).json(course);

    } catch (err) {

      res.status(500).json({
        message:
          "Failed to fetch course",
      });

    }

  };

export const createCourse =
  async (req, res) => {

    try {

      const course =
        await Course.create(req.body);

      res.status(201).json({
        message:
          "Course created successfully",
        course,
      });

    } catch (err) {
      console.log(err);

      res.status(500).json({
        message:"Failed to create course",
        error:err.message,
      });

    }

  };

export const updateCourse =
async (req, res) => {

  try {

    const course =
      await Course.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );

    res.json(course);

  } catch (error) {

    res.status(500).json({
      message: "Course update failed"
    });

  }

};
export const updateCourseQuiz =
async(req,res)=>{

 try{

  const course =
   await Course.findByIdAndUpdate(

    req.params.id,

    {
     quiz:req.body.quiz
    },

    {
     new:true
    }

   );

  res.json(course);

 }catch(error){

  res.status(500).json({
   message:"Quiz update failed"
  });

 }

};

export const deleteCourse =
  async (req, res) => {

    try {

      await Course.findByIdAndDelete(
        req.params.id
      );

      res.status(200).json({
        message:
          "Course deleted successfully",
      });

    } catch (err) {

      res.status(500).json({
        message:
          "Failed to delete course",
      });

    }

  };