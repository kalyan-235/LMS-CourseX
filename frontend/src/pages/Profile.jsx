import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Camera, LogOut, BookOpen, Clock, Award, CheckCircle2,
  TrendingUp, ChevronRight, Download, Play,
  User, Bell, Lock, HelpCircle, Info, Shield,
  Edit3, MapPin, Mail,
} from "lucide-react";
import API from "../api/axios";
import Loading from "../components/Loading";

const ACHIEVEMENTS = [
  { emoji:"🎓", label:"First Step",    desc:"Enrolled in first course",  check:(e)=>e.length>=1 },
  { emoji:"🚀", label:"Eager Learner", desc:"Enrolled in 3+ courses",    check:(e)=>e.length>=3 },
  { emoji:"✅", label:"Certified",     desc:"Completed a course",        check:(e,c)=>c>=1 },
  { emoji:"🏆", label:"Top Student",   desc:"Completed 2+ courses",      check:(e,c)=>c>=2 },
  { emoji:"⚡", label:"Fast Learner",  desc:"Watched 10+ hours",         check:(e,c,h)=>h>=10 },
  { emoji:"💎", label:"Champion",      desc:"Completed 5+ courses",      check:(e,c)=>c>=5 },
];

export default function Profile() {
  const [user,         setUser]         = useState(null);
  const [enrollments,  setEnrollments]  = useState([]);
  const [certificates, setCertificates] = useState([]);
  const [loading,      setLoading]      = useState(true);
  const [uploading,    setUploading]    = useState(false);
  const [activeTab,    setActiveTab]    = useState("courses");
  const navigate = useNavigate();

  useEffect(() => {
    Promise.all([fetchProfile(), fetchEnrollments(), fetchCertificates()])
      .finally(() => setLoading(false));
  }, []);

  const fetchProfile = async () => {
    try {
      const stored = localStorage.getItem("user");
      if (stored) setUser(JSON.parse(stored));
      const res = await API.get("/profile");
      setUser(res.data);
    } catch (err) { console.log(err); }
  };

  const fetchEnrollments = async () => {
    try {
      const res = await API.get("/enrollments/my-courses");
      setEnrollments((res.data || []).filter(i => i?.courseId?._id));
    } catch (err) { console.log(err); }
  };

  const fetchCertificates = async () => {
    try {
      const res = await API.get("/certificates/my");
      setCertificates(res.data || []);
    } catch (err) { console.log(err); }
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true);
    try {
      const fd = new FormData();
      fd.append("image", file);
      const imgRes  = await API.post("/upload/image", fd);
      const profRes = await API.put("/profile", { profileImage: imgRes.data.imageUrl });
      setUser(profRes.data);
      const stored = JSON.parse(localStorage.getItem("user") || "{}");
      localStorage.setItem("user", JSON.stringify({ ...stored, profileImage: imgRes.data.imageUrl }));
      window.addToast?.("Profile photo updated!", "success");
    } catch { window.addToast?.("Failed to upload photo", "error"); }
    finally { setUploading(false); }
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  // ── stats ─────────────────────────────────────────────────
  const completedCount  = enrollments.filter(i => i.completed).length;
  const inProgressCount = enrollments.filter(i => !i.completed).length;
  const totalWatched    = enrollments.reduce((s, i) => s + (i.watchedHours || 0), 0);
  const avgProgress     = enrollments.length
    ? Math.round(enrollments.reduce((s, i) => s + (i.progress || 0), 0) / enrollments.length)
    : 0;

  const earnedAchievements = ACHIEVEMENTS.filter(a =>
    a.check(enrollments, completedCount, totalWatched)
  );

  const userInitial = (user?.name || "U")[0].toUpperCase();

  if (loading) return <div className="prf-page"><Loading fullPage={false}/></div>;

  return (
    <div className="prf-page">

      <div className="prf-cover-section">
        <div className="prf-cover-bg" />

        <div className="prf-avatar-center">
          <div className="prf-avatar-ring">
            {user?.profileImage ? (
              <img src={user.profileImage} alt={user?.name} className="prf-avatar-img"/>
            ) : (
              <div className="prf-avatar-letter">{userInitial}</div>
            )}
            <label className={`prf-cam-btn ${uploading ? "prf-cam-btn--spin" : ""}`}>
              {uploading ? <span className="prf-spin-ico"/> : <Camera size={13}/>}
              <input type="file" accept="image/*" onChange={handleImageUpload} hidden/>
            </label>
          </div>
        </div>
      </div>

      <div className="prf-identity-section">
        <h1 className="prf-name">{user?.name || "Student"}</h1>
        <p className="prf-email">
          <Mail size={13}/> {user?.email}
        </p>
        <div className="prf-identity-badges">
          <span className="prf-badge prf-badge-pro">⭐ Pro Member</span>
          {completedCount > 0 && (
            <span className="prf-badge prf-badge-cert">🏆 Certified Learner</span>
          )}
          {earnedAchievements.length > 0 && (
            <span className="prf-badge prf-badge-ach">🎖️ {earnedAchievements.length} Achievement{earnedAchievements.length>1?"s":""}</span>
          )}
        </div>
      </div>

      <div className="prf-stats-row">
        {[
          { emoji:"📚", value: enrollments.length,  label:"Enrolled",     color:"indigo" },
          { emoji:"🔥", value: inProgressCount,     label:"In Progress",  color:"amber"  },
          { emoji:"✅", value: completedCount,      label:"Completed",    color:"green"  },
          { emoji:"🏆", value: certificates.length, label:"Certificates", color:"violet" },
          { emoji:"⏱",  value: totalWatched+"h",    label:"Hours Watched",color:"sky"    },
        ].map((s,i) => (
          <div key={i} className={`prf-stat prf-stat-${s.color}`}>
            <span className="prf-stat-emoji">{s.emoji}</span>
            <span className="prf-stat-value">{s.value}</span>
            <span className="prf-stat-label">{s.label}</span>
          </div>
        ))}
      </div>

      <div className="prf-progress-banner">
        <div className="prf-progress-banner-left">
          <span className="prf-progress-title">Overall Learning Progress</span>
          <span className="prf-progress-sub">
            {completedCount} of {enrollments.length} courses completed
          </span>
        </div>
        <div className="prf-progress-bar-wrap">
          <div className="prf-progress-track">
            <div className="prf-progress-fill" style={{ width: `${avgProgress}%` }}/>
          </div>
          <span className="prf-progress-pct">{avgProgress}%</span>
        </div>
      </div>

      <div className="prf-main">

        {/* TABS */}
        <div className="prf-tabs-strip">
          {[
            { key:"courses",      label:"My Courses",    count: enrollments.length },
            { key:"certs",        label:"Certificates",  count: certificates.length },
            { key:"achievements", label:"Achievements",  count: earnedAchievements.length },
          ].map(t => (
            <button
              key={t.key}
              className={`prf-tab-btn ${activeTab===t.key ? "prf-tab-btn--active":""}`}
              onClick={() => setActiveTab(t.key)}
            >
              {t.label}
              <span className={`prf-tab-badge ${activeTab===t.key ? "prf-tab-badge--on":""}`}>
                {t.count}
              </span>
            </button>
          ))}
        </div>

        {/* ── COURSES ─────────────────────────────────── */}
        {activeTab === "courses" && (
          <>
            {enrollments.length === 0 ? (
              <div className="prf-empty">
                <div className="prf-empty-icon">📚</div>
                <h3>No courses yet</h3>
                <p>Discover and enroll in courses to start learning</p>
                <Link to="/explore" className="prf-empty-cta">Explore Courses →</Link>
              </div>
            ) : (
              <div className="prf-courses-grid">
                {enrollments.map(item => {
                  const c = item.courseId;
                  if (!c?._id) return null;
                  return (
                    <Link key={item._id} to={`/course/${c._id}`} className={`prf-course-card ${item.completed?"prf-card-done":""}`}>
                      {/* thumbnail */}
                      <div className="prf-card-thumb">
                        <img
                          src={c.image}
                          alt={c.title}
                          onError={e=>{e.target.src="https://images.unsplash.com/photo-1593720219276-0b1eacd0aef4?w=400&h=220&fit=crop";}}
                        />
                        {item.completed && (
                          <div className="prf-card-done-overlay"><CheckCircle2 size={22}/></div>
                        )}
                        <span className="prf-card-cat">{c.category}</span>
                      </div>
                      {/* body */}
                      <div className="prf-card-body">
                        <div className="prf-card-status-row">
                          <span className={`prf-card-status ${item.completed?"prf-s-done":"prf-s-active"}`}>
                            {item.completed ? "✓ Completed" : "● In Progress"}
                          </span>
                          <span className="prf-card-hours"><Clock size={12}/> {c.totalHours||24}h</span>
                        </div>
                        <h3 className="prf-card-title">{c.title}</h3>
                        <p className="prf-card-author">by {c.author}</p>
                        {/* progress */}
                        <div className="prf-card-prog-row">
                          <div className="prf-card-prog-track">
                            <div
                              className={`prf-card-prog-fill ${item.completed?"prf-fill-green":"prf-fill-indigo"}`}
                              style={{width:`${item.progress||0}%`}}
                            />
                          </div>
                          <span className="prf-card-prog-pct">{item.progress||0}%</span>
                        </div>
                      </div>
                      {/* footer */}
                      <div className="prf-card-footer">
                        <span className={item.completed ? "prf-btn-review" : "prf-btn-resume"}>
                          {item.completed ? "Review Course" : <><Play size={12}/> Resume</>}
                          <ChevronRight size={13}/>
                        </span>
                      </div>
                    </Link>
                  );
                })}
              </div>
            )}
          </>
        )}

        {/* ── CERTIFICATES ────────────────────────────── */}
        {activeTab === "certs" && (
          <>
            {certificates.length === 0 ? (
              <div className="prf-empty">
                <div className="prf-empty-icon">🏆</div>
                <h3>No certificates yet</h3>
                <p>Complete a course to earn a verified certificate</p>
                <Link to="/mylearning" className="prf-empty-cta">Go to My Learning →</Link>
              </div>
            ) : (
              <div className="prf-certs-grid">
                {certificates.map(cert => (
                  <div key={cert._id} className="prf-cert-card">
                    <div className="prf-cert-top">
                      <div className="prf-cert-medal">🏆</div>
                      <span className="prf-cert-verified">✓ Verified</span>
                    </div>
                    <h4 className="prf-cert-course">
                      {cert.courseId?.title || cert.courseName || "Course"}
                    </h4>
                    <p className="prf-cert-date">
                      Issued on {new Date(cert.createdAt).toLocaleDateString("en-IN",{day:"numeric",month:"short",year:"numeric"})}
                    </p>
                    <button
                      className="prf-cert-dl"
                      onClick={() => {
                        if (cert.certificateUrl) window.open(cert.certificateUrl,"_blank");
                        else window.addToast?.("File not available","warning");
                      }}
                    >
                      <Download size={14}/> Download Certificate
                    </button>
                  </div>
                ))}
              </div>
            )}
          </>
        )}

        {/* ── ACHIEVEMENTS ────────────────────────────── */}
        {activeTab === "achievements" && (
          <div className="prf-ach-grid">
            {ACHIEVEMENTS.map((ach, i) => {
              const earned = ach.check(enrollments, completedCount, totalWatched);
              return (
                <div key={i} className={`prf-ach-card ${earned?"prf-ach-earned":"prf-ach-locked"}`}>
                  <div className="prf-ach-emoji">{earned ? ach.emoji : "🔒"}</div>
                  <h4 className="prf-ach-name">{ach.label}</h4>
                  <p className="prf-ach-desc">{ach.desc}</p>
                  {earned && <span className="prf-ach-tag">Earned ✓</span>}
                </div>
              );
            })}
          </div>
        )}

      </div>

      <div className="prf-bottom">
        <div className="prf-menu-section">
          <h3 className="prf-menu-heading">Account Settings</h3>
          <div className="prf-menu-grid">
            {[
              { icon:<User size={16}/>,       label:"Edit Profile",       desc:"Update your name & photo",    color:"indigo" },
              { icon:<Bell size={16}/>,       label:"Notifications",      desc:"Manage alert preferences",    color:"amber"  },
              { icon:<Lock size={16}/>,       label:"Privacy & Security", desc:"Password, 2FA & data",        color:"red"    },
              { icon:<Shield size={16}/>,     label:"My Certificates",    desc:"View & download certs",       color:"green", action:()=>setActiveTab("certs") },
              { icon:<HelpCircle size={16}/>, label:"Help Center",        desc:"FAQs and support",            color:"sky"    },
              { icon:<Info size={16}/>,       label:"About CourseX",      desc:"Version info & terms",        color:"slate"  },
            ].map((m,i) => (
              <button key={i} className="prf-menu-tile" onClick={m.action}>
                <div className={`prf-menu-ico prf-ico-${m.color}`}>{m.icon}</div>
                <div className="prf-menu-text">
                  <span className="prf-menu-label">{m.label}</span>
                  <span className="prf-menu-desc">{m.desc}</span>
                </div>
                <ChevronRight size={13} className="prf-menu-arrow"/>
              </button>
            ))}
          </div>
        </div>

        <button className="prf-logout" onClick={handleLogout}>
          <LogOut size={16}/> Sign Out
        </button>
      </div>

    </div>
  );
}
