import { render, screen } from '@testing-library/react';
import { Route, MemoryRouter } from 'react-router-dom';
import App from './App';

test('renders learn react link', () => {
  let testLocation = {
    pathname: ''
  };
  render(
    <MemoryRouter>
      <App />
      <Route
        path="*"
        render={({ location }) => {
          testLocation = location;
          return null;
        }}
      />
    </MemoryRouter>
  );
  if (!Object.keys(testLocation).length) {
    return
  }
  expect(testLocation.pathname).toBe('/');
});
