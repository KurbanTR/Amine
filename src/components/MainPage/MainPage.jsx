import { useEffect, useState } from 'react'
import { Link } from "react-router-dom"
import s from './MainPage.module.css'
import { fetchAnimeNow, fetchAnimeScore } from '../../store/animeSlice' 
import { useSelector, useDispatch } from 'react-redux'

const MainPage = () => {
  const {now} = useSelector(state => state.anime)
  const {score} = useSelector(state => state.anime)
  const [jujutsu, setJujutsu] = useState()
  const dispatch = useDispatch()
  
  useEffect(() => {
    const jujutsuFunc = async() => {
      const jujutsuRes = await fetch('https://api.jikan.moe/v4/anime/40748/full')
      const jujutsuData = await jujutsuRes.json()
      setJujutsu(jujutsuData.data)

      dispatch(fetchAnimeNow())
      dispatch(fetchAnimeScore())
    }
    jujutsuFunc()
  }, [])


  return (
    <>
        <div className={s.block1}>
          <div className={s.block1__main}>

              <div className={s.block1__wrapper}>
                <h1 className={s.block1__title}>{jujutsu?.title}</h1>
                <h3 className={s.block1__synopsis}>{jujutsu?.synopsis}</h3>
                  <Link to={'/anime/' + jujutsu?.mal_id} className={s.button__wrapper} key={jujutsu?.id}>
                    <button className={s.block1__button}>Watch Trailer</button>  
                  </Link>
              </div>

              <div className={s.jujutsu__wrapper}> 
                <img className={s.jujutsu__image} src={jujutsu?.images.jpg.image_url}/>
              </div>
            </div>
        </div>
        <div className='flex flex-col gap-16'>
          <div className='px-[2em]'>
            <p className='text-[1.6em] font-medium mb-4'>Trending now</p>
            <div className='container w-full flex overflow-hidden overflow-x-auto scrollbar-hidden'>
              {
                now?.map((item, index) => 
                  <Link to={'/anime/' + item.mal_id} key={index} className=' min-w-[12em] mr-5 rounded-lg overflow-hidden'>
                    <div className='relative'>
                      <div className='h-[17em]'>
                        <img src={item.images.jpg.image_url} className='w-full' alt="" />
                      </div>                      
                      <div className='absolute bottom-0 right-0 h-60 flex items-end w-full bg-gradient-to-t from-black to-transparent opacity-80 p-4'>
                        <div className='flex flex-col'>
                          <p className='line-clamp-1 overflow-hidden text-[1.2em] text-white'>{item.title}</p>
                          <p className='text-[#ababab] font-medium'>{item.aired.prop.from.year ? item.aired.prop.from.year+(!item.genres.length==0 ? ', '+item.genres[0].name : '') : !item.genres.length==0 ? item.genres[0].name : ''}</p>
                        </div>
                      </div>
                    </div>
                  </Link>
                )
              }
            </div>
          </div>
          <div className='px-[2em]'>
            <p className='text-[1.6em] font-medium mb-4'>Best Score</p>
            <div className='container w-full flex overflow-hidden overflow-x-auto scrollbar-hidden'>
              {
                score?.map((item, index) => 
                  <Link to={'/anime/' + item.mal_id} key={index} className='min-w-[12em] mr-5 rounded-lg overflow-hidden'>
                    <div className='relative'>
                      <div className='h-[17em]'>
                        <img src={item.images.jpg.image_url} className='w-full' alt="" />
                      </div>                      
                      <div className='absolute bottom-0 right-0 h-60 flex items-end w-full bg-gradient-to-t from-black to-transparent opacity-80 p-4'>
                        <div className='flex flex-col'>
                          <p className='line-clamp-1 overflow-hidden text-[1.2em] text-white'>{item.title}</p>
                          <p className='text-[#ababab] font-medium'>{item.aired.prop.from.year ? item.aired.prop.from.year+(!item.genres.length==0 ? ', '+item.genres[0].name : '') : !item.genres.length==0 ? item.genres[0].name : ''}</p>
                        </div>
                      </div>
                    </div>
                  </Link>
                )
              }
            </div>
          </div>
      </div>
    </>
  )
}

export default MainPage