// src/features/students/studentsApi.js — Session 6 (Mocked for Lab Stability)
import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react';

// Local state for mocking purposes since the external API is returning 404
let mockStudents = [
  { id: '1', name: 'Somchai Rakpong', studentId: '6501001', major: 'Computer Science', gpa: 3.85 },
  { id: '2', name: 'Naree Thongdee', studentId: '6501002', major: 'Information Technology', gpa: 3.60 },
  { id: '3', name: 'Kitti Somsri', studentId: '6501003', major: 'Software Engineering', gpa: 3.25 },
  { id: '4', name: 'Wipa Rakdee', studentId: '6501004', major: 'Data Science', gpa: 3.90 },
  { id: '5', name: 'Mana Choojai', studentId: '6501005', major: 'Computer Science', gpa: 2.75 },
];

export const studentsApi = createApi({
  reducerPath: 'studentsApi',
  baseQuery: fakeBaseQuery(),
  tagTypes: ['Student'],
  endpoints: (builder) => ({
    getStudents: builder.query({
      queryFn: () => ({ data: [...mockStudents] }),
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: 'Student', id })),
              { type: 'Student', id: 'LIST' },
            ]
          : [{ type: 'Student', id: 'LIST' }],
    }),
    
    getStudentById: builder.query({
      queryFn: (id) => {
        const student = mockStudents.find(s => s.id === id);
        return student ? { data: student } : { error: { status: 404, data: 'Not Found' } };
      },
      providesTags: (result, error, id) => [{ type: 'Student', id }],
    }),
    
    addStudent: builder.mutation({
      queryFn: (student) => {
        const newStudent = { ...student, id: Date.now().toString() };
        mockStudents.push(newStudent);
        return { data: newStudent };
      },
      invalidatesTags: [{ type: 'Student', id: 'LIST' }],
    }),

    updateStudent: builder.mutation({
      queryFn: ({ id, ...patch }) => {
        const index = mockStudents.findIndex(s => s.id === id);
        if (index !== -1) {
          mockStudents[index] = { ...mockStudents[index], ...patch };
          return { data: mockStudents[index] };
        }
        return { error: { status: 404, data: 'Not Found' } };
      },
      async onQueryStarted({ id, ...patch }, { dispatch, queryFulfilled }) {
        const patchList = dispatch(
          studentsApi.util.updateQueryData(
            'getStudents', undefined,
            draft => {
              const item = draft.find(s => s.id === id);
              if (item) Object.assign(item, patch);
            }
          )
        );
        const patchDetail = dispatch(
          studentsApi.util.updateQueryData(
            'getStudentById', id,
            draft => { 
              if (draft) Object.assign(draft, patch); 
            }
          )
        );
        try {
          await queryFulfilled;
        } catch {
          patchList.undo();
          patchDetail.undo();
        }
      },
      invalidatesTags: (result, error, { id }) => [{ type: 'Student', id }],
    }),

    deleteStudent: builder.mutation({
      queryFn: (id) => {
        mockStudents = mockStudents.filter(s => s.id !== id);
        return { data: id };
      },
      invalidatesTags: (result, error, id) => [
        { type: 'Student', id },
        { type: 'Student', id: 'LIST' },
      ],
    }),
  }),
});

export const {
  useGetStudentsQuery,
  useGetStudentByIdQuery, // Not used in table but exported
  useAddStudentMutation,
  useUpdateStudentMutation,
  useDeleteStudentMutation,
} = studentsApi;
