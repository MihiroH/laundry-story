import { Link, RouteComponentProps } from "react-router-dom";
import IconCloth from './img/icon_washing_cloth.png';
import IconDish from './img/icon_washing_dish.png';
import './Categories.css';

function Categories() {
  return (
    <div>
      <div className="top">Laundry</div>
      <nav className="contents">
        <ul>
          <li className="item">
            <Link
              to="/categories/clothes"
              className="anchor"
            >
              <span className="icon">
                <img
                  src={IconCloth}
                  alt="洗濯物"
                  className="icon"
                />
              </span>
              <span className="cat">洗濯物</span>
            </Link>
          </li>
          <li className="item">
            <Link
              to="/categories/dishes"
              className="anchor"
            >
              <span className="icon">
                <img
                  src={IconDish}
                  alt="食器洗い"
                  className="icon"
                />
              </span>
              <span className="cat">食器洗い</span>
            </Link>
          </li>
        </ul>
      </nav>
      <div className="bottom"></div>
    </div>
  )
}

export default Categories;
