import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addStudent } from '../features/students/studentSlice';

const AddStudentForm = () => {
  const dispatch = useDispatch();
  
  const initialForm = {
    name: '',
    studentId: '',
    major: '',
    gpa: ''
  };

  const [form, setForm] = useState(initialForm);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!form.name || !form.studentId || !form.major || !form.gpa) {
      setError('Please fill in all fields.');
      return;
    }

    const gpaNum = parseFloat(form.gpa);
    if (isNaN(gpaNum) || gpaNum < 0 || gpaNum > 4.0) {
      setError('GPA must be between 0.0 and 4.0');
      return;
    }

    // Dispatch action to Redux
    dispatch(addStudent({
      ...form,
      gpa: gpaNum,
      id: Date.now()
    }));

    setForm(initialForm);
    setError('');
  };

  return (
    <div className="glass-card">
      <h2 style={{ marginBottom: '1.5rem' }}>Add New Student</h2>
      <form onSubmit={handleSubmit} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem' }}>
        <div>
          <label>Full Name</label>
          <input 
            type="text" 
            name="name" 
            value={form.name} 
            onChange={handleChange} 
            placeholder="e.g. John Doe" 
            style={{ width: '100%' }}
          />
        </div>
        <div>
          <label>Student ID</label>
          <input 
            type="text" 
            name="studentId" 
            value={form.studentId} 
            onChange={handleChange} 
            placeholder="e.g. 6501001" 
            style={{ width: '100%' }}
          />
        </div>
        <div>
          <label>Major</label>
          <input 
            type="text" 
            name="major" 
            value={form.major} 
            onChange={handleChange} 
            placeholder="e.g. Computer Science" 
            style={{ width: '100%' }}
          />
        </div>
        <div>
          <label>GPA</label>
          <input 
            type="number" 
            step="0.01" 
            name="gpa" 
            value={form.gpa} 
            onChange={handleChange} 
            placeholder="0.00 - 4.00" 
            style={{ width: '100%' }}
          />
        </div>
        <div style={{ gridColumn: '1 / -1', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {error && <p style={{ color: 'var(--danger)', fontSize: '0.9rem' }}>{error}</p>}
          <button 
            type="submit" 
            style={{ 
              background: 'var(--primary)', 
              color: 'white',
              alignSelf: 'flex-start'
            }}
            onMouseOver={(e) => e.currentTarget.style.background = 'var(--primary-hover)'}
            onMouseOut={(e) => e.currentTarget.style.background = 'var(--primary)'}
          >
            Add Student
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddStudentForm;
