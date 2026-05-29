import {
  useEffect,
  useState,
} from "react";

import {
  Link,
} from "react-router-dom";

import API from "../api/axios";

export default function MyLearning() {

  const [courses, setCourses] =
    useState([]);

  const [activeTab, setActiveTab] =
    useState("all");

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {

    fetchMyCourses();

  }, []);

  // FETCH ENROLLED COURSES

  const fetchMyCourses =
    async () => {

    try {

      const token =
        localStorage.getItem(
          "token"
        );

      const res =
        await API.get(

          "/enrollment/my-courses",

          {
            headers:{
              Authorization:
                `Bearer ${token}`,
            },
          }

        );

      setCourses(res.data);

    } catch (err) {

      console.log(err);

    } finally {

      setLoading(false);

    }

  };

  // FILTER COURSES

  const filteredCourses =
    courses.filter((item) => {

      if (
        activeTab === "completed"
      ) {

        return item.completed;

      }

      if (
        activeTab === "progress"
      ) {

        return !item.completed;

      }

      return true;

    });

  if (loading) {

    return <h2>
      Loading...
    </h2>;

  }

  return (

    <div className="mlpage">

      {/* HEADER */}

      <div className="mlhead">

        <h1>
          My Learning
        </h1>

        <p>
          Track your enrolled
          courses and progress
        </p>

      </div>

      {/* STATS */}

      <div className="mlstats">

        <div className="mlstat blue">

          <h2>
            {courses.length}
          </h2>

          <span>
            Total Courses
          </span>

        </div>

        <div className="mlstat orange">

          <h2>

            {
              courses.filter(
                (item) =>
                  !item.completed
              ).length
            }

          </h2>

          <span>
            In Progress
          </span>

        </div>

        <div className="mlstat green">

          <h2>

            {
              courses.filter(
                (item) =>
                  item.completed
              ).length
            }

          </h2>

          <span>
            Completed
          </span>

        </div>

      </div>

      {/* TABS */}

      <div className="mltabs">

        <button
          className={`mltab ${
            activeTab === "all"
              ? "active"
              : ""
          }`}
          onClick={() =>
            setActiveTab("all")
          }
        >
          All Courses
        </button>

        <button
          className={`mltab ${
            activeTab === "progress"
              ? "active"
              : ""
          }`}
          onClick={() =>
            setActiveTab(
              "progress"
            )
          }
        >
          In Progress
        </button>

        <button
          className={`mltab ${
            activeTab === "completed"
              ? "active"
              : ""
          }`}
          onClick={() =>
            setActiveTab(
              "completed"
            )
          }
        >
          Completed
        </button>

      </div>

      {/* COURSE LIST */}

      <div className="mllist">

        {filteredCourses.map(
          (item) => {

          const course =
            item.courseId;

          return (

            <div
              key={item._id}
              className="course-wrapper"
            >

              <Link

                to={`/course/${course._id}`}

                className="mlcard"

              >

                {/* IMAGE */}

                <img
                  src={course.image}
                  alt={course.title}
                  className="mlimg"
                />

                {/* INFO */}

                <div className="mlinfo">

                  <h3>
                    {course.title}
                  </h3>

                  <p>
                    {course.author}
                  </p>

                  {/* EXTRA */}

                  <div className="extra-learning-info">

                    <p>

                      Total Hours:
                      {
                        course.totalHours || 20
                      }h

                    </p>

                    <p>

                      Watched:
                      {
                        item.watchedHours
                      }h

                    </p>

                    <p>

                      Remaining:

                      {
                        (
                          course.totalHours || 20
                        ) -
                        item.watchedHours
                      }h

                    </p>

                    <p>

                      Last Opened:
                      {
                        item.lastOpened ||
                        "Not Opened"
                      }

                    </p>

                  </div>

                  {/* PROGRESS */}

                  <div className="mlprogress">

                    <div
                      className="mlfill"
                      style={{
                        width:
                          `${item.progress}%`,
                      }}
                    ></div>

                  </div>

                  {/* BOTTOM */}

                  <div className="mlbottom">

                    <span>

                      {item.completed

                        ? "Course Completed"

                        : `Resume Learning · ${item.progress}%`

                      }

                    </span>

                    <strong>

                      {item.progress}%

                    </strong>

                  </div>

                </div>

                {/* PLAY */}

                <button className="playbtn">

                  {item.completed
                    ? "✓"
                    : "▶"}

                </button>

              </Link>

            </div>

          );

        })}

      </div>

    </div>

  );

}
