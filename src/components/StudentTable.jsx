// src/components/StudentTable.jsx — Session 5 version
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { 
  deleteStudentAsync, 
  updateStudentAsync,
  fetchStudents 
} from "../features/students/studentsThunks";
import { 
  selectStudentById,
  selectStudentIds,
} from "../features/students/studentsSlice";
import { 
  selectStudentsStatus, 
  selectStudentsError 
} from "../features/students/selectors";
import EditModal from "./EditModal";

// Sub-component for individual rows — uses O(1) lookup
function StudentRow({ id, index, onEdit }) {
  const dispatch = useDispatch();
  const student = useSelector((state) => selectStudentById(state, id));
  
  if (!student) return null;

  function handleDelete() {
    if (window.confirm(`Delete ${student.name}?`)) {
      dispatch(deleteStudentAsync(id));
    }
  }

  return (
    <tr className={student.gpa >= 3.5 ? "high-gpa" : ""}>
      <td>{index + 1}</td>
      <td>{student.name}</td>
      <td>{student.studentId}</td>
      <td>{student.major}</td>
      <td className="gpa-cell">{Number(student.gpa).toFixed(2)}</td>
      <td>
        <button onClick={() => onEdit(student)}>Edit</button>
        <button onClick={handleDelete}>Delete</button>
      </td>
    </tr>
  );
}

function StudentTable() {
  const dispatch = useDispatch();
  const studentIds = useSelector(selectStudentIds);
  const status = useSelector(selectStudentsStatus);
  const error = useSelector(selectStudentsError);

  // Local UI state — modal open/close and which student is being edited
  const [editing, setEditing] = useState(null); // null = modal closed

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
          {studentIds.map((id, index) => (
            <StudentRow 
              key={id} 
              id={id} 
              index={index} 
              onEdit={setEditing} 
            />
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
