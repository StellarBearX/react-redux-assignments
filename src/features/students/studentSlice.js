import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  students: [
    { id: 1, name: 'Somchai Rakpong', studentId: '6501001', major: 'Computer Science', gpa: 3.85 },
    { id: 2, name: 'Naree Thongdee', studentId: '6501002', major: 'Information Technology', gpa: 3.60 },
    { id: 3, name: 'Kitti Somsri', studentId: '6501003', major: 'Software Engineering', gpa: 3.25 },
    { id: 4, name: 'Wipa Rakdee', studentId: '6501004', major: 'Data Science', gpa: 3.90 },
    { id: 5, name: 'Mana Choojai', studentId: '6501005', major: 'Computer Science', gpa: 2.75 },
  ],
};

const studentSlice = createSlice({
  name: 'students',
  initialState,
  reducers: {
    addStudent: (state, action) => {
      // Immer allows us to "mutate" the state safely
      state.students.push(action.payload);
    },
    deleteStudent: (state, action) => {
      state.students = state.students.filter(student => student.id !== action.payload);
    },
  },
});

export const { addStudent, deleteStudent } = studentSlice.actions;
export default studentSlice.reducer;
