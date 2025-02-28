
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

export function ProtectedRoute() {
  const { user, isLoading } = useAuth();
  
  // Show loading or spinner while checking authentication
  if (isLoading) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }
  
  // If not authenticated, redirect to login
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  
  // If authenticated, render the protected content
  return <Outlet />;
}
