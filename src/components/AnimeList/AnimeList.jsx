import { Link } from "react-router-dom"

import s from './AnimeList.module.css'
import { useEffect, useState } from "react"

const Footers = () => {

  const [data, setData] = useState()

  useEffect(() => {
    const getData = async() => {
      const res = await fetch('https://api.jikan.moe/v4/anime/5')
      const data = res.json()
      setData(data)
      console.log(data);  
    }
    getData()
  }, [])

  return (
    <footer className={s.footer}>
        {/* {
            data.map(item => 
                <Link to={'/anime/' + item.id} className={s.card} key={item.id}>
                    <img src={item.images} alt="" />
                    <p className={s.title}>{item.title}</p>
                </Link>
            )
        } */}
        {data?.data?.map((item) => <div key={item.id}>{data.images.jpg.image_url}</div>)}
    </footer>
  )
}

export default Footers
