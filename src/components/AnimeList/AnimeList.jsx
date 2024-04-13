import { Link } from "react-router-dom"
import s from './AnimeList.module.css'
import {useSelector} from 'react-redux'

const Footers = () => {
  const data = useSelector(state => state.anime.persons)

  return (
    <footer className={s.footer}>
        {
            data?.map((item) => 
                <Link to={'/anime/' + item.mal_id} className={s.card} key={item.id}>
                    <img src={item.images.jpg.image_url} alt="" />
                    <p className={s.title}>{item.title}</p>
                </Link>
            )
        }
        {/* {data?.data?.map((item) => <div key={item.id}>{data.images.jpg.image_url}</div>)} */}
    </footer>
  )
}

export default Footers
