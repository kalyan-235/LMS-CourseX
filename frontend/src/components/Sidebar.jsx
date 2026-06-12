import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  Home,
  Compass,
  BookOpen,
  User,
  CreditCard,
  LogOut,
  Menu,
  X,
  GraduationCap,
} from "lucide-react";

const NAV_ITEMS = [
  { to: "/", label: "Home", icon: <Home size={18} />, section: "Menu" },
  { to: "/explore", label: "Explore", icon: <Compass size={18} />, section: null },
  { to: "/mylearning", label: "My Learning", icon: <BookOpen size={18} />, section: null },
  { to: "/profile", label: "Profile", icon: <User size={18} />, section: "Account" },
  { to: "/payment-history", label: "Payments", icon: <CreditCard size={18} />, section: null },
];

export default function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);

  const user = (() => {
    try { return JSON.parse(localStorage.getItem("user")); } catch { return null; }
  })();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  const isActive = (path) =>
    path === "/"
      ? location.pathname === "/"
      : location.pathname.startsWith(path);

  return (
    <>
      {/* Mobile toggle */}
      <button
        className="sidebar-mobile-toggle"
        onClick={() => setMobileOpen(!mobileOpen)}
        aria-label="Toggle menu"
      >
        {mobileOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Backdrop */}
      {mobileOpen && (
        <div
          className="sidebar-backdrop"
          onClick={() => setMobileOpen(false)}
        />
      )}

      <aside className={`sidebar ${mobileOpen ? "sidebar-open" : ""}`}>
        {/* LOGO */}
        <Link to="/" className="sidebar-logo" onClick={() => setMobileOpen(false)}>
          <div className="sidebar-logo-icon">
            <GraduationCap size={22} />
          </div>
          <span className="sidebar-logo-text">CourseX</span>
        </Link>

        {/* NAV */}
        <nav className="sidebar-nav">
          {NAV_ITEMS.map((item, i) => {
            const prevSection = i > 0 ? NAV_ITEMS[i - 1].section : null;
            return (
              <div key={item.to}>
                {item.section && item.section !== prevSection && (
                  <div className="sidebar-section-label">{item.section}</div>
                )}
                <Link
                  to={item.to}
                  className={`sidebar-nav-item ${isActive(item.to) ? "active" : ""}`}
                  onClick={() => setMobileOpen(false)}
                >
                  <span className="sidebar-nav-icon">{item.icon}</span>
                  <span className="sidebar-nav-label">{item.label}</span>
                  {isActive(item.to) && <span className="sidebar-active-dot" />}
                </Link>
              </div>
            );
          })}
        </nav>

        {/* FOOTER */}
        <div className="sidebar-footer">
          {user ? (
            <>
              <div className="sidebar-user">
                <div className="sidebar-user-avatar">
                  {(user.name || user.email || "U")[0].toUpperCase()}
                </div>
                <div className="sidebar-user-info">
                  <div className="sidebar-user-name">{user.name || "User"}</div>
                  <div className="sidebar-user-role">{user.role || "Student"}</div>
                </div>
              </div>
              <button className="sidebar-logout" onClick={handleLogout}>
                <LogOut size={16} />
                Logout
              </button>
            </>
          ) : (
            <div className="sidebar-auth-links">
              <Link to="/login" className="sidebar-auth-btn sidebar-auth-primary" onClick={() => setMobileOpen(false)}>
                Login
              </Link>
              <Link to="/register" className="sidebar-auth-btn sidebar-auth-ghost" onClick={() => setMobileOpen(false)}>
                Sign Up
              </Link>
            </div>
          )}
        </div>
      </aside>
    </>
  );
}
