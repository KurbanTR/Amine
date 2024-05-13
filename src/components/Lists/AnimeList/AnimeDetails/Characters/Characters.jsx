import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector} from 'react-redux'
import { SwiperSlide, Swiper} from "swiper/react"
import ss from '../../../../swiper.module.css'
import { Keyboard } from 'swiper/modules';
import 'swiper/css'

const Characters = () => {
    const [isHovered, setIsHovered] = useState(false);
    const characters = useSelector(state => state.anime.characters)
  return ( 
    <div className='py-[2em] gap-[1em] flex flex-col'>
        <p className='text-3xl font-medium'>Characters</p>
        <div className='container w-full flex overflow-hidden overflow-x-auto scrollbar-hidden'>
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
                    characters?.map((item, index) => 
                        <SwiperSlide className={ss.swiper__slide} key={index}>
                            <Link to={'/character/'+item.character.mal_id} onMouseEnter={()=>setIsHovered(index)} onMouseLeave={()=>setIsHovered(false)}>
                                <div className='relative overflow-hidden rounded-lg h-[90%]'>
                                    <div className='h-[20em] overflow-hidden'>
                                        <img src={isHovered === index ? (item.voice_actors.length == 0 ? item.character.images.jpg.image_url : item.voice_actors[0]?.person.images.jpg.image_url) : item.character.images.jpg.image_url} className={`w-full`} alt="" />
                                    </div>                      
                                    <div className='absolute bottom-0 right-0 h-60 flex flex-col justify-end w-full bg-gradient-to-t from-black to-transparent opacity-80 p-4'>
                                        <p className='line-clamp-1 overflow-hidden text-[1.2em] text-white'>{isHovered === index ? (item.voice_actors.length == 0 ? item.character.name : item.voice_actors[0]?.person.name) : item.character.name}</p>
                                        <p className='text-[#ababab] font-medium'>{isHovered === index ? (item.voice_actors.length == 0 ? item.role : item.voice_actors[0]?.language) : item.role}</p>
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

export default Characters
