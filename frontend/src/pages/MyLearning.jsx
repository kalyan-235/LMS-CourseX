import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  BookOpen,
  Clock,
  CheckCircle2,
  PlayCircle,
  RotateCcw,
  TrendingUp,
  Award,
  Layers,
  ChevronRight,
  Calendar,
} from "lucide-react";
import API from "../api/axios";
import Loading from "../components/Loading";

const TABS = [
  { key: "all",       label: "All Courses",  icon: <Layers      size={15} /> },
  { key: "progress",  label: "In Progress",  icon: <TrendingUp  size={15} /> },
  { key: "completed", label: "Completed",    icon: <CheckCircle2 size={15} /> },
];

export default function MyLearning() {
  const [courses,    setCourses]    = useState([]);
  const [activeTab,  setActiveTab]  = useState("all");
  const [loading,    setLoading]    = useState(true);
  const [error,      setError]      = useState(null);

  useEffect(() => { fetchMyCourses(); }, []);

  const fetchMyCourses = async () => {
    try {
      setError(null);
      const res  = await API.get("/enrollments/my-courses");
      const valid = (res.data || []).filter(
        (item) => item?.courseId?._id
      );
      setCourses(valid);
    } catch (err) {
      console.log(err);
      setError("Failed to load your courses. Please try again.");
      window.addToast?.("Failed to load your courses", "error");
    } finally {
      setLoading(false);
    }
  };

  const filtered = courses.filter((item) => {
    if (activeTab === "completed") return item.completed;
    if (activeTab === "progress")  return !item.completed;
    return true;
  });

  const totalProgress = courses.length
    ? Math.round(courses.reduce((s, i) => s + (i.progress || 0), 0) / courses.length)
    : 0;

  const completedCount = courses.filter((i) => i.completed).length;
  const inProgressCount = courses.filter((i) => !i.completed).length;

  if (loading) return <div className="ml-page"><Loading fullPage={false} /></div>;

  return (
    <div className="ml-page">

      {/* ── PAGE HEADER ─────────────────────────────────────── */}
      <div className="ml-header">
        <div className="ml-header-left">
          <h1 className="ml-header-title">My Learning</h1>
          <p className="ml-header-sub">Track your progress and continue where you left off</p>
        </div>
        <Link to="/explore" className="ml-header-cta">
          Explore More Courses
          <ChevronRight size={16} />
        </Link>
      </div>

      {/* ── ERROR BANNER ────────────────────────────────────── */}
      {error && (
        <div className="ml-error-banner">
          <span>⚠️ {error}</span>
          <button onClick={fetchMyCourses}><RotateCcw size={14} /> Retry</button>
        </div>
      )}

      {/* ── STATS CARDS ─────────────────────────────────────── */}
      <div className="ml-stats-row">

        <div className="ml-stat-card ml-stat-blue">
          <div className="ml-stat-icon-wrap ml-stat-icon-blue">
            <BookOpen size={20} />
          </div>
          <div className="ml-stat-body">
            <div className="ml-stat-value">{courses.length}</div>
            <div className="ml-stat-label">Enrolled Courses</div>
          </div>
          <div className="ml-stat-accent" />
        </div>

        <div className="ml-stat-card ml-stat-orange">
          <div className="ml-stat-icon-wrap ml-stat-icon-orange">
            <TrendingUp size={20} />
          </div>
          <div className="ml-stat-body">
            <div className="ml-stat-value">{inProgressCount}</div>
            <div className="ml-stat-label">In Progress</div>
          </div>
          <div className="ml-stat-accent" />
        </div>

        <div className="ml-stat-card ml-stat-green">
          <div className="ml-stat-icon-wrap ml-stat-icon-green">
            <Award size={20} />
          </div>
          <div className="ml-stat-body">
            <div className="ml-stat-value">{completedCount}</div>
            <div className="ml-stat-label">Completed</div>
          </div>
          <div className="ml-stat-accent" />
        </div>

        <div className="ml-stat-card ml-stat-purple">
          <div className="ml-stat-icon-wrap ml-stat-icon-purple">
            <TrendingUp size={20} />
          </div>
          <div className="ml-stat-body">
            <div className="ml-stat-value">{totalProgress}%</div>
            <div className="ml-stat-label">Avg Progress</div>
          </div>
          {/* mini progress ring */}
          <div className="ml-stat-ring">
            <svg width="44" height="44" viewBox="0 0 44 44">
              <circle cx="22" cy="22" r="17" fill="none" stroke="rgba(139,92,246,0.15)" strokeWidth="4" />
              <circle
                cx="22" cy="22" r="17"
                fill="none"
                stroke="#8b5cf6"
                strokeWidth="4"
                strokeLinecap="round"
                strokeDasharray={`${2 * Math.PI * 17}`}
                strokeDashoffset={`${2 * Math.PI * 17 * (1 - totalProgress / 100)}`}
                transform="rotate(-90 22 22)"
              />
            </svg>
          </div>
        </div>

      </div>

      {/* ── TABS ────────────────────────────────────────────── */}
      <div className="ml-tabs-bar">
        <div className="ml-tabs">
          {TABS.map((tab) => {
            const count =
              tab.key === "all"       ? courses.length
              : tab.key === "progress" ? inProgressCount
              : completedCount;
            return (
              <button
                key={tab.key}
                className={`ml-tab ${activeTab === tab.key ? "ml-tab--active" : ""}`}
                onClick={() => setActiveTab(tab.key)}
              >
                {tab.icon}
                <span>{tab.label}</span>
                <span className={`ml-tab-count ${activeTab === tab.key ? "ml-tab-count--active" : ""}`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>
        <span className="ml-tabs-showing">
          Showing {filtered.length} course{filtered.length !== 1 ? "s" : ""}
        </span>
      </div>

      {/* ── EMPTY STATE ─────────────────────────────────────── */}
      {!error && filtered.length === 0 && (
        <div className="ml-empty">
          <div className="ml-empty-icon">
            {activeTab === "completed" ? "🏆" : activeTab === "progress" ? "📖" : "📚"}
          </div>
          <h3>
            {activeTab === "all"
              ? "No courses enrolled yet"
              : activeTab === "completed"
              ? "No completed courses yet"
              : "No courses in progress"}
          </h3>
          <p>
            {activeTab === "all"
              ? "Discover amazing courses and start your learning journey!"
              : "Keep going — your progress will show up here."}
          </p>
          {activeTab === "all" && (
            <Link to="/explore" className="ml-empty-btn">
              Explore Courses <ChevronRight size={16} />
            </Link>
          )}
        </div>
      )}

      {/* ── COURSE LIST ─────────────────────────────────────── */}
      <div className="ml-course-list">
        {filtered.map((item) => {
          const course      = item.courseId;
          if (!course?._id) return null;

          const totalHours  = course.totalHours || 20;
          const watched     = item.watchedHours || 0;
          const remaining   = Math.max(0, totalHours - watched);
          const progress    = item.progress || 0;

          return (
            <Link
              key={item._id}
              to={`/course/${course._id}`}
              className={`ml-course-card ${item.completed ? "ml-course-card--done" : ""}`}
            >
              {/* Thumbnail */}
              <div className="ml-course-thumb">
                <img
                  src={course.image}
                  alt={course.title}
                  className="ml-course-img"
                  onError={(e) => {
                    e.target.src =
                      "https://images.unsplash.com/photo-1593720219276-0b1eacd0aef4?w=300&h=200&fit=crop";
                  }}
                />
                {item.completed && (
                  <div className="ml-course-done-badge">
                    <CheckCircle2 size={14} /> Done
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="ml-course-content">
                {/* Top row */}
                <div className="ml-course-top">
                  <span className="ml-course-category">{course.category}</span>
                  <span className={`ml-course-status ${item.completed ? "ml-course-status--done" : "ml-course-status--active"}`}>
                    {item.completed ? "✓ Completed" : "● In Progress"}
                  </span>
                </div>

                <h3 className="ml-course-title">{course.title}</h3>
                <p className="ml-course-author">by {course.author}</p>

                {/* Stats pills */}
                <div className="ml-course-pills">
                  <span className="ml-pill">
                    <Clock size={13} />
                    {totalHours}h total
                  </span>
                  <span className="ml-pill">
                    <PlayCircle size={13} />
                    {watched}h watched
                  </span>
                  <span className="ml-pill">
                    <Clock size={13} />
                    {remaining}h left
                  </span>
                  {item.lastOpened && (
                    <span className="ml-pill">
                      <Calendar size={13} />
                      {item.lastOpened}
                    </span>
                  )}
                </div>

                {/* Progress bar */}
                <div className="ml-course-progress-wrap">
                  <div className="ml-course-progress-bar">
                    <div
                      className={`ml-course-progress-fill ${item.completed ? "ml-course-progress-fill--done" : ""}`}
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                  <span className="ml-course-progress-pct">{progress}%</span>
                </div>

                <div className="ml-course-footer">
                  <span className="ml-course-resume">
                    {item.completed ? "Review Course" : "Continue Learning"}
                  </span>
                  <ChevronRight size={16} className="ml-course-arrow" />
                </div>
              </div>

              {/* Play / Check button */}
              <button
                className={`ml-play-btn ${item.completed ? "ml-play-btn--done" : ""}`}
                aria-label={item.completed ? "Completed" : "Play"}
                tabIndex={-1}
              >
                {item.completed
                  ? <CheckCircle2 size={22} />
                  : <PlayCircle size={22} />}
              </button>
            </Link>
          );
        })}
      </div>

    </div>
  );
}
