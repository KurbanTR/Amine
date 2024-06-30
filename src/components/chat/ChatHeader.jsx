import { Link } from "react-router-dom";

const ChatHeader = ({ nick, img, isAdmin, to, showDeleteIcon, onDelete }) => {
  return (
    <header className="fixed top-0 bg-[#1c1c1c] flex justify-between px-5 py-2 w-full">
      <Link to={`/profile/${to}`} className="flex gap-3 items-center 850res:gap-1">
        <img className="w-10 h-10 rounded-full 850res:w-8 850res:h-8" src={!isAdmin ?
          'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIAMAAzAMBIgACEQEDEQH/xAAcAAABBQEBAQAAAAAAAAAAAAAAAgMEBQYHAQj/xABEEAABAwMBBQQFCQUGBwAAAAABAAIDBAURBhITITFBB1FxgSIyQmGRFDNSVZOhscHRFSMkcpJDc4Ky4fAWNEVjZKLx/8QAFAEBAAAAAAAAAAAAAAAAAAAAAP/EABQRAQAAAAAAAAAAAAAAAAAAAAD/2gAMAwEAAhEDEQA/AO4oQhAIQhAIQhAIXmVBuF1o6Afv5MvxwjbxcUE9IlljibtSvaxve44Cxlw1VVzZZStbTt7+bv0CoaiWWok255ZJSerzlBvajUdqp8g1Qe7ujBcoEutLe35uGeT/AAgfisaIm9yWGDuCDTnXFP0oZv6glN1zSe3RzjzBWX2UbA6jgg2cOsLVJjbdLH/MzgrSkulBWf8ALVcTyem1g/Bc33LDzYMJDqdvNoIPeEHWELmtFdbnbyPk9U57B7EnpD/fmtJbdVwy4ZXx7h/0xxb+o+9BpkJEUjJGB8bw5p5EHKWgEIQgEIQgEIQgEIQgEIQgEiSRkbC97g1o5kpM88cETpZXbLR1WOvt4fM/ZPq+zH08SgmXjUTsOjo3GNvWTHF3h3LLyzOkeXZPHqeaS5zpDl5JJXrWIEhqWGpYYk1c8VFSS1VQQ2KFpe89wAygh3a5UVmozVXGdsUY4DmXPd3AdVl477qe/wDpaftjKSj9mqrDjh34/QFV8D4bpvdX6qy22wuLKCkPt92B15fcTyCyupNYXG+4HaWa4Xg47abRtZ+5vMNaXf2r0RPNUry0VvnVeXZ76kxyXq16UEKQhAIQhAIQhAIQhAIQhAEOUUe4+0cbNm5fVyRQgASBDIBJ3EVrJw33WwzbR1FV02ipMd9zy08TRVjgpMyA7LWxuD+1PvZhB+7rW+xE3L3FvHEMw0YVmhU2Z5T2tiyHRNqVITTo1znI8zG7bb6qvOqKMpbmrh7dpvaCwVWS2gD3nn8vDxeZMNtqUy1ScW0e2WxevZjCSWI49NyHt7WNc6+jJ4zzFVra/wAvLhZ6SZxTb+G7o6tKdvOk+/pA1NL0iLCF2ENm+eJ9EyjlflyqDr2e0urcHjsOkt6htBp2z2dfN+9ey0U6jSnc4/pP9poJ4c7s7O0L6kwcsDTEFT8Iay2PfZby1cSwnylQWNfJlIJPfy1NY9mOnW7Sa7DsrlWko15Rp1KiuqVKSrYteX2Dftc2mOEHiJx6+cXED9lDUY2WObn+Ux2WnTts6gqvdbw1mvk8JLehAIQhAIQhAIQhAIQhAIQhAIQhA//2Q=='
          : img}
          alt={nick}
        />
        <span className="text-white text-xl 850res:text-lg 600res:text-base font-semibold">{nick}</span>
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
