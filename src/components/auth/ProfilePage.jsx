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
          {data?.token &&
              <div className='flex flex-col self-end items-end z-10'>
                <Link to={"/settings"} className='btn-base bg-def-gray cursor-pointer flex items-center justify-center'>
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M15.0004 24H9.00042V20.487C7.95768 20.1181 6.99187 19.5601 6.15142 18.841L3.10742 20.6L0.107422 15.4L3.15042 13.645C2.95053 12.5574 2.95053 11.4426 3.15042 10.355L0.107422 8.6L3.10742 3.4L6.15142 5.159C6.99187 4.43993 7.95768 3.88194 9.00042 3.513V0H15.0004V3.513C16.0432 3.88194 17.009 4.43993 17.8494 5.159L20.8934 3.4L23.8934 8.6L20.8504 10.355C21.0503 11.4426 21.0503 12.5574 20.8504 13.645L23.8934 15.4L20.8934 20.6L17.8494 18.842C17.0089 19.5607 16.0431 20.1184 15.0004 20.487V24ZM11.0004 22H13.0004V18.973L13.7514 18.779C14.9834 18.4598 16.1048 17.8101 16.9944 16.9L17.5374 16.347L20.1604 17.862L21.1604 16.13L18.5404 14.617L18.7464 13.871C19.0851 12.6439 19.0851 11.3481 18.7464 10.121L18.5404 9.375L21.1604 7.862L20.1604 6.13L17.5374 7.649L16.9944 7.1C16.1043 6.19134 14.983 5.54302 13.7514 5.225L13.0004 5.027V2H11.0004V5.027L10.2494 5.221C9.01741 5.54015 7.89603 6.18988 7.00642 7.1L6.46342 7.653L3.84042 6.134L2.84042 7.866L5.46042 9.379L5.25442 10.125C4.91578 11.3521 4.91578 12.6479 5.25442 13.875L5.46042 14.621L2.84042 16.134L3.84042 17.866L6.46342 16.351L7.00642 16.904C7.89651 17.8127 9.01785 18.461 10.2494 18.779L11.0004 18.973V22ZM12.0004 16C11.2093 16 10.4359 15.7654 9.77814 15.3259C9.12034 14.8864 8.60765 14.2616 8.3049 13.5307C8.00215 12.7998 7.92294 11.9956 8.07728 11.2196C8.23162 10.4437 8.61258 9.73098 9.17199 9.17157C9.7314 8.61216 10.4441 8.2312 11.2201 8.07686C11.996 7.92252 12.8003 8.00173 13.5312 8.30448C14.2621 8.60723 14.8868 9.11992 15.3263 9.77772C15.7658 10.4355 16.0004 11.2089 16.0004 12C16.0004 13.0609 15.579 14.0783 14.8288 14.8284C14.0787 15.5786 13.0613 16 12.0004 16ZM12.0004 10C11.6049 10 11.2182 10.1173 10.8893 10.3371C10.5604 10.5568 10.304 10.8692 10.1527 11.2346C10.0013 11.6001 9.96168 12.0022 10.0389 12.3902C10.116 12.7781 10.3065 13.1345 10.5862 13.4142C10.8659 13.6939 11.2223 13.8844 11.6102 13.9616C11.9982 14.0387 12.4003 13.9991 12.7658 13.8478C13.1312 13.6964 13.4436 13.44 13.6634 13.1111C13.8831 12.7822 14.0004 12.3956 14.0004 12C14.0004 11.4696 13.7897 10.9609 13.4146 10.5858C13.0396 10.2107 12.5309 10 12.0004 10Z" fill="white"/>
                  </svg>
                </Link>
              </div>}
          </div>
        </div>
        <div className='w-[1440px] mx-auto 1480res:w-full'>
          <UserProfile user={data} setActive={setActive}/>
          <div className='my-10 px-5 flex gap-5'>
            <h1 onClick={()=>{setAnimeSpan(true); setMangaSpan(false)}} className={`${animeSpan && 'bg-def-gray'} w-[5.5em] py-[10px] rounded-[12px] text-center font-medium text-[20px] transition duration-100 cursor-pointer active:scale-95 hover:transform: scale-125;`}>Anime</h1>
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