import { configureStore } from '@reduxjs/toolkit';
import studentReducer from '../features/students/studentsSlice';

export const store = configureStore({
  reducer: {
    students: studentReducer,
  },
});
