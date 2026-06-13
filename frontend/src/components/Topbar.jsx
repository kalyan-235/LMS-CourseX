import { useState, useRef, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Home,
  Compass,
  BookOpen,
  CreditCard,
  GraduationCap,
  LogOut,
  User,
  ChevronDown,
  Menu,
  X,
  Bell,
} from "lucide-react";

const NAV_LINKS = [
  { to: "/",              label: "Home",        icon: <Home size={16} /> },
  { to: "/explore",       label: "Explore",     icon: <Compass size={16} /> },
  { to: "/mylearning",    label: "My Learning", icon: <BookOpen size={16} /> },
  // { to: "/payment-history", label: "Payments",  icon: <CreditCard size={16} /> },
];

export default function Topbar() {
  const location  = useLocation();
  const navigate  = useNavigate();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const user = (() => {
    try { return JSON.parse(localStorage.getItem("user")); } catch { return null; }
  })();

  const userInitial = (user?.name || user?.email || "U")[0].toUpperCase();

  const isActive = (path) =>
    path === "/" ? location.pathname === "/" : location.pathname.startsWith(path);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handler = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setUserDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setUserDropdownOpen(false);
  }, [location.pathname]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <>
      {/* ── TOPBAR ─────────────────────────────────────────── */}
      <header className="topbar">
        <div className="topbar-inner">

          {/* LEFT — Logo */}
          <Link to="/" className="topbar-logo">
            <div className="topbar-logo-icon">
              <GraduationCap size={20} />
            </div>
            <span className="topbar-logo-text">CourseX</span>
          </Link>

          {/* CENTER — Nav links (desktop) */}
          <nav className="topbar-nav">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`topbar-nav-link ${isActive(link.to) ? "topbar-nav-link--active" : ""}`}
              >
                {link.icon}
                <span>{link.label}</span>
                {isActive(link.to) && <span className="topbar-nav-indicator" />}
              </Link>
            ))}
          </nav>

          {/* RIGHT — User actions */}
          <div className="topbar-actions">

            {user ? (
              <>
                {/* Notification bell */}
                <button className="topbar-icon-btn" aria-label="Notifications">
                  <Bell size={18} />
                </button>

                {/* User dropdown */}
                <div className="topbar-user-wrap" ref={dropdownRef}>
                  <button
                    className="topbar-user-btn"
                    onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                    aria-label="User menu"
                  >
                    <div className="topbar-avatar">{userInitial}</div>
                    <span className="topbar-username">{user.name?.split(" ")[0]}</span>
                    <ChevronDown
                      size={14}
                      className={`topbar-chevron ${userDropdownOpen ? "topbar-chevron--open" : ""}`}
                    />
                  </button>

                  {/* Dropdown menu */}
                  {userDropdownOpen && (
                    <div className="topbar-dropdown">
                      {/* User info header */}
                      <div className="topbar-dropdown-header">
                        <div className="topbar-dropdown-avatar">{userInitial}</div>
                        <div>
                          <div className="topbar-dropdown-name">{user.name}</div>
                          <div className="topbar-dropdown-email">{user.email}</div>
                        </div>
                      </div>

                      <div className="topbar-dropdown-divider" />

                      <Link to="/profile" className="topbar-dropdown-item">
                        <User size={15} />
                        My Profile
                      </Link>
                      <Link to="/payment-history" className="topbar-dropdown-item">
                        <CreditCard size={15} />
                        Payment History
                      </Link>

                      <div className="topbar-dropdown-divider" />

                      <button className="topbar-dropdown-item topbar-dropdown-logout" onClick={handleLogout}>
                        <LogOut size={15} />
                        Sign Out
                      </button>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <div className="topbar-auth-btns">
                <Link to="/login" className="topbar-btn-login">Login</Link>
                <Link to="/register" className="topbar-btn-signup">Sign Up</Link>
              </div>
            )}

            {/* Mobile hamburger */}
            <button
              className="topbar-hamburger"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* ── MOBILE MENU ──────────────────────────────────── */}
        {mobileMenuOpen && (
          <div className="topbar-mobile-menu">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`topbar-mobile-link ${isActive(link.to) ? "topbar-mobile-link--active" : ""}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.icon}
                <span>{link.label}</span>
              </Link>
            ))}

            <div className="topbar-mobile-divider" />

            {user ? (
              <>
                <Link to="/profile" className="topbar-mobile-link" onClick={() => setMobileMenuOpen(false)}>
                  <User size={16} />
                  <span>Profile</span>
                </Link>
                <button className="topbar-mobile-link topbar-mobile-logout" onClick={handleLogout}>
                  <LogOut size={16} />
                  <span>Sign Out</span>
                </button>
              </>
            ) : (
              <div className="topbar-mobile-auth">
                <Link to="/login" className="topbar-btn-login" onClick={() => setMobileMenuOpen(false)}>Login</Link>
                <Link to="/register" className="topbar-btn-signup" onClick={() => setMobileMenuOpen(false)}>Sign Up</Link>
              </div>
            )}
          </div>
        )}
      </header>

      {/* Spacer so content doesn't hide under fixed topbar */}
      <div className="topbar-spacer" />
    </>
  );
}
