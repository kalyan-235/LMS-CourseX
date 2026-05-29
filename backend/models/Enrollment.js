import mongoose from "mongoose";

const enrollmentSchema =
new mongoose.Schema(

  {

    userId:{
      type:
        mongoose.Schema.Types.ObjectId,
      ref:"User",
      required:true,
    },

    courseId:{
      type:
        mongoose.Schema.Types.ObjectId,
      ref:"Course",
      required:true,
    },

    progress:{
      type:Number,
      default:0,
    },

    completed:{
      type:Boolean,
      default:false,
    },

    watchedHours:{
      type:Number,
      default:0,
    },

    lastOpened:{
      type:String,
      default:"",
    },

    quizScore:{
      type:Number,
      default:0,
    },
    
    quizPassed:{
      type:Boolean,
      default:false,
    },

  },

  {
    timestamps:true,
  }

);

const Enrollment =
mongoose.model(
  "Enrollment",
  enrollmentSchema
);

export default Enrollment;
