import {
  NavLink,
  useNavigate,
} from "react-router-dom";

export default function AdminSidebar() {

  const navigate =
    useNavigate();

  const logout = () => {

    localStorage.removeItem(
      "role"
    );

    navigate("/login");
  };

  return (

    <div className="admin-sidebar">

      <nav className="admin-nav">

        <NavLink
          to="/admin"
          className="admin-link"
        >
          📊 Dashboard
        </NavLink>

        <NavLink
          to="/admin/courses"
          className="admin-link"
        >
          📚 Courses
        </NavLink>

        <NavLink
          to="/admin/students"
          className="admin-link"
        >
          👨‍🎓 Students
        </NavLink>

        <NavLink
          to="/admin/quiz"
          className="admin-link"
        >
          📝 Quiz
        </NavLink>

        <NavLink
          to="/admin/certificates"
          className="admin-link"
        >
          🏆 Certificates
        </NavLink>

        <NavLink
          to="/admin/payments"
          className="admin-link"
        >
          💳 Payments
        </NavLink>

        <NavLink
          to="/admin/settings"
          className="admin-link"
        >
          ⚙ Settings
        </NavLink>

      </nav>

      <button
        className="logout-btn"
        onClick={logout}
      >
        Logout
      </button>

    </div>

  );
}