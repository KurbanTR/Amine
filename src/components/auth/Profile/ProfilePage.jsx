import s from './ProfilePage.module.css'
import { SwiperSlide, Swiper} from "swiper/react"
import { Keyboard } from 'swiper/modules';
import 'swiper/css'
import ss from '../../swiper.module.css'
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { fetchAnimes, fetchMangas } from '../../../store/profileSlice';
import { getDefineUser } from "../../../store/authSlice";
import settings from '../../../assets/settings.svg' 

const AnimeSwiper = ({ anime, animeSpan, type }) => {
  
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
              <Link to={`/${type}/${item.id}`}>
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


const ProfilePage = () => {
  const [animeSpan, setAnimeSpan] = useState(true)
  const [mangaSpan, setMangaSpan] = useState(false)
  const dispatch = useDispatch()
  const { data } = useSelector(state => state.user)

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
      <div>
        <div className={`${s.block_1__shapka} brightness-75`}>
          <div className="flex flex-col self-end items-end z-10">
            <Link to='/settings' className='flex justify-center items-center rounded-xl bg-custom-color bg-opacity-50 cursor-pointer py-3.5 px-4'>
              <img src={settings} alt="" />
            </Link>
          </div>
        </div>
        <div className='w-[1440px] mx-auto 1480res:w-full'>
          <div className='relative py-10 pr-20 1480res:p-[2.5rem_5rem_2.5rem_2.5rem] 500res:p-[2.5rem_1.25rem_2.5rem_1.25rem] 700res:p-10 h-full flex justify-between items-center gap-[10px]'>
            <div className='flex gap-10 500res:gap-7 items-center w-full 700res:flex-col 700res:items-center'>
              <img src={data?.img} className='flex-shrink-0 rounded-full w-[170px] h-[170px]' alt='SUI' />
              <div className='w-full overflow-hidden 700res:flex 700res:items-center 700res:flex-col'>
                <p className='text-5xl font-medium mb-2 900res:text-[2rem] 500res:text-2xl 370res:text-xl'>{data?.name}</p>
                <span className='duration-200 text-white/70 text-lg line-clamp-2 900res:text-[1rem] 500res:text-[.8rem]
                            hover:text-white cursor-pointer 700res:text-center'>{data?.bio}</span>
              </div>
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
          <AnimeSwiper anime={anime} animeSpan={animeSpan} type='anime'/>
          <AnimeSwiper anime={manga} animeSpan={mangaSpan} type='manga'/>
        </div>
      </div>
    </>
  )
}

export default ProfilePage