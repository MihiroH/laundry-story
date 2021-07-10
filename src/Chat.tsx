import { useState, useEffect } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import firebaseService from './utils/firebaseService';
import './Chat.scoped.css';

type TParams =  { category: string };

function Chat({ match }: RouteComponentProps<TParams>) {
  const initialIsPut = true;
  const initialIsDone = true;

  const [isPut, setIsPut] = useState(initialIsPut);
  const [isDone, setIsDone] = useState(initialIsDone);
  const [list, setList] = useState<Array<dataType>>([]);

  type dataType = {
    key: string,
    is_put: boolean,
    is_done: boolean
  };
  type itemsType = Array<{
    key: string,
    val: () => dataType
  }>;

  function onDataChange(items: itemsType) {
    const list: Array<dataType> = [];

    items.forEach(item => {
      const key = item.key;
      const data = item.val();
      list.push({
        key: key,
        is_put: data.is_put,
        is_done: data.is_done
      });
    });

    setList(list);
  };

  function changeRadio(e: React.ChangeEvent<HTMLInputElement>, radioName: string) {
    const value = !!Number(e.currentTarget.value);

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

  async function saveStatus() {
    const data = {
      is_put: isPut,
      is_done: isDone
    };

    try {
      await firebaseService.create(data)
      setIsPut(initialIsPut);
      setIsDone(initialIsDone);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    setIsPut(true);
    setIsDone(true);

    firebaseService.getAll().on('value', onDataChange);

    return () => {
      firebaseService.getAll().off('value', onDataChange);
    };
  }, []);

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
                onChange={(e) => changeRadio(e, 'is_put')}
              />
              <span className="btn-text">入れた</span>
            </label>
            <label className="btn">
              <input
                name="is_put"
                type="radio"
                value="0"
                checked={!isPut}
                onChange={(e) => changeRadio(e, 'is_put')}
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
                onChange={(e) => changeRadio(e, 'is_done')}
              />
              <span className="btn-text">回した</span>
            </label>
            <label className="btn">
              <input
                name="is_done"
                type="radio"
                value="0"
                checked={!isDone}
                onChange={(e) => changeRadio(e, 'is_done')}
              />
              <span className="btn-text">回してない</span>
            </label>
          </div>
          <button type="button" className="btn_submit" onClick={saveStatus}>
            送信
          </button>
        </div>
      </div>
    </div>
  )
}

export default Chat;
