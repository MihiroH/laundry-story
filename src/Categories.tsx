import { useHistory } from "react-router-dom";
import categories from './utils/categories';
import './Categories.scoped.css';

type Props = {
  isLoggedIn: boolean
}

function Categories({ isLoggedIn }: Props) {
  const history = useHistory();

  const goTo = (path: string) => {
    if (!isLoggedIn) {
      alert('サインインしてください');
      return;
    }
    history.push(path);
  }

  return (
    <nav className="contents">
      <ul>
        {Object.entries(categories).map(([key, category]) => (
          <li key={key} className="item">
            <button
              type="button"
              className="btn"
              onClick={() => goTo(`/chat/${key}`)}
            >
              <span className="icon">
                <img
                  src={category.icon}
                  alt={category.name}
                  className="icon"
                />
              </span>
              <span className="cat">{category.name}</span>
            </button>
          </li>
        ))}
      </ul>
    </nav>
  )
}

export default Categories;
