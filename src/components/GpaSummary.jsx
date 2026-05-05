import React from 'react';
import { useSelector } from 'react-redux';

const GpaSummary = () => {
  const students = useSelector((state) => state.students.students);
  
  const gpas = students.map(s => s.gpa);
  const avg = gpas.length ? (gpas.reduce((a, b) => a + b, 0) / gpas.length).toFixed(2) : '0.00';
  const max = gpas.length ? Math.max(...gpas).toFixed(2) : '0.00';
  const min = gpas.length ? Math.min(...gpas).toFixed(2) : '0.00';

  const stats = [
    { label: 'Average GPA', value: avg, color: 'var(--primary)' },
    { label: 'Max GPA', value: max, color: 'var(--accent)' },
    { label: 'Min GPA', value: min, color: 'var(--accent-high)' },
  ];

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
      {stats.map((stat, index) => (
        <div key={index} className="glass-card" style={{ padding: '1.5rem', textAlign: 'center' }}>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '0.5rem' }}>{stat.label}</p>
          <h3 style={{ fontSize: '2rem', color: stat.color }}>{stat.value}</h3>
        </div>
      ))}
    </div>
  );
};

export default GpaSummary;
