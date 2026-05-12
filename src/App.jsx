// src/App.jsx — Session 3: layout only
import GpaSummary from './components/GpaSummary';
import AddStudentForm from './components/AddStudentForm';
import StudentTable from './components/StudentTable';
import './App.css';

function App() {
  // No hooks here — each component
  // reads Redux directly with useSelector
  return (
    <div className="app-container">
      <header className="app-header">
        <h1>AcadeMate</h1>
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
