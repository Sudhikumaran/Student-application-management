import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useUser, useClerk } from "@clerk/clerk-react";

const Layout = ({ children }) => {
  const { user } = useUser();
  const { signOut } = useClerk();
  const location = useLocation();

  const handleLogout = () => {
    signOut({ redirectUrl: "/" });
  };

  const isDashboard = location.pathname === "/dashboard";

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="border-b bg-white">
        <div className="mx-auto max-w-5xl px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary font-semibold">
              SA
            </div>
            <div>
              <h1 className="text-sm font-semibold text-slate-900">
                Student Application Management
              </h1>
              <p className="text-xs text-slate-500">Admin Panel</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            {user && (
              <div className="text-xs text-slate-500">
                Signed in as{" "}
                <span className="font-medium">
                  {user.fullName || user.primaryEmailAddress?.emailAddress ||
                    user.username || "Admin"}
                </span>
              </div>
            )}
            <div className="flex items-center gap-2">
              {isDashboard ? (
                <Link
                  to="/students/new"
                  className="inline-flex items-center gap-1 rounded-md bg-primary px-3 py-1.5 text-xs font-medium text-white shadow-sm hover:bg-primary/90"
                >
                  + New student
                </Link>
              ) : (
                <Link
                  to="/dashboard"
                  className="inline-flex items-center gap-1 rounded-md border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-50"
                >
                  ← Back to dashboard
                </Link>
              )}
              <button
                onClick={handleLogout}
                className="inline-flex items-center rounded-md border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-50"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-4 py-6">{children}</main>
    </div>
  );
};

export default Layout;
