import s from './Sort.module.css'
import { Link } from 'react-router-dom'

const Sort = () => {
  return (
    <div className={s.sort}>
      <div className={s.sort_links}>
        <Link className={s.sort_link}>НОВИНКИ</Link>
        <Link className={s.sort_link}>АНИМЕ ПО ЖАНРАМ</Link>
      </div>
    </div>
  )
}

export default Sort
