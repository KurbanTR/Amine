import { useState, useEffect } from "react";
import ChatHeader from './ChatHeader';
import Input from './Input';
import Message from './Message';
import { useDispatch, useSelector } from 'react-redux';
import { addMessages, fetchAdmin, fetchMessages, getDefineChats, setRead } from '../../store/messageSlice';
import { useParams } from "react-router-dom";
import { format, isSameDay, isSameWeek, isSameYear } from 'date-fns';
import { ru } from 'date-fns/locale';

const Chat = () => {
  const [message, setMessage] = useState('');
  const { data } = useSelector(state => state.messages);
  const { id } = useSelector(state => state.user);
  const dispatch = useDispatch();
  const { messages, isAdmin } = useSelector(state => state.messages);
  const params = useParams();

  useEffect(() => {
    dispatch(fetchMessages({ idUser: params.id }));
    dispatch(getDefineChats({ id: params.id }));
    dispatch(fetchAdmin({ id }));

    const getMessages = async() => {
      dispatch(fetchMessages({ idUser: params.id }));
    };
    
    getMessages();
    const intervalId = setInterval(getMessages, 10000);
    return () => clearInterval(intervalId);
  }, [dispatch, params]);

  useEffect(() => {
    if (isAdmin !== 'a') {
      const unreadMessageIds = messages
        .filter(message => !message.read && message.isAdmin !== isAdmin)
        .map(message => message.id);

      if (unreadMessageIds.length > 0) {
        dispatch(setRead({ ids: unreadMessageIds, idUser: params.id }));
      }
    }
  }, [messages, isAdmin, dispatch, params.id]);

  const formattedTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();

    if (isSameDay(now, date)) {
      return format(date, 'HH:mm', { locale: ru });
    } else if (isSameWeek(now, date)) {
      return format(date, 'EEEE', { locale: ru });
    } else if (isSameYear(now, date)) {
      return format(date, 'd MMMM', { locale: ru });
    } else {
      return format(date, 'd MMMM yyyy', { locale: ru });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (message.trim()) {
      const newMessage = {
        text: message,
        id: Date.now(),
        timestamp: new Date().toISOString(),
        isAdmin,
        read: false // Новое сообщение не прочитано
      };
      try {
        setMessage('');
        dispatch(addMessages({
          id: params.id,
          newMessage,
        }));
      } catch (error) {
        console.error("Ошибка при добавлении сообщения: ", error);
      }
    }
  };

  return (
    <main>
      <ChatHeader nick={data?.name} img={data?.img} isAdmin={isAdmin} />
      <div className="flex pt-24">
        <div className="w-full">
          <div className="px-3 flex flex-col gap-3 pb-40">
            {messages.map((message, index) => (
              <div key={index}>
                {index === 0 || !isSameDay(new Date(message.timestamp), new Date(messages[index - 1].timestamp)) ? (
                  <div className="text-center text-gray-500 my-2">
                    {formattedTimestamp(message.timestamp)}
                  </div>
                ) : null}
                <Message
                  text={message.text}
                  id={message.id}
                  idChat={params.id}
                  timestamp={message.timestamp}
                  isAdmin={message.isAdmin}
                  currentUserIsAdmin={isAdmin}
                  read={message.read} // Прокидываем read
                />
              </div>
            ))}
          </div>
          <Input onSubmit={handleSubmit} onChange={e => setMessage(e.target.value)} message={message} />
        </div>
      </div>
    </main>
  );
};

export default Chat;
