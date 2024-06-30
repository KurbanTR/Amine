import { format } from 'date-fns';
import { enUS } from 'date-fns/locale';
import galochka from '../../assets/galochka.svg'

const Message = ({ text, timestamp, isAdmin, currentUserIsAdmin, read, id, idChat, onSelect, selected }) => {
  const alignClass = isAdmin === currentUserIsAdmin ? 'items-end' : 'items-start';
  const bgColor = isAdmin === currentUserIsAdmin ? 'bg-blue-200' : 'bg-gray-200';
  const borderClass = selected ? 'bg-blue-500/15' : '';

  return (
    <div className={`rounded-lg box-content p-2 flex flex-col ${alignClass} mb-2 ${borderClass}`} onClick={onSelect}>
      <div className={`${bgColor} px-3 py-2 rounded-lg flex flex-col items-start max-w-[80%] 850res:max-w-[70%] 600res:max-w-[90%] 400res:max-w-[100%] shadow-md`}>
        <p className="text-lg 850res:text-base 600res:text-sm 400res:text-xs text-black break-words overflow-wrap-anywhere w-full">
          {text}
        </p>
        <div className="flex justify-end w-full items-center">
          <span className="no-select text-sm 850res:text-xs 600res:text-[10px] 400res:text-[8px] text-[#595959] text-right self-end">
            {format(new Date(timestamp), 'HH:mm', { locale: enUS })}
          </span>
          {isAdmin === currentUserIsAdmin && (
            <span className="ml-2">
              <img src={galochka} className='w-5' alt="" />
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default Message;
