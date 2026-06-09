import Review from "../models/reviewModel.js";

export const addReview = async (
  req,
  res
) => {
  try {

    const { rating, comment } =
      req.body;

    const { courseId } =
      req.params;

    const review =
      await Review.create({
        userId: req.user.id,
        courseId,
        rating,
        comment,
      });

    res.status(201).json(
      review
    );

  } catch (err) {

    res.status(500).json({
      message: err.message,
    });

  }
};

export const getReviews =
async (req, res) => {

  try {

    const reviews =
      await Review.find({
        courseId:
          req.params.courseId,
      })
        .populate(
          "userId",
          "name"
        );

    res.json(reviews);

  } catch (err) {

    res.status(500).json({
      message: err.message,
    });

  }
};