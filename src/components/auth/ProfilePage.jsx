import { SwiperSlide, Swiper} from "swiper/react"
import { Keyboard } from 'swiper/modules';
import 'swiper/css'
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { removeAnime } from '../../store/profileSlice';
import { getUser } from "../../store/authSlice";
import settings from '../../assets/settings.svg' 
import icon from '../../assets/icons8.svg'
import deletee from '../../assets/delete.svg'
import BioMenu from "../../other/BioMenu";
import useCardSize, { useSize } from '../../other/CardSize'

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
        className="mb-4"
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
  const [showModal, setShowModal] = useState()
  
  const openModal = () => {
    setShowModal(true)
    setTimeout(() => setShowModal(false), 1000)
  }
  return (
    <div className="relative py-10 pr-20 1480res:p-[2.5rem_5rem_2.5rem_2.5rem] 500res:p-[2.5rem_1.25rem_2.5rem_1.25rem] 700res:p-10 h-full flex justify-between items-center gap-[10px]">
      <div className="flex gap-10 500res:gap-7 items-center w-full 700res:flex-col 700res:items-center">
        <div className={`${showModal ? "opacity-100" : ""} duration-300 absolute top-10 left-1/2 -translate-x-1/2 p-5 500res:text-sm 500res:p-3 bg-green-500 rounded-xl opacity-0 pointer-events-none`}>Copied to clipboard.</div>
        <img src={user?.img} className="flex-shrink-0 rounded-full w-[170px] h-[170px] text-center object-cover" alt="avatar" />
        <div className="w-full overflow-hidden 700res:flex 700res:items-center 700res:flex-col">
          <p className="text-5xl font-[550] mb-2 900res:text-[2rem] 500res:text-2xl 370res:text-xl">{user?.name}</p>
          <div className=' text-lg text-white/70 mb-2 900res:text-[1rem] 900res:mb-1 flex gap-2 900res:gap-1 items-center cursor-pointer
                 [&_path]:hover:fill-white [&_span]:hover:text-white [&_path]:duration-200 w-max' onClick={() => {
                  navigator.clipboard.writeText(location.href)
                  openModal()
              }}>
              <span className='w-[20px] h-[20px]'>
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none">
                      <g clipPath="url(#clip0_405_1425)">
                      <path d="M12 0C8.81845 0.00344108 5.7682 1.26883 3.51851 3.51852C1.26882 5.76821 0.0034331 8.81846 -7.97655e-06 12C-0.125008 21.574 11.159 27.429 18.9 21.817C19.0622 21.7041 19.2006 21.5602 19.307 21.3937C19.4135 21.2271 19.4859 21.0412 19.5203 20.8465C19.5546 20.6519 19.5502 20.4523 19.5072 20.2594C19.4641 20.0665 19.3834 19.884 19.2696 19.7223C19.1558 19.5607 19.0112 19.4232 18.8441 19.3176C18.677 19.2121 18.4906 19.1406 18.2958 19.1073C18.101 19.074 17.9015 19.0795 17.7088 19.1236C17.5161 19.1676 17.334 19.2493 17.173 19.364C11.42 23.582 2.86299 19.146 2.99999 12C3.47199 0.0699997 20.529 0.0719995 21 12V13.5C21 13.8978 20.842 14.2794 20.5607 14.5607C20.2793 14.842 19.8978 15 19.5 15C19.1022 15 18.7206 14.842 18.4393 14.5607C18.158 14.2794 18 13.8978 18 13.5V12C17.748 4.071 6.25099 4.072 5.99999 12C6.00998 13.1628 6.35671 14.2978 6.99823 15.2677C7.63974 16.2376 8.54857 17.0009 9.61475 17.4651C10.6809 17.9293 11.8588 18.0746 13.0058 17.8835C14.1529 17.6923 15.22 17.1729 16.078 16.388C16.6736 17.0856 17.4682 17.5844 18.3553 17.8178C19.2424 18.0511 20.1796 18.0078 21.0414 17.6937C21.9032 17.3795 22.6484 16.8095 23.1772 16.06C23.7059 15.3104 23.993 14.4172 24 13.5V12C23.9966 8.81846 22.7312 5.76821 20.4815 3.51852C18.2318 1.26883 15.1815 0.00344108 12 0V0ZM12 15C11.2043 15 10.4413 14.6839 9.87867 14.1213C9.31606 13.5587 8.99999 12.7956 8.99999 12C8.99999 11.2044 9.31606 10.4413 9.87867 9.87868C10.4413 9.31607 11.2043 9 12 9C12.7956 9 13.5587 9.31607 14.1213 9.87868C14.6839 10.4413 15 11.2044 15 12C15 12.7956 14.6839 13.5587 14.1213 14.1213C13.5587 14.6839 12.7956 15 12 15Z" fill="rgb(255 255 255 / 0.7)"/>
                      </g>
                      <defs>
                      <clipPath id="clip0_405_1425">
                      <rect width="24" height="24" fill="white"/>
                      </clipPath>
                      </defs>
                  </svg>
              </span>
              <span className='500res:text-[.8rem] duration-200'>{user?.name}</span>
          </div>
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
  const {cardHeight} = useSize()

  const [edit, setEdit] = useState(false)

  const [active, setActive] = useState(false)

  useEffect(()=>{
    if(profile?.name) document.title = `JumCloud - ${profile?.name}'s profile`
  },[profile])

  useEffect(()=>{
    dispatch(getUser({id:params.id}))
    console.log(profile);
  }, [dispatch, idUser])

  // if(loading) return <Preloader/>
  return (
    <>
      <div>
        <BioMenu bio={profile?.bio} active={active} setActive={setActive}/>
        <div className={"brightness-75 flex justify-end 1320res:!h-[230px] pr-5 pb-5 bg-cover bg-center"} style={{backgroundImage: 'url(https://i.pinimg.com/originals/a6/b2/56/a6b256f4640c44ed0536b8a5e2932766.jpg)', height: cardHeight}}>
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