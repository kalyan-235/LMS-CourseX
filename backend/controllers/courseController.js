import Course from "../models/Course.js";

export const getCourses =
  async (req, res) => {

    try {

      const courses =
        await Course.find();

      res.status(200).json(courses);

    } catch (err) {

      res.status(500).json({
        message:
          "Failed to fetch courses",
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

      res.status(500).json({
        message:
          "Failed to create course",
      });

    }

  };

export const updateCourse =
  async (req, res) => {

    try {

      const updatedCourse =
        await Course.findByIdAndUpdate(
          req.params.id,
          req.body,
          { new: true }
        );

      res.status(200).json({
        message:
          "Course updated successfully",
        updatedCourse,
      });

    } catch (err) {

      res.status(500).json({
        message:
          "Failed to update course",
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