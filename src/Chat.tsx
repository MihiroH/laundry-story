import { useState, useEffect } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import ChatService from './utils/chatService';
import firebase from 'firebase/app';
import './Chat.scoped.css';

type TParams =  { slug: string };

function Chat({ match }: RouteComponentProps<TParams>) {
  const initialIsPut = true;
  const initialIsDone = true;

  const [isPut, setIsPut] = useState(initialIsPut);
  const [isDone, setIsDone] = useState(initialIsDone);
  const [list, setList] = useState<ListType>([]);
  const chatService = new ChatService(match.params.slug);

  type DataType = {
    key: string,
    is_put: boolean,
    is_done: boolean,
    created_at: number
  };
  type ListType = Array<DataType & {
    year: number,
    month: number,
    date: number,
    hours: number,
    minutes: number
  }>
  type ItemType = {
    key: string,
    val: () => DataType
  };

  function onDataChange(items: firebase.firestore.DocumentData) {
    const list: ListType = [];

    items.forEach((item: ItemType) => {
      const key = item.key;
      const data = item.val();
      const dateObj = new Date(data.created_at);
      const year = dateObj.getFullYear();
      const month = dateObj.getMonth() + 1;
      const date = dateObj.getDate();
      const hours = dateObj.getHours();
      const minutes = dateObj.getMinutes();

      list.push({ ...data, key, year, month, date, hours, minutes });
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
      is_done: isDone,
      created_at: firebase.database.ServerValue.TIMESTAMP
    };

    try {
      await chatService.create(data)
      setIsPut(initialIsPut);
      setIsDone(initialIsDone);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    setIsPut(true);
    setIsDone(true);

    chatService.getAll().on('value', onDataChange);

    return () => {
      chatService.getAll().off('value', onDataChange);
    };
  }, []);

  return (
    <div>
      <div className="contents">
        <ul className="list">
          {list.map(item => (
            <li key={item.key}>
              <time dateTime={
                `${item.year}-${item.month}-${item.date} ${item.hours}:${item.minutes}`
              }>
                {`${item.month}-${item.date} ${item.hours}:${item.minutes}`}
              </time>
              <span className="is_put">{item.is_put ? '入れた' : '入れてない'}</span>
              <span className="is_done">{item.is_done ? '回した' : '回してない'}</span>
            </li>
          ))}
        </ul>
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
                onChange={(e) => changeRadio(e, "is_put")}
              />
              <span className="btn-text">入れた</span>
            </label>
            <label className="btn">
              <input
                name="is_put"
                type="radio"
                value="0"
                checked={!isPut}
                onChange={(e) => changeRadio(e, "is_put")}
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
                onChange={(e) => changeRadio(e, "is_done")}
              />
              <span className="btn-text">回した</span>
            </label>
            <label className="btn">
              <input
                name="is_done"
                type="radio"
                value="0"
                checked={!isDone}
                onChange={(e) => changeRadio(e, "is_done")}
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
  );
}

export default Chat;
