// src/components/CourseCard.jsx

import { Link } from "react-router-dom";

export default function CourseCard({
  courses = [],
}) {

  return (

    <div className="cgrid">

      {courses.map((course) => (

        <Link
          to={`/course/${course._id}`}
          className="cc"
          key={course._id}
        >

          <div className="cthumb">

            <div className="tph">

              <img
                src={course.image}
                alt={course.title}
              />

            </div>

          </div>

          <div className="cbody">

            <div className="cn">
              {course.title}
            </div>

            <div className="cau">
              {course.author}
            </div>

            <div className="cft">

              <div className="rat">
                {course.rating}
              </div>

              <div className="price">
                {course.price}
              </div>

            </div>

          </div>

        </Link>

      ))}

    </div>
  );
}