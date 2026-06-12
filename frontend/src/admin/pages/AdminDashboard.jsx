
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../api/axios";
import Loading from "../../components/Loading";
import AdminLayout from "../layouts/AdminLayout";

export default function AdminDashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      const res = await API.get("/admin/dashboard");
      setData(res.data);
    } catch (err) {
      console.log("Analytics Error:", err);
      window.addToast?.("Failed to load dashboard analytics", "error");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <AdminLayout>
        <Loading fullPage={false} />
      </AdminLayout>
    );
  }

  if (!data) {
    return (
      <AdminLayout>
        <div className="admin-dashboard error-state">
          <h2>❌ Failed to load dashboard</h2>
          <p>Please try refreshing the page</p>
          <button className="btn-primary" onClick={fetchAnalytics}>
            Retry
          </button>
        </div>
      </AdminLayout>
    );
  }

  const metrics = [
    {
      title: "Total Users",
      value: data.totalUsers || 0,
      icon: "👥",
      color: "primary",
      trend: "+12% this month",
    },
    {
      title: "Total Courses",
      value: data.totalCourses || 0,
      icon: "📚",
      color: "success",
      trend: "+3 new courses",
    },
    {
      title: "Enrollments",
      value: data.totalEnrollments || 0,
      icon: "📝",
      color: "info",
      trend: "+24% increase",
    },
    {
      title: "Revenue",
      value: `₹${data.totalRevenue || 0}`,
      icon: "💰",
      color: "warning",
      trend: "+18% growth",
    },
    {
      title: "Completed Courses",
      value: data.completedCourses || 0,
      icon: "✅",
      color: "success",
      trend: "87% completion",
    },
    {
      title: "Active Students",
      value: data.activeStudents ?? data.totalEnrollments ?? 0,
      icon: "🎓",
      color: "primary",
      trend: "This week",
    },
  ];

  return (
    <AdminLayout>
      <div className="admin-dashboard">
        <div className="dashboard-header">
          <div>
            <h1>📊 Analytics Dashboard</h1>
            <p>Welcome back! Here's your LMS overview</p>
          </div>
          <button className="btn-secondary" onClick={fetchAnalytics}>
            🔄 Refresh
          </button>
        </div>

        {/* METRICS GRID */}
        <div className="metrics-grid">
          {metrics.map((metric, index) => (
            <div
              key={index}
              className={`metric-card metric-${metric.color}`}
            >
              <div className="metric-icon">{metric.icon}</div>
              <div className="metric-content">
                <p className="metric-title">{metric.title}</p>
                <h3 className="metric-value">{metric.value}</h3>
                <span className="metric-trend">{metric.trend}</span>
              </div>
            </div>
          ))}
        </div>

        {/* ANALYTICS SECTION */}
        <div className="analytics-section">
          <div className="section-title">
            <h2>📈 Key Insights</h2>
          </div>

          <div className="insights-grid">
            {/* RECENT ENROLLMENTS */}
            <div className="insight-card">
              <div className="card-header">
                <h3>Recent Enrollments</h3>
                <span className="badge-count">{data.recentEnrollments?.length || 0}</span>
              </div>

              <div className="insight-list">
                {data.recentEnrollments && data.recentEnrollments.length > 0 ? (
                  data.recentEnrollments.map((item) => (
                    <div key={item._id} className="list-item">
                      <div className="item-info">
                        <p className="item-title">{item.userId?.name}</p>
                        <p className="item-subtitle">{item.courseId?.title}</p>
                      </div>
                      <span className="item-badge">New</span>
                    </div>
                  ))
                ) : (
                  <p className="empty-message">No recent enrollments</p>
                )}
              </div>
            </div>

            {/* RECENT USERS */}
            <div className="insight-card">
              <div className="card-header">
                <h3>Recent Users</h3>
                <span className="badge-count">{data.recentUsers?.length || 0}</span>
              </div>

              <div className="insight-list">
                {data.recentUsers && data.recentUsers.length > 0 ? (
                  data.recentUsers.map((user) => (
                    <div key={user._id} className="list-item">
                      <div className="item-info">
                        <p className="item-title">{user.name}</p>
                        <p className="item-subtitle">{user.email}</p>
                      </div>
                      <span className="item-status">{user.role || "User"}</span>
                    </div>
                  ))
                ) : (
                  <p className="empty-message">No new users</p>
                )}
              </div>
            </div>

            {/* TOP COURSES */}
            <div className="insight-card">
              <div className="card-header">
                <h3>Top Courses</h3>
                <span className="badge-count">{data.topCourses?.length || 0}</span>
              </div>

              <div className="insight-list">
                {data.topCourses && data.topCourses.length > 0 ? (
                  data.topCourses.map((course, idx) => (
                    <div key={idx} className="list-item">
                      <div className="item-info">
                        <p className="item-title">{course.title}</p>
                        <p className="item-subtitle">{course.enrolled || 0} students</p>
                      </div>
                      <span className="item-score">{course.rating || 0}⭐</span>
                    </div>
                  ))
                ) : (
                  <p className="empty-message">No course data</p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* QUICK ACTIONS */}
        <div className="quick-actions">
          <h2>⚡ Quick Actions</h2>
          <div className="action-buttons">
            <button className="btn-primary" onClick={() => navigate("/admin/courses")}>
              ➕ Add Course
            </button>
            <button className="btn-secondary" onClick={() => navigate("/admin/students")}>
              👥 Manage Students
            </button>
            <button className="btn-success" onClick={() => navigate("/admin/payments")}>
              💰 View Payments
            </button>
            <button className="btn-info" onClick={() => navigate("/admin/settings")}>
              ⚙️ Settings
            </button>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
