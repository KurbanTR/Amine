import { Link } from "react-router-dom";
import useCardSize from "./CardSize";

const Episodes = ({ episodeInfo, animeId, type }) => {
    const {cardHeight, cardWidth} = useCardSize()

    if(type === 'manga') return (
        <div style={{display: "flex"}} className='w-[1440px] mx-auto 1480res:w-full flex flex-col justify-center items-start 1480res:px-5'>
          {episodeInfo?.length > 0 ? 
            <>
              {episodeInfo?.map(item => <Link key={item?.id} to={`/read/${id}?chapter=${episodeInfo?.findIndex(findItem => findItem === item)}`} className='py-2 border-b-[1px] border-b-silver/20 w-full flex justify-between items-center'>
                <div>{`Chapter ${item?.chapterNumber ? item?.chapterNumber : "?"} ${item?.title ? `- ${item?.title}` : ""}`}</div>
                <div className='flex-shrink-0'>{item?.pages} pgs.</div>
              </Link>)}
            </>
          :
            null}
        </div>
    )    
    return (
        <div className='w-full flex justify-left flex-wrap gap-[16px] 700res:gap-[10px] 1480res:px-1'>
            {episodeInfo?.length > 0 && episodeInfo.map((item) => (
                <Link to={`/watch/${animeId}?ep=${item.number}`} key={item.id}>
                    <div 
                        style={{ backgroundImage: `url(${item?.image})`, width: cardWidth, height: cardHeight }} 
                        className="w-[469px] h-[260px] relative bg-no-repeat bg-cover bg-center rounded-lg mb-2"
                    >
                        <div className="bg-gradient-to-t from-black/60 to-transparent absolute inset-0 rounded-lg opacity-50"></div>
                        <div className="w-full h-full flex flex-col justify-end gap-2 items-start p-3 900res:gap-0 800res:p-2 370res:p-1">
                            <span className="text-white/80 text-sm 1000res:text-xs 800res:text-[10px] 700res:text-xs 450res:text-[10px] 370res:text-[8px] z-[1]">
                                Episode {item?.number}
                            </span>
                            <span className="text-sm 1000res:text-xs 800res:text-[10px] 700res:text-sm 450res:text-xs 370res:text-[10px] line-clamp-2 z-[1]">
                                {item?.title}
                            </span>
                        </div>
                    </div>
                </Link>
            ))}
        </div>
    );
}

export default Episodes;
