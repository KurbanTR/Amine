import { Link } from 'react-router-dom'
import s from './Header.module.css'
import { fetchSearchPersons } from '../../store/animeSlice'
import { useDispatch } from 'react-redux'
import { useState } from 'react'

const Header = ({tema, setTema}) => {
  const [value, setValue] = useState('')
  const dispatch = useDispatch()

  const onSearchClick = ()=>{
    dispatch(fetchSearchPersons({title: value}))
    setValue('')
  }
  return (
    <header className={s.header}>
        <div className={s.title}>
          <h2>Anime Website</h2>
        </div>

        <div className={s.search}>
          <input value={value} onChange={e => setValue(e.target.value)} className={s.input} placeholder="Поиск аниме..."/>
          <button onClick={onSearchClick} className={s.search_button}>go</button>
        </div>

        <nav className={s.nav}>
          {tema && <img onClick={()=>setTema(false)} className={s.tema} src="https://cdn-icons-png.flaticon.com/512/17/17768.png" alt="" />}
          {!tema && <img onClick={()=>setTema(true)} className={s.tema} src="https://cdn-icons-png.flaticon.com/512/14/14881.png" alt="" />}
          <Link className={s.link} to='/'>Главная</Link>
          <Link className={s.link}>Аниме</Link>
          <Link className={s.link}>О нас</Link>
          <Link className={s.link}>Контакты</Link>
        </nav>
      </header>
  )
}

export default Header
