// src/features/students/selectors.js — Session 6 (RTK Query)
import { createSelector } from '@reduxjs/toolkit';
import { studentsApi } from './studentsApi';

// 1. Select the raw result object from the cache
const selectStudentsResult = studentsApi.endpoints.getStudents.select();

// 2. Derive the actual data array (with fallback to empty array)
const selectStudentsData = createSelector(
  selectStudentsResult,
  (result) => result.data ?? []
);

// ── Derived selectors (memoized from RTK Query data)
export const selectAverageGpa = createSelector(
  selectStudentsData,
  (students) => {
    if (students.length === 0) return '-';
    const sum = students.reduce((acc, s) => acc + Number(s.gpa), 0);
    return (sum / students.length).toFixed(2);
  }
);

export const selectHighAchievers = createSelector(
  selectStudentsData,
  (students) => students.filter((s) => s.gpa >= 3.5)
);

export const selectStudentCount = createSelector(
  selectStudentsData,
  (students) => students.length
);

export const selectGpaDistribution = createSelector(
  selectStudentsData,
  (students) => ({
    high: students.filter((s) => s.gpa >= 3.5).length,
    medium: students.filter((s) => s.gpa >= 2.5 && s.gpa < 3.5).length,
    low: students.filter((s) => s.gpa < 2.5).length,
  })
);

export const selectMaxGPA = createSelector(
  selectStudentsData,
  (students) => {
    if (students.length === 0) return 0;
    return Math.max(...students.map((s) => Number(s.gpa))).toFixed(2);
  }
);

export const selectMinGPA = createSelector(
  selectStudentsData,
  (students) => {
    if (students.length === 0) return 0;
    return Math.min(...students.map((s) => Number(s.gpa))).toFixed(2);
  }
);
