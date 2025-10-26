import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";

// pages
import Register from "./pages/register/Register";
import Login from "./pages/login/Login";
import Dashboard from "./pages/dashboard/Dashboard";
import UserManagement from './pages/user_management/user-management';
import Events from './pages/events/Events';
import Notification from './pages/notifications/Notifications';
import AccessControl from './pages/access_control/access-control';
import Support from './pages/support/Support';
import Settings from './pages/settings/Settings';




function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />

        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard/>}/>
        <Route path="/usermanagement" element={<UserManagement/>}/>
        <Route path="/events" element={<Events/>}/>
        <Route path="/notification" element={<Notification/>}/>
        <Route path="/accesscontrol" element={<AccessControl/>}/>
        <Route path="/support" element={<Support/>}/>
        <Route path="/settings" element={<Settings/>}/>
        
      </Routes>
    </Router>
  );
}

export default App;
