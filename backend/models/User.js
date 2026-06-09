import mongoose from "mongoose";

const userSchema =
new mongoose.Schema(

  {

    name:{
      type:String,
      required:true,
      trim:true,
    },

    email:{
      type:String,
      required:true,
      unique:true,
      trim:true,
      lowercase:true,
    },

    password:{
      type:String,
      required:true,
      minlength:6,
    },
    profileImage:{
      type:String,
      default:"",
    },
    otp:{
       type:String
      },
      
      otpExpiry:{
       type:Date
      },

    isAdmin:{
      type:Boolean,
      default:false,
    },

    enrolledCourses:[
      {
        type:
        mongoose.Schema.Types.ObjectId,

        ref:"Course",
      }
    ],

    totalHours:{
      type:Number,
      default:0,
    },

    streak:{
      type:Number,
      default:0,
    },

    lastVisit:{
      type:String,
      default:"",
    },

  },

  {
    timestamps:true,
  }

);

const User =
mongoose.model(
  "User",
  userSchema
);

export default User;