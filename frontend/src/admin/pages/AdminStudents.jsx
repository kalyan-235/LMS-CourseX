import { useState, useEffect } from "react";
import {
  Search, Users, TrendingUp, Award,
  Clock, ChevronDown, Filter, Download,
} from "lucide-react";
import API from "../../api/axios";
import AdminLayout from "../layouts/AdminLayout";
import Loading from "../../components/Loading";

export default function AdminStudents() {
  const [students, setStudents] = useState([]);
  const [search,   setSearch]   = useState("");
  const [filter,   setFilter]   = useState("all"); // all | active | completed
  const [loading,  setLoading]  = useState(true);
  const [sortBy,   setSortBy]   = useState("name"); // name | progress | hours

  useEffect(() => { fetchStudents(); }, []);

  const fetchStudents = async () => {
    try {
      const res = await API.get("/users/students");
      setStudents(res.data || []);
    } catch (err) {
      console.log(err);
      window.addToast?.("Failed to load students", "error");
    } finally {
      setLoading(false);
    }
  };

  // ── Stats ───────────────────────────────────────────────
  const total     = students.length;
  const active    = students.filter(s => !s.completed).length;
  const completed = students.filter(s => s.completed).length;
  const avgProgress = total
    ? Math.round(students.reduce((sum, s) => sum + (s.progress || 0), 0) / total)
    : 0;

  // ── Filter + Search ────────────────────────────────────
  const filtered = students
    .filter(s => {
      if (filter === "active")    return !s.completed;
      if (filter === "completed") return s.completed;
      return true;
    })
    .filter(s => {
      if (!search) return true;
      const q = search.toLowerCase();
      return (
        s.userId?.name?.toLowerCase().includes(q) ||
        s.userId?.email?.toLowerCase().includes(q) ||
        s.courseId?.title?.toLowerCase().includes(q)
      );
    })
    .sort((a, b) => {
      if (sortBy === "progress") return (b.progress || 0) - (a.progress || 0);
      if (sortBy === "hours")    return (b.watchedHours || 0) - (a.watchedHours || 0);
      return (a.userId?.name || "").localeCompare(b.userId?.name || "");
    });

  const getInitial = (name) => (name || "?")[0].toUpperCase();

  const AVATAR_COLORS = [
    "#6366f1","#7c3aed","#0284c7","#059669","#d97706","#dc2626","#db2777",
  ];
  const avatarColor = (name = "") =>
    AVATAR_COLORS[name.charCodeAt(0) % AVATAR_COLORS.length];

  if (loading) return <AdminLayout><div style={{padding:"60px 0",textAlign:"center"}}><Loading fullPage={false}/></div></AdminLayout>;

  return (
    <AdminLayout>
      <div className="ast-page">

        {/* ── TOPBAR ──────────────────────────────────── */}
        <div className="ast-topbar">
          <div>
            <h1 className="ast-title">Student Management</h1>
            <p className="ast-subtitle">Monitor progress of all enrolled students</p>
          </div>
          <div className="ast-topbar-right">
            <div className="ast-search-wrap">
              <Search size={15} className="ast-search-icon"/>
              <input
                className="ast-search-input"
                placeholder="Search by name, email or course…"
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* ── STATS ───────────────────────────────────── */}
        <div className="ast-stats-row">
          {[
            { label:"Total Students", value: total,       icon: <Users size={18}/>,      color:"indigo" },
            { label:"In Progress",    value: active,      icon: <TrendingUp size={18}/>, color:"amber"  },
            { label:"Completed",      value: completed,   icon: <Award size={18}/>,      color:"emerald"},
            { label:"Avg Progress",   value: avgProgress+"%", icon:<Clock size={18}/>,   color:"violet" },
          ].map((s, i) => (
            <div key={i} className={`ast-stat ast-stat-${s.color}`}>
              <div className={`ast-stat-icon ast-icon-${s.color}`}>{s.icon}</div>
              <div>
                <div className="ast-stat-val">{s.value}</div>
                <div className="ast-stat-label">{s.label}</div>
              </div>
            </div>
          ))}
        </div>

        {/* ── FILTER TABS + SORT ──────────────────────── */}
        <div className="ast-controls">
          <div className="ast-filter-tabs">
            {[
              { key:"all",       label:`All (${total})`       },
              { key:"active",    label:`In Progress (${active})`    },
              { key:"completed", label:`Completed (${completed})` },
            ].map(t => (
              <button
                key={t.key}
                className={`ast-filter-tab ${filter === t.key ? "ast-filter-tab--active" : ""}`}
                onClick={() => setFilter(t.key)}
              >
                {t.label}
              </button>
            ))}
          </div>

          <div className="ast-sort-wrap">
            <Filter size={13}/>
            <select
              className="ast-sort-select"
              value={sortBy}
              onChange={e => setSortBy(e.target.value)}
            >
              <option value="name">Sort: Name</option>
              <option value="progress">Sort: Progress</option>
              <option value="hours">Sort: Hours</option>
            </select>
          </div>
        </div>

        {/* ── TABLE ───────────────────────────────────── */}
        {filtered.length === 0 ? (
          <div className="ast-empty">
            <Users size={40}/>
            <h3>No students found</h3>
            <p>Try adjusting your search or filter</p>
          </div>
        ) : (
          <div className="ast-table-wrap">
            <table className="ast-table">
              <thead>
                <tr>
                  <th>Student</th>
                  <th>Course</th>
                  <th>Progress</th>
                  <th>Quiz</th>
                  <th>Streak</th>
                  <th>Hours</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((s) => (
                  <tr key={s._id} className="ast-row">

                    {/* Student */}
                    <td>
                      <div className="ast-student-cell">
                        <div
                          className="ast-avatar"
                          style={{ background: avatarColor(s.userId?.name) }}
                        >
                          {getInitial(s.userId?.name)}
                        </div>
                        <div className="ast-student-info">
                          <span className="ast-student-name">{s.userId?.name || "—"}</span>
                          <span className="ast-student-email">{s.userId?.email || "—"}</span>
                        </div>
                      </div>
                    </td>

                    {/* Course */}
                    <td>
                      <span className="ast-course-title">
                        {s.courseId?.title || "—"}
                      </span>
                    </td>

                    {/* Progress */}
                    <td>
                      <div className="ast-progress-cell">
                        <div className="ast-progress-bar">
                          <div
                            className={`ast-progress-fill ${s.completed ? "ast-fill-green" : "ast-fill-indigo"}`}
                            style={{ width: `${s.progress || 0}%` }}
                          />
                        </div>
                        <span className="ast-progress-pct">{s.progress || 0}%</span>
                      </div>
                    </td>

                    {/* Quiz */}
                    <td>
                      <span className="ast-chip ast-chip-violet">
                        {s.quizScore || 0}%
                      </span>
                    </td>

                    {/* Streak */}
                    <td>
                      <span className="ast-chip ast-chip-amber">
                        🔥 {s.userId?.streak || 0}d
                      </span>
                    </td>

                    {/* Hours */}
                    <td>
                      <span className="ast-hours">{s.watchedHours || 0}h</span>
                    </td>

                    {/* Status */}
                    <td>
                      <span className={`ast-status ${s.completed ? "ast-status-done" : "ast-status-active"}`}>
                        {s.completed ? "✓ Completed" : "● Learning"}
                      </span>
                    </td>

                  </tr>
                ))}
              </tbody>
            </table>

            <div className="ast-table-footer">
              Showing {filtered.length} of {students.length} students
            </div>
          </div>
        )}

      </div>
    </AdminLayout>
  );
}
