import { Link } from "react-router-dom";
import categories from './utils/categories';
import './Categories.scoped.css';

function Categories() {
  return (
    <nav className="contents">
      <ul>
        {Object.entries(categories).map(([key, category]) => (
          <li key={key} className="item">
            <Link
              to={`/chat/${key}`}
              className="anchor"
            >
              <span className="icon">
                <img
                  src={category.icon}
                  alt={category.name}
                  className="icon"
                />
              </span>
              <span className="cat">{category.name}</span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}

export default Categories;
