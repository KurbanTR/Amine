import { useDispatch, useSelector } from 'react-redux'
import s from './Sort.module.css'
import { Link } from 'react-router-dom'
import { useEffect } from 'react'
import { fetchRandAnime } from '../../store/animeSlice'

const Sort = () => {
  const animeData = useSelector(state => state.anime.randAnime)
  // const mangaData = useSelector(state => state.manga.randManga)
  const dispatch = useDispatch()

  useEffect(()=>{
    dispatch(fetchRandAnime())
  },[])
  return (
    <div className={s.sort}>
      <div className={s.sort_links}>
        <Link className={s.sort_link}>НОВИНКИ</Link>
        <Link className={s.sort_link}>АНИМЕ ПО ЖАНРАМ</Link>
      </div>
      <Link to={'/anime/'+animeData?.mal_id} className={s.sort__rand}>
        <p className={s.sort__rand_title}>Случайное аниме</p>
        <div className={s.sort__image_wrapper}>
          <img src={animeData?.images.jpg.image_url} alt="" />
        </div>
        <div className={s.sort__title_wrapper}>
          <p className={s.sort__title}>{animeData?.title}</p>
        </div>
      </Link>
    </div>
  )
}

export default Sort
