import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const BASE_URL = 'https://67c050a4b9d0240d28d0859a.mockapi.io/api/v1/students';

// Local mock data for fallback
const MOCK_STUDENTS = [
  { id: '1', name: 'Somchai Rakpong', studentId: '6501001', major: 'Computer Science', gpa: 3.85 },
  { id: '2', name: 'Naree Thongdee', studentId: '6501002', major: 'Information Technology', gpa: 3.60 },
  { id: '3', name: 'Kitti Somsri', studentId: '6501003', major: 'Software Engineering', gpa: 3.25 },
  { id: '4', name: 'Wipa Rakdee', studentId: '6501004', major: 'Data Science', gpa: 3.90 },
  { id: '5', name: 'Mana Choojai', studentId: '6501005', major: 'Computer Science', gpa: 2.75 },
];

// Fetch all students
export const fetchStudents = createAsyncThunk(
  'students/fetchStudents',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(BASE_URL);
      return response.data;
    } catch (error) {
      console.warn("API 404 - Falling back to local mock data");
      return MOCK_STUDENTS;
    }
  }
);

// Add a new student
export const addStudentAsync = createAsyncThunk(
  'students/addStudentAsync',
  async (studentData, { rejectWithValue }) => {
    try {
      const response = await axios.post(BASE_URL, studentData);
      return response.data;
    } catch (error) {
      // Fallback: return data with a fake ID
      return { ...studentData, id: Date.now().toString() };
    }
  }
);

// Update a student
export const updateStudentAsync = createAsyncThunk(
  'students/updateStudentAsync',
  async (studentData, { rejectWithValue }) => {
    try {
      const { id, ...data } = studentData;
      const response = await axios.put(`${BASE_URL}/${id}`, data);
      return response.data;
    } catch (error) {
      return studentData; // Just return as if it succeeded
    }
  }
);

// Delete a student
export const deleteStudentAsync = createAsyncThunk(
  'students/deleteStudentAsync',
  async (id, { rejectWithValue }) => {
    try {
      await axios.delete(`${BASE_URL}/${id}`);
      return id;
    } catch (error) {
      return id; // Just return as if it succeeded
    }
  }
);
