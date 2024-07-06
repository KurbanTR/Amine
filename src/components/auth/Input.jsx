const Input = ({ title, type, value, onChange }) => (
    <div className="w-full">
        <p className='text-3xl 1480res:text-base 1000res:text-sm'>{title}</p>
        <input
            type={type}
            value={value}
            placeholder={title}
            onChange={onChange}
            max={10}
            className="w-full bg-def-black border-b-2 border-gray-500 rounded-md px-5 py-[.7em] 1480res:py-1 text-2xl 1480res:text-base 1000res:text-sm"
        />
    </div>
)
export default Input