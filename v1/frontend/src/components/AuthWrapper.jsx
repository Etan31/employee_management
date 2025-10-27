// AuthWrapper.jsx
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

const AuthWrapper = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch("http://localhost:5000/verify", {
          method: "GET",
          credentials: "include", // sends cookie to backend
        });
        const data = await res.json();
        console.log("data from authwrapper: ", data)

        if (data.success) {
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
        }
      } catch {
        setIsAuthenticated(false);
      }
    };

    checkAuth();
  }, []);

  if (isAuthenticated === null) return null; // or loading spinner

  if (!isAuthenticated) {
    alert("You need to log in to access this page.");
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default AuthWrapper;
