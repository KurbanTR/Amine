import { Link, useNavigate } from 'react-router-dom'
import s from './Header.module.css'
import { fetchSearchAnimes, fetchAnimes } from '../../store/animeSlice'
import { useDispatch } from 'react-redux'
import { useEffect, useState } from 'react'
import { Select } from 'antd';

const Header = ({tema, setTema}) => {
  const [value, setValue] = useState('')
  const dispatch = useDispatch()
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

const filterOption = (input, option) =>
  (option?.label ?? '').toLowerCase().includes(input.toLowerCase());

  useEffect(()=>{
    if(value == ''|| value[1] == ' '){
      dispatch(fetchAnimes())
    } else{
      dispatch(fetchSearchAnimes({title: value}))
    }  
  }, [value, dispatch])

  return (
    <header className={isScrolled ? s.header_scrolled : s.header}>
        <Link to='/' className={s.title}>
          <h1 style={{fontSize: '50px'}}>JumCloud</h1>
        </Link>

        <div className={s.search}>
          <input value={value} onChange={e => setValue(e.target.value)} className={isScrolled ? s.input_scrolled : s.input} placeholder="Поиск аниме..."/>
        </div>

        <nav className={s.nav}>      

          <Link className={s.catalog_link}>Anime</Link>
          <Link className={s.catalog_link}>Manga</Link>

          {tema && <img onClick={()=>setTema(false)} className={s.tema} src="https://cdn-icons-png.flaticon.com/512/17/17768.png" alt="" />}
          {!tema && <img onClick={()=>setTema(true)} className={s.tema} src="https://cdn-icons-png.flaticon.com/512/14/14881.png" alt="" />}
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

        <div className={s.search_android}>
          <input value={value} onChange={e => setValue(e.target.value)} className={s.input} placeholder="Поиск аниме..."/>
        </div>


      </header>
  )
}

export default Header
