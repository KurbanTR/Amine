import { Link } from 'react-router-dom'
import s from '../styles/Header.module.css'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getDefineUser } from '../store/authSlice';
import { useLocation } from 'react-router-dom';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const dispatch = useDispatch()
  const { data } = useSelector(state => state.profile)
  const idUser = useSelector(state => state.user.id)
  const location = useLocation()

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
      <div className='w-full flex gap-14 650res:gap-0 650res:justify-between items-center'>
        <Link to='/'>
          <h1 className={s.title}>JumCloud</h1>
        </Link>

        <nav className={s.nav}>      
          <div className='flex gap-10 items-center'>
            <Link to='/' className='text-2xl' style={location?.pathname !== '/' ? {color: 'rgba(232, 232, 232, 0.7)'} :{}}>Home</Link>
            <Link to='/search' className='text-2xl' style={location?.pathname !== '/search' ? {color: 'rgba(232, 232, 232, 0.7)'}:{}}>Catalog</Link>
          </div>
        </nav>
        <span className={`${s.burger_menu}`}>
          <svg className='w-7 h-7' xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M2 5.5C2 4.94772 2.44772 4.5 3 4.5H21C21.5523 4.5 22 4.94772 22 5.5V6.5C22 7.05228 21.5523 7.5 21 7.5H3C2.44772 7.5 2 7.05228 2 6.5V5.5Z" fill="white"/>
              <path d="M2 11.5C2 10.9477 2.44772 10.5 3 10.5H21C21.5523 10.5 22 10.9477 22 11.5V12.5C22 13.0523 21.5523 13.5 21 13.5H3C2.44772 13.5 2 13.0523 2 12.5V11.5Z" fill="white"/>
              <path d="M3 16.5C2.44772 16.5 2 16.9477 2 17.5V18.5C2 19.0523 2.44772 19.5 3 19.5H21C21.5523 19.5 22 19.0523 22 18.5V17.5C22 16.9477 21.5523 16.5 21 16.5H3Z" fill="white"/>
          </svg>
        </span>
      </div>
      <Link to={data?.token ? '/profile' : '/signin'} className='650res:hidden'>
        <img src={data?.img || 'https://freesvg.org/img/abstract-user-flat-4.png'} className='flex-shrink-0 rounded-full w-[3.5em] 900res:w-[3em] object-cover' alt='avatar' />
      </Link>
    </header>
  )
}

export default Header