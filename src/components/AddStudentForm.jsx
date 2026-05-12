// src/components/AddStudentForm.jsx — Session 4
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addStudentAsync } from "../features/students/studentsThunks";

const EMPTY_FORM = { name: "", studentId: "", major: "", gpa: "" };

function AddStudentForm() {
  const dispatch = useDispatch();
  const [form, setForm] = useState(EMPTY_FORM);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Single handler for ALL inputs via computed property name
  function handleChange(e) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError("");
    
    try {
      await dispatch(addStudentAsync({ 
        ...form, 
        gpa: parseFloat(form.gpa) || 0 
      })).unwrap();
      
      setForm(EMPTY_FORM); // Reset form after successful submit
    } catch (err) {
      setError(err || "Failed to add student");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>Add New Student</h3>
      <div className="form-row">
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Full Name"
          required
          disabled={loading}
        />
        <input
          name="studentId"
          placeholder="Student ID *"
          value={form.studentId}
          onChange={handleChange}
          required
          disabled={loading}
        />
        <input
          name="major"
          placeholder="Major"
          value={form.major}
          onChange={handleChange}
          disabled={loading}
        />
        <input
          name="gpa"
          placeholder="GPA (0.0–4.0)"
          value={form.gpa}
          onChange={handleChange}
          type="number"
          step="0.01"
          min="0"
          max="4"
          disabled={loading}
        />
        <button type="submit" className="btn-primary" disabled={loading}>
          {loading ? "Adding..." : "+ Add Student"}
        </button>
      </div>
      {error && <p className="error-message" style={{ color: 'var(--danger)', marginTop: '1rem' }}>{error}</p>}
    </form>
  );
}

export default AddStudentForm;
