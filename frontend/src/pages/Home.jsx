// Home.jsx
import { useEffect, useState } from "react";

import {
  BookOpen,
  Users,
  Award,
  PlayCircle,
  Star,
  Clock3,
  TrendingUp,
} from "lucide-react";

import { Link } from "react-router-dom";


import API from "../api/axios";

export default function Home() {

  const [courses, setCourses] =useState([]);

  useEffect(() => {

    fetchCourses();

  }, []);

    const fetchCourses = async () => {

    try {

      const res =
        await API.get("/courses");

      // ONLY 3 COURSES

      setCourses(
        res.data.slice(0, 3)
      );

    } catch (err) {

      console.log(err);
    }
  };

  return (

    <div className="home-page">

      {/* HERO SECTION */}

      <section className="hero-section">

        <div className="hero-left">

          <span className="hero-badge">

            🚀 #1 Modern Learning Platform

          </span>

          <h1>

            Learn New Skills
            <br />

            Build Your Future
            <br />

            With Expert Courses

          </h1>

          <p>

            Upgrade your career with premium courses,
            real-world projects, certificates,
            quizzes, and expert mentorship.
            Learn anytime anywhere.

          </p>

          <div className="hero-buttons">

            <button className="explore-btn">

              Explore Courses

            </button>

            <button className="watch-btn">

              <PlayCircle size={20} />

              Watch Demo

            </button>

          </div>

          {/* STATS */}

          <div className="hero-stats">

            <div className="hero-stat">

              <h2>15K+</h2>

              <span>Students</span>

            </div>

            <div className="hero-stat">

              <h2>120+</h2>

              <span>Courses</span>

            </div>

            <div className="hero-stat">

              <h2>98%</h2>

              <span>Success</span>

            </div>

          </div>

        </div>

        {/* RIGHT */}

        <div className="hero-right">

          <img
            src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f"
            alt="Students"
          />

        </div>

      </section>

      {/* FEATURES */}

      <section className="feature-section">

        <div className="feature-card">

          <BookOpen size={34} />

          <h3>Premium Courses</h3>

          <p>
            Learn from real-world projects and modern technologies.
          </p>

        </div>

        <div className="feature-card">

          <Users size={34} />

          <h3>Expert Mentors</h3>

          <p>
            Learn directly from experienced industry professionals.
          </p>

        </div>

        <div className="feature-card">

          <Award size={34} />

          <h3>Certificates</h3>

          <p>
            Earn certificates after completing your courses.
          </p>

        </div>

      </section>

      {/* COURSE SECTION */}

      <section className="course-section">

        <div className="section-head">

          <div>

            <h2>Popular Courses</h2>

            <p>
              Learn trending technologies and improve your skills
            </p>

          </div>

          <button className="view-all-btn">

            View All

          </button>

        </div>

        <div className="course-grid">
          
          {courses.map((course) => (
          
            <Link
              to={`/course/${course._id || course.id}`}
              className="home-course-card"
              key={course._id || course.id}
            >
            
              <img
                src={course.image}
                alt={course.title}
                className="home-course-image"
              />
        
              <div className="course-content">
          
                <div className="course-top-row">
          
                  <span className="course-category">
          
                    {course.category}
          
                  </span>
          
                  <span className="course-rating">
          
                    ⭐ {course.rating || "4.8"}
          
                  </span>
          
                </div>
          
                <h3>
          
                  {course.title}
          
                </h3>
          
                <p className="course-author">
          
                  By {course.author}
          
                </p>
          
                <p className="course-description">
          
                  {course.description?.slice(0, 90)}...
          
                </p>
          
                {/* INFO */}
          
                <div className="course-info">
          
                  <span>
          
                    <Clock3 size={16} />
          
                    {course.totalHours || 24} Hours
          
                  </span>
          
                  <span>
          
                    <Users size={16} />
          
                    1.2K Students
          
                  </span>
          
                </div>
          
                {/* FOOTER */}
          
                <div className="course-footer">
          
                  <div className="price-box">
          
                    {course.price}
          
                  </div>
          
                  <button className="enroll-btn">
          
                    Enroll Now
          
                  </button>
          
                </div>
          
              </div>
          
            </Link>
        
          ))}
        
        </div>

      </section>

      {/* WHY CHOOSE */}

      <section className="why-section">

        <div className="why-left">

          <img
            src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3"
            alt="Learning"
          />

        </div>

        <div className="why-right">

          <span className="why-badge">

            WHY CHOOSE US

          </span>

          <h2>

            Modern Learning Experience
            Designed For Students

          </h2>

          <p>

            We provide interactive learning,
            project-based training,
            quizzes, certificates,
            and personalized dashboards
            for a complete LMS experience.

          </p>

          <div className="why-points">

            <div className="why-item">

              <TrendingUp size={20} />

              Real-world Projects

            </div>

            <div className="why-item">

              <Award size={20} />

              Industry Certificates

            </div>

            <div className="why-item">

              <Star size={20} />

              Premium Learning UI

            </div>

          </div>

        </div>

      </section>

    </div>

  );
}