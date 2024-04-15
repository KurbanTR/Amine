import { Link, useNavigate } from 'react-router-dom'
import s from './Header.module.css'
import { fetchSearchPersons, fetchPersons } from '../../store/animeSlice'
import { useDispatch } from 'react-redux'
import { useEffect, useState } from 'react'

const Header = ({tema, setTema}) => {
  const [value, setValue] = useState('')
  const dispatch = useDispatch()
  const nav = useNavigate()

  useEffect(()=>{
    if(value == ''|| value[1] == ' '){
      dispatch(fetchPersons())
    } else{
      nav('/')
      dispatch(fetchSearchPersons({title: value}))
    }  
  }, [value, dispatch])

  return (
    <header className={s.header}>
        <Link to='/' className={s.title}>
          <h1>Milk</h1>
        </Link>

        <div className={s.search}>
          <input value={value} onChange={e => setValue(e.target.value)} className={s.input} placeholder="Поиск аниме..."/>
        </div>

        <nav className={s.nav}>
          {tema && <img onClick={()=>setTema(false)} className={s.tema} src="https://cdn-icons-png.flaticon.com/512/17/17768.png" alt="" />}
          {!tema && <img onClick={()=>setTema(true)} className={s.tema} src="https://cdn-icons-png.flaticon.com/512/14/14881.png" alt="" />}
        </nav>

        <div className={s.search_android}>
          <input value={value} onChange={e => setValue(e.target.value)} className={s.input} placeholder="Поиск аниме..."/>
        </div>
      </header>
  )
}

export default Header
