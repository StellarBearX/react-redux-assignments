import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const BASE_URL = 'https://67c050a4b9d0240d28d0859a.mockapi.io/api/v1/students';

// Fetch all students
export const fetchStudents = createAsyncThunk(
  'students/fetchStudents',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(BASE_URL);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
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
      return rejectWithValue(error.response?.data || error.message);
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
      return rejectWithValue(error.response?.data || error.message);
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
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);
