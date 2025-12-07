// src/Routes/AdminRoute.jsx
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const AdminRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="py-10 text-center text-slate-300 text-sm">
        Checking admin access...
      </div>
    );
  }

  if (!user || user.role !== "admin") {
    return (
      <Navigate
        to="/login"
        replace
        state={{ from: location, message: "Admin access required" }}
      />
    );
  }

  return children;
};

export default AdminRoute;
