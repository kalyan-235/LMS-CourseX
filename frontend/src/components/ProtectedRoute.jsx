// 1. ProtectedRoute — allow regular users for /payment-history, block only non-admins from /admin
import { Navigate, useLocation } from "react-router-dom";

export default function ProtectedRoute({ children, adminOnly = false }) {
  const location = useLocation();

  let user = null;
  try {
    user = JSON.parse(localStorage.getItem("user"));
  } catch {}

  // Not logged in at all → go to login
  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Admin-only route but user is not admin → go to login
  if (adminOnly && !user.isAdmin) {
    return <Navigate to="/login" replace />;
  }

  return children;
}