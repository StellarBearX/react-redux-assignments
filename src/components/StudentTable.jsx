import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteStudent } from '../features/students/studentSlice';

const StudentTable = () => {
  const students = useSelector((state) => state.students.students);
  const dispatch = useDispatch();

  return (
    <div className="glass-card" style={{ marginTop: '2rem', overflowX: 'auto' }}>
      <h2 style={{ marginBottom: '1.5rem', color: 'var(--text-main)' }}>Student List</h2>
      <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
        <thead>
          <tr style={{ borderBottom: '1px solid var(--glass-border)', color: 'var(--text-muted)' }}>
            <th style={{ padding: '1rem' }}>ID</th>
            <th style={{ padding: '1rem' }}>Name</th>
            <th style={{ padding: '1rem' }}>Student ID</th>
            <th style={{ padding: '1rem' }}>Major</th>
            <th style={{ padding: '1rem' }}>GPA</th>
            <th style={{ padding: '1rem' }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr 
              key={student.id} 
              style={{ 
                borderBottom: '1px solid var(--glass-border)',
                background: student.gpa >= 3.5 ? 'rgba(16, 185, 129, 0.1)' : 'transparent',
                transition: 'background 0.3s ease'
              }}
            >
              <td style={{ padding: '1rem' }}>{student.id}</td>
              <td style={{ padding: '1rem', fontWeight: 500 }}>{student.name}</td>
              <td style={{ padding: '1rem' }}>{student.studentId}</td>
              <td style={{ padding: '1rem' }}>{student.major}</td>
              <td style={{ padding: '1rem' }}>
                <span style={{ 
                  padding: '4px 12px', 
                  borderRadius: '20px', 
                  background: student.gpa >= 3.5 ? 'var(--accent)' : 'rgba(255,255,255,0.1)',
                  color: student.gpa >= 3.5 ? '#000' : 'var(--text-main)',
                  fontWeight: 600
                }}>
                  {student.gpa.toFixed(2)}
                </span>
              </td>
              <td style={{ padding: '1rem' }}>
                <button 
                  onClick={() => dispatch(deleteStudent(student.id))}
                  style={{ 
                    background: 'rgba(239, 68, 68, 0.1)', 
                    color: 'var(--danger)',
                    padding: '6px 12px',
                    fontSize: '0.8rem'
                  }}
                  onMouseOver={(e) => e.currentTarget.style.background = 'rgba(239, 68, 68, 0.2)'}
                  onMouseOut={(e) => e.currentTarget.style.background = 'rgba(239, 68, 68, 0.1)'}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StudentTable;
