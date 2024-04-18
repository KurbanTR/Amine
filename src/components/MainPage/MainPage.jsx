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
        <div  className={s.body}>
        {
          data?.map((item) => 
            <Link to={'/anime/' + item.mal_id} className={s.body__card} key={item.id}>
              <div className={s.body__image_wrapper}>
                <img src={item.images.jpg.image_url} alt="" />
                  <button className={s.body__pause_button}>
                    <h1 style={{fontWeight: 600}}>Watch</h1>
                  </button>
              </div>
              <div className={s.body__title_wrapper}>
                <p className={s.body__title}>{item.title}</p>
              </div>
            </Link>
          )
        }
      </div>
    </>
  )
}

export default MainPage