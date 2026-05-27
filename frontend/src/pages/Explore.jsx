import { useState, useEffect } from "react";

import CourseCard from "../components/CourseCard";

import API from "../api/axios";

export default function Explore() {

  const [courses, setCourses] =
    useState([]);

  const [active, setActive] =
    useState("all");

  const categories = [
    "all",
    "frontend",
    "backend",
    "database",
    "fullstack",
  ];

  // FETCH COURSES

  useEffect(() => {

    fetchCourses();

  }, []);

  const fetchCourses = async () => {

    try {

      const res =
        await API.get("/courses");

      setCourses(res.data);

    } catch (err) {

      console.log(err);

    }

  };

  // FILTER

  const filteredCourses =

    active === "all"

      ? courses

      : courses.filter(

          (course) =>

            course.category?.toLowerCase() ===
            active.toLowerCase()

        );

  return (

    <>

      <div className="exh">

        <h1>
          Explore Courses
        </h1>

      </div>

      {/* CATEGORY BUTTONS */}

      <div className="catwrap">

        {categories.map((cat,index) => (

          <button
            key={index}
            className={`catbtn ${
              active === cat
                ? "activecat"
                : ""
            }`}
            onClick={() =>
              setActive(cat)
            }
          >

            {cat}

          </button>

        ))}

      </div>

      {/* COURSES */}

      <CourseCard
        courses={filteredCourses}
      />

    </>

  );

}
