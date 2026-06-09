import mongoose from "mongoose";

const certificateSchema =
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
  certificateId:{
    type:String,
    unique:true,
    default:() => `CERT-${Date.now()}-${Math.random().toString(36).substring(7)}`,
},

 issuedAt:{
  type:Date,
  default:Date.now,
 },

},

{
 timestamps:true,
}

);

// Compound unique index - only one certificate per user per course
certificateSchema.index(
  { userId: 1, courseId: 1 },
  { unique: true }
);

export default mongoose.model(
 "Certificate",
 certificateSchema
);