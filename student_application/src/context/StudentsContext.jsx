import React, { createContext, useContext, useEffect, useState } from "react";

const StudentsContext = createContext(null);

const STORAGE_KEY = "students";

const generateId = () => crypto.randomUUID();

export const StudentsProvider = ({ children }) => {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        setStudents(JSON.parse(stored));
      } catch {
        setStudents([]);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(students));
  }, [students]);

  const addStudent = ({
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
    const newStudent = {
      id: generateId(),
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
      createdAt: new Date().toISOString(),
    };
    setStudents((prev) => [newStudent, ...prev]);
    return newStudent;
  };

  const updateStudent = (id, updates) => {
    setStudents((prev) =>
      prev.map((s) => (s.id === id ? { ...s, ...updates } : s))
    );
  };

  const deleteStudent = (id) => {
    setStudents((prev) => prev.filter((s) => s.id !== id));
  };

  const getStudentById = (id) => students.find((s) => s.id === id) || null;

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
