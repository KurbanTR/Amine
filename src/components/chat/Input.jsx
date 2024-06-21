
const InputField = ({ onSubmit, onChange, message }) => {
  return (
    <form onSubmit={onSubmit} className="fixed bottom-3 w-full">
      <div className="mx-auto w-[80%] flex items-center justify-between border-gray-300 p-2 bg-white rounded-full 450res:p-1 450res:w-[90%] overflow-hidden">
        <input
          placeholder="Type a message"
          className="flex-1 border-none outline-none p-2 text-gray-800 text-[1.2em] 450res:text-[1em] resize-none" // Убираем возможность изменять размеры textarea пользователем
          value={message}
          onChange={onChange}
        />
        <button
          type="submit"
          className={`${
            message ? 'bg-black text-white' : 'bg-gray-300 text-gray-500'
          } rounded-full p-3 flex items-center justify-center focus:outline-none ml-2 450res:p-2`}
          disabled={!message}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke={message ? 'white' : 'gray'}
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </form>
  );
};

export default InputField;
