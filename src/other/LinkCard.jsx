import { Link } from "react-router-dom"

const LinkCard = ({to, displayImage, displayName, displayRole, displayId, index, setIsHovered}) => {
  return (
    <div>
        <Link to={`/${to}/` +displayId} onMouseEnter={() => setIsHovered(index)} onMouseLeave={() => setIsHovered(false)}>
            <div className='relative overflow-hidden rounded-lg h-[90%]'>
                <div className='h-80 overflow-hidden'>
                    <img    
                        src={displayImage} 
                        className="w-full" 
                        alt={displayName || 'Image'} 
                    />
                </div>
                <div className='absolute bottom-0 right-0 h-60 flex flex-col justify-end w-full bg-gradient-to-t from-black to-transparent opacity-80 p-4'>
                    <p className='line-clamp-1 overflow-hidden text-[1.2em] text-white'>
                        {displayName}
                    </p>
                    <p className='text-[#ababab] font-medium'>
                        {displayRole}
                    </p>
                </div>
            </div>
        </Link>
    </div>
  )
}

export default LinkCard
