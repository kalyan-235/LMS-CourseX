import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../api/axios";
import Loading from "../components/Loading";

export default function MyLearning() {
  const [courses, setCourses] = useState([]);
  const [activeTab, setActiveTab] = useState("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchMyCourses();
  }, []);

  const fetchMyCourses = async () => {
    try {
      setError(null);
      const res = await API.get("/enrollments/my-courses");
      // Filter out any enrollments where courseId is null/deleted
      const valid = (res.data || []).filter(
        (item) => item && item.courseId && item.courseId._id
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

  const filteredCourses = courses.filter((item) => {
    if (activeTab === "completed") return item.completed;
    if (activeTab === "progress") return !item.completed;
    return true;
  });

  if (loading) return <Loading fullPage={false} />;

  return (
    <div className="mlpage">

      {/* HEADER */}
      <div className="mlhead">
        <h1>My Learning</h1>
        <p>Track your enrolled courses and progress</p>
      </div>

      {/* ERROR STATE */}
      {error && (
        <div className="ml-error-banner">
          <span>⚠️ {error}</span>
          <button onClick={fetchMyCourses}>Retry</button>
        </div>
      )}

      {/* STATS */}
      <div className="mlstats">
        <div className="mlstat blue">
          <h2>{courses.length}</h2>
          <span>Total Courses</span>
        </div>
        <div className="mlstat orange">
          <h2>{courses.filter((item) => !item.completed).length}</h2>
          <span>In Progress</span>
        </div>
        <div className="mlstat green">
          <h2>{courses.filter((item) => item.completed).length}</h2>
          <span>Completed</span>
        </div>
      </div>

      {/* TABS */}
      <div className="mltabs">
        {[
          { key: "all", label: "All Courses" },
          { key: "progress", label: "In Progress" },
          { key: "completed", label: "Completed" },
        ].map((tab) => (
          <button
            key={tab.key}
            className={`mltab ${activeTab === tab.key ? "active" : ""}`}
            onClick={() => setActiveTab(tab.key)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* EMPTY STATE */}
      {!error && filteredCourses.length === 0 && (
        <div className="ml-empty">
          <div className="ml-empty-icon">📚</div>
          <h3>
            {activeTab === "all"
              ? "No courses enrolled yet"
              : activeTab === "completed"
              ? "No completed courses yet"
              : "No courses in progress"}
          </h3>
          <p>
            {activeTab === "all"
              ? "Explore our courses and start learning today!"
              : "Keep learning to see courses here."}
          </p>
          {activeTab === "all" && (
            <Link to="/explore" className="ml-explore-btn">
              Explore Courses
            </Link>
          )}
        </div>
      )}

      {/* COURSE LIST */}
      <div className="mllist">
        {filteredCourses.map((item) => {
          const course = item.courseId;

          // Guard: skip if course data is missing
          if (!course || !course._id) return null;

          const totalHours = course.totalHours || 20;
          const watchedHours = item.watchedHours || 0;
          const remaining = Math.max(0, totalHours - watchedHours);
          const progress = item.progress || 0;

          return (
            <div key={item._id} className="course-wrapper">
              <Link
                to={`/course/${course._id}`}
                className={`mlcard ${item.completed ? "completed" : ""}`}
              >
                {/* IMAGE */}
                <img
                  src={course.image}
                  alt={course.title}
                  className="mlimg"
                  onError={(e) => {
                    e.target.src =
                      "https://images.unsplash.com/photo-1593720219276-0b1eacd0aef4?w=300&h=200&fit=crop";
                  }}
                />

                {/* INFO */}
                <div className="mlinfo">
                  <h3>{course.title}</h3>
                  <p>{course.author}</p>

                  {/* EXTRA INFO */}
                  <div className="extra-learning-info">
                    <p>⏱ Total: {totalHours}h</p>
                    <p>▶ Watched: {watchedHours}h</p>
                    <p>🕐 Remaining: {remaining}h</p>
                    <p>
                      📅{" "}
                      {item.lastOpened
                        ? `Last opened: ${item.lastOpened}`
                        : "Not opened yet"}
                    </p>
                  </div>

                  {/* PROGRESS BAR */}
                  <div className="mlprogress">
                    <div
                      className="mlfill"
                      style={{ width: `${progress}%` }}
                    />
                  </div>

                  {/* BOTTOM */}
                  <div className="mlbottom">
                    <span>
                      {item.completed
                        ? "✅ Course Completed"
                        : `Resume Learning · ${progress}%`}
                    </span>
                    <strong>{progress}%</strong>
                  </div>
                </div>

                {/* PLAY BTN */}
                <button
                  className="playbtn"
                  aria-label={item.completed ? "Completed" : "Play"}
                >
                  {item.completed ? "✓" : "▶"}
                </button>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}
