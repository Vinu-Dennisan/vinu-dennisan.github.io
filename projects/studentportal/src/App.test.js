import { render, screen } from '@testing-library/react';
import App from './App';
test('renders the Student Portal welcome page and navigation', () => {
  render(<App />);
  expect(screen.getByRole('heading', { name: /welcome to your student portal/i })).toBeInTheDocument();
  expect(screen.getByRole('link', { name: /students/i })).toBeInTheDocument();
});
