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
  const [phoneNumber, setPhoneNumber] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [applicationId, setApplicationId] = useState("");
  const [notes, setNotes] = useState("");
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
      setPhoneNumber(existing.phoneNumber || "");
      setDateOfBirth(existing.dateOfBirth || "");
      setAddress(existing.address || "");
      setCity(existing.city || "");
      setCountry(existing.country || "");
      setApplicationId(existing.applicationId || "");
      setNotes(existing.notes || "");
    }
  }, [id, isEdit, getStudentById]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (
      !fullName.trim() ||
      !email.trim() ||
      !courseName.trim() ||
      !phoneNumber.trim() ||
      !dateOfBirth ||
      !address.trim() ||
      !city.trim() ||
      !country.trim() ||
      !applicationId.trim()
    ) {
      setError("Please fill in all required fields.");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (isEdit) {
      updateStudent(id, {
        fullName: fullName.trim(),
        email: email.trim(),
        courseName: courseName.trim(),
        phoneNumber: phoneNumber.trim(),
        dateOfBirth,
        address: address.trim(),
        city: city.trim(),
        country: country.trim(),
        applicationId: applicationId.trim(),
        notes: notes.trim(),
      });
      setSuccess("Student updated successfully.");
      setTimeout(() => navigate("/dashboard"), 800);
    } else {
      addStudent({
        fullName: fullName.trim(),
        email: email.trim(),
        courseName: courseName.trim(),
        phoneNumber: phoneNumber.trim(),
        dateOfBirth,
        address: address.trim(),
        city: city.trim(),
        country: country.trim(),
        applicationId: applicationId.trim(),
        notes: notes.trim(),
      });
      setSuccess("Student added successfully.");
      setFullName("");
      setEmail("");
      setCourseName("");
      setPhoneNumber("");
      setDateOfBirth("");
      setAddress("");
      setCity("");
      setCountry("");
      setApplicationId("");
      setNotes("");
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

          <div className="space-y-1">
            <label className="block text-xs font-medium text-slate-700">
              Phone number
            </label>
            <input
              type="tel"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="block w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-xs text-slate-900 shadow-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              required
            />
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-1">
              <label className="block text-xs font-medium text-slate-700">
                Date of birth
              </label>
              <input
                type="date"
                value={dateOfBirth}
                onChange={(e) => setDateOfBirth(e.target.value)}
                className="block w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-xs text-slate-900 shadow-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                required
              />
            </div>

            <div className="space-y-1">
              <label className="block text-xs font-medium text-slate-700">
                Application ID / Roll number
              </label>
              <input
                type="text"
                value={applicationId}
                onChange={(e) => setApplicationId(e.target.value)}
                className="block w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-xs text-slate-900 shadow-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                required
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="block text-xs font-medium text-slate-700">
              Address
            </label>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="block w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-xs text-slate-900 shadow-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              required
            />
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-1">
              <label className="block text-xs font-medium text-slate-700">
                City
              </label>
              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="block w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-xs text-slate-900 shadow-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                required
              />
            </div>
            <div className="space-y-1">
              <label className="block text-xs font-medium text-slate-700">
                Country
              </label>
              <input
                type="text"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                className="block w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-xs text-slate-900 shadow-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                required
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="block text-xs font-medium text-slate-700">
              Notes / comments
            </label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={3}
              className="block w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-xs text-slate-900 shadow-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary resize-none"
              placeholder="Any additional information about this application"
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
