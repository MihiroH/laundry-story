import { BrowserRouter as Router } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import Categories from './Categories';

describe('Categories page', () => {
  test('render categories', () => {
    const { getByText } = render(
      <Router>
        <Categories />
      </Router>
    );
    expect(getByText(/洗濯物/i)).toBeInTheDocument();
    expect(getByText(/食器洗い/i)).toBeInTheDocument();
  });
});
