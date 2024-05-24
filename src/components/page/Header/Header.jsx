import { Link, useNavigate } from 'react-router-dom'
import s from './Header.module.css'
import { useEffect, useState } from 'react'
import { Select } from 'antd';
import { useSelector } from 'react-redux'

const Header = () => {
  const nav = useNavigate()
  const [isScrolled, setIsScrolled] = useState(false);
  const { token } = useSelector(state => state.user)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.pageYOffset > 0);
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  const onChange = (value) => {
    nav(`/${value}`)
  };
  const onSearch = (value) => {
    console.log('search:', value);
  };

  const filterOption = (input, option) => (option?.label ?? '').toLowerCase().includes(input.toLowerCase());

  return (
    <header className={isScrolled ? s.header_scrolled : s.header}>
        <Link to='/' className={s.title}>
          <h1>JumCloud</h1>
        </Link>

        <nav className={s.nav}>      
          <Link to='/anime' className={s.catalog_link}>Anime</Link>
          <Link to='/manga' className={s.catalog_link}>Manga</Link>
          <Link to='/character' className={s.catalog_link}>Character</Link>
          
          <Link to={token ? '/profile' : '/signin'}>
            <img src='https://freesvg.org/img/abstract-user-flat-4.png' className='flex-shrink-0 rounded-full w-[70px] h-[70px]' alt='SUI' />
          </Link>

          <Select
            className={s.burger_menu}
            showSearch
            defaultValue='Главная'
            placeholder="Select"
            optionFilterProp="children"
            onChange={onChange}
            onSearch={onSearch}
            filterOption={filterOption}
            options={[
              {
                value: 'anime',
                label: 'Amine',
              },
              {
                value: 'manga',
                label: 'Manga',
              },
            ]}
          />
        </nav>
      </header>
  )
}

export default Header
