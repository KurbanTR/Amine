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
          <a className={s.link} href="#">Главная</a>
          <a className={s.link} href="#">Аниме</a>
          <a className={s.link} href="#">О нас</a>
          <a className={s.link} href="#">Контакты</a>
        </nav>
      </header>
  )
}

export default Header
