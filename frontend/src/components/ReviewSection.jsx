// src/components/ReviewSection.jsx

import ReviewCard from "./ReviewSection";

export default function ReviewSection({ reviews }) {
  return (
    <div className="review-section">

      <div className="review-summary">

        <div className="review-left">
          <div className="big-rating">4.8</div>

          <div className="stars">★★★★★</div>

          <div className="review-count">
            2,847 reviews
          </div>
        </div>

        <div className="review-bars">

          <div className="bar-row">
            <span>5 ★</span>

            <div className="bar">
              <div
                className="fill"
                style={{ width: "72%" }}
              ></div>
            </div>

            <span>72%</span>
          </div>

          <div className="bar-row">
            <span>4 ★</span>

            <div className="bar">
              <div
                className="fill"
                style={{ width: "18%" }}
              ></div>
            </div>

            <span>18%</span>
          </div>

          <div className="bar-row">
            <span>3 ★</span>

            <div className="bar">
              <div
                className="fill"
                style={{ width: "6%" }}
              ></div>
            </div>

            <span>6%</span>
          </div>

          <div className="bar-row">
            <span>2 ★</span>

            <div className="bar">
              <div
                className="fill"
                style={{ width: "2%" }}
              ></div>
            </div>

            <span>2%</span>
          </div>

          <div className="bar-row">
            <span>1 ★</span>

            <div className="bar">
              <div
                className="fill"
                style={{ width: "2%" }}
              ></div>
            </div>

            <span>2%</span>
          </div>

        </div>
      </div>

      <div className="trend-box">

        <div className="trend-title">
          Rating Trend (Last 6 Months)
        </div>

        <div className="graph">

          <div className="graph-line"></div>

          <div className="graph-months">
            <span>Oct</span>
            <span>Nov</span>
            <span>Dec</span>
            <span>Jan</span>
            <span>Feb</span>
            <span>Mar</span>
          </div>

        </div>

      </div>

      {/* <div className="student-reviews">

        <div className="sr-top">
          <h3>Student Reviews</h3>

          <span className="see-all">
            See all
          </span>
        </div>

        {reviews?.map((review) => (
          <ReviewCard
            key={review.id}
            name={review.name}
            rating={review.rating}
            review={review.review}
            date={review.date}
          />
        ))}

      </div> */}

    </div>
  );
}