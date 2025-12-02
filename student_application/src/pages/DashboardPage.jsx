import React from "react";
import { Link } from "react-router-dom";
import { useStudents } from "../context/StudentsContext.jsx";
import Layout from "../components/Layout.jsx";

const DashboardPage = () => {
  const { students } = useStudents();

  return (
    <Layout>
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h2 className="text-base font-semibold text-slate-900">
            Student applications
          </h2>
          <p className="mt-1 text-xs text-slate-500">
            Manage all student applications from a single place.
          </p>
        </div>
        <Link
          to="/students/new"
          className="inline-flex items-center gap-1 rounded-md bg-primary px-3 py-1.5 text-xs font-medium text-white shadow-sm hover:bg-primary/90"
        >
          + New student
        </Link>
      </div>

      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
        <table className="min-w-full divide-y divide-slate-200 text-xs">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-4 py-2 text-left font-medium text-slate-600">
                Full name
              </th>
              <th className="px-4 py-2 text-left font-medium text-slate-600">
                Email
              </th>
              <th className="px-4 py-2 text-left font-medium text-slate-600">
                Course
              </th>
              <th className="px-4 py-2 text-left font-medium text-slate-600">
                Application ID
              </th>
              <th className="px-4 py-2 text-left font-medium text-slate-600">
                Created
              </th>
              <th className="px-4 py-2 text-right font-medium text-slate-600">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 bg-white">
            {students.length === 0 ? (
              <tr>
                <td
                  colSpan={6}
                  className="px-4 py-6 text-center text-xs text-slate-400"
                >
                  No student applications yet. Click "New student" to create one.
                </td>
              </tr>
            ) : (
              students.map((student) => (
                <tr key={student.id}>
                  <td className="px-4 py-2 text-slate-900">
                    {student.fullName}
                  </td>
                  <td className="px-4 py-2 text-slate-600">{student.email}</td>
                  <td className="px-4 py-2 text-slate-600">
                    {student.courseName}
                  </td>
                  <td className="px-4 py-2 text-slate-600">
                    {student.applicationId}
                  </td>
                  <td className="px-4 py-2 text-slate-500">
                    {new Date(student.createdAt).toLocaleString()}
                  </td>
                  <td className="px-4 py-2 text-right">
                    <div className="inline-flex items-center gap-1">
                      <Link
                        to={`/students/${student.id}`}
                        className="rounded-md border border-slate-200 bg-white px-2 py-1 text-[11px] text-slate-700 hover:bg-slate-50"
                      >
                        View
                      </Link>
                      <Link
                        to={`/students/${student.id}/edit`}
                        className="rounded-md border border-slate-200 bg-white px-2 py-1 text-[11px] text-slate-700 hover:bg-slate-50"
                      >
                        Edit
                      </Link>
                      <Link
                        to={`/students/${student.id}/delete`}
                        className="rounded-md border border-red-100 bg-red-50 px-2 py-1 text-[11px] text-red-700 hover:bg-red-100"
                      >
                        Delete
                      </Link>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </Layout>
  );
};

export default DashboardPage;
