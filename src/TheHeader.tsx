import { useState, useEffect } from 'react';
import { Link, useLocation, useHistory } from 'react-router-dom';
import categories from './utils/categories';
import GoogleProvider from './utils/googleProvider';
import IconArrow from './img/icon_arrow_triangle.svg';
import './TheHeader.scoped.css';

function TheHeader() {
  const [title, setTitle] = useState('');
  const location = useLocation();
  const history = useHistory();
  const googleProvider = new GoogleProvider();

  useEffect(() => {
    const lastPathname = location.pathname.split('/').splice(-1)[0];
    if (!lastPathname) {
      return;
    }
    setTitle(categories[lastPathname] ? categories[lastPathname] : 'Laundry');

    googleProvider.signInRedirectResult()
      .then(() => {
        console.log(googleProvider.user)
      });
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
      <span className="user" onClick={() => googleProvider.signIn()}>
        ログイン
      </span>
    </header>
  )
}

export default TheHeader;
