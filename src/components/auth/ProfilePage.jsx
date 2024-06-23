import { SwiperSlide, Swiper} from "swiper/react"
import { Keyboard } from 'swiper/modules';
import 'swiper/css'
import ss from '../../styles/swiper.module.css'
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { removeAnime } from '../../store/profileSlice';
import { getUser } from "../../store/authSlice";
import settings from '../../assets/settings.svg' 
import icon from '../../assets/icons8.svg'
import deletee from '../../assets/delete.svg'
import BioMenu from "../../other/BioMenu";
import useCardSize from '../../other/CardSize'

const AnimeSwiper = ({ anime, edit, dispatch, idUser }) => {
  const {cardHeight} = useCardSize()
  const onDelete = (id) => {
    dispatch(removeAnime({ idUser, animeId: id }));
  };

  return (
    <div className='flex overflow-hidden px-5'>
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
          <SwiperSlide className="!w-auto" key={index}>
            <span
              onClick={() => onDelete(item.id)}
              className={`${!edit && 'pointer-events-none opacity-0'} z-10 flex cursor-pointer p-3 active:p-3 active:scale-90 duration-100 absolute top-2 left-2 w-10 h-10 500res:w-14 500res:h-14 bg-def-gray justify-center items-center rounded-full 1320res:flex`}
            >
              <img src={deletee} alt="delete" />
            </span>
            <Link to={`/anime/${item.id}`}>
              <div className='relative overflow-hidden rounded-lg'>
                <div>
                  <img src={item.img} style={{height: +cardHeight+100}} alt="" />
                </div>
                {item.score && 
                      <div className='absolute top-[.5em] right-0 flex justify-end pr-1'>
                        <h3 className='bg-[rgb(6,193,73)] py-1 px-3 text-[.9em] 500res:text-[.7em] font-bold rounded-md 400res:px-2'>
                          {item.score}
                        </h3>
                      </div>
                    }   
                <div className='absolute bottom-0 right-0 h-24 flex items-end w-full bg-gradient-to-t from-black opacity-80 p-4'>
                  <div className='flex flex-col'>
                    <p className='text-[1em] text-white 540res:text-[18px]  400res:text-[10px]'>{item.title}</p>
                    <p className='text-[#ababab] font-medium 540res:text-[.7em]  400res:text-[.4em]'>{item?.year}{item?.genre && `, ${item?.genre}`}</p>
                  </div>
                </div>
              </div>
            </Link>
          </SwiperSlide>
        ))}
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
  const dispatch = useDispatch()
  const { profile } = useSelector(state => state.profile)
  const idUser = useSelector(state => state.user.id)
  const params = useParams()

  const [edit, setEdit] = useState(false)

  const [active, setActive] = useState(false)

  useEffect(()=>{
    document.title = 'JumCloud - Profile'
  },[])

  useEffect(()=>{
    dispatch(getUser({id:params.id}))
    console.log(profile);
  }, [dispatch, idUser])

  // if(loading) return <Preloader/>
  return (
    <>
      <div>
        <BioMenu bio={profile?.bio} active={active} setActive={setActive}/>
        <div className={"brightness-75 flex justify-end h-[230px] pr-5 pb-5 bg-cover bg-center"} style={{backgroundImage: 'url(https://i.pinimg.com/originals/a6/b2/56/a6b256f4640c44ed0536b8a5e2932766.jpg)'}}>
          <div className="flex flex-col self-end items-end z-10">
          {params.id == idUser &&
              <div className='flex flex-col self-end items-end z-10'>
                <Link to='/settings' className='btn-base bg-def-gray cursor-pointer flex items-center justify-center'>
                  <img src={settings} alt="" />
                </Link>
              </div>}
          </div>
        </div>
        <div className='w-[1440px] mx-auto 1480res:w-full'>
          <UserProfile user={profile} setActive={setActive}/>
          <div className='my-11 px-5 flex gap-5 items-center'>
            <h1 className='text-5xl 900res:text-3xl 650res:text-2xl'>Favorite</h1>
            {params.id == idUser &&
              <h1 onClick={()=>setEdit(!edit)} className={`${edit && 'bg-def-gray'} w-[5.5em] py-[10px] rounded-[12px] text-center font-medium text-[20px] transition duration-100 cursor-pointer justify-self-end ml-auto active:scale-95 flex items-center justify-center gap-2`}>
                <div className={(edit ? 'bg-white' : 'border-2') + ' duration-300 w-5 h-5 bg-def-black border-gray-500 flex justify-center items-center rounded-[4px]'}>
                  <img src={icon} alt="" />
                </div>
                <p>Edit</p>
              </h1>
            }
          </div>
          <AnimeSwiper anime={profile?.animes} edit={edit} dispatch={dispatch} idUser={idUser}/>
        </div>
      </div>
    </>
  )
}

export default ProfilePage