export default function Overview({ course }) {

  return (

    <div className="overview-card">

      {/* WHAT YOU'LL LEARN */}

      <h3 className="ov-title">
        What You'll Learn
      </h3>

      <div className="ov-list">

        {course.learn?.map((item, index) => (

          <div
            className="ov-item"
            key={index}
          >
            ✅ {item}
          </div>

        ))}

      </div>

      {/* PREREQUISITES */}

      <div className="pre-box">

        <h3 className="ov-title">
          Prerequisites
        </h3>

        <div className="pre-item">
          {course.prerequisites}
        </div>

      </div>

      {/* DESCRIPTION */}

      <div className="pre-box">

        <h3 className="ov-title">
          Course Description
        </h3>

        <div className="pre-item">
          {course.description}
        </div>

      </div>

    </div>

  );
}