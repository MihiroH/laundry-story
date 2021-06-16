import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/洗濯物/i);
  expect(linkElement).toBeInTheDocument();
});
