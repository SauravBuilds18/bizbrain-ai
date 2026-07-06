import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Inventory from "./pages/Inventory";
import Invoices from "./pages/Invoices";
import AIAssistant from "./pages/AIAssistant";
import Timeline from "./pages/Timeline";
import CalendarPage from "./pages/CalendarPage";
import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProtectedRoute from "./components/ProtectedRoute";
import Settings from "./pages/Settings";

function App() {
  return (
    <Routes>
      <Route
    path="/"
    element={<LandingPage />}
  />

  <Route
  path="/dashboard"
  element={
    <ProtectedRoute>
      <Dashboard />
    </ProtectedRoute>
  }
/>
  <Route
  path="/login"
  element={<Login />}
/>
<Route
  path="/register"
  element={<Register />}
/>
<Route
  path="/settings"
  element={
    <ProtectedRoute>
      <Settings />
    </ProtectedRoute>
  }
/>
      <Route path="/inventory" element={<Inventory />} />
      <Route path="/invoices" element={<Invoices />} />
      <Route path="/ai" element={<AIAssistant />} />
      <Route path="/timeline" element={<Timeline />} />
      <Route path="/calendar" element={<CalendarPage />} />
    </Routes>
  );
}

export default App;

