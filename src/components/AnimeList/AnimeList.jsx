import { Link } from "react-router-dom"
import { data } from "../../Data"
import s from './AnimeList.module.css'

const Footers = () => {

  return (
    <footer className={s.footer}>
        {
            data.map(item => 
                <Link to={'/anime/' + item.id} className={s.card} key={item.id}>
                    <img src={item.image} alt="" />
                    <p className={s.title}>{item.title}</p>
                </Link>
            )
        }
    </footer>
  )
}

export default Footers
