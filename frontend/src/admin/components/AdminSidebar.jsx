import { NavLink, useNavigate, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  BookOpen,
  GraduationCap,
  ClipboardList,
  Award,
  CreditCard,
  Settings,
  LogOut,
  ChevronRight,
} from "lucide-react";

const NAV_ITEMS = [
  { to: "/admin",              label: "Dashboard",    icon: <LayoutDashboard size={18} />, end: true },
  { to: "/admin/courses",      label: "Courses",      icon: <BookOpen        size={18} /> },
  { to: "/admin/students",     label: "Students",     icon: <GraduationCap   size={18} /> },
  { to: "/admin/quiz",         label: "Quiz",         icon: <ClipboardList   size={18} /> },
  { to: "/admin/certificates", label: "Certificates", icon: <Award           size={18} /> },
  { to: "/admin/payments",     label: "Payments",     icon: <CreditCard      size={18} /> },
  { to: "/admin/settings",     label: "Settings",     icon: <Settings        size={18} /> },
];

export default function AdminSidebar() {
  const navigate  = useNavigate();
  const location  = useLocation();

  const user = (() => {
    try { return JSON.parse(localStorage.getItem("user")); } catch { return null; }
  })();

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <aside className="adm-sidebar">

      {/* ── Logo ─────────────────────────────────────── */}
      <div className="adm-logo">
        <div className="adm-logo-icon">CX</div>
        <div className="adm-logo-text">
          <span className="adm-logo-name">CourseX</span>
          <span className="adm-logo-role">Admin Panel</span>
        </div>
      </div>

      {/* ── Nav ──────────────────────────────────────── */}
      <nav className="adm-nav">
        <p className="adm-nav-section">Main Menu</p>
        {NAV_ITEMS.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.end}
            className={({ isActive }) =>
              `adm-nav-link ${isActive ? "adm-nav-link--active" : ""}`
            }
          >
            <span className="adm-nav-icon">{item.icon}</span>
            <span className="adm-nav-label">{item.label}</span>
            <ChevronRight size={14} className="adm-nav-arrow" />
          </NavLink>
        ))}
      </nav>

      {/* ── Footer ───────────────────────────────────── */}
      <div className="adm-sidebar-footer">
        <div className="adm-user-card">
          <div className="adm-user-avatar">
            {(user?.name || "A")[0].toUpperCase()}
          </div>
          <div className="adm-user-info">
            <span className="adm-user-name">{user?.name || "Admin"}</span>
            <span className="adm-user-email">{user?.email || ""}</span>
          </div>
        </div>
        <button className="adm-logout-btn" onClick={logout}>
          <LogOut size={16} />
          Sign Out
        </button>
      </div>

    </aside>
  );
}
