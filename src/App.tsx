import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom';
import { useState, useEffect } from 'react';
import GoogleProvider from './utils/googleProvider';
import firebase from 'firebase/app';
import Categories from './Categories';
import Chat from './Chat';
import TheHeader from './TheHeader'
import './App.scoped.css';

function App() {
  const googleProvider = new GoogleProvider();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<firebase.User | null>(null);

  useEffect(() => {
    googleProvider.onAuthStateChanged(user => {
      setIsLoggedIn(user ? true : false);
      setUser(user);
    })
  }, [])

  return (
    <Router>
      <TheHeader
        isLoggedIn={isLoggedIn}
        user={user}
        onClickSignIn={() => googleProvider.signIn()}
        onClickSignOut={() => googleProvider.signOut()}
      />
      <Switch>
        <Route
          exact
          path="/"
        >
          <Redirect to="/categories" />
        </Route>
        <Route
          path="/categories"
          render={props =>
            <Categories {...props} isLoggedIn={isLoggedIn} />
          }
        />
        <Route
          path="/chat/:slug"
          render={props =>
            <Chat
              {...props}
              user={user}
              isEqualCurrentUserUid={(user, uid) => googleProvider.isEqualCurrentUserUid(user, uid)}
            />
          }
        />
      </Switch>
      <footer className="footer"></footer>
    </Router>
  )
}

export default App;
