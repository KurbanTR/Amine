import { Link, useNavigate } from 'react-router-dom'
import s from './Header.module.css'
import { useEffect, useState } from 'react'
import { Select } from 'antd';

const Header = () => {
  const nav = useNavigate()
  const [isScrolled, setIsScrolled] = useState(false);

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
