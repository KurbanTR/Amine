import { useParams } from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux'
import s from './AnimeDetails.module.css';
import { Rate } from 'antd';
import { fetchPerson } from '../../store/animeSlice';

const AnimeDetails = () => {
    const params = useParams()
    const dispatch = useDispatch()
    dispatch(fetchPerson({id : params.id}))
    const anime = useSelector(state => state.anime.person)
    return (
        <div>
        <div className={s.center}>
                <div className={s.card}><img className={s.image} src={anime?.images.jpg.image_url} alt="" /></div>
                <div className={s.titles}>
                    <p className={s.title}>{anime?.title}</p>
                    <div className={s.megapon_title}>
                        <div className={s.center_rating}>
                            <Rate allowHalf disabled={true} defaultValue={anime?.score} count={11} style={{ color: '#c9af1c', }}/>
                            <p className={s.rating}>{anime?.score}</p>
                        </div>
                        <p className={s.number_of_episodes}>Серий: {anime?.episodes}</p>
                    </div>
                </div>
                <div className={s.info}>
                    <div className={s.megapon}>
                        <p className={s.pon}>Год выпуска:</p>
                        <p className={s.pon_info}>{anime?.year}</p>
                    </div>
                    <div className={s.megapon}>
                        <p className={s.pon}>Жанр:</p>
                        <p className={s.pon_info}>{anime?.genres.map(genre => ` ${genre.name},`)}</p>
                    </div>
                    <div className={s.megapon}>
                        <p className={s.pon}>Студия:</p>
                        <p className={s.pon_info}>{anime?.studios[0].name}</p>
                    </div>
                </div>
        </div>
        <div className={s.description}>

        </div>
        </div>
    );
};

export default AnimeDetails;
