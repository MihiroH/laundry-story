import { useState, useEffect } from 'react';
import { RouteComponentProps } from "react-router-dom";
import './Chat.scoped.css';

type TParams =  { category: string };

function Chat({ match }: RouteComponentProps<TParams>) {
  const [isPut, setIsPut] = useState(true);
  const [isDone, setIsDone] = useState(true);

  useEffect(() => {
    setIsPut(true);
    setIsDone(true);
  }, []);

  function changeRadio(e: React.MouseEvent<HTMLInputElement>, radioName: string) {
    const value = !!e.currentTarget.valueAsNumber;

    switch (radioName) {
      case 'is_put': {
        setIsPut(value);
        return;
      }
      case 'is_done': {
        setIsDone(value);
        return;
      }
    }
  }

  return (
    <div>
      <div className="contents">
        test
      </div>
      <div className="foot">
        <div className="foot-btns">
          <div className="btns">
            <label className="btn">
              <input
                name="is_put"
                type="radio"
                value="1"
                checked={isPut}
                onClick={(e) => changeRadio(e, 'is_put')}
              />
              <span className="btn-text">入れた</span>
            </label>
            <label className="btn">
              <input
                name="is_put"
                type="radio"
                value="0"
                checked={!isPut}
                onClick={(e) => changeRadio(e, 'is_put')}
              />
              <span className="btn-text">入れてない</span>
            </label>
          </div>
          <div className="btns">
            <label className="btn">
              <input
                name="is_done"
                type="radio"
                value="1"
                checked={isDone}
                onClick={(e) => changeRadio(e, 'is_done')}
              />
              <span className="btn-text">回した</span>
            </label>
            <label className="btn">
              <input
                name="is_done"
                type="radio"
                value="0"
                checked={!isDone}
                onClick={(e) => changeRadio(e, 'is_done')}
              />
              <span className="btn-text">回してない</span>
            </label>
          </div>
          <button type="button" className="btn_submit">
            送信
          </button>
        </div>
      </div>
    </div>
  )
}

export default Chat;
