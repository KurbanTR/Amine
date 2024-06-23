import useCardSize from "./CardSize"

const LinkCard = ({displayImage, displayName, displayRole, index, setIsHovered}) => {
  const {cardHeight} = useCardSize()
  return (
    <div onMouseEnter={() => setIsHovered(index)} onMouseLeave={() => setIsHovered(false)}>
        <div className='relative overflow-hidden rounded-lg h-full'>
            <div className='overflow-hidden'>
                <img
                    src={displayImage}
                    className="w-full h-full object-cover"
                    alt={displayName || 'Image'}
                    style={{height: +cardHeight+100}}
                />
            </div>
            <div className='absolute bottom-0 right-0 h-[80%] flex flex-col justify-end w-full bg-gradient-to-t from-black to-transparent opacity-80 p-4'>
            <p className='text-[1em] text-white 540res:text-[18px]  400res:text-[10px]'>{displayName}</p>
            <p className='text-[#ababab] font-medium 540res:text-[.7em]  400res:text-[.4em]'>{displayRole}</p>
            </div>
        </div>
    </div>
  )
}

export default LinkCard
