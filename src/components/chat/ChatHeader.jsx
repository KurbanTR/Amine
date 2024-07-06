import { Link } from "react-router-dom";

const ChatHeader = ({ nick, img, isAdmin, to, showDeleteIcon, onDelete }) => {
  return (
    <header className="fixed top-0 bg-[#1c1c1c] flex justify-between px-5 py-2 w-full">
      <Link to={`/profile/${to}`} className="flex gap-3 items-center 850res:gap-1">
        <img className="w-10 h-10 rounded-full 850res:w-8 850res:h-8" src={!isAdmin ?
          'https://www.arbus.biz/assets/dist/img/illustrations/support/1.png'
          : img}
          alt={nick}
        />
        <span className="text-white text-xl 850res:text-lg 600res:text-base font-semibold">{isAdmin ? nick : 'Staff'}</span>
      </Link>
      <div className="flex items-center">
        {showDeleteIcon && (
          <button onClick={onDelete} className="text-white text-xl">
            🗑️
          </button>
        )}
        {isAdmin && <Link to='/chat' className="text-red-600 font-bold text-xl">Exit</Link>}
      </div>
    </header>
  );
};

export default ChatHeader;
