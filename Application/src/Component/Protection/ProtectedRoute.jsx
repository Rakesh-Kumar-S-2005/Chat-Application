import { Navigate } from "react-router-dom";

const isTokenValid = () => {
  const token = localStorage.getItem("token");
  if (!token) return false;

  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    const currentTime = Date.now() / 1000;

    return payload.exp > currentTime;
  } catch (err) {
    return false;
  }
};

export const ProtectedRoute = ({ children }) => {
  return isTokenValid() ? children : <Navigate to="/login" replace />;
};
