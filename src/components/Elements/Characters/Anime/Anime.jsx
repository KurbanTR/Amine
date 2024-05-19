import { Link } from 'react-router-dom';
import {useSelector} from 'react-redux'
import { SwiperSlide, Swiper} from "swiper/react"
import { Keyboard } from 'swiper/modules';
import 'swiper/css'
import ss from '../../../swiper.module.css'

const Anime = () => {
    const character = useSelector(state => state.character.character)

  return (
    <div>
        <p className='text-[1.6em] font-medium mb-4'>Anime</p>
        <div className='container w-full flex overflow-hidden'>
            <Swiper
                className={ss.swipers}
                grabCursor={true} 
                spaceBetween={20}
                keyboard={{
                enabled: true,
                }}
                modules={[Keyboard]}
                slidesPerView={'auto'}
            >
                {
                    character?.anime.map((item, index) => 
                        <SwiperSlide className={ss.swiper__slide} key={index}>
                            <Link to={'/anime/' + item.anime.mal_id}>
                                <div className='relative overflow-hidden rounded-lg h-[90%]'>
                                    <div>
                                        <img src={item.anime.images.jpg.image_url} className='w-full' alt=""/>
                                    </div>                      
                                    <div className='absolute bottom-0 right-0 h-60 flex items-end w-full bg-gradient-to-t from-black to-transparent opacity-80 p-4'>
                                        <div className='flex flex-col'>
                                            <p className='line-clamp-1 text-[1.2em] text-white'>{item.anime.title}</p>
                                            <p className='text-[#ababab] font-medium'>{item.role}</p>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </SwiperSlide>                        
                    )
                }
            </Swiper>
        </div>
    </div>
  )
}

export default Anime
