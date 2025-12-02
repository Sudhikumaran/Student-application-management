import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import { RedirectToSignIn, useAuth } from "@clerk/clerk-react";

const ProtectedRoute = () => {
  const { isLoaded, isSignedIn } = useAuth();
  const location = useLocation();

  if (!isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-slate-600 text-sm">Checking session...</div>
      </div>
    );
  }

  if (!isSignedIn) {
    return <RedirectToSignIn redirectUrl={location.pathname + location.search} />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
