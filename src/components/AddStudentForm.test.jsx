import { describe, it, expect } from 'vitest';
import userEvent from '@testing-library/user-event';
import { screen, waitFor } from '@testing-library/react';
import { renderWithProviders } from '../tests/utils';
import { http, HttpResponse } from 'msw';
import { server } from '../tests/server';
import AddStudentForm from './AddStudentForm';

describe('AddStudentForm', () => {
  it('adds a new student', async () => {
    const user = userEvent.setup();
    
    // Mock the POST request
    server.use(
      http.post('*/students', async ({ request }) => {
        const student = await request.json();
        return HttpResponse.json({ ...student, id: '3' }, { status: 201 });
      })
    );

    renderWithProviders(<AddStudentForm />);

    // Step 3: type & click
    // Note: AddStudentForm usually has Name, Student ID, Major, GPA fields
    // Let's check the labels in AddStudentForm.jsx
    await user.type(screen.getByPlaceholderText(/full name/i), 'Charlie');
    await user.type(screen.getByPlaceholderText(/student id/i), '6501003');
    await user.type(screen.getByPlaceholderText(/major/i), 'Testing');
    await user.type(screen.getByPlaceholderText(/gpa/i), '4.00');
    
    await user.click(screen.getByRole('button', { name: /\+ add student/i }));

    // Step 4: assert result (usually shows a success message or clears form)
    // In this app, we might check if the input is cleared or a message appears
    await waitFor(() => {
      // Assuming it clears the form on success
      expect(screen.getByPlaceholderText(/full name/i)).toHaveValue('');
    });
  });
});
