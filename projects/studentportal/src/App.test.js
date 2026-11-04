import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import Students from './Students';

beforeEach(() => {
  window.localStorage.clear();
});

test('adds a student and keeps the record in browser storage', () => {
  render(<Students />);
  fireEvent.change(screen.getByPlaceholderText(/alex johnson/i), { target: { value: 'Alex Johnson' } });
  fireEvent.change(screen.getByPlaceholderText(/computer science/i), { target: { value: 'Computer Science' } });
  fireEvent.click(screen.getByRole('button', { name: /add student/i }));

  expect(screen.getByText('Alex Johnson')).toBeInTheDocument();
  expect(JSON.parse(window.localStorage.getItem('vinu-student-portal-students'))).toHaveLength(1);
});
