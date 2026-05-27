// updated ReviewCard.jsx

export default function ReviewCard({
  name,
  rating,
  review,
  date,
}) {
  return (
    <div className="revcard">

      <div className="revhead">

        <div className="revleft">

          <div className="revav">
            {name.charAt(0)}
          </div>

          <div>
            <div className="revname">
              {name}
            </div>

            <div className="revdate">
              {date}
            </div>
          </div>

        </div>

        <div className="revstars">
          {"⭐".repeat(rating)}
        </div>

      </div>

      <div className="revtxt">
        {review}
      </div>

    </div>
  );
}