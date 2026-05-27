import Enrollment from "../models/Enrollment.js";
import Course from "../models/Course.js";


// ENROLL COURSE

export const enrollCourse =
async (req, res) => {

  try {

    const userId =
      req.user.id;

    const { courseId } =
      req.body;

    const course =
      await Course.findById(courseId);

    if (!course) {

      return res.status(404).json({
        message: "Course not found",
      });
    }

    const alreadyEnrolled =
      await Enrollment.findOne({
        user: userId,
        course: courseId,
      });

    if (alreadyEnrolled) {

      return res.status(400).json({
        message: "Already enrolled",
      });
    }

    const enrollment =
      new Enrollment({

        user: userId,

        course: courseId,

        progress: 0,

        watchedHours: 0,

        completed: false,

        lastOpened:
          new Date().toDateString(),
      });

    await enrollment.save();

    res.status(201).json({

      message:
        "Course enrolled successfully",

      enrollment,
    });

  } catch (err) {

    res.status(500).json({
      message: err.message,
    });
  }
};


// GET MY COURSES

export const getMyCourses =
async (req, res) => {

  try {

    const userId =
      req.user.id;

    const courses =
      await Enrollment.find({

        user: userId,

      }).populate("course");

    res.status(200).json(courses);

  } catch (err) {

    res.status(500).json({
      message: err.message,
    });
  }
};


// UPDATE PROGRESS

export const updateProgress =
async (req, res) => {

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

      return res.status(404).json({
        message: "Enrollment not found",
      });
    }

    enrollment.progress =
      progress;

    enrollment.watchedHours =
      watchedHours;

    enrollment.lastOpened =
      new Date().toDateString();

    if (progress >= 100) {

      enrollment.completed =
        true;
    }

    await enrollment.save();

    res.status(200).json({

      message:
        "Progress updated",

      enrollment,
    });

  } catch (err) {

    res.status(500).json({
      message: err.message,
    });
  }
};