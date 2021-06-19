import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import Categories from "./Categories"
import './App.css';

function App() {
  return (
    <Router>
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
      </Switch>
    </Router>
  )
}

export default App;
