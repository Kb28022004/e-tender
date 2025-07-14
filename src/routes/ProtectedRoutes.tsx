// src/routes/ProtectedRoutes.tsx

import { Navigate } from "react-router-dom";

interface RequireAuthProps {
  children: React.ReactNode;
  allowedRoles: string[]; // e.g., ['user'], ['departmental']
}

// 🔐 Protects routes based on role and auth token
export const RequireAuth = ({ children, allowedRoles }: RequireAuthProps) => {
  const token = localStorage.getItem("authToken");
  const user = JSON.parse(localStorage.getItem("userData") || "{}");

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  if (!allowedRoles.includes(user?.role)) {
    return <Navigate to="*" replace />;
  }

  return <>{children}</>;
};

// 🚫 Redirects already authenticated users away from /login or /register
export const RedirectIfAuth = ({ children }: { children: React.ReactNode }) => {
  const token = localStorage.getItem("authToken");
  const user = JSON.parse(localStorage.getItem("userData") || "{}");

  if (!token) return children;

  return user?.role === "departmental" ? (
    <Navigate to="/" replace />
  ) : (
    <Navigate to="/user/tender" replace />
  );
};
