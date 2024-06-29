import { useState, useEffect } from "react";
import ChatHeader from './ChatHeader';
import Input from './Input';
import Message from './Message';
import { useDispatch, useSelector } from 'react-redux';
import { addMessages, fetchAdmin, fetchMessages, getDefineChats, setRead, removeMessages } from '../../store/messageSlice';
import { useParams } from "react-router-dom";
import { format, isSameDay, isSameWeek, isSameYear } from 'date-fns';
import { ru } from 'date-fns/locale';
import Preloader from '../../other/Preloader';

const Chat = () => {
  const [message, setMessage] = useState('');
  const [selectedMessages, setSelectedMessages] = useState([]); // State for selected messages
  const { id } = useSelector(state => state.user);
  const dispatch = useDispatch();
  const { messages, isAdmin, data, status } = useSelector(state => state.messages);
  const params = useParams();

  useEffect(() => {
    document.title = 'JumCloud - Chat';
  }, []);

  useEffect(() => {
    if (messages.length === 0 && !isAdmin) dispatch(fetchMessages({ idUser: params.id }));
    if (!data) dispatch(getDefineChats({ id: params.id }));
    dispatch(fetchAdmin({ id }));

    const getMessages = async () => {
      dispatch(fetchMessages({ idUser: params.id }));
    };

    getMessages();
    const intervalId = setInterval(getMessages, 10000);
    return () => clearInterval(intervalId);
  }, [dispatch, params]);

  useEffect(() => {
    if (!isAdmin) {
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

  const handleSelectMessage = (id, isAdminMessage) => {
    if (isAdmin === isAdminMessage) {
      setSelectedMessages(prevSelected => 
        prevSelected.includes(id) ? 
        prevSelected.filter(msgId => msgId !== id) : 
        [...prevSelected, id]
      );
    }
  };

  const handleDeleteSelected = () => {
    selectedMessages.forEach(messageId => {
      dispatch(removeMessages({ messageId, idUser: params.id }));
    });
    setSelectedMessages([]);
  };

  if (messages.length === 0 && !isAdmin && status === 'loading') return <Preloader />;
  return (
    <main>
      <ChatHeader 
        nick={data?.name} 
        img={data?.img} 
        to={params.id} 
        isAdmin={isAdmin} 
        showDeleteIcon={selectedMessages.length > 0} 
        onDelete={handleDeleteSelected}
      />
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
                  selected={selectedMessages.includes(message.id)}
                  onSelect={() => handleSelectMessage(message.id, message.isAdmin)}
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
