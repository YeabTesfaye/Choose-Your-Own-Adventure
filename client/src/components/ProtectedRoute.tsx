// src/components/ProtectedRoute.tsx
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Loader2 } from "lucide-react";

export const ProtectedRoute = ({ children }: { children: any }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  // Still checking token/user — avoid redirecting yet
  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  // Not logged in → redirect to login with callback
  if (!user) {
    const callback = encodeURIComponent(location.pathname + location.search);
    return <Navigate to={`/login?callback=${callback}`} replace />;
  }

  return children;
};

// Prevent authenticated users from seeing login/signup
export const AuthRedirectRoute = ({ children }: { children: any }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (user) return <Navigate to="/generate" replace />;
  return children;
};
