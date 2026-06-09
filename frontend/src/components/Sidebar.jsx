import { Link, useLocation } from "react-router-dom";

export default function Sidebar() {

  const location = useLocation();

  return (
    <aside className="sidebar">

      <div className="logo">
        <div className="logo-ic">L</div>
        <span className="logo-tx">LearnHub</span>
      </div>

      <nav className="nav">

        <div className="nlabel">Menu</div>

        <Link
          to="/"
          className={`ni ${
            location.pathname === "/" ? "active" : ""
          }`}
        >
          Home
        </Link>

        <Link
          to="/explore"
          className={`ni ${
            location.pathname === "/explore"
              ? "active"
              : ""
          }`}
        >
          Explore
        </Link>

        <Link
          to="/mylearning"
          className={`ni ${
            location.pathname === "/mylearning"
              ? "active"
              : ""
          }`}
        >
          My Learning
        </Link>

        <div className="nlabel">Account</div>

        <Link
          to="/profile"
          className={`ni ${
            location.pathname === "/profile"
              ? "active"
              : ""
          }`}
        >
          Profile
        </Link>

        <Link
          to="/payment-history"
          className={`ni ${
            location.pathname === "/payment-history"
              ? "active"
              : ""
          }`}
        >
          💳 Payments
        </Link>

      </nav>
    </aside>
  );
}