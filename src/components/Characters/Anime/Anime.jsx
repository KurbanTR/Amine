import { Link } from 'react-router-dom';
import {useSelector} from 'react-redux'

const Anime = () => {
    const character = useSelector(state => state.anime.character)

  return (
    <div className='py-[2em] gap-[1em] flex flex-col'>
        <p className='text-3xl font-medium'>Anime</p>
        <div className='container w-full flex overflow-hidden overflow-x-auto scrollbar-hidden'>
            {
                character?.anime.map((item, index) => 
                    <Link to={'/anime/'+item.anime.mal_id} key={index} className='min-w-[13em] max-w-[13em] m-4 rounded-lg overflow-hidden'>
                        <div className='relative'>
                            <div className='h-[20em]'>
                                <img src={item.anime.images.jpg.image_url} className={`w-full`} alt="" />
                            </div>                      
                            <div className='absolute bottom-0 right-0 h-60 flex flex-col justify-end w-full bg-gradient-to-t from-black to-transparent opacity-80 p-4'>
                                <p className='line-clamp-1 overflow-hidden text-[1.2em] text-white'>{item.anime.title}</p>
                                <p className='text-[#ababab] font-medium'>{item.role}</p>
                            </div>
                        </div>
                    </Link>
                )
            }
        </div>
    </div>
  )
}

export default Anime
