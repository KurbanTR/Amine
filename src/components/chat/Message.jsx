import { format } from 'date-fns';
import { enUS } from 'date-fns/locale';
import { removeMessages } from '../../store/messageSlice';
import { useState } from 'react';
import { useDispatch } from 'react-redux';

const Message = ({ text, timestamp, isAdmin, currentUserIsAdmin, read, id, idChat }) => {
  const [showContextMenu, setShowContextMenu] = useState(false);
  const dispatch = useDispatch()
  const alignClass = isAdmin === currentUserIsAdmin ? 'items-end' : 'items-start';
  const bgColor = isAdmin === currentUserIsAdmin ? 'bg-blue-200' : 'bg-gray-200';

  const handleContextMenu = (e) => {
    e.preventDefault();
    isAdmin === currentUserIsAdmin && setShowContextMenu(!showContextMenu);
  };

  const handleDelete = () => {
    dispatch(removeMessages({ messageId: id, idUser: idChat }));
    setShowContextMenu(false); // Скрыть контекстное меню после удаления
  };

  return (
    <div className={`flex flex-col ${alignClass} mb-2`}>
      {showContextMenu && (
        <div
          className="z-10 bg-white border border-gray-200 rounded-lg shadow-md p-1"
        >
          <button
            className="block w-full py-2 px-4 text-left text-sm text-gray-700 hover:bg-gray-100"
            onClick={handleDelete}
          >
            Удалить
          </button>
        </div>
      )}
      <div onContextMenu={handleContextMenu} className={`${bgColor} px-3 py-2 rounded-lg flex flex-col items-start max-w-[80%] 850res:max-w-[70%] 600res:max-w-[90%] 400res:max-w-[100%] shadow-md`}>
        <p className="text-lg 850res:text-base 600res:text-sm 400res:text-xs text-black break-words overflow-wrap-anywhere w-full">
          {text}
        </p>
        <div className="flex justify-end w-full items-center">
          <span className="text-sm 850res:text-xs 600res:text-[10px] 400res:text-[8px] text-[#595959] text-right self-end">
            {format(new Date(timestamp), 'HH:mm', { locale: enUS })}
          </span>
          {isAdmin === currentUserIsAdmin && (
            <span className="ml-2">
              <svg
                className={`w-4 h-4 ${read ? 'text-blue-500' : 'text-gray-500'} flex gap-1`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 13l4 4L19 7"
                />
                {read && (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 11l4 4L22 4"
                  />
                )}
              </svg>
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default Message;
