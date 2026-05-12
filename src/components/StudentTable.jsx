// src/components/StudentTable.jsx — Session 4 version
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { 
  deleteStudentAsync, 
  updateStudentAsync,
  fetchStudents 
} from "../features/students/studentsThunks";
import { 
  selectAllStudents, 
  selectStudentsStatus, 
  selectStudentsError 
} from "../features/students/selectors";
import EditModal from "./EditModal";

function StudentTable() {
  const dispatch = useDispatch();
  const allStudents = useSelector(selectAllStudents);
  const status = useSelector(selectStudentsStatus);
  const error = useSelector(selectStudentsError);

  // Local UI state — modal open/close and which student is being edited
  const [editing, setEditing] = useState(null); // null = modal closed

  function handleDelete(id) {
    if (window.confirm("Delete this student?")) {
      dispatch(deleteStudentAsync(id));
    }
  }

  function handleEditSave(updatedData) {
    dispatch(updateStudentAsync({ ...updatedData, gpa: parseFloat(updatedData.gpa) || 0 }));
    setEditing(null); // Close modal after update
  }

  if (status === 'loading') {
    return <div className="spinner" style={{ textAlign: 'center', padding: '2rem' }}>Loading students...</div>;
  }

  if (status === "failed") {
    return (
      <div className="error-banner" style={{ textAlign: 'center', padding: '2rem', background: 'rgba(239, 68, 68, 0.1)', borderRadius: '12px' }}>
        <p style={{ color: 'var(--danger)', marginBottom: '1rem' }}>Error: {error}</p>
        <button onClick={() => dispatch(fetchStudents())} className="btn-primary">
          Retry
        </button>
      </div>
    );
  }

  // Guard: don't render until data is ready
  if (status !== "succeeded") return null;

  return (
    <>
      <table className="student-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Student ID</th>
            <th>Major</th>
            <th>GPA</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {allStudents.map((student, index) => (
            <tr key={student.id} className={student.gpa >= 3.5 ? "high-gpa" : ""}>
              <td>{index + 1}</td>
              <td>{student.name}</td>
              <td>{student.studentId}</td>
              <td>{student.major}</td>
              <td className="gpa-cell">{Number(student.gpa).toFixed(2)}</td>
              <td>
                <button onClick={() => setEditing(student)}>Edit</button>
                <button onClick={() => handleDelete(student.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {editing && (
        <EditModal
          student={editing}
          onSave={handleEditSave}
          onCancel={() => setEditing(null)}
        />
      )}
    </>
  );
}

export default StudentTable;
