import mongoose from "mongoose";

const progressSchema =
new mongoose.Schema({

  userId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User",
    required:true,
  },

  courseId:{
    type:mongoose.Schema.Types.ObjectId,
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

},{
  timestamps:true,
});

export default mongoose.model(
  "Progress",
  progressSchema
);