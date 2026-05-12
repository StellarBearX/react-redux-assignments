// src/components/EditModal.jsx — Session 3
import { useState } from 'react';

function EditModal({ student, onSave, onCancel }) {
  // Local copy of student data — what the user edits before saving
  const [form, setForm] = useState({ ...student });

  const onChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h3>Edit Student</h3>
        <div className="modal-form">
          <label>Name</label>
          <input name="name" value={form.name} onChange={onChange} />
          
          <label>Major</label>
          <input name="major" value={form.major} onChange={onChange} />
          
          <label>GPA</label>
          <input
            name="gpa"
            value={form.gpa}
            onChange={onChange}
            type="number"
            step="0.01"
            min="0"
            max="4"
          />
        </div>
        <div className="modal-actions">
          <button className="btn-save" onClick={() => onSave(form)}>Save</button>
          <button className="btn-cancel" onClick={onCancel}>Cancel</button>
        </div>
      </div>
    </div>
  );
}

export default EditModal;
