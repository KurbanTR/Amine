import { Link } from 'react-router-dom'
import s from '../styles/Header.module.css'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getDefineUser } from '../store/authSlice';
import staff from '../assets/staff.svg'

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const { token } = useSelector(state => state.user)
  const dispatch = useDispatch()
  const { data } = useSelector(state => state.profile)
  const idUser = useSelector(state => state.user.id)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.pageYOffset > 0);
    };
    dispatch(getDefineUser({id:idUser}))
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header className={isScrolled ? s.header_scrolled : s.header}>
        <Link to='/' className={s.title}>
          <h1>JumCloud</h1>
        </Link>

        <nav className={s.nav}>      
          <div className='flex gap-2 items-center'>
            <Link to='/anime' className={`${s.catalog_link} 700res:text-[20px]`}>Anime</Link>
          </div>
          <div className='flex gap-2 items-center'>
            <Link to='/manga' className={`${s.catalog_link} 700res:text-[20px]`}>Manga</Link>
          </div>
          <div className='flex gap-2 items-center'>
            <Link to='/characters' className={`${s.catalog_link} 700res:text-[20px]`}>Character</Link>
          </div>
          <Link to={`/chat/${idUser}`} className='flex items-center'>
            <img src={staff} alt="staff" className='w-7 370res:w-5'/>
          </Link>
          <Link to={token ? '/profile' : '/signin'}>
            <img src={data?.img || 'https://freesvg.org/img/abstract-user-flat-4.png'} className='flex-shrink-0 rounded-full w-[70px] h-[70px] text-center 400res:w-[50px] 400res:h-[50px] object-cover' alt='avatar' />
          </Link>
        </nav>
      </header>
  )
}

export default Header