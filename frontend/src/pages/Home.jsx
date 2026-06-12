import { useEffect, useState, useRef } from "react";
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
  CheckCircle,
  Zap,
  Globe,
  BarChart2,
  ChevronRight,
  Play,
} from "lucide-react";

import API from "../api/axios";
import Loading from "../components/Loading";

const STATS = [
  { value: "50K+", label: "Active Students", icon: "👨‍🎓" },
  { value: "200+", label: "Expert Courses", icon: "📚" },
  { value: "98%", label: "Success Rate", icon: "🏆" },
  { value: "150+", label: "Expert Mentors", icon: "👨‍🏫" },
];

const FEATURES = [
  {
    icon: <BookOpen size={26} />,
    title: "Premium Courses",
    desc: "Curated courses built with real-world projects using modern tech stacks.",
    color: "#6366f1",
    bg: "rgba(99,102,241,0.1)",
  },
  {
    icon: <Users size={26} />,
    title: "Expert Mentors",
    desc: "Learn from industry veterans with 10+ years of hands-on experience.",
    color: "#0ea5e9",
    bg: "rgba(14,165,233,0.1)",
  },
  {
    icon: <Award size={26} />,
    title: "Verified Certificates",
    desc: "Earn certificates recognized by top companies to accelerate your career.",
    color: "#10b981",
    bg: "rgba(16,185,129,0.1)",
  },
  {
    icon: <Zap size={26} />,
    title: "Interactive Quizzes",
    desc: "Reinforce knowledge with adaptive quizzes and instant feedback loops.",
    color: "#f59e0b",
    bg: "rgba(245,158,11,0.1)",
  },
  {
    icon: <Globe size={26} />,
    title: "Learn Anywhere",
    desc: "Access your courses on any device, anytime — even offline.",
    color: "#8b5cf6",
    bg: "rgba(139,92,246,0.1)",
  },
  {
    icon: <BarChart2 size={26} />,
    title: "Progress Tracking",
    desc: "Visual dashboards to track your learning journey and milestones.",
    color: "#ef4444",
    bg: "rgba(239,68,68,0.1)",
  },
];

const TESTIMONIALS = [
  {
    name: "Priya Sharma",
    role: "Frontend Developer @ TCS",
    text: "CourseX completely transformed my career. I landed my first dev job within 3 months of finishing the React course.",
    avatar: "PS",
    rating: 5,
  },
  {
    name: "Rahul Verma",
    role: "Data Analyst @ Infosys",
    text: "The quality of instruction here is unmatched. Real projects, real mentors, real results. Best investment I made.",
    avatar: "RV",
    rating: 5,
  },
  {
    name: "Anita Nair",
    role: "Full Stack Dev @ Wipro",
    text: "I tried many platforms but CourseX is different — the UI is beautiful, courses are structured, and certificates are legit.",
    avatar: "AN",
    rating: 5,
  },
];

export default function Home() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const navigate = useNavigate();
  const heroRef = useRef(null);

  useEffect(() => {
    fetchCourses();
    const interval = setInterval(() => {
      setActiveTestimonial((p) => (p + 1) % TESTIMONIALS.length);
    }, 4000);
    return () => clearInterval(interval);
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
    <div className="hpro-page">

      {/* ── HERO ─────────────────────────────────────────── */}
      <section className="hpro-hero" ref={heroRef}>
        <div className="hpro-hero-bg">
          <div className="hpro-orb hpro-orb-1" />
          <div className="hpro-orb hpro-orb-2" />
          <div className="hpro-orb hpro-orb-3" />
          <div className="hpro-grid-lines" />
        </div>

        <div className="hpro-hero-inner">
          <div className="hpro-hero-left">
            <div className="hpro-hero-badge">
              <span className="hpro-badge-dot" />
              🚀 India's #1 Modern Learning Platform
            </div>

            <h1 className="hpro-hero-title">
              Learn Skills That
              <span className="hpro-gradient-text"> Actually Matter</span>
              <br />
              in Your Career
            </h1>

            <p className="hpro-hero-sub">
              Premium courses, real-world projects, verified certificates, and
              expert mentorship — everything you need to land your dream job.
            </p>

            <div className="hpro-hero-actions">
              <button className="hpro-btn-primary" onClick={handleExplore}>
                Start Learning Free
                <ArrowRight size={18} />
              </button>
              <button className="hpro-btn-ghost">
                <div className="hpro-play-ring">
                  <Play size={14} fill="currentColor" />
                </div>
                Watch Demo
              </button>
            </div>

            <div className="hpro-trust-row">
              <div className="hpro-avatars">
                {["A", "B", "C", "D"].map((l, i) => (
                  <div key={i} className="hpro-avatar-chip" style={{ zIndex: 4 - i }}>
                    {l}
                  </div>
                ))}
              </div>
              <span className="hpro-trust-text">
                <strong>50,000+</strong> students already learning
              </span>
            </div>
          </div>

          <div className="hpro-hero-right">
            <div className="hpro-hero-card hpro-card-main">
              <img
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=700&h=480&fit=crop&crop=center"
                alt="Students learning"
                className="hpro-hero-img"
              />
              <div className="hpro-hero-img-overlay" />
            </div>

            {/* Floating badges */}
            <div className="hpro-float-card hpro-float-top">
              <div className="hpro-float-icon">🎓</div>
              <div>
                <div className="hpro-float-label">New Enrollment</div>
                <div className="hpro-float-val">Rahul joined Python Course</div>
              </div>
            </div>

            <div className="hpro-float-card hpro-float-bottom">
              <div className="hpro-float-icon">⭐</div>
              <div>
                <div className="hpro-float-label">Course Rating</div>
                <div className="hpro-float-stars">★★★★★ <span>4.9 / 5</span></div>
              </div>
            </div>

            <div className="hpro-float-card hpro-float-cert">
              <CheckCircle size={18} color="#10b981" />
              <span>Certificate Earned!</span>
            </div>
          </div>
        </div>

        {/* STATS BAR */}
        <div className="hpro-stats-bar">
          {STATS.map((s, i) => (
            <div className="hpro-stat-item" key={i}>
              <span className="hpro-stat-emoji">{s.icon}</span>
              <div>
                <div className="hpro-stat-value">{s.value}</div>
                <div className="hpro-stat-label">{s.label}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── FEATURES ──────────────────────────────────────── */}
      <section className="hpro-section hpro-features">
        <div className="hpro-section-head center">
          <div className="hpro-section-tag">Why CourseX</div>
          <h2>Everything You Need to Succeed</h2>
          <p>A complete learning ecosystem built for working professionals and beginners alike.</p>
        </div>

        <div className="hpro-features-grid">
          {FEATURES.map((f, i) => (
            <div className="hpro-feature-card" key={i}>
              <div className="hpro-feature-icon" style={{ background: f.bg, color: f.color }}>
                {f.icon}
              </div>
              <h3>{f.title}</h3>
              <p>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── POPULAR COURSES ───────────────────────────────── */}
      <section className="hpro-section hpro-courses">
        <div className="hpro-section-head">
          <div>
            <div className="hpro-section-tag">Top Picks</div>
            <h2>Popular Courses</h2>
            <p>Trending courses chosen by thousands of learners this month</p>
          </div>
          <Link to="/explore" className="hpro-btn-outline-sm">
            View All Courses <ChevronRight size={16} />
          </Link>
        </div>

        {loading ? (
          <Loading fullPage={false} />
        ) : courses.length === 0 ? (
          <div className="hpro-empty">
            <p>No courses yet. Check back soon!</p>
            <button className="hpro-btn-primary" onClick={() => window.location.reload()}>
              Retry
            </button>
          </div>
        ) : (
          <div className="hpro-course-grid">
            {courses.map((course) => (
              <Link
                to={`/course/${course._id || course.id}`}
                className="hpro-course-card"
                key={course._id || course.id}
              >
                <div className="hpro-course-img-wrap">
                  <img
                    src={course.image}
                    alt={course.title}
                    className="hpro-course-img"
                  />
                  <div className="hpro-course-img-overlay">
                    <div className="hpro-overlay-btn">
                      <PlayCircle size={20} /> Preview
                    </div>
                  </div>
                  <div className="hpro-course-badge">{course.category}</div>
                </div>

                <div className="hpro-course-body">
                  <div className="hpro-course-meta">
                    <span className="hpro-course-rating">
                      <Star size={14} fill="#f59e0b" color="#f59e0b" />
                      {course.rating || "4.8"}
                    </span>
                    <span className="hpro-course-students">
                      <Users size={14} /> 1.2K
                    </span>
                    <span className="hpro-course-hours">
                      <Clock size={14} /> {course.totalHours || 24}h
                    </span>
                  </div>

                  <h3 className="hpro-course-title">{course.title}</h3>
                  <p className="hpro-course-author">by {course.author}</p>
                  <p className="hpro-course-desc">
                    {course.description?.slice(0, 90)}...
                  </p>

                  <div className="hpro-course-footer">
                    <div className="hpro-course-price">₹{course.price}</div>
                    <button className="hpro-enroll-btn">Enroll Now →</button>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>

      {/* ── WHY CHOOSE + TESTIMONIALS ─────────────────────── */}
      <section className="hpro-section hpro-why">
        <div className="hpro-why-left">
          <div className="hpro-why-img-wrap">
            <img
              src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600&h=700&fit=crop"
              alt="Learning"
              className="hpro-why-img"
            />
            <div className="hpro-why-badge-card">
              <TrendingUp size={22} color="#6366f1" />
              <div>
                <div className="hpro-why-badge-val">3x Faster</div>
                <div className="hpro-why-badge-sub">Career Growth</div>
              </div>
            </div>
          </div>
        </div>

        <div className="hpro-why-right">
          <div className="hpro-section-tag">Why Choose Us</div>
          <h2>A Smarter Way to Learn &amp; Grow</h2>
          <p>
            We combine structured learning paths, hands-on projects, and industry
            mentorship to help you go from beginner to job-ready in weeks, not years.
          </p>

          <div className="hpro-why-checklist">
            {[
              "Industry-aligned curriculum updated every quarter",
              "Real projects you can add to your portfolio",
              "1-on-1 doubt resolution with expert mentors",
              "Verified certificates recognized by top companies",
              "Lifetime access to all enrolled courses",
            ].map((item, i) => (
              <div className="hpro-check-item" key={i}>
                <CheckCircle size={20} color="#10b981" />
                <span>{item}</span>
              </div>
            ))}
          </div>

          <button className="hpro-btn-primary" onClick={handleExplore}>
            Start Learning Today <ArrowRight size={18} />
          </button>
        </div>
      </section>

      {/* ── TESTIMONIALS ──────────────────────────────────── */}
      <section className="hpro-section hpro-testimonials">
        <div className="hpro-section-head center">
          <div className="hpro-section-tag">Student Stories</div>
          <h2>What Our Students Say</h2>
          <p>Real results from real learners who transformed their careers</p>
        </div>

        <div className="hpro-testimonials-grid">
          {TESTIMONIALS.map((t, i) => (
            <div
              className={`hpro-testimonial-card ${i === activeTestimonial ? "hpro-testimonial-active" : ""}`}
              key={i}
              onClick={() => setActiveTestimonial(i)}
            >
              <div className="hpro-testimonial-stars">
                {"★".repeat(t.rating)}
              </div>
              <p className="hpro-testimonial-text">"{t.text}"</p>
              <div className="hpro-testimonial-author">
                <div className="hpro-testimonial-avatar">{t.avatar}</div>
                <div>
                  <div className="hpro-testimonial-name">{t.name}</div>
                  <div className="hpro-testimonial-role">{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="hpro-testimonials-dots">
          {TESTIMONIALS.map((_, i) => (
            <button
              key={i}
              className={`hpro-dot ${i === activeTestimonial ? "hpro-dot-active" : ""}`}
              onClick={() => setActiveTestimonial(i)}
            />
          ))}
        </div>
      </section>

      {/* ── CTA BANNER ────────────────────────────────────── */}
      <section className="hpro-cta">
        <div className="hpro-cta-orb-1" />
        <div className="hpro-cta-orb-2" />
        <div className="hpro-cta-inner">
          <div className="hpro-cta-icon">🎯</div>
          <h2>Ready to Transform Your Career?</h2>
          <p>
            Join 50,000+ students already learning on CourseX. Start for free
            today — no credit card required.
          </p>
          <div className="hpro-cta-actions">
            <button className="hpro-cta-btn-primary" onClick={handleExplore}>
              Explore All Courses
              <ArrowRight size={18} />
            </button>
            <Link to="/register" className="hpro-cta-btn-ghost">
              Create Free Account
            </Link>
          </div>
          <div className="hpro-cta-features">
            <span><CheckCircle size={16} /> No Credit Card</span>
            <span><CheckCircle size={16} /> Free Courses Available</span>
            <span><CheckCircle size={16} /> Cancel Anytime</span>
          </div>
        </div>
      </section>

    </div>
  );
}
