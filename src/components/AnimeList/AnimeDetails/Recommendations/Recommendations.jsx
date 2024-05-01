import { Link } from 'react-router-dom';
import { useSelector} from 'react-redux'

const Recommendations = () => {
    const recommendations = useSelector(state => state.anime.recommendations)

  return (
    <div className='py-[2em] gap-[1em] flex flex-col'>
        <p className='text-3xl font-medium'>Recommendations</p>
        <div className='container w-full flex overflow-hidden overflow-x-auto scrollbar-hidden'>
            {
                recommendations?.map((item, index) => 
                    <Link to={'/anime/' + item.entry.mal_id} key={index} className='min-w-[13em] m-4 rounded-lg overflow-hidden'>
                        <div className='relative'>
                            <div className='h-[18em]'>
                                <img src={item.entry?.images.jpg.image_url} className={`w-full`} alt="" />
                            </div>                      
                            <div className='absolute bottom-0 right-0 h-60 flex items-end w-full bg-gradient-to-t from-black to-transparent opacity-80 p-4'>
                                <p className='line-clamp-1 overflow-hidden text-[1.2em] text-white'>{item.entry.title}</p>
                            </div>
                        </div>
                    </Link>
                )
            }
        </div>
    </div>
    )
}

export default Recommendations
