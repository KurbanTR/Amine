import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { data } from "../../Data";
import s from './AnimeDetails.module.css';
import { Rate } from 'antd';

const AnimeDetails = () => {
    const params = useParams();
    const [anime, setAnime] = useState(null);
    useEffect(() => {
        const foundAnime = data.find(item => item.id == params.id);
        setAnime(foundAnime);
        console.log(foundAnime);
    }, [params.id]);
  
    if (!anime) {
        return <div>Loading...</div>;
    }
    return (
        <div>
        <div className={s.center}>
                <div className={s.card}><img className={s.image} src={anime.image} alt="" /></div>
                <div className={s.titles}>
                    <p className={s.title}>{anime.title}</p>
                    <div className={s.megapon_title}>
                        <div className={s.center_rating}>
                            <Rate allowHalf disabled={true} defaultValue={anime.rating} count={11} style={{ color: '#c9af1c', }}/>
                            <p className={s.rating}>{anime.rating}</p>
                        </div>
                        <p className={s.number_of_episodes}>Серий: {anime.number_of_episodes}</p>
                    </div>
                </div>
                <div className={s.info}>
                    <div className={s.megapon}>
                        <p className={s.pon}>Год выпуска:</p>
                        <p className={s.pon_info}>{anime.release_year}</p>
                    </div>
                    <div className={s.megapon}>
                        <p className={s.pon}>Жанр:</p>
                        <p className={s.pon_info}>{anime.genre.join(", ")}</p>
                    </div>
                    <div className={s.megapon}>
                        <p className={s.pon}>Студия:</p>
                        <p className={s.pon_info}>{anime.studio}</p>
                    </div>
                </div>
        </div>
        <div className={s.description}>

        </div>
        </div>
    );
};

export default AnimeDetails;
