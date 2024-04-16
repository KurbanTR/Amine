import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import s from './MangaList.module.css'
import {useSelector} from 'react-redux'
import {useDispatch} from 'react-redux'
import { fetchMangas } from '../../store/mangaSlice';
import { Pagination } from 'antd'
import Sort from '../Sort/Sort';


const Footers = () => {
  const [page, setPage] = useState(1)
  const [isHovered, setIsHovered] = useState(false);

  const data = useSelector(state => state.manga.mangas)
  const {pages} = useSelector(state => state.manga)
  const dispatch = useDispatch()
  useEffect(()=>{
    dispatch(fetchMangas({page}))
    window.scrollTo({top: 0, behavior: "smooth"})
  },[page])

  const onChange = (page) => setPage(page)
  return (
    <>
      <div  className={s.center}>
        {
          data?.map((item) => 
            
              
              <Link to={'/manga/' + item.mal_id} className={s.card} key={item.id}>
              <div className={s.image_wrapper} onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
                <img src={item.images.jpg.image_url} alt="" />
                {isHovered && 
                  <button className={s.pause_button}>
                    <h1 style={{fontWeight: 600}}>Watch</h1>
                  </button>
                }
              </div>
              <div className={s.title_wrapper}>
                <p className={s.title}>{item.title}</p>
              </div>
            </Link>
          )
        }
      </div>
      <Sort/>
      <div className={s.character_btn}>
        <Pagination current={+page} onChange={onChange} total={pages * 10} className={s.pagination}/>
      </div>
    </>
  )
}

export default Footers
