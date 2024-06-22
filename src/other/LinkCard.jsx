
const LinkCard = ({displayImage, displayName, displayRole, index, setIsHovered}) => {
  return (
    <div onMouseEnter={() => setIsHovered(index)} onMouseLeave={() => setIsHovered(false)}>
        <div className='relative overflow-hidden rounded-lg h-full'>
            <div className='overflow-hidden'>
                <img
                    src={displayImage}
                    className="w-full h-full object-cover"
                    alt={displayName || 'Image'}
                />
            </div>
            <div className='absolute bottom-0 right-0 h-[80%] flex flex-col justify-end w-full bg-gradient-to-t from-black to-transparent opacity-80 p-4'>
                <p className='line-clamp-1 overflow-hidden text-[1.2em] 400res:text-[1em] text-white'>
                    {displayName}
                </p>
                <p className='text-[#ababab] 400res:text-[.7em] font-medium'>
                    {displayRole}
                </p>
            </div>
        </div>
    </div>
  )
}

export default LinkCard
