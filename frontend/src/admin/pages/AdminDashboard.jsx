import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Users,
  BookOpen,
  TrendingUp,
  IndianRupee,
  CheckCircle2,
  GraduationCap,
  RefreshCw,
  Plus,
  ArrowRight,
  UserPlus,
  BarChart3,
  Settings,
  Clock,
} from "lucide-react";
import API from "../../api/axios";
import Loading from "../../components/Loading";
import AdminLayout from "../layouts/AdminLayout";

export default function AdminDashboard() {
  const [data,    setData]    = useState(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const navigate = useNavigate();

  const user = (() => {
    try { return JSON.parse(localStorage.getItem("user")); } catch { return null; }
  })();

  useEffect(() => { fetchAnalytics(); }, []);

  const fetchAnalytics = async (isRefresh = false) => {
    try {
      if (isRefresh) setRefreshing(true);
      else setLoading(true);
      const res = await API.get("/admin/dashboard");
      setData(res.data);
    } catch (err) {
      console.log(err);
      window.addToast?.("Failed to load analytics", "error");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="adm-dash-loading">
          <Loading fullPage={false} />
        </div>
      </AdminLayout>
    );
  }

  if (!data) {
    return (
      <AdminLayout>
        <div className="adm-dash-error">
          <div className="adm-dash-error-icon">⚠️</div>
          <h2>Failed to load dashboard</h2>
          <p>Check your connection and try again</p>
          <button onClick={() => fetchAnalytics()}>Retry</button>
        </div>
      </AdminLayout>
    );
  }

  const METRICS = [
    {
      label:    "Total Users",
      value:    data.totalUsers || 0,
      icon:     <Users size={20} />,
      color:    "indigo",
      trend:    "+12%",
      trendUp:  true,
      sub:      "Registered accounts",
    },
    {
      label:    "Total Courses",
      value:    data.totalCourses || 0,
      icon:     <BookOpen size={20} />,
      color:    "violet",
      trend:    "+3 new",
      trendUp:  true,
      sub:      "Published courses",
    },
    {
      label:    "Enrollments",
      value:    data.totalEnrollments || 0,
      icon:     <TrendingUp size={20} />,
      color:    "sky",
      trend:    "+24%",
      trendUp:  true,
      sub:      "Total enrollments",
    },
    {
      label:    "Revenue",
      value:    `₹${Number(data.totalRevenue || 0).toLocaleString("en-IN")}`,
      icon:     <IndianRupee size={20} />,
      color:    "emerald",
      trend:    "+18%",
      trendUp:  true,
      sub:      "Total earned",
    },
    {
      label:    "Completed",
      value:    data.completedCourses || 0,
      icon:     <CheckCircle2 size={20} />,
      color:    "green",
      trend:    "87%",
      trendUp:  true,
      sub:      "Completion rate",
    },
    {
      label:    "Active Students",
      value:    data.activeStudents ?? data.totalEnrollments ?? 0,
      icon:     <GraduationCap size={20} />,
      color:    "amber",
      trend:    "This week",
      trendUp:  null,
      sub:      "Currently learning",
    },
  ];

  const QUICK_ACTIONS = [
    { label: "Add Course",      icon: <Plus size={18} />,    color: "indigo", action: () => navigate("/admin/courses") },
    { label: "View Students",   icon: <Users size={18} />,   color: "sky",    action: () => navigate("/admin/students") },
    { label: "Payments",        icon: <IndianRupee size={18}/>,color:"emerald",action: () => navigate("/admin/payments") },
    { label: "Settings",        icon: <Settings size={18} />,color: "slate",  action: () => navigate("/admin/settings") },
  ];

  const now = new Date().toLocaleString("en-IN", {
    weekday: "short", day: "numeric", month: "short",
    hour: "2-digit", minute: "2-digit",
  });

  return (
    <AdminLayout>
      <div className="adm-dash">

        {/* ── TOP BAR ────────────────────────────────────────── */}
        <div className="adm-dash-topbar">
          <div>
            <h1 className="adm-dash-title">
              Good {getGreeting()}, {user?.name?.split(" ")[0] || "Admin"} 👋
            </h1>
            <p className="adm-dash-subtitle">
              Here's what's happening with your platform today
            </p>
          </div>
          <div className="adm-dash-topbar-right">
            <span className="adm-dash-time">
              <Clock size={13} />
              {now}
            </span>
            <button
              className={`adm-refresh-btn ${refreshing ? "adm-refresh-btn--spinning" : ""}`}
              onClick={() => fetchAnalytics(true)}
              disabled={refreshing}
            >
              <RefreshCw size={15} />
              {refreshing ? "Refreshing…" : "Refresh"}
            </button>
          </div>
        </div>

        {/* ── METRICS GRID ───────────────────────────────────── */}
        <div className="adm-metrics-grid">
          {METRICS.map((m, i) => (
            <div key={i} className={`adm-metric-card adm-metric-${m.color}`}>
              <div className="adm-metric-top">
                <div className={`adm-metric-icon adm-metric-icon-${m.color}`}>
                  {m.icon}
                </div>
                {m.trendUp !== null && (
                  <span className={`adm-metric-trend ${m.trendUp ? "adm-trend-up" : "adm-trend-neutral"}`}>
                    {m.trendUp ? "↑" : "~"} {m.trend}
                  </span>
                )}
              </div>
              <div className="adm-metric-value">{m.value}</div>
              <div className="adm-metric-label">{m.label}</div>
              <div className="adm-metric-sub">{m.sub}</div>
              <div className="adm-metric-bar-wrap">
                <div className={`adm-metric-bar adm-metric-bar-${m.color}`}
                  style={{ width: `${Math.min(100, (typeof m.value === "number" ? m.value : 70))}%` }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* ── BOTTOM GRID ────────────────────────────────────── */}
        <div className="adm-bottom-grid">

          {/* Recent Enrollments */}
          <div className="adm-insight-card">
            <div className="adm-insight-header">
              <div className="adm-insight-title-wrap">
                <div className="adm-insight-dot adm-dot-indigo" />
                <h3>Recent Enrollments</h3>
              </div>
              <button className="adm-insight-see-all" onClick={() => navigate("/admin/students")}>
                See all <ArrowRight size={13} />
              </button>
            </div>

            <div className="adm-insight-list">
              {(data.recentEnrollments || []).length === 0 ? (
                <div className="adm-insight-empty">No recent enrollments</div>
              ) : (
                data.recentEnrollments.map((item) => (
                  <div key={item._id} className="adm-list-row">
                    <div className="adm-list-avatar adm-avatar-indigo">
                      {(item.userId?.name || "U")[0].toUpperCase()}
                    </div>
                    <div className="adm-list-info">
                      <span className="adm-list-primary">{item.userId?.name || "—"}</span>
                      <span className="adm-list-secondary">{item.courseId?.title || "—"}</span>
                    </div>
                    <span className="adm-badge adm-badge-new">New</span>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Recent Users */}
          <div className="adm-insight-card">
            <div className="adm-insight-header">
              <div className="adm-insight-title-wrap">
                <div className="adm-insight-dot adm-dot-violet" />
                <h3>Recent Users</h3>
              </div>
              <button className="adm-insight-see-all" onClick={() => navigate("/admin/students")}>
                See all <ArrowRight size={13} />
              </button>
            </div>

            <div className="adm-insight-list">
              {(data.recentUsers || []).length === 0 ? (
                <div className="adm-insight-empty">No new users</div>
              ) : (
                data.recentUsers.map((u) => (
                  <div key={u._id} className="adm-list-row">
                    <div className="adm-list-avatar adm-avatar-violet">
                      {(u.name || "U")[0].toUpperCase()}
                    </div>
                    <div className="adm-list-info">
                      <span className="adm-list-primary">{u.name}</span>
                      <span className="adm-list-secondary">{u.email}</span>
                    </div>
                    <span className={`adm-badge ${u.isAdmin ? "adm-badge-admin" : "adm-badge-user"}`}>
                      {u.isAdmin ? "Admin" : "Student"}
                    </span>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="adm-insight-card adm-quick-card">
            <div className="adm-insight-header">
              <div className="adm-insight-title-wrap">
                <div className="adm-insight-dot adm-dot-emerald" />
                <h3>Quick Actions</h3>
              </div>
            </div>

            <div className="adm-quick-grid">
              {QUICK_ACTIONS.map((q, i) => (
                <button key={i} className={`adm-quick-btn adm-quick-${q.color}`} onClick={q.action}>
                  <div className={`adm-quick-icon adm-quick-icon-${q.color}`}>{q.icon}</div>
                  <span>{q.label}</span>
                  <ArrowRight size={14} className="adm-quick-arrow" />
                </button>
              ))}
            </div>

            {/* Platform health row */}
            <div className="adm-health">
              <h4>Platform Health</h4>
              <div className="adm-health-row">
                <span className="adm-health-label">Completion Rate</span>
                <div className="adm-health-bar-wrap">
                  <div
                    className="adm-health-fill adm-fill-green"
                    style={{
                      width: data.totalEnrollments
                        ? `${Math.round((data.completedCourses / data.totalEnrollments) * 100)}%`
                        : "0%",
                    }}
                  />
                </div>
                <span className="adm-health-pct">
                  {data.totalEnrollments
                    ? Math.round((data.completedCourses / data.totalEnrollments) * 100)
                    : 0}%
                </span>
              </div>
              <div className="adm-health-row">
                <span className="adm-health-label">Courses w/ Quiz</span>
                <div className="adm-health-bar-wrap">
                  <div className="adm-health-fill adm-fill-indigo" style={{ width: "75%" }} />
                </div>
                <span className="adm-health-pct">75%</span>
              </div>
              <div className="adm-health-row">
                <span className="adm-health-label">Enrollment Rate</span>
                <div className="adm-health-bar-wrap">
                  <div
                    className="adm-health-fill adm-fill-violet"
                    style={{
                      width: data.totalCourses
                        ? `${Math.min(100, Math.round((data.totalEnrollments / (data.totalCourses * 5)) * 100))}%`
                        : "0%",
                    }}
                  />
                </div>
                <span className="adm-health-pct">
                  {data.totalCourses
                    ? Math.min(100, Math.round((data.totalEnrollments / (data.totalCourses * 5)) * 100))
                    : 0}%
                </span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </AdminLayout>
  );
}

function getGreeting() {
  const h = new Date().getHours();
  if (h < 12) return "morning";
  if (h < 17) return "afternoon";
  return "evening";
}
