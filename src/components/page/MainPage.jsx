import { useEffect } from 'react'
import { Link } from "react-router-dom"
import s from '../../styles/MainPage.module.css'
import { fetchAnimeNow, fetchAnimeScore, fetchCharactres, fetchTopCharactres } from '../../store/mainSlice'
import { useSelector, useDispatch } from 'react-redux'
import { SwiperSlide, Swiper} from "swiper/react"
import { Keyboard } from 'swiper/modules';
import 'swiper/css'
import ss from '../../styles/swiper.module.css'
import MainContent from '../../other/MainContent'


const AnimeSwiper = ({ anime, title, type }) => {
  return (
    <div>
      <p className='text-4xl 850res:text-3xl 650res:text-xl font-medium mb-4'>{title}</p>
      <div className='w-full flex overflow-hidden mb-7'>
        <Swiper
          grabCursor={true} 
          spaceBetween={20}
          keyboard={{
            enabled: true,
          }}
          modules={[Keyboard]}
          slidesPerView={'auto'}
        >
          {
            anime?.map((item, index) => 
              <SwiperSlide className={ss.swiper__slide} key={index}>
                <Link to={`/${type}/` + item.mal_id}>
                  <div className='relative overflow-hidden rounded-lg h-[90%] bg-blue-700'>
                    <div>
                      <img src={item.images.jpg.image_url} alt=""/>
                    </div>       
                    {item.score && 
                      <div className='absolute top-[.5em] right-0 flex justify-end pr-1'>
                        <h3 className='bg-red-700 py-1 px-3 text-[.9em] font-bold rounded-md 400res:px-2'>
                          {item.score}
                        </h3>
                      </div>
                    }             
                    <div className='absolute bottom-0 right-0 h-60 flex items-end w-full bg-gradient-to-t from-black opacity-80 p-4'>
                      <div className='flex flex-col'>
                        <p className='line-clamp-1 text-[1.2em] text-white 540res:text-[20px]  400res:text-[17px] 330res:text-[12px]'>{type == 'characters' ? item.name : item.title}</p>
                        {type == 'anime' && <p className='text-[#ababab] font-medium 540res:text-[.9em]  400res:text-[.7em] 330res:text-[.6em]'>
                          {item.aired.prop.from.year ? item.aired.prop.from.year+(!item.genres.length==0 ? ', '+item.genres[0].name : '') : !item.genres.length==0 ? item.genres[0].name : ''}
                        </p>}
                        {type == 'characters' && <p className='text-[#ababab] font-medium 540res:text-[.9em]  400res:text-[.7em] 330res:text-[.6em]'>
                          {item?.name_kanji && item?.name_kanji}
                        </p>}
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
  );
};

const MainPage = () => {
  const {now} = useSelector(state => state.main)
  const {score} = useSelector(state => state.main)
  const {characters} = useSelector(state => state.main)
  const {topcharacters} = useSelector(state => state.main)

  const dispatch = useDispatch()
  
  useEffect(() => {    
    dispatch(fetchAnimeNow())
    dispatch(fetchAnimeScore())
    dispatch(fetchCharactres())
    dispatch(fetchTopCharactres())
  }, [dispatch]) 
  
  return (
    <>      
      <MainContent/>
      <div className={s.block2}>        
        <AnimeSwiper anime={now} title='Trending now' type='anime'/>        
        <AnimeSwiper anime={score} title='Best Score' type='anime'/>
        <AnimeSwiper anime={characters} title='Charactres' type='characters'/>
        <AnimeSwiper anime={topcharacters} title='Top Charactres' type='characters'/>
      </div>
    </>
  )
}

export default MainPage