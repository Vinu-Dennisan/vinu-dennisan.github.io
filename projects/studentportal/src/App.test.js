import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import Students from './Students';

beforeEach(() => {
  window.localStorage.clear();
});

test('shows fictional sample profiles and adds a new student to browser storage', () => {
  render(<Students />);
  expect(screen.getByText('Aarav Kumar')).toBeInTheDocument();
  fireEvent.change(screen.getByPlaceholderText(/alex johnson/i), { target: { value: 'Alex Johnson' } });
  fireEvent.change(screen.getByLabelText(/course \/ programme/i), { target: { value: 'Computer Science' } });
  fireEvent.click(screen.getByRole('button', { name: /add student/i }));

  expect(screen.getByText('Alex Johnson')).toBeInTheDocument();
  expect(JSON.parse(window.localStorage.getItem('vinu-student-portal-students'))).toHaveLength(6);
});
