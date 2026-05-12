// src/features/students/studentsSlice.js — Session 5
import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';
import {
  fetchStudents,
  addStudentAsync,
  updateStudentAsync,
  deleteStudentAsync,
} from './studentsThunks';

// 1. Create the adapter — sortComparer keeps ids[] sorted by name
const studentsAdapter = createEntityAdapter({
  sortComparer: (a, b) => a.name.localeCompare(b.name),
});

// 2. getInitialState() creates { ids:[], entities:{} }
// and merges in any extra fields you provide:
const initialState = studentsAdapter.getInitialState({
  status: 'idle',
  error: null,
});

const studentsSlice = createSlice({
  name: 'students',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch all — replace entire collection
      .addCase(fetchStudents.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchStudents.fulfilled, (state, { payload }) => {
        state.status = 'succeeded';
        studentsAdapter.setAll(state, payload); // replaces ids + entities
      })
      .addCase(fetchStudents.rejected, (state, { payload }) => {
        state.status = 'failed';
        state.error = payload;
      })
      // Add one
      .addCase(addStudentAsync.fulfilled, (state, { payload }) => {
        studentsAdapter.addOne(state, payload);
      })
      // Update one
      .addCase(updateStudentAsync.fulfilled, (state, { payload }) => {
        // upsertOne inserts OR updates
        studentsAdapter.upsertOne(state, payload);
      })
      // Delete one
      .addCase(deleteStudentAsync.fulfilled, (state, { payload }) => {
        studentsAdapter.removeOne(state, payload); // payload = id
      });
  },
});

// Bind selectors to state.students
export const {
  selectAll: selectAllStudents,
  selectById: selectStudentById,
  selectIds: selectStudentIds,
  selectTotal: selectStudentCount,
} = studentsAdapter.getSelectors((state) => state.students);

export default studentsSlice.reducer;
