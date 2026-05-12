// src/components/AddStudentForm.jsx — Session 6 (RTK Query)
import { useState } from "react";
import { useAddStudentMutation } from "../features/students/studentsApi";

const EMPTY_FORM = { name: "", studentId: "", major: "", gpa: "" };

function AddStudentForm() {
  const [addStudent, { isLoading: isAdding }] = useAddStudentMutation();
  const [formData, setFormData] = useState(EMPTY_FORM);
  const [errors, setErrors] = useState({});

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    
    // Validation logic
    if (!formData.name.trim() || !formData.studentId.trim() || formData.gpa === "") {
      setErrors({
        name: !formData.name.trim() ? "Name is required" : "",
        studentId: !formData.studentId.trim() ? "Student ID is required" : "",
        gpa: formData.gpa === "" ? "GPA is required" : "",
      });
      return;
    }

    const gpaNum = parseFloat(formData.gpa);
    if (isNaN(gpaNum) || gpaNum < 0 || gpaNum > 4) {
      setErrors((prev) => ({ ...prev, gpa: "GPA must be a number between 0.0 and 4.0" }));
      return;
    }

    try {
      await addStudent({ ...formData, gpa: gpaNum }).unwrap();
      setFormData(EMPTY_FORM);
      setErrors({});
    } catch (err) {
      console.error("Failed to add student:", err);
    }
  }

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>Add New Student</h3>
      <div className="form-row">
        <div className="form-group">
          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Full Name"
            disabled={isAdding}
          />
          {errors.name && <small className="error-text">{errors.name}</small>}
        </div>
        <div className="form-group">
          <input
            name="studentId"
            placeholder="Student ID *"
            value={formData.studentId}
            onChange={handleChange}
            disabled={isAdding}
          />
          {errors.studentId && <small className="error-text">{errors.studentId}</small>}
        </div>
        <div className="form-group">
          <input
            name="major"
            placeholder="Major"
            value={formData.major}
            onChange={handleChange}
            disabled={isAdding}
          />
        </div>
        <div className="form-group">
          <input
            name="gpa"
            placeholder="GPA (0.0–4.0)"
            value={formData.gpa}
            onChange={handleChange}
            type="number"
            step="0.01"
            min="0"
            max="4"
            disabled={isAdding}
          />
          {errors.gpa && <small className="error-text">{errors.gpa}</small>}
        </div>
        <button type="submit" className="btn-primary" disabled={isAdding}>
          {isAdding ? "Adding..." : "+ Add Student"}
        </button>
      </div>
    </form>
  );
}

export default AddStudentForm;
