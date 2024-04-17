import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import s from './AnimeList.module.css'
import {useSelector} from 'react-redux'
import {useDispatch} from 'react-redux'
import { fetchAnimes } from '../../store/animeSlice';
import { Pagination } from 'antd'
import Sort from '../Sort/Sort';


const Footers = () => {
  const [page, setPage] = useState(1)
  const [isHovered, setIsHovered] = useState(false);

  const data = useSelector(state => state.anime.persons)
  const {pages} = useSelector(state => state.anime)
  const dispatch = useDispatch()
  useEffect(()=>{
    dispatch(fetchAnimes({page}))
    window.scrollTo({top: 0, behavior: "smooth"})
  },[page, dispatch])

  const onChange = (page) => setPage(page)
  return (
    <>
      <div  className={s.body}>
        {
          data?.map((item) => 
              <Link to={'/anime/' + item.mal_id} className={s.body__card} key={item.id}>
              <div className={s.body__image_wrapper} onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
                <img src={item.images.jpg.image_url} alt="" />
                {isHovered && 
                  <button className={s.body__pause_button}>
                    <h1 style={{fontWeight: 600}}>Watch</h1>
                  </button>
                }
              </div>
              <div className={s.body__title_wrapper}>
                <p className={s.body__title}>{item.title}</p>
              </div>
            </Link>
          )
        }
      </div>
      <Sort/>
      <div className={s.character}>
        <Pagination current={+page} onChange={onChange} total={pages * 10} className={s.character__pagination}/>
      </div>
    </>
  )
}

export default Footers