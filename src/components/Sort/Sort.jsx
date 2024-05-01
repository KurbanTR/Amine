import { useDispatch, useSelector } from 'react-redux'
import s from './Sort.module.css'
import { Link } from 'react-router-dom'
import { useEffect } from 'react'
import { fetchRandAnime } from '../../store/animeSlice'
import { fetchRandManga } from '../../store/mangaSlice'

const Sort = () => {
  const animeData = useSelector(state => state.anime.randAnime)
  const mangaData = useSelector(state => state.manga.randManga)
  const dispatch = useDispatch()

  useEffect(()=>{
    dispatch(fetchRandAnime())
    dispatch(fetchRandManga())
  },[])

  return (
    <div className={s.sort}>
      <div className={s.sort_links}>
        <Link className={s.sort_link}>НОВИНКИ</Link>
        <Link className={s.sort_link}>АНИМЕ ПО ЖАНРАМ</Link>
      </div>
      <div className='w-full flex gap-7 justify-center items-center'>
        <div>
          <p className='font-medium text-center text-[1.3em] pb-[.7em]'>Random Anime</p>
          <Link to={'/anime/'+animeData?.mal_id} className=''>
            <div className='relative w-full rounded-xl overflow-hidden'>
              <div className='h-[16em] w-full'>
                <img src={animeData?.images.jpg.image_url} className='w-[11.5em]' alt="" />
              </div>                      
              <div className='absolute bottom-0 right-0 h-60 flex items-end w-full bg-gradient-to-t from-black to-transparent opacity-80 p-4'>
                <div className='flex flex-col'>
                  <p className='line-clamp-1 overflow-hidden text-[1.2em] text-white'>{animeData?.title}</p>
                  <p className='text-[#ababab] font-medium'>{animeData?.aired.prop.from.year ? animeData?.aired.prop.from.year+(!animeData?.genres.length==0 ? ', '+animeData?.genres[0].name : '') : !animeData?.genres.length==0 ? animeData?.genres[0].name : ''}</p>
                </div>
              </div>            
            </div>
          </Link>
        </div>
        <div>
          <p className='font-medium text-center text-[1.3em] pb-[.7em]'>Random Manga</p>
          <Link to={'/manga/'+mangaData?.mal_id} className=''>
            <div className='relative w-full rounded-xl overflow-hidden'>
              <div className='h-[16em] w-full'>
                <img src={mangaData?.images.jpg.image_url} className='w-[11.5em]' alt="" />
              </div>                      
              <div className='absolute bottom-0 right-0 h-60 flex items-end w-full bg-gradient-to-t from-black to-transparent opacity-80 p-4'>
                <div className='flex flex-col'>
                  <p className='line-clamp-1 overflow-hidden text-[1.2em] text-white'>{animeData?.title}</p>
                  <p className='text-[#ababab] font-medium'>{animeData?.aired.prop.from.year ? animeData?.aired.prop.from.year+(!animeData?.genres.length==0 ? ', '+animeData?.genres[0].name : '') : !animeData?.genres.length==0 ? animeData?.genres[0].name : ''}</p>
                </div>
              </div>            
            </div>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Sort
