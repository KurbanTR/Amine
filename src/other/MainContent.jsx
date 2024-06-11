import { Link } from 'react-router-dom'
import s from '../styles/MainPage.module.css'
import { useEffect, useState } from 'react'


const MainContent = () => {
    const [jujutsu, setJujutsu] = useState()

    useEffect(()=>{
        const jujutsuFunc = async() => {
            const jujutsuRes = await fetch('https://api.jikan.moe/v4/anime/40748/full')
            const jujutsuData = await jujutsuRes.json()
            setJujutsu(jujutsuData.data)    
        }
        jujutsuFunc()
    },[])
    return(
        <div className={s.block1}>
            <div className={s.block1__main}>
                <div className={s.block1__wrapper}>
                    <h1 className={s.block1__title}>{jujutsu?.title}</h1>
                    <h3 className={s.block1__synopsis}>{jujutsu?.synopsis}</h3>
                    <Link to={'/anime/' + jujutsu?.mal_id} className={s.button__wrapper} key={jujutsu?.id}>
                        <button className={s.block1__button}>Watch Trailer</button>  
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default MainContent
