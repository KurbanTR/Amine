import { data } from "../../Data"
import s from './Footers.module.css'

const Footers = () => {
  return (
    <footer className={s.footer}>
        {
            data.map(item => 
                <div className={s.card} key={item.id}>
                    <img src={item.image} alt="" />
                    <p className={s.title}>{item.title}</p>
                </div>
            )
        }
    </footer>
  )
}

export default Footers
