import { useEffect, useState } from 'react'
import { Link } from "react-router-dom"
import s from './MainPage.module.css'
import { fetchAnimeRank } from '../../store/animeSlice' 
import {  useSelector, useDispatch } from 'react-redux'

const MainPage = () => {
  const data = useSelector(state => state.anime.reckPersons)
  const [jujutsu, setJujutsu] = useState()
  const dispatch = useDispatch()
  
  useEffect(() => {
    const jujutsuFunc = async() => {
    const jujutsuRes = await fetch('https://api.jikan.moe/v4/anime/40748/full')
    const jujutsuData = await jujutsuRes.json()
    setJujutsu(jujutsuData.data)
    
    dispatch(fetchAnimeRank())
  }
  jujutsuFunc()
  }, [])


  return (
    <>
        <div className={s.block1}>
          {/* <img className={s.block1_image} src="" alt="" /> */}
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
        <div className={s.body}>
          <div className='px-[2em]'>
            <p className='text-3xl font-medium pb-10'>Trending now</p>
            <div className={s.container}>
              {
                data?.map((item) => 
                  <Link to={'/anime/' + item.mal_id} key={item.id} className=' min-w-[13em] m-4 rounded-lg overflow-hidden'>
                    <div className=''>
                      <div className='h-[16em]'>
                        <img src={item.images.jpg.image_url} className='w-full' alt="" />
                      </div>                      
                      <div className='pl-4 w-full h-full flex flex-col justify-end items-start 700res:text-[11px] 500res:text-[8px] text-white/80 gap-[5px]'>
                        <p className='line-clamp-1 overflow-hidden text-[1.2em] text-white'>{item.title}</p>
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