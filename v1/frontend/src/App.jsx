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
        <Route path="/Dashboard" element={<Dashboard/>}/>
        <Route path="/userManagement" element={<UserManagement/>}/>
        <Route path="/Events" element={<Events/>}/>
        <Route path="/Notification" element={<Notification/>}/>
        <Route path="/AccessControl" element={<AccessControl/>}/>
        <Route path="/Support" element={<Support/>}/>
        <Route path="/Settings" element={<Settings/>}/>
        
      </Routes>
    </Router>
  );
}

export default App;
