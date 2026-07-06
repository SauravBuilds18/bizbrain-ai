import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {

  const loggedIn =
    localStorage.getItem("bizbrain_loggedIn") === "true";

  if (!loggedIn) {
    return <Navigate to="/login" replace />;
  }

  return children;
}