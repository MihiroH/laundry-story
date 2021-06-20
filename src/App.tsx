import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom';
import Categories from './Categories';
import Chat from './Chat';
import TheHeader from './TheHeader'
import './App.css';

function App() {
  return (
    <Router>
      <TheHeader />
      <Switch>
        <Route
          exact
          path="/"
        >
          <Redirect to="/categories" />
        </Route>
        <Route
          path="/categories"
          component={Categories}
        />
        <Route
          path="/chat/:slug"
          component={Chat}
        />
      </Switch>
      <footer className="footer"></footer>
    </Router>
  )
}

export default App;
