import { useEffect, useState } from 'react'
import { Link } from "react-router-dom"
import s from '../../styles/MainPage.module.css'
import { fetchTrendingNow, fetchPopular, fetchBestScore, fetchUpcoming } from '../../store/mainSlice'
import { useSelector, useDispatch } from 'react-redux'
import { SwiperSlide, Swiper} from "swiper/react"
import { Keyboard } from 'swiper/modules';
import 'swiper/css'
import ss from '../../styles/swiper.module.css'
import MainContent from '../../other/MainContent'
import Preloader from '../../other/Preloader'
import useCardSize from '../../other/CardSize'
import { fetchAnimes } from '../../store/animeHistory'

const LongerAnimeCard = ({anime, title, setAnimeHistory}) => {
  const {cardHeight} = useCardSize()
  const [clearConfirm, setClearConfirm] = useState(false)
  return (
    <article>
      <section className='flex justify-between h-fit items-end mb-5'>
        <h2 className='text-2xl font-[550] mt-20 1480res:mb-2 1480res:mt-0 500res:mb-3 500res:mt-3'>{title}</h2>
        {title === 'Continue watch' && (!clearConfirm ? (
          <button
            className="w-max btn-base bg-white text-def-black gap-1 600res:text-sm 450res:text-xs 450res:p-[8px]"
            onClick={() => {
              setClearConfirm(true);
            }}
          >
            Clear History
          </button>
        ) : (
          <div className='flex gap-5'>
            <button
              className="w-max btn-base bg-red-500 text-white gap-1 600res:text-sm 450res:text-xs 450res:p-[8px]"
              onClick={() => {
                setAnimeHistory(null);
              }}
            >
              Clear History
            </button>
            <button
              className="w-max btn-base bg-def-gray text-white gap-1 600res:text-sm 450res:text-xs 450res:p-[8px]"
              onClick={() => {
                setClearConfirm(false);
              }}
            >
              Back
            </button>
          </div>
        ))}
      </section>
      <section className='flex overflow-hidden mb-7'>
        <Swiper
          grabCursor={true}
          spaceBetween={20}
          keyboard={{
            enabled: true,
          }}
          modules={[Keyboard]}
          slidesPerView={1.25}
          initialSlide={0}
        >
          {anime?.map((item, index) => (
            <SwiperSlide key={index}>
              <Link
                to={
                  item?.time
                    ? `/watch/${item?.animeId}?ep=${item?.lastEpisode}&time=${item?.time}`
                    : `/anime/${item?.id}`
                }
              >
                <div
                  style={{
                    backgroundImage: `url(${item?.cover ? item?.cover : item?.image})`,
                    backgroundColor: `${item?.color}`,
                    height: cardHeight,
                  }}
                  className={`bg-def-gray bg-center bg-no-repeat bg-cover w-full h-[200px] flex-col flex justify-center items-start p-7 gap-2 700res:h-[150px] 500res:h-[110px] pr-[110px] 500res:pr-[80px] 330res:pr-7 500res:gap-[4px] relative -z-10 500res:p-[24px] rounded-xl`}
                >
                  <div
                    style={item?.cover ? {} : { backgroundImage: `url(${item?.image})` }}
                    className={`${
                      item?.cover ? '' : 'backdrop-blur-xl bg-right bg-contain bg-no-repeat'
                    } 330res:!backdrop-blur-none 330res:!bg-none w-full h-full absolute top-0 left-0 bg-black/20 rounded-xl`}
                  ></div>
                  {item?.lastEpisode ? (
                    <div className='flex gap-3 items-center'>
                      <div className='p-2 bg-white text-def-black font-[550] 700res:text-xs 700res:p-[6px] rounded-md 700res:rounded-sm z-10 500res:text-[8px] 500res:leading-none 500res:p-[5px]'>{`Episode ${item?.lastEpisode}`}</div>
                      <div className='p-2 bg-black/30 backdrop-blur-lg text-white font-[550] 700res:text-xs 700res:p-[6px] rounded-md 700res:rounded-sm z-10 500res:text-[8px] 500res:leading-none 500res:p-[5px]'>{`${(item?.time / 60)
                        .toFixed(0)
                        .padStart(2, '0')}:${(item?.time % 60).toFixed(0).padStart(2, '0')}`}</div>
                    </div>
                  ) : (
                    <div className='p-2 bg-white text-def-black font-semibold 700res:text-xs 700res:p-[6px] rounded-md 700res:rounded-sm z-10 500res:text-[8px] 500res:leading-none 500res:p-[5px]'>{`Release ${item?.releaseDate ?? '????'}`}</div>
                  )}
                  <div className='text-xl font-semibold 700res:text-lg z-10 500res:text-xs line-clamp-1 flex-shrink-0'>{item?.title?.english || item?.title?.romaji}</div>
                  <div className='text-lg 700res:text-base z-10 font-semibold 500res:text-[10px] 500res:leading-none'>
                    {item?.time ? `${item?.type}, ${item?.releaseDate}` : item?.type}
                  </div>
                </div>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>
    </article>
  )
}

const AnimeSwiper = ({ anime, title }) => {
  return (
    <section>
      <h2 className='text-2xl font-[550] mb-5 mt-20 1480res:mb-2 1480res:mt-0 500res:mb-3 500res:mt-3'>{title}</h2>
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
          {anime?.map((item, index) => (
            <SwiperSlide className={ss.swiper__slide} key={index} pagination={{ clickable: true }}>
              <Link to={`/anime/` + item.id}>
                <article className='relative overflow-hidden rounded-lg h-[90%] bg-blue-700'>
                  <figure>
                    <img src={item.image} className={`bg-[${item.color}]`} alt={item?.title?.english || item?.title?.romaji} />
                  </figure>
                  {item.rating && (
                    <div className='absolute top-[.5em] right-0 flex justify-end pr-1'>
                      <span className='bg-[rgb(6,193,73)] py-1 px-3 text-[.9em] 500res:text-[.7em] font-bold rounded-md 400res:px-2'>
                        {item.rating / 10}
                      </span>
                    </div>
                  )}
                  <div className='absolute bottom-0 right-0 h-[90%] flex items-end w-full bg-gradient-to-t from-black opacity-80 p-[10%]'>
                    <div className='flex flex-col'>
                      <h3 className='font-[550] line-clamp-1 text-[1em] text-white 540res:text-[18px] 400res:text-[10px]'>{item.title.english}</h3>
                      <p className='text-[#ababab] font-medium 540res:text-[.7em] 400res:text-[.4em]'>
                        {item.releaseDate ? item.releaseDate + (item.genres.length !== 0 ? ', ' + item?.genres?.[0] : '') : item.genres.length !== 0 ? item.genres[0] : ''}
                      </p>
                    </div>
                  </div>
                </article>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

const MainPage = () => {
  const {trendingnow} = useSelector(state => state.main)
  const {popular} = useSelector(state => state.main)
  const {bestscore} = useSelector(state => state.main)
  const {upcoming} = useSelector(state => state.main)
  const {id} = useSelector(state=>state.user)
  const {animes} = useSelector(state=>state.histori)

  const [animeHistory, setAnimeHistory] = useState(animes)
  const [loading, setLoading] = useState(false)

  const dispatch = useDispatch()

  
  useEffect(()=>{
    document.title = 'JumCloud - Anime Oline'
  },[])

  useEffect(()=>{
    if(animes) setAnimeHistory(animes)
  },[animes])

  useEffect(()=>{
    trendingnow.length == 0 && setLoading(true)

    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  },[])

  useEffect(() => {    
    trendingnow.length == 0 && dispatch(fetchTrendingNow())
    popular.length == 0 && dispatch(fetchPopular())
    upcoming.length == 0 && dispatch(fetchUpcoming())
    bestscore.length == 0 && dispatch(fetchBestScore())
    animes.length == 0 && dispatch(fetchAnimes({idUser: id}))
  }, [dispatch]) 
  
  if(loading) return <Preloader/>
  return (
    <div>      
      <MainContent/>
      <div className={s.block2}>        
        <AnimeSwiper anime={trendingnow} title='Trending now'/>        
        <AnimeSwiper anime={popular} title='Most Popular'/>
        {animeHistory?.length > 0 && <LongerAnimeCard anime={animeHistory} title='Continue watch' setAnimeHistory={setAnimeHistory}/>}
        <AnimeSwiper anime={bestscore} title='Best Score'/>
        <LongerAnimeCard anime={upcoming} title='Coming soon'/>
      </div>
    </div>
  )
}

export default MainPage