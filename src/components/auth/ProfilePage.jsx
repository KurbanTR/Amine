import { SwiperSlide, Swiper} from "swiper/react"
import { Keyboard } from 'swiper/modules';
import 'swiper/css'
import ss from '../../styles/swiper.module.css'
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { removeAnime, removeManga } from '../../store/profileSlice';
import { getDefineUser } from "../../store/authSlice";
import settings from '../../assets/settings.svg' 
import icon from '../../assets/icons8.svg'
import deletee from '../../assets/delete.svg'
import BioMenu from "../../other/BioMenu";

const AnimeSwiper = ({ anime, animeSpan, type, edit, dispatch, idUser }) => {
  const onDelete = (id)=>{
    type == 'anime' ?
    dispatch(removeAnime({ idUser, animeId: id }))
    :
    dispatch(removeManga({ idUser, mangaId: id }))
  }
  return (
    <div className='container flex overflow-hidden px-5' style={animeSpan ? {} : {display: 'none'}}>
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
              <span onClick={()=>onDelete(item.id)} className={`${!edit && 'pointer-events-none opacity-0'} z-10 flex cursor-pointer p-3 active:p-3 active:scale-90 duration-100
            absolute top-2 left-2 500res:w-10 500res:h-10 w-14 h-14 bg-def-gray justify-center items-center rounded-full 1320res:flex`}>
                <img src={deletee} alt="delete"/>
              </span>           
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
                      <p className='text-[#ababab] font-medium'>{item?.year}{item?.genre && `, ${item?.genre}`}</p>
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

const UserProfile = ({ user, setActive}) => {
  return (
    <div className="relative py-10 pr-20 1480res:p-[2.5rem_5rem_2.5rem_2.5rem] 500res:p-[2.5rem_1.25rem_2.5rem_1.25rem] 700res:p-10 h-full flex justify-between items-center gap-[10px]">
      <div className="flex gap-10 500res:gap-7 items-center w-full 700res:flex-col 700res:items-center">
        <img src={user?.img} className="flex-shrink-0 rounded-full w-[170px] h-[170px] text-center object-cover" alt="avatar" />
        <div className="w-full overflow-hidden 700res:flex 700res:items-center 700res:flex-col">
          <p className="text-5xl font-medium mb-2 900res:text-[2rem] 500res:text-2xl 370res:text-xl">{user?.name}</p>
          <span className="duration-200 text-white/70 text-lg line-clamp-2 900res:text-[1rem] 500res:text-[.8rem] hover:text-white cursor-pointer 700res:text-center" onClick={()=>setActive(true)}>
            {user?.bio}
          </span>
        </div>
      </div>
    </div>
  );
};

const ProfilePage = () => {
  const [animeSpan, setAnimeSpan] = useState(true)
  const [mangaSpan, setMangaSpan] = useState(false)
  const dispatch = useDispatch()
  const { data } = useSelector(state => state.profile)
  const idUser = useSelector(state => state.user.id)

  const [edit, setEdit] = useState(false)

  const [active, setActive] = useState(false)

  useEffect(()=>{
    dispatch(getDefineUser({id:idUser}))
    console.log(data);
  }, [dispatch, idUser])

  return (
    <>
      <div>
        <BioMenu bio={data?.bio} active={active} setActive={setActive}/>
        <div className={"brightness-75 flex justify-end h-[230px] pr-5 pb-5 bg-cover bg-center"} style={{backgroundImage: 'url(https://i.pinimg.com/originals/a6/b2/56/a6b256f4640c44ed0536b8a5e2932766.jpg)'}}>
          <div className="flex flex-col self-end items-end z-10">
            <Link to='/settings' className='flex justify-center items-center rounded-xl bg-custom-color bg-opacity-50 cursor-pointer py-3.5 px-4'>
              <img src={settings} alt="" />
            </Link>
          </div>
        </div>
        <div className='w-[1440px] mx-auto 1480res:w-full'>
          <UserProfile user={data} setActive={setActive}/>
          <div className='my-10 px-5 flex gap-5'>
            <h1 onClick={()=>{setAnimeSpan(true); setMangaSpan(false)}} className={`${animeSpan && 'bg-def-gray'} w-[5.5em] py-[10px] rounded-[12px] text-center font-medium text-[20px] transition duration-100 cursor-pointer active:scale-95`}>Anime</h1>
            <h1 onClick={()=>{setMangaSpan(true); setAnimeSpan(false)}} className={`${mangaSpan && 'bg-def-gray'} w-[5.5em] py-[10px] rounded-[12px] text-center font-medium text-[20px] transition duration-100 cursor-pointer active:scale-95`}>Manga</h1>
            <h1 onClick={()=>setEdit(!edit)} className={`${edit && 'bg-def-gray'} w-[5.5em] py-[10px] rounded-[12px] text-center font-medium text-[20px] transition duration-100 cursor-pointer justify-self-end ml-auto 600res:ml-0 active:scale-95 flex items-center justify-center gap-2`}>
              <div className={(edit ? 'bg-white' : 'border-2') + ' duration-300 w-5 h-5 bg-def-black border-gray-500 flex justify-center items-center rounded-[4px]'}>
                <img src={icon} alt="" />
              </div>
              <p>Edit</p>
            </h1>
          </div>
          <AnimeSwiper anime={data?.animes} animeSpan={animeSpan} type='anime' edit={edit} dispatch={dispatch} idUser={idUser}/>
          <AnimeSwiper anime={data?.mangas} animeSpan={mangaSpan} type='manga' edit={edit} dispatch={dispatch} idUser={idUser}/>
        </div>
      </div>
    </>
  )
}

export default ProfilePage