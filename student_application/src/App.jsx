import React from "react";
import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext.jsx";
import { StudentsProvider } from "./context/StudentsContext.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import DashboardPage from "./pages/DashboardPage.jsx";
import StudentFormPage from "./pages/StudentFormPage.jsx";
import StudentDetailsPage from "./pages/StudentDetailsPage.jsx";
import StudentDeletePage from "./pages/StudentDeletePage.jsx";

const App = () => {
  return (
    <AuthProvider>
      <StudentsProvider>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/students/new" element={<StudentFormPage />} />
            <Route path="/students/:id/edit" element={<StudentFormPage />} />
            <Route path="/students/:id" element={<StudentDetailsPage />} />
            <Route path="/students/:id/delete" element={<StudentDeletePage />} />
          </Route>
        </Routes>
      </StudentsProvider>
    </AuthProvider>
  );
};

export default App;