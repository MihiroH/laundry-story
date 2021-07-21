import { useState, useEffect } from 'react';
import { useLocation, RouteComponentProps } from 'react-router-dom';
import { UserType, DocumentDataType, TIMESTAMP } from './plugins/firebase';
import categories from './utils/categories';
import ChatService from './utils/chatService';
import './Chat.scoped.css';

type Props = RouteComponentProps<{ slug: string }> & {
  user: UserType,
  isEqualCurrentUserUid: (user: UserType, uid: string) => boolean
}

function Chat({ match, user, isEqualCurrentUserUid }: Props) {
  type StatusType = { [key: string]: number };
  type CurrentType = { category: string, status: StatusType };

  const location = useLocation();
  const chatService = new ChatService(match.params.slug);
  const initialCurrent = (): CurrentType => {
    const category = location.pathname.split('/').splice(-1)[0];
    if (!category) {
      return { category: '', status: {} };
    }

    const status = Object.keys(categories[category].status).reduce(
      (all: StatusType, key: string) => {
        all[key] = 1;
        return all;
      },
      {}
    )
    return { category, status }
  }

  const [current, setCurrent] = useState(initialCurrent());
  const [list, setList] = useState<ListType>([]);

  type DataType = {
    key: string,
    is_put?: number,
    is_done?: number,
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

  type ChangeEventType = React.ChangeEvent<HTMLInputElement | HTMLSelectElement>;
  function changeStatus(e: ChangeEventType, status: string) {
    const value = Number(e.currentTarget.value);

    setCurrent(prev => ({
      ...prev,
      status: {
        ...prev.status,
        [status]: value
      }
    }));
  }

  async function saveStatus() {
    const data: DocumentDataType = {
      user_uid: user ? user.uid : '',
      user_photo_url: user ? user.photoURL : '',
      created_at: TIMESTAMP
    };
    Object.entries(current.status).forEach(([key, value]) => {
      data[key] = value;
    });

    try {
      await chatService.create(data)
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    setCurrent(initialCurrent());

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
                  {
                    current.category &&
                    categories[current.category] &&
                    Object.entries(categories[current.category].status).map(([key, status], index) => {
                      if (categories[current.category].formType === 'radio') {
                        return Object.entries(status).map(([text, value]) => {
                          if (item[key as keyof DataType] !== value) return ''
                          return (
                            <span key={`${index}_${text}`}>
                              {index ? <span className="separate">|</span> : <></>}
                              <span className={[item[key as keyof DataType] === 1 ? 'is-active' : '', 'status'].join(' ')}>{text}</span>
                            </span>
                          )
                        })
                      }
                      if (categories[current.category].formType === 'select') {
                        return Object.entries(status).map(([text, value], index) => {
                          if (item[key as keyof DataType] !== value) return ''
                          return (
                            <span key={index} className={[item[key as keyof DataType] === value ? 'is-active' : '', 'status'].join(' ')}>{text}</span>
                          )
                        })
                      }
                      return <></>
                    })
                  }
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
          {
            current.category &&
            categories[current.category] &&
            Object.entries(categories[current.category].status).map(([key, status]) => {
              if (categories[current.category].formType === 'radio') return (
                <div
                  key={key}
                  className={
                    [Object.keys(status).length === 1 ? 'btns--single' : '', 'btns'].join(' ')
                  }
                >
                  {Object.entries(status).map(([item, value], index) => (
                    <label key={index} className="btn">
                      <input
                        name={key}
                        type="radio"
                        value={value}
                        checked={value === current.status[key]}
                        onChange={e => changeStatus(e, key)}
                      />
                      { value === current.status[key] }
                      <span className="btn-text">{item}</span>
                    </label>
                  ))}
                </div>
              )
              if (categories[current.category].formType === 'select') return (
                <div key={key} className="selectbox">
                  <select name={key} onChange={e => changeStatus(e, key)}>
                    {Object.entries(status).map(([item, value], index) => (
                      <option key={index} value={value}>{item}</option>
                    ))}
                  </select>
                </div>
              )
              return '';
            })
          }
          <button type="button" className="btn_submit" onClick={saveStatus}>
            送信
          </button>
        </div>
      </div>
    </div>
  );
}

export default Chat;
