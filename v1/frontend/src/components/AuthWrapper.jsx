import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const AuthWrapper = ({ children, adminOnly }) => {
  const { user, loading } = useAuth();

  if (loading) return <div>Loading...</div>;

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (adminOnly && user.role !== "admin") {
    return <Navigate to="/unauthorized" />;
  }

  return children;
};

export default AuthWrapper;
