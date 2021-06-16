import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  RouteComponentProps
} from "react-router-dom";
import Categories from "./Categories"
import './App.css';

type TParams = { id: string };

function Product({ match }: RouteComponentProps<TParams>) {
  return <h2>This is a page for product with ID: {match.params.id} </h2>;
}

function App() {
  return (
    <Router>
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
    </Router>
  )
}

export default App;
