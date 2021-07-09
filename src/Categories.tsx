import { Link } from "react-router-dom";
import categories from './utils/categories';
import IconCloth from './img/icon_washing_cloth.png';
import IconDish from './img/icon_washing_dish.png';
import './Categories.scoped.css';

function Categories() {
  return (
    <nav className="contents">
      <ul>
        <li className="item">
          <Link
            to="/chat/cloth"
            className="anchor"
          >
            <span className="icon">
              <img
                src={IconCloth}
                alt={categories.cloth}
                className="icon"
              />
            </span>
            <span className="cat">{categories.cloth}</span>
          </Link>
        </li>
        <li className="item">
          <Link
            to="/chat/dish"
            className="anchor"
          >
            <span className="icon">
              <img
                src={IconDish}
                alt={categories.cloth}
                className="icon"
              />
            </span>
            <span className="cat">{categories.cloth}</span>
          </Link>
        </li>
      </ul>
    </nav>
  )
}

export default Categories;
