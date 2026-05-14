import { http, HttpResponse } from 'msw';

export const handlers = [
  http.get('*/students', () => {
    return HttpResponse.json([
      { id: '1', name: 'Alice', studentId: '6501001', major: 'CS', gpa: 3.8 },
      { id: '2', name: 'Bob', studentId: '6501002', major: 'IT', gpa: 3.2 }
    ]);
  }),
  http.post('*/students', async ({ request }) => {
    const newStudent = await request.json();
    return HttpResponse.json({ ...newStudent, id: '3' }, { status: 201 });
  }),
];
