import mongoose from "mongoose";

const enrollmentSchema =
new mongoose.Schema(

  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: true,
    },

    progress: {
      type: Number,
      default: 0,
    },

    watchedHours: {
      type: Number,
      default: 0,
    },

    completed: {
      type: Boolean,
      default: false,
    },

    lastOpened: {
      type: String,
      default: "",
    },
  },

  {
    timestamps: true,
  }
);

const Enrollment =
mongoose.model(
  "Enrollment",
  enrollmentSchema
);

export default Enrollment;