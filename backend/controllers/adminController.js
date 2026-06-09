import User from "../models/User.js";
import Course from "../models/Course.js";
import Enrollment from "../models/Enrollment.js";

export const getDashboardAnalytics =
async (req,res) => {

  try {

    // TOTAL USERS

    const totalUsers =
      await User.countDocuments();

    // TOTAL COURSES

    const totalCourses =
      await Course.countDocuments();

    // TOTAL ENROLLMENTS

    const totalEnrollments =
      await Enrollment.countDocuments();

    // COMPLETED COURSES

    const completedCourses =
      await Enrollment.countDocuments({
        completed:true,
      });

    // TOTAL REVENUE

    const enrollments =
      await Enrollment
      .find()
      .populate("courseId");

    let totalRevenue = 0;

    enrollments.forEach((item) => {

      const price =
        item.courseId?.price
          ?.replace("₹","")
          ?.replace(",","");

      totalRevenue +=
        Number(price || 0);

    });

    // RECENT ENROLLMENTS

    const recentEnrollments =
      await Enrollment.find()

      .populate(
        "userId",
        "name email"
      )

      .populate(
        "courseId",
        "title"
      )

      .sort({
        createdAt:-1,
      })

      .limit(5);

    // RECENT USERS

    const recentUsers =
      await User.find()
      .sort({createdAt:-1})
      .limit(5);

    res.status(200).json({

      totalUsers,

      totalCourses,

      totalEnrollments,

      completedCourses,

      totalRevenue,

      recentEnrollments,

      recentUsers,

    });

  } catch (err) {

    res.status(500).json({
      message:err.message,
    });

  }

};
