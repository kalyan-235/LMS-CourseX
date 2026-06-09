// Home.jsx
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  BookOpen,
  Users,
  Award,
  PlayCircle,
  Star,
  Clock,
  TrendingUp,
  ArrowRight,
} from "lucide-react";

import API from "../api/axios";
import Loading from "../components/Loading";

export default function Home() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      setLoading(true);
      const res = await API.get("/courses");
      setCourses(res.data.slice(0, 3));
    } catch (err) {
      console.log(err);
      window.addToast?.("Failed to load courses", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleExplore = () => {
    navigate("/explore");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="home-page">
      {/* HERO SECTION */}
      <section className="hero-section">
        <div className="hero-left">
          <span className="hero-badge">🚀 #1 Modern Learning Platform</span>

          <h1>
            Learn New Skills
            <br />
            Build Your Future
            <br />
            With Expert Courses
          </h1>

          <p>
            Upgrade your career with premium courses, real-world projects,
            certificates, quizzes, and expert mentorship. Learn anytime
            anywhere.
          </p>

          <div className="hero-buttons">
            <button className="btn-primary btn-lg" onClick={handleExplore}>
              Explore Courses
              <ArrowRight size={18} />
            </button>

            <button className="btn-outline btn-lg">
              <PlayCircle size={20} />
              Watch Demo
            </button>
          </div>

          {/* STATS */}
          <div className="hero-stats">
            <div className="hero-stat">
              <h2>15K+</h2>
              <span>Active Students</span>
            </div>

            <div className="hero-stat">
              <h2>120+</h2>
              <span>Expert Courses</span>
            </div>

            <div className="hero-stat">
              <h2>98%</h2>
              <span>Success Rate</span>
            </div>
          </div>
        </div>

        {/* RIGHT */}
        <div className="hero-right">
          <img
            src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&h=600&fit=crop"
            alt="Students learning"
            className="hero-image"
          />
        </div>
      </section>

      {/* FEATURES */}
      <section className="feature-section">
        <div className="feature-intro">
          <h2>Why Learn With CourseX?</h2>
          <p>We provide everything you need to succeed</p>
        </div>

        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">
              <BookOpen size={32} />
            </div>
            <h3>Premium Courses</h3>
            <p>Learn from real-world projects and modern technologies taught by industry experts.</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">
              <Users size={32} />
            </div>
            <h3>Expert Mentors</h3>
            <p>Learn directly from experienced industry professionals with years of expertise.</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">
              <Award size={32} />
            </div>
            <h3>Certificates</h3>
            <p>Earn verified certificates after completing your courses to boost your career.</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">
              <Star size={32} />
            </div>
            <h3>Interactive Quizzes</h3>
            <p>Test your knowledge with interactive quizzes and get instant feedback.</p>
          </div>
        </div>
      </section>

      {/* COURSE SECTION */}
      <section className="course-section">
        <div className="section-header">
          <div>
            <h2>Popular Courses</h2>
            <p>Start learning trending technologies and improve your skills today</p>
          </div>

          <Link to="/explore" className="btn-secondary">
            View All Courses
            <ArrowRight size={18} />
          </Link>
        </div>

        {loading ? (
          <Loading fullPage={false} />
        ) : courses.length === 0 ? (
          <div className="empty-courses">
            <p>No courses available. Check back soon!</p>
            <button className="btn-primary" onClick={() => window.location.reload()}>
              Retry
            </button>
          </div>
        ) : (
          <div className="course-grid">
            {courses.map((course) => (
              <Link
                to={`/course/${course._id || course.id}`}
                className="home-course-card"
                key={course._id || course.id}
              >
                <div className="course-image-wrapper">
                  <img
                    src={course.image}
                    alt={course.title}
                    className="home-course-image"
                  />
                  <div className="course-overlay">
                    <button className="btn-small">Explore</button>
                  </div>
                </div>

                <div className="course-content">
                  <div className="course-top-row">
                    <span className="course-category">{course.category}</span>
                    <span className="course-rating">⭐ {course.rating || "4.8"}</span>
                  </div>

                  <h3 className="course-title">{course.title}</h3>

                  <p className="course-author">By {course.author}</p>

                  <p className="course-description">
                    {course.description?.slice(0, 85)}...
                  </p>

                  {/* INFO */}
                  <div className="course-info">
                    <span>
                      <Clock size={16} />
                      {course.totalHours || 24} Hours
                    </span>

                    <span>
                      <Users size={16} />
                      1.2K Students
                    </span>
                  </div>

                  {/* FOOTER */}
                  <div className="course-footer">
                    <div className="price-box">₹{course.price}</div>
                    <button className="btn-primary btn-small">Enroll Now</button>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>

      {/* WHY CHOOSE */}
      <section className="why-section">
        <div className="why-left">
          <img
            src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600&h=600&fit=crop"
            alt="Learning experience"
            className="why-image"
          />
        </div>

        <div className="why-right">
          <span className="why-badge">WHY CHOOSE US</span>

          <h2>Modern Learning Experience Designed For Success</h2>

          <p>
            We provide interactive learning, project-based training, quizzes,
            certificates, and personalized dashboards for a complete LMS
            experience that accelerates your growth.
          </p>

          <div className="why-points">
            <div className="why-item">
              <TrendingUp size={20} />
              <div>
                <h4>Real-world Projects</h4>
                <p>Build portfolio projects used by professionals</p>
              </div>
            </div>

            <div className="why-item">
              <Award size={20} />
              <div>
                <h4>Industry Certificates</h4>
                <p>Earn recognized certificates to boost your career</p>
              </div>
            </div>

            <div className="why-item">
              <Star size={20} />
              <div>
                <h4>Premium Learning UI</h4>
                <p>Beautiful and intuitive interface for better learning</p>
              </div>
            </div>
          </div>

          <button className="btn-primary btn-lg" onClick={handleExplore}>
            Start Learning Today
            <ArrowRight size={18} />
          </button>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="cta-section">
        <div className="cta-content">
          <h2>Ready to Transform Your Career?</h2>
          <p>Join thousands of students already learning on CourseX</p>
          <button className="btn-primary btn-lg" onClick={handleExplore}>
            Explore All Courses
          </button>
        </div>
      </section>
    </div>
  );
}