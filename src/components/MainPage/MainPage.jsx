import s from './MainPage.module.css'
import { useSelector } from 'react-redux'

const MainPage = () => {
  const data = useSelector(state => state.anime.reckPersons)

  return (
    <>
        <div className={s.block1}>
            
        </div>
    </>
  )
}

export default MainPage