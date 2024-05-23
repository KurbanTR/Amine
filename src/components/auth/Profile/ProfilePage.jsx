import s from './ProfilePage.module.css'
import { SwiperSlide, Swiper} from "swiper/react"
import { Keyboard } from 'swiper/modules';
import 'swiper/css'
import ss from '../../swiper.module.css'
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { fetchAnimes, fetchMangas } from '../../../store/profileSlice';
import PropTypes from 'prop-types'
import { getDefineUser } from "../../../store/authSlice";




const AnimeSwiper = ({ anime, animeSpan }) => {
  
  return (
    <div className='container w-full flex overflow-hidden px-5' style={animeSpan ? {} : {display: 'none'}}>
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
              <Link to={'/anime/' + item.id}>
                <div className='relative overflow-hidden rounded-lg h-[90%]'>
                  <div>
                    <img src={item.img} className='w-full' alt=""/>
                  </div>       
                  {item.score && 
                    <div className='absolute top-[.5em] right-0 flex justify-end'>
                      <h3 className='bg-black opacity-60 py-1 px-3 text-[.9em] font-medium rounded-l-md'>
                        {item.score}
                      </h3>
                    </div>
                  }             
                  <div className='absolute bottom-0 right-0 h-60 flex items-end w-full bg-gradient-to-t from-black opacity-80 p-4'>
                    <div className='flex flex-col'>
                      <p className='line-clamp-1 text-[1.2em] text-white'>{item.title}</p>
                    </div>
                  </div>
                </div>
              </Link>
            </SwiperSlide>
          )
        }
      </Swiper>
    </div>
  );
};
AnimeSwiper.propTypes = {
  anime: PropTypes.string,
  animeSpan: PropTypes.func,
}


const ProfilePage = () => {
  const [animeSpan, setAnimeSpan] = useState(true)
  const [mangaSpan, setMangaSpan] = useState(false)
  const dispatch = useDispatch()
  const { name } = useSelector(state => state.user)

  const manga = useSelector(state => state.profile.mangas)
  const anime = useSelector(state => state.profile.animes)
  const idUser = useSelector(state => state.user.id)

  useEffect(()=>{
    dispatch(fetchAnimes({idUser}))
    dispatch(fetchMangas({idUser}))
    dispatch(getDefineUser({id:idUser}))
  }, [dispatch, idUser])

  return (
    <>
      <div className={s.block_1}>
        <div className={`${s.block_1__shapka} brightness-75`}></div>
        <div className={s.block_1__titles}>
          <img src='https://freesvg.org/img/abstract-user-flat-4.png' className='flex-shrink-0 rounded-full w-[170px] h-[170px]' alt='SUI' />
          <div className='w-[57%] flex items-center'>
            <p className={s.title}>{name}</p>
          </div>
        </div>
        <div className='my-10 px-5 flex gap-5'>
          <span>
            <h1 onClick={()=>{setAnimeSpan(!animeSpan); setMangaSpan(false)}} className={s.span} style={animeSpan ? {background: 'rgb(33 33 33 / 1)'} : {}}>Anime</h1>
          </span>
          <span>
            <h1 onClick={()=>{setMangaSpan(!mangaSpan); setAnimeSpan(false)}} className={s.span} style={mangaSpan ? {background: 'rgb(33 33 33 / 1)'} : {}}>Manga</h1>
          </span>
        </div>
        <AnimeSwiper anime={anime} animeSpan={animeSpan}/>
        <AnimeSwiper anime={manga} animeSpan={mangaSpan}/>
      </div>
    </>
  )
}

export default ProfilePage