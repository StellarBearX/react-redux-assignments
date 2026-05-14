import { describe, it, expect } from 'vitest';
import { screen, waitFor } from '@testing-library/react';
import { renderWithProviders } from '../tests/utils';
import { http, HttpResponse } from 'msw';
import { server } from '../tests/server';
import StudentTable from './StudentTable';

describe('StudentTable', () => {
  it('shows loading state', async () => {
    renderWithProviders(<StudentTable />);
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  it('renders student rows', async () => {
    renderWithProviders(<StudentTable />);
    
    await waitFor(() => {
      expect(screen.getByText('Alice')).toBeInTheDocument();
      expect(screen.getByText('Bob')).toBeInTheDocument();
    });
  });

  it('shows error on 403', async () => {
    server.use(
      http.get('*/students', () => {
        return HttpResponse.json({ error: 'Forbidden' }, { status: 403 });
      })
    );

    renderWithProviders(<StudentTable />);
    
    await waitFor(() => {
      expect(screen.getByText(/error/i)).toBeInTheDocument();
    });
  });
});
