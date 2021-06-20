import { Link, RouteComponentProps } from "react-router-dom";
import './Chat.css';

type TParams =  { category: string };

function Chat({ match }: RouteComponentProps<TParams>) {

  function changeRadio(e: React.MouseEvent<HTMLInputElement>, radioName: string) {
    const value = e;
    console.log(JSON.stringify(value,null,2))
    alert(radioName)
  }

  return (
    <div>
      <div className="contents">
        test
      </div>
      <div className="foot">
        <div className="buttons">
          <label>
            <input
              name="is_put"
              type="radio"
              onClick={(e) => changeRadio(e, 'is_put')}
            />
            <span className="button-text">入れた</span>
          </label>
        </div>
      </div>
    </div>
  )
}

export default Chat;
