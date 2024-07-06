import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchChats } from '../../store/messageSlice';
import { Link } from 'react-router-dom';
import { format, differenceInDays, differenceInYears } from 'date-fns';
import { ru } from 'date-fns/locale';

const ChatList = () => {
  const dispatch = useDispatch();
  const { chats, status, error } = useSelector(state => state.messages);
  const { id } = useSelector(state => state.user);
  const users = chats.filter(chat => chat.id === id);

  useEffect(()=>{
    document.title = 'JumCloud - ChatList'
  },[])

  useEffect(() => {
    dispatch(fetchChats());
  }, []);

  const formattedTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const daysDifference = differenceInDays(now, date);
    const yearsDifference = differenceInYears(now, date);

    if (daysDifference < 1) {
      return format(date, 'HH:mm', { locale: ru });
    } else if (daysDifference < 7) {
      return format(date, 'EEEE', { locale: ru });
    } else if (yearsDifference < 1) {
      return format(date, 'd MMMM', { locale: ru });
    } else {
      return format(date, 'd MMMM yyyy', { locale: ru });
    }
  };

  return (
      <div className="p-4">
        <h2 className="text-lg font-bold mb-2">Список пользователей</h2>
        {status === 'loading' && <p>Загрузка...</p>}
        {status === 'failed' && <p>Ошибка: {error}</p>}
        {status === 'succeeded' && (
          <div className="flex flex-col gap-4">
            {chats.map(user => (
              <Link to={`/chat/${user.id}`} key={user.id} className="mb-1">
                <div className="group flex gap-3 items-center p-4 rounded-xl border border-gray-300 hover:bg-gray-100">
                  <img className="w-20 h-20 rounded-full 700res:w-16 700res:h-16" src={user.img} alt={user.name} />
                  <div className="flex flex-col w-full">
                    <div className="flex justify-between w-full">
                      <h1 className="text-xl text-white font-semibold 850res:text-lg 600res:text-base transition-colors group-hover:text-black">{user.name}</h1>
                      {user.lastMessage && (
                        <span className="text-xs text-gray-500">{formattedTimestamp(user.lastMessage.timestamp)}</span>
                      )}
                    </div>
                    {user.lastMessage && (
                      <div className="flex justify-between items-end mt-2">
                        <h1 className="text-gray-600 text-sm 850res:text-xs">{`${user.lastMessage.text.slice(0, 14)}${user.lastMessage.text.length > 14 ? '...' : ''}`}</h1>
                      </div>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
  );
};

export default ChatList;
