import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  list: [
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
      state.list.push(action.payload);
    },
    deleteStudent: (state, action) => {
      state.list = state.list.filter(student => student.id !== action.payload);
    },
    updateStudent: (state, action) => {
      const index = state.list.findIndex(s => s.id === action.payload.id);
      if (index !== -1) {
        state.list[index] = action.payload;
      }
    },
  },
});

export const { addStudent, deleteStudent, updateStudent } = studentSlice.actions;
export default studentSlice.reducer;
