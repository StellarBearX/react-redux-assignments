// src/App.jsx — Session 6: RTK Query
import GpaSummary from './components/GpaSummary';
import AddStudentForm from './components/AddStudentForm';
import StudentTable from './components/StudentTable';
import './App.css';

function App() {
  return (
    <div className="app-container">
      <header className="app-header">
        <h1>AcadeMate</h1>
        <p>Student Academic Performance Tracker — Session 6 RTK Query Migration</p>
      </header>
      <main className="app-main">
        <GpaSummary />
        <AddStudentForm />
        <StudentTable />
      </main>
    </div>
  );
}

export default App;
