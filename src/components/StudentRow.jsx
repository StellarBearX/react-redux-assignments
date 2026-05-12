// src/components/StudentRow.jsx — Session 6
function StudentRow({ student, index, setEditing, handleDelete }) {
  if (!student) return null;

  return (
    <tr className={student.gpa >= 3.5 ? "high-gpa" : ""}>
      <td>{index + 1}</td>
      <td>{student.name}</td>
      <td>{student.studentId}</td>
      <td>{student.major}</td>
      <td className="gpa-cell">{Number(student.gpa).toFixed(2)}</td>
      <td>
        <button type="button" onClick={() => setEditing(student)}>Edit</button>
        <button type="button" onClick={() => handleDelete(student.id)}>Delete</button>
      </td>
    </tr>
  );
}

export default StudentRow;
