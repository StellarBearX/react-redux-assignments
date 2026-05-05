import React from 'react';
import { useSelector } from 'react-redux';
import GpaSummary from './components/GpaSummary';
import AddStudentForm from './components/AddStudentForm';
import StudentTable from './components/StudentTable';

function App() {
  const students = useSelector((state) => state.students.students);

  return (
    <div style={{ padding: '2rem 0' }}>
      <header style={{ marginBottom: '3rem', textAlign: 'center' }}>
        <h1 style={{ fontSize: '3rem', marginBottom: '0.5rem', background: 'linear-gradient(to right, #818cf8, #c084fc)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          AcadeMate
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem' }}>
          Student Academic Record Management (Redux Edition)
        </p>
      </header>

      <main>
        <GpaSummary />
        <AddStudentForm />
        <StudentTable />
      </main>

      <footer style={{ marginTop: '4rem', textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.875rem' }}>
        <p>&copy; 2024 AcadeMate Prototype. Powered by Redux Toolkit.</p>
      </footer>
    </div>
  );
}

export default App;
