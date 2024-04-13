import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import s from './AnimeList.module.css'
import {useSelector} from 'react-redux'
import {useDispatch} from 'react-redux'
import { fetchPersons } from '../../store/animeSlice';
import { Pagination } from 'antd'


const Footers = () => {
  const [page, setPage] = useState(1)

  const data = useSelector(state => state.anime.persons)
  const dispatch = useDispatch()
  useEffect(()=>{
    dispatch(fetchPersons({page}))
    window.scrollTo({top: 0, behavior: "smooth"})
  },[page])

  const onChange = (page) => setPage(page)
  return (
    <div className={s.footer}>
      <div className={s.center}>
        {
          data?.map((item) => 
          <Link to={'/anime/' + item.mal_id} className={s.card} key={item.id}>
            <img src={item.images.jpg.image_url} alt="" />
            <p className={s.title}>{item.title}</p>
          </Link>
          )
        }
      </div>
      <div className={s.character_btn}>
        <Pagination current={+page} onChange={onChange} total={10820} style={{background: '#fff'}}/>
      </div>
    </div>
  )
}

export default Footers
