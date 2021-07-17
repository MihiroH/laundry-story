import { useState, useEffect } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { UserType, DocumentDataType, TIMESTAMP } from './plugins/firebase';
import ChatService from './utils/chatService';
import './Chat.scoped.css';

type Props = RouteComponentProps<{ slug: string }> & {
  user: UserType,
  isEqualCurrentUserUid: (user: UserType, uid: string) => boolean
}

function Chat({ match, user, isEqualCurrentUserUid }: Props) {
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
    user_uid: string,
    user_photo_url?: string,
    created_at: number
  };
  type ListType = Array<DataType & {
    year: number,
    month: number,
    date: number,
    hours: number,
    minutes: number,
    isCurrentUser: boolean
  }>
  type ItemType = {
    key: string,
    val: () => DataType
  };

  function onDataChange(items: DocumentDataType) {
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
      const isCurrentUser = user ? isEqualCurrentUserUid(user, data.user_uid) : false;

      if (data.user_uid) {
        list.push({ ...data, key, year, month, date, hours, minutes, isCurrentUser });
      }
    });

    setList(list);
    window.scrollTo(0, document.body.scrollHeight);
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
      user_uid: user ? user.uid : '',
      user_photo_url: user ? user.photoURL : '',
      created_at: TIMESTAMP
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
            <li key={item.key} className={[item.isCurrentUser ? 'is-mine' : '', 'item'].join(' ')}>
              <div className="user">
                {!item.isCurrentUser &&
                  <span className="user_icon">
                    <img src={item.user_photo_url} alt="プロフィール画像" />
                  </span>
                }
                <p className="msg">
                  <span className={[item.is_put ? 'is-active' : '', 'status'].join(' ')}>
                    {item.is_put ? '入れた' : '入れてない'}
                  </span>
                  <span className="separate">|</span>
                  <span className={[item.is_done ? 'is-active' : '', 'status'].join(' ')}>
                    {item.is_done ? '回した' : '回してない'}
                  </span>
                </p>
              </div>
              <time
                dateTime={
                  `${item.year}-${item.month}-${item.date} ${item.hours}:${item.minutes}`
                }
                className="time"
              >
                {`${item.month}/${item.date} ${item.hours}:${item.minutes}`}
              </time>
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
