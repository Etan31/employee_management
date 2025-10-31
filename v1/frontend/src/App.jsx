import { Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import AuthWrapper from "./components/AuthWrapper";

// pages
import Register from "./pages/register/Register";
import Login from "./pages/login/Login";
import Dashboard from "./pages/dashboard/Dashboard";
import UserManagement from "./pages/user_management/user-management";
import Events from "./pages/events/Events";
import Notification from "./pages/notifications/Notifications";
import AccessControl from "./pages/access_control/access-control";
import Support from "./pages/support/Support";
import Settings from "./pages/settings/Settings";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />

      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route
        path="/dashboard"
        element={
          <AuthWrapper>
            <Dashboard />
          </AuthWrapper>
        }
      />
      <Route
        path="/usermanagement"
        element={
          <AuthWrapper>
            <UserManagement />
          </AuthWrapper>
        }
      />
      <Route
        path="/events"
        element={
          <AuthWrapper>
            <Events />
          </AuthWrapper>
        }
      />
      <Route
        path="/notification"
        element={
          <AuthWrapper>
            <Notification />
          </AuthWrapper>
        }
      />
      <Route
        path="/accesscontrol"
        element={
          <AuthWrapper>
            <AccessControl />
          </AuthWrapper>
        }
      />
      <Route
        path="/support"
        element={
          <AuthWrapper>
            <Support />
          </AuthWrapper>
        }
      />
      <Route
        path="/settings"
        element={
          <AuthWrapper>
            <Settings />
          </AuthWrapper>
        }
      />
    </Routes>
  );
}

export default App;
