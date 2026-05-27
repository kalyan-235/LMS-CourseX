// src/pages/MyLearning.jsx

import { useState } from "react";

import { Link } from "react-router-dom";

import LearningChart from "../components/LearningChart";
import AchievementBadges from "../components/AchievementBadges";
import Certificate from "../components/Certificate";

import { database } from "../data/courses";

export default function MyLearning() {

  const [activeTab, setActiveTab] =
    useState("progress");

  // IN PROGRESS

  const inProgressCourses =
    database.filter(
      (course) => course.progress < 100
    );

  // COMPLETED

  const completedCourses =
    database.filter(
      (course) => course.progress === 100
    );

  // SHOW COURSES

  const showCourses =
    activeTab === "progress"
      ? inProgressCourses
      : completedCourses;

  // STREAK

  const streak =
    localStorage.getItem("streak") || 0;

  // HOURS

  const learnedHours =
    localStorage.getItem("hours") || 0;

  return (

    <div className="mlpage">

      {/* HEADER */}

      <div className="mlhead">

        <h1>
          My Learning
        </h1>

        <p>
          Track your course progress
        </p>

      </div>

      {/* STATS */}

      <div className="mlstats">

        <div className="mlstat blue">

          <div className="sicon">
            🔥
          </div>

          <h2>
            {streak}
          </h2>

          <span>
            Day Streak
          </span>

        </div>

        <div className="mlstat orange">

          <div className="sicon">
            ⏱
          </div>

          <h2>
            {learnedHours}h
          </h2>

          <span>
            Hours Learned
          </span>

        </div>

        <div className="mlstat green">

          <div className="sicon">
            🎓
          </div>

          <h2>
            {completedCourses.length}
          </h2>

          <span>
            Completed
          </span>

        </div>

      </div>

      {/* LEARNING CHART */}

      <LearningChart />

      {/* BADGES */}

      <AchievementBadges />

      {/* TABS */}

      <div className="mltabs">

        <button
          className={`mltab ${
            activeTab === "progress"
              ? "active"
              : ""
          }`}
          onClick={() =>
            setActiveTab("progress")
          }
        >

          In Progress
          ({inProgressCourses.length})

        </button>

        <button
          className={`mltab ${
            activeTab === "completed"
              ? "active"
              : ""
          }`}
          onClick={() =>
            setActiveTab("completed")
          }
        >

          Completed
          ({completedCourses.length})

        </button>

      </div>

      {/* COURSE LIST */}

      <div className="mllist">

        {showCourses.map((course) => (

          <div
            key={course.id}
            className="course-wrapper"
          >

            {/* COURSE CARD */}

            <Link
              to={`/course/${course.id}`}
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

                {/* EXTRA INFO */}

                <div className="extra-learning-info">

                  <p>
                    Total Hours:
                    {course.totalHours}h
                  </p>

                  <p>
                    Watched:
                    {course.watchedHours}h
                  </p>

                  <p>
                    Remaining:
                    {course.totalHours - course.watchedHours}h
                  </p>

                  <p>
                    Last Opened:
                    {course.lastOpened}
                  </p>

                </div>

                {/* PROGRESS */}

                <div className="mlprogress">

                  <div
                    className="mlfill"
                    style={{
                      width:
                      `${course.progress}%`,
                    }}
                  ></div>

                </div>

                {/* BOTTOM */}

                <div className="mlbottom">

                  <span>

                    {course.progress === 100
                      ? "Course Completed"
                      : `Resume Learning · ${course.progress}%`
                    }

                  </span>

                  <strong>
                    {course.progress}%
                  </strong>

                </div>

              </div>

              {/* PLAY BUTTON */}

              <button className="playbtn">

                {course.progress === 100
                  ? "✓"
                  : "▶"}

              </button>

            </Link>

            {/* CERTIFICATE */}

            {course.progress === 100 && (

              <Certificate
                userName="Kalyan"
                course={course}
              />

            )}

          </div>

        ))}

      </div>

    </div>

  );
}