import mongoose from "mongoose";

const courseSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    author: {
      type: String,
      required: true,
    },

    category: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    image: {
      type: String,
      required: true,
    },

    video: {
      type: String,
      required: true,
    },

    price: {
      type: String,
      required: true,
    },

    oldPrice: {
      type: String,
    },

    rating: {
      type: String,
      default: "4.8⭐",
    },

    totalHours: {
      type: Number,
      default: 0,
    },

    instructor: {
      name: String,
      role: String,
      email: String,
      bio: String,
    },

    learn: [
      {
        type: String,
      },
    ],

    prerequisites: [
      {
        type: String,
      },
    ],

    pdfs: [
      {
        title: String,
        file: String,
      },
    ],

    quiz: [
      {
        question: String,
        options: [String],
        answer: String,
      },
    ],

    reviews: [
      {
        name: String,
        rating: Number,
        review: String,
      },
    ],
  },

  {
    timestamps: true,
  }
);

const Course = mongoose.model(
  "Course",
  courseSchema
);

export default Course;