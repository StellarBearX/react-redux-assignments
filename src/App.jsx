import React, { useState } from 'react';
import GpaSummary from './components/GpaSummary';
import AddStudentForm from './components/AddStudentForm';
import StudentTable from './components/StudentTable';

const INITIAL_STUDENTS = [
  { id: 1, name: 'Somchai Rakpong', studentId: '6501001', major: 'Computer Science', gpa: 3.85 },
  { id: 2, name: 'Naree Thongdee', studentId: '6501002', major: 'Information Technology', gpa: 3.60 },
  { id: 3, name: 'Kitti Somsri', studentId: '6501003', major: 'Software Engineering', gpa: 3.25 },
  { id: 4, name: 'Wipa Rakdee', studentId: '6501004', major: 'Data Science', gpa: 3.90 },
  { id: 5, name: 'Mana Choojai', studentId: '6501005', major: 'Computer Science', gpa: 2.75 },
];

function App() {
  const [students, setStudents] = useState(INITIAL_STUDENTS);

  const handleAddStudent = (newStudent) => {
    // Immutable update using Spread Operator
    setStudents([...students, newStudent]);
  };

  const handleDeleteStudent = (id) => {
    // Filtering for deletion
    setStudents(students.filter(student => student.id !== id));
  };

  return (
    <div style={{ padding: '2rem 0' }}>
      <header style={{ marginBottom: '3rem', textAlign: 'center' }}>
        <h1 style={{ fontSize: '3rem', marginBottom: '0.5rem', background: 'linear-gradient(to right, #818cf8, #c084fc)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          AcadeMate
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem' }}>
          Student Academic Record Management Prototype
        </p>
      </header>

      <main>
        <GpaSummary students={students} />
        <AddStudentForm onAddStudent={handleAddStudent} />
        <StudentTable students={students} onDelete={handleDeleteStudent} />
      </main>

      <footer style={{ marginTop: '4rem', textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.875rem' }}>
        <p>&copy; 2024 AcadeMate Prototype. Built with React Local State.</p>
      </footer>
    </div>
  );
}

export default App;
