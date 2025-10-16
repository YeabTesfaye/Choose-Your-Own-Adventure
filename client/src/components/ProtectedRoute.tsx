// src/components/ProtectedRoute.tsx
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import type { JSX } from "react";

export const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" replace />;
  return children;
};

// Prevent authenticated users from seeing login/signup
export const AuthRedirectRoute = ({ children }: { children: JSX.Element }) => {
  const { user } = useAuth();
  if (user) return <Navigate to="/generate" replace />;
  return children;
};
