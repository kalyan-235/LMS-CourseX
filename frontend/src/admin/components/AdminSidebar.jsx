import {
  NavLink,
  useNavigate,
} from "react-router-dom";

export default function AdminSidebar() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  const navItems = [
    { to: "/admin", label: "📊 Dashboard", end: true },
    { to: "/admin/courses", label: "📚 Courses" },
    { to: "/admin/students", label: "👨‍🎓 Students" },
    { to: "/admin/quiz", label: "📝 Quiz" },
    { to: "/admin/certificates", label: "🏆 Certificates" },
    { to: "/admin/payments", label: "💳 Payments" },
    { to: "/admin/settings", label: "⚙ Settings" },
  ];

  return (
    <div className="admin-sidebar">
      <div className="admin-sidebar-logo">
        <span>CourseX</span>
        <small>Admin Panel</small>
      </div>

      <nav className="admin-nav">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.end}
            className={({ isActive }) =>
              `admin-link ${isActive ? "active" : ""}`
            }
          >
            {item.label}
          </NavLink>
        ))}
      </nav>

      <button className="logout-btn" onClick={logout}>
        ↪ Logout
      </button>
    </div>
  );
}