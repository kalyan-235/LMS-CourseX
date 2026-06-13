import { useState, useEffect } from "react";
import {
  Award, Download, Trash2, Search,
  RefreshCw, ExternalLink, Calendar, User, BookOpen,
} from "lucide-react";
import AdminLayout from "../layouts/AdminLayout";
import API from "../../api/axios";
import Loading from "../../components/Loading";

export default function AdminCertificates() {
  const [certificates, setCertificates] = useState([]);
  const [loading,   setLoading]   = useState(true);
  const [deleting,  setDeleting]  = useState(null);
  const [search,    setSearch]    = useState("");

  useEffect(() => { fetchCertificates(); }, []);

  const fetchCertificates = async () => {
    setLoading(true);
    try {
      const res = await API.get("/certificates");
      setCertificates(res.data || []);
    } catch { window.addToast?.("Failed to load certificates", "error"); }
    finally { setLoading(false); }
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this certificate? This cannot be undone.")) return;
    setDeleting(id);
    try {
      await API.delete(`/certificates/${id}`);
      setCertificates(prev => prev.filter(c => c._id !== id));
      window.addToast?.("Certificate deleted", "success");
    } catch { window.addToast?.("Failed to delete certificate", "error"); }
    finally { setDeleting(null); }
  };

  const handleDownload = (cert) => {
    if (cert.certificateUrl) {
      window.open(cert.certificateUrl, "_blank");
    } else {
      window.addToast?.("Certificate file not available", "warning");
    }
  };

  const filtered = certificates.filter(c => {
    const q = search.toLowerCase();
    return (
      c.userId?.name?.toLowerCase().includes(q) ||
      c.courseId?.title?.toLowerCase().includes(q) ||
      c.userId?.email?.toLowerCase().includes(q)
    );
  });

  const total     = certificates.length;
  const thisMonth = certificates.filter(c => {
    const d = new Date(c.createdAt);
    const now = new Date();
    return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
  }).length;

  const AVATAR_COLORS = ["#6366f1","#7c3aed","#0284c7","#059669","#d97706","#dc2626"];
  const avatarColor = (name = "") => AVATAR_COLORS[name.charCodeAt(0) % AVATAR_COLORS.length];
  const getInitial = (name = "") => name[0]?.toUpperCase() || "?";

  if (loading) return <AdminLayout><div style={{padding:"60px",textAlign:"center"}}><Loading fullPage={false}/></div></AdminLayout>;

  return (
    <AdminLayout>
      <div className="acrt-page">

        {/* ── TOPBAR ──────────────────────────────────── */}
        <div className="acrt-topbar">
          <div>
            <h1 className="acrt-title">Certificate Management</h1>
            <p className="acrt-sub">View and manage all issued certificates</p>
          </div>
          <button className="acrt-refresh-btn" onClick={fetchCertificates}>
            <RefreshCw size={15}/> Refresh
          </button>
        </div>

        {/* ── STATS ───────────────────────────────────── */}
        <div className="acrt-stats">
          {[
            { label:"Total Issued",   value: total,     color:"indigo", emoji:"🏆" },
            { label:"This Month",     value: thisMonth, color:"emerald",emoji:"📅" },
            { label:"Unique Students",value: new Set(certificates.map(c => c.userId?._id)).size, color:"violet", emoji:"👥" },
            { label:"Unique Courses", value: new Set(certificates.map(c => c.courseId?._id)).size, color:"amber",  emoji:"📚" },
          ].map((s,i) => (
            <div key={i} className={`acrt-stat acrt-stat-${s.color}`}>
              <span className="acrt-stat-emoji">{s.emoji}</span>
              <div>
                <div className="acrt-stat-val">{s.value}</div>
                <div className="acrt-stat-label">{s.label}</div>
              </div>
            </div>
          ))}
        </div>

        {/* ── SEARCH ──────────────────────────────────── */}
        <div className="acrt-search-row">
          <div className="acrt-search-wrap">
            <Search size={15} className="acrt-search-icon"/>
            <input
              className="acrt-search-input"
              placeholder="Search by student name, course or email…"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
          <span className="acrt-count">{filtered.length} certificate{filtered.length !== 1 ? "s" : ""}</span>
        </div>

        {/* ── EMPTY ───────────────────────────────────── */}
        {filtered.length === 0 && (
          <div className="acrt-empty">
            <Award size={40}/>
            <h3>{search ? "No certificates match your search" : "No certificates issued yet"}</h3>
            <p>Certificates appear here after students complete courses</p>
          </div>
        )}

        {/* ── CERTIFICATES TABLE ───────────────────────── */}
        {filtered.length > 0 && (
          <div className="acrt-table-wrap">
            <table className="acrt-table">
              <thead>
                <tr>
                  <th>Student</th>
                  <th>Course</th>
                  <th>Issued Date</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map(cert => (
                  <tr key={cert._id} className="acrt-row">
                    {/* Student */}
                    <td>
                      <div className="acrt-student">
                        <div className="acrt-avatar" style={{ background: avatarColor(cert.userId?.name) }}>
                          {getInitial(cert.userId?.name)}
                        </div>
                        <div className="acrt-student-info">
                          <span className="acrt-name">{cert.userId?.name || "Unknown"}</span>
                          <span className="acrt-email">{cert.userId?.email || "—"}</span>
                        </div>
                      </div>
                    </td>

                    {/* Course */}
                    <td>
                      <div className="acrt-course-info">
                        <BookOpen size={13} className="acrt-course-icon"/>
                        <span className="acrt-course-name">{cert.courseId?.title || "Unknown"}</span>
                      </div>
                    </td>

                    {/* Date */}
                    <td>
                      <div className="acrt-date">
                        <Calendar size={13}/>
                        {new Date(cert.createdAt).toLocaleDateString("en-IN", {
                          day:"numeric", month:"short", year:"numeric"
                        })}
                      </div>
                    </td>

                    {/* Status */}
                    <td>
                      <span className="acrt-status-badge">
                        ✓ Issued
                      </span>
                    </td>

                    {/* Actions */}
                    <td>
                      <div className="acrt-actions">
                        <button
                          className="acrt-download-btn"
                          onClick={() => handleDownload(cert)}
                          title="Download"
                        >
                          <Download size={14}/> Download
                        </button>
                        <button
                          className="acrt-delete-btn"
                          onClick={() => handleDelete(cert._id)}
                          disabled={deleting === cert._id}
                          title="Delete"
                        >
                          <Trash2 size={14}/> {deleting === cert._id ? "…" : "Delete"}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="acrt-table-footer">
              Showing {filtered.length} of {certificates.length} certificates
            </div>
          </div>
        )}

      </div>
    </AdminLayout>
  );
}
