import { Link } from 'react-router-dom'
import s from './Header.module.css'

const Header = ({tema, setTema}) => {
  return (
    <header className={s.header}>
        <div className={s.title}>
          <h2>Anime Website</h2>
        </div>

        <div className={s.search}>
          <input className={s.input} placeholder="Поиск аниме..."/>
          <button></button>
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
