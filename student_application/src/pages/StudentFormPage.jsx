import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Layout from "../components/Layout.jsx";
import { useStudents } from "../context/StudentsContext.jsx";

const StudentFormPage = () => {
  const { id } = useParams();
  const isEdit = Boolean(id);
  const navigate = useNavigate();
  const { addStudent, getStudentById, updateStudent } = useStudents();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [courseName, setCourseName] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    if (isEdit) {
      const existing = getStudentById(id);
      if (!existing) {
        setError("Student not found");
        return;
      }
      setFullName(existing.fullName);
      setEmail(existing.email);
      setCourseName(existing.courseName);
    }
  }, [id, isEdit, getStudentById]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!fullName.trim() || !email.trim() || !courseName.trim()) {
      setError("Please fill in all fields.");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (isEdit) {
      updateStudent(id, { fullName: fullName.trim(), email: email.trim(), courseName: courseName.trim() });
      setSuccess("Student updated successfully.");
      setTimeout(() => navigate("/dashboard"), 800);
    } else {
      addStudent({
        fullName: fullName.trim(),
        email: email.trim(),
        courseName: courseName.trim(),
      });
      setSuccess("Student added successfully.");
      setFullName("");
      setEmail("");
      setCourseName("");
      setTimeout(() => navigate("/dashboard"), 800);
    }
  };

  return (
    <Layout>
      <div className="max-w-lg">
        <h2 className="text-base font-semibold text-slate-900 mb-1">
          {isEdit ? "Edit student" : "Add new student"}
        </h2>
        <p className="text-xs text-slate-500 mb-4">
          {isEdit
            ? "Update the student application details."
            : "Create a new student application record."}
        </p>

        {error && (
          <div className="mb-3 rounded-md border border-red-200 bg-red-50 px-3 py-2 text-xs text-red-700">
            {error}
          </div>
        )}

        {success && (
          <div className="mb-3 rounded-md border border-emerald-200 bg-emerald-50 px-3 py-2 text-xs text-emerald-700">
            {success}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1">
            <label className="block text-xs font-medium text-slate-700">
              Full name
            </label>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="block w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-xs text-slate-900 shadow-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              required
            />
          </div>

          <div className="space-y-1">
            <label className="block text-xs font-medium text-slate-700">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="block w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-xs text-slate-900 shadow-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              required
            />
          </div>

          <div className="space-y-1">
            <label className="block text-xs font-medium text-slate-700">
              Course name
            </label>
            <input
              type="text"
              value={courseName}
              onChange={(e) => setCourseName(e.target.value)}
              className="block w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-xs text-slate-900 shadow-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              required
            />
          </div>

          <button
            type="submit"
            className="inline-flex items-center rounded-md bg-primary px-4 py-2 text-xs font-semibold text-white shadow-sm hover:bg-primary/90"
          >
            {isEdit ? "Save changes" : "Create student"}
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default StudentFormPage;
