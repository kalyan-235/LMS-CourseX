
import Enrollment
from "../models/Enrollment.js";

import Course
from "../models/Course.js";

// ENROLL COURSE

export const enrollCourse =
async (req,res) => {

  try {

    const { courseId } =
      req.body;

    const userId =
      req.user.id;

    // CHECK COURSE

    const course =
      await Course.findById(
        courseId
      );

    if (!course) {

      return res.status(404)
      .json({
        message:
          "Course not found",
      });

    }

    // CHECK ALREADY ENROLLED

    const alreadyEnrolled =
      await Enrollment.findOne({

        userId,
        courseId,

      });

    if (alreadyEnrolled) {

      return res.status(400)
      .json({
        message:
          "Already enrolled",
      });

    }

    // CREATE ENROLLMENT

    const enrollment =
      await Enrollment.create({

        userId,
        courseId,

      });

    res.status(201).json({

      message:
        "Enrollment successful",

      enrollment,

    });

  } catch (err) {

    console.log(err);

    res.status(500).json({

      message:
        "Enrollment failed",

    });

  }

};

// GET MY COURSES

export const getMyCourses =
async (req,res) => {

  try {

    const userId =
      req.user.id;

    const enrollments =
      await Enrollment.find({

        userId,

      }).populate("courseId");

    res.status(200).json(
      enrollments
    );

  } catch (err) {

    console.log(err);

    res.status(500).json({

      message:
        "Failed to fetch courses",

    });

  }

};

// UPDATE PROGRESS

export const updateProgress = async (req,res) => {

  try {

    const { enrollmentId } =
      req.params;

    const {
      progress,
      watchedHours,
    } = req.body;

    const enrollment =
      await Enrollment.findById(
        enrollmentId
      );

    if (!enrollment) {

      return res.status(404)
      .json({
        message:
          "Enrollment not found",
      });

    }

    enrollment.progress =
      progress;

    enrollment.watchedHours =
      watchedHours;

    enrollment.completed =
      progress === 100;

    enrollment.lastOpened =
      new Date().toDateString();

    await enrollment.save();

    res.status(200).json({

      message:
        "Progress updated",

      enrollment,

    });

  } catch (err) {

    console.log(err);

    res.status(500).json({

      message:
        "Progress update failed",

    });

  }

};

export const submitQuiz =async (req,res) => {

  try {

    const { score } =
      req.body;

    const enrollment =
      await Enrollment.findById(
        req.params.id
      );

    if (!enrollment) {

      return res
      .status(404)
      .json({
        message:
          "Enrollment not found",
      });

    }

    // PASS MARK

    const passed =
      score >= 70;

    enrollment.quizScore =
      score;

    enrollment.quizPassed =
      passed;

    // COMPLETE COURSE

    if (passed) {

      enrollment.progress = 100;

      enrollment.completed = true;

    }

    await enrollment.save();

    res.status(200).json({

      message:
        passed
          ? "Quiz Passed"
          : "Quiz Failed",

      enrollment,

    });

  } catch (err) {

    res.status(500).json({
      message:
        err.message,
    });

  }

};
