import { useState, useEffect } from 'react';
import { Link, useLocation, useHistory } from 'react-router-dom';
import categories from './utils/categories';
import GoogleProvider from './utils/googleProvider';
import firebase from 'firebase/app';
import IconArrow from './img/icon_arrow_triangle.svg';
import IconSignIn from './img/icon_login_box.svg';
import IconSignOut from './img/icon_logout_box.svg';
import './TheHeader.scoped.css';

function TheHeader() {
  const location = useLocation();
  const history = useHistory();
  const googleProvider = new GoogleProvider();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<firebase.User | null>(null);
  const [title, setTitle] = useState('');

  useEffect(() => {
    const lastPathname = location.pathname.split('/').splice(-1)[0];
    if (!lastPathname) {
      return;
    }
    setTitle(categories[lastPathname] ? categories[lastPathname] : 'Laundry');

    googleProvider.onAuthStateChanged((user: firebase.User | null) => {
      setIsLoggedIn(user ? true : false);
      setUser(user);
    })
  }, [location])

  function handleClickBackTo() {
    const target = location.pathname.split('/')[1];
    const routes: { [key: string]: string } = {
      chat: '/categories'
    };
    if (target && routes[target]) {
      history.push(routes[target]);
    }
  }

  const backToClassName = ['back_to', title === 'Laundry' ? 'is-hidden' : ''].join(' ');

  return (
    <header className="header">
      <span className={backToClassName}>
        <span
          className="back_to-inner"
          onClick={handleClickBackTo}
        >
          <img src={IconArrow} alt="back to previous page"/>
        </span>
      </span>
      {title}
      <div className="user">
        {isLoggedIn && user && user.photoURL &&
          <span className="user_icon">
            <img src={user.photoURL} alt="プロフィール" />
          </span>
        }
        {isLoggedIn
          ? <span className="sign_out" onClick={() => googleProvider.signOut()}>
              <img src={IconSignOut} alt="ログアウト" />
            </span>
          : <span className="sign_in" onClick={() => googleProvider.signIn()}>
              <img src={IconSignIn} alt="ログイン" />
            </span>
        }
      </div>
    </header>
  )
}

export default TheHeader;
