import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import Layout from "../components/Layout.jsx";
import { useStudents } from "../context/StudentsContext.jsx";

const StudentDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getStudentById } = useStudents();

  const student = getStudentById(id);

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
        <div>
          <h2 className="text-base font-semibold text-slate-900 mb-1">
            Student details
          </h2>
          <p className="text-xs text-slate-500">
            Clean overview of the student application.
          </p>
        </div>

        <dl className="divide-y divide-slate-100 overflow-hidden rounded-xl border border-slate-200 bg-white text-xs">
          <div className="grid grid-cols-3 gap-4 px-4 py-3">
            <dt className="text-slate-500">Full name</dt>
            <dd className="col-span-2 text-slate-900">{student.fullName}</dd>
          </div>
          <div className="grid grid-cols-3 gap-4 px-4 py-3">
            <dt className="text-slate-500">Email</dt>
            <dd className="col-span-2 text-slate-900">{student.email}</dd>
          </div>
          <div className="grid grid-cols-3 gap-4 px-4 py-3">
            <dt className="text-slate-500">Course</dt>
            <dd className="col-span-2 text-slate-900">{student.courseName}</dd>
          </div>
          <div className="grid grid-cols-3 gap-4 px-4 py-3">
            <dt className="text-slate-500">Application ID</dt>
            <dd className="col-span-2 text-slate-900">{student.applicationId}</dd>
          </div>
          <div className="grid grid-cols-3 gap-4 px-4 py-3">
            <dt className="text-slate-500">Phone number</dt>
            <dd className="col-span-2 text-slate-900">{student.phoneNumber}</dd>
          </div>
          <div className="grid grid-cols-3 gap-4 px-4 py-3">
            <dt className="text-slate-500">Date of birth</dt>
            <dd className="col-span-2 text-slate-900">{student.dateOfBirth}</dd>
          </div>
          <div className="grid grid-cols-3 gap-4 px-4 py-3">
            <dt className="text-slate-500">Address</dt>
            <dd className="col-span-2 text-slate-900">
              {student.address}
              {student.city ? `, ${student.city}` : ""}
              {student.country ? `, ${student.country}` : ""}
            </dd>
          </div>
          <div className="grid grid-cols-3 gap-4 px-4 py-3">
            <dt className="text-slate-500">Created date</dt>
            <dd className="col-span-2 text-slate-900">
              {new Date(student.createdAt).toLocaleString()}
            </dd>
          </div>
          {student.notes && (
            <div className="grid grid-cols-3 gap-4 px-4 py-3">
              <dt className="text-slate-500">Notes</dt>
              <dd className="col-span-2 text-slate-900 whitespace-pre-wrap">
                {student.notes}
              </dd>
            </div>
          )}
        </dl>

        <div className="flex gap-2">
          <button
            onClick={() => navigate(`/students/${student.id}/edit`)}
            className="inline-flex items-center rounded-md bg-primary px-3 py-1.5 text-xs font-semibold text-white shadow-sm hover:bg-primary/90"
          >
            Edit student
          </button>
          <button
            onClick={() => navigate("/dashboard")}
            className="inline-flex items-center rounded-md border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-50"
          >
            Back to dashboard
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default StudentDetailsPage;
