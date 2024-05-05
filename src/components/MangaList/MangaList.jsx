import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import s from './MangaList.module.css'
import {useSelector} from 'react-redux'
import {useDispatch} from 'react-redux'
import { fetchMangas } from '../../store/mangaSlice';
import { Pagination } from 'antd'
import Sort from '../SortManga/Sort';
import { fetchSearcMangas } from '../../store/mangaSlice'
import coolicon from '../../assets/Search.svg'
import coolicon1 from '../../assets/Search1.svg'

const Footers = () => {
  const [page, setPage] = useState(1)
  const [value, setValue] = useState('')


  const data = useSelector(state => state.manga.mangas)
  const {pages} = useSelector(state => state.manga)
  const dispatch = useDispatch()
  useEffect(()=>{
    dispatch(fetchMangas({page}))
    window.scrollTo({top: 0, behavior: "smooth"})
  },[page, dispatch])

  const onSubmit = ()=>(value !== '' || value[0] !== ' ') && dispatch(fetchSearcMangas({title: value}))    

  const onChange = (page) => setPage(page)
  return (
    <>
      <div className={s.body}>
      <form onSubmit={onSubmit} className="flex justify-center gap-[2em]">
          <div className={s.inputBlock}>
          <img src={coolicon1} className="w-4" alt="?" /><input value={value} required className="text-[#fafafa] font-medium text-[1.1em] w-full" onChange={e => setValue(e.target.value)} placeholder="Search..." />
          </div>
          <button type="submit" className={s.coolicon} >
            <img src={coolicon} className="w-4" alt="?" />
            Submit
          </button>
        </form>
        <div className={s.carts}>
        {
          data?.map((item, index) => 
            <Link to={'/manga/'+item.mal_id} key={index} className='rounded-xl overflow-hidden'>
              <div className='relative w-full'>
                <div className='h-[15em] w-full'>
                  <img src={item.images.jpg.image_url} alt="" />
                </div>                      
                <div className='absolute bottom-0 right-0 h-60 flex items-end w-full bg-gradient-to-t from-black to-transparent opacity-80 p-4'>
                  <div className='flex flex-col'>
                    <p className='line-clamp-1 overflow-hidden text-[1.2em] text-white'>{item.title}</p>
                    <p className='text-[#ababab] font-medium'>{item.published.prop.from.year ? item.published.prop.from.year+(!item.genres.length==0 ? ', '+item.genres[0].name : '') : !item.genres.length==0 ? item.genres[0].name : ''}</p>
                  </div>
                </div>
              </div>
            </Link>
          )
        }
        </div>
      </div>
      <Sort/>
      <div className={s.character}>
        <Pagination current={+page} onChange={onChange} total={pages * 10} className={s.character__pagination}/>
      </div>
    </>
  )
}

export default Footers
