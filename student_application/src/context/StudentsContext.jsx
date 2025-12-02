import React, { createContext, useContext, useEffect, useState } from "react";

const StudentsContext = createContext(null);

const API_BASE_URL = "http://localhost:5000/api";

const mapFromApi = (row) => ({
  id: row.id,
  fullName: row.full_name,
  email: row.email,
  courseName: row.course_name,
  phoneNumber: row.phone_number,
  dateOfBirth: row.date_of_birth,
  address: row.address,
  city: row.city,
  country: row.country,
  notes: row.notes,
  applicationId: row.application_id,
  createdAt: row.created_at,
});

export const StudentsProvider = ({ children }) => {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/students`);
        if (!res.ok) {
          console.error("Failed to load students", await res.text());
          return;
        }
        const data = await res.json();
        setStudents(data.map(mapFromApi));
      } catch (error) {
        console.error("Error loading students", error);
      }
    };

    fetchStudents();
  }, []);

  const addStudent = async ({
    fullName,
    email,
    courseName,
    phoneNumber,
    dateOfBirth,
    address,
    city,
    country,
    notes,
    applicationId,
  }) => {
    const body = {
      full_name: fullName,
      email,
      course_name: courseName,
      phone_number: phoneNumber,
      date_of_birth: dateOfBirth,
      address,
      city,
      country,
      notes,
      application_id: applicationId,
    };

    const res = await fetch(`${API_BASE_URL}/students`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      const text = await res.text();
      throw new Error(text || "Failed to create student");
    }

    const created = mapFromApi(await res.json());
    setStudents((prev) => [created, ...prev]);
    return created;
  };

  const updateStudent = async (id, updates) => {
    const body = {
      full_name: updates.fullName,
      email: updates.email,
      course_name: updates.courseName,
      phone_number: updates.phoneNumber,
      date_of_birth: updates.dateOfBirth,
      address: updates.address,
      city: updates.city,
      country: updates.country,
      notes: updates.notes,
      application_id: updates.applicationId,
    };

    const res = await fetch(`${API_BASE_URL}/students/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      const text = await res.text();
      throw new Error(text || "Failed to update student");
    }

    const updated = mapFromApi(await res.json());
    setStudents((prev) =>
      prev.map((s) => (String(s.id) === String(id) ? updated : s))
    );
  };

  const deleteStudent = async (id) => {
    const res = await fetch(`${API_BASE_URL}/students/${id}`, {
      method: "DELETE",
    });

    if (!res.ok && res.status !== 204) {
      const text = await res.text();
      throw new Error(text || "Failed to delete student");
    }

    setStudents((prev) => prev.filter((s) => String(s.id) !== String(id)));
  };

  const getStudentById = (id) =>
    students.find((s) => String(s.id) === String(id)) || null;

  return (
    <StudentsContext.Provider
      value={{ students, addStudent, updateStudent, deleteStudent, getStudentById }}
    >
      {children}
    </StudentsContext.Provider>
  );
};

export const useStudents = () => {
  const ctx = useContext(StudentsContext);
  if (!ctx) {
    throw new Error("useStudents must be used within a StudentsProvider");
  }
  return ctx;
};
