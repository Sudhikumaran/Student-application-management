import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import Layout from "../components/Layout.jsx";
import { useStudents } from "../context/StudentsContext.jsx";

const StudentDeletePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getStudentById, deleteStudent } = useStudents();

  const student = getStudentById(id);

  const handleConfirm = () => {
    if (!student) {
      navigate("/dashboard");
      return;
    }
    deleteStudent(student.id);
    navigate("/dashboard");
  };

  const handleCancel = () => {
    navigate("/dashboard");
  };

  if (!student) {
    return (
      <Layout>
        <div className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-xs text-amber-800">
          Student not found.
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-lg space-y-4">
        <h2 className="text-base font-semibold text-slate-900">
          Delete student
        </h2>
        <p className="text-xs text-slate-500">
          Are you sure you want to permanently delete this student record?
          This action cannot be undone.
        </p>

        <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-xs text-red-800">
          <div className="font-medium mb-1">Confirm deletion</div>
          <p>
            {student.fullName} – {student.email} ({student.courseName})
          </p>
        </div>

        <div className="flex gap-2">
          <button
            onClick={handleConfirm}
            className="inline-flex items-center rounded-md bg-red-600 px-3 py-1.5 text-xs font-semibold text-white shadow-sm hover:bg-red-700"
          >
            Yes, delete
          </button>
          <button
            onClick={handleCancel}
            className="inline-flex items-center rounded-md border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-50"
          >
            Cancel
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default StudentDeletePage;
