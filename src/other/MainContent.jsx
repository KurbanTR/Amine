import { Link } from 'react-router-dom'
import s from '../styles/MainPage.module.css'
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/effect-fade';

import { EffectFade, Autoplay } from 'swiper/modules';

const MainContent = () => {
    const data = [
        {   
            title: "Jujutsu Kaisen",
            synopsis:"Idly indulging in baseless paranormal activities with the Occult Club, high schooler Yuuji Itadori spends his days at either the clubroom or the hospital, where he visits his bedridden grandfather. However, this leisurely lifestyle soon takes a turn for the strange when he unknowingly encounters a cursed item. Triggering a chain of supernatural occurrences, Yuuji finds himself suddenly thrust into the world of Curses—dreadful beings formed from human malice and negativity—after swallowing the said item, revealed to be a finger belonging to the demon Sukuna Ryoumen, the King of Curses.\n\nYuuji experiences first-hand the threat these Curses pose to society as he discovers his own newfound powers. Introduced to the Tokyo Prefectural Jujutsu High School, he begins to walk down a path from which he cannot return—the path of a Jujutsu sorcerer.",
            mal_id: 40748,
            img: 'https://ik.imagekit.io/subanime/jujutsukaisenPoster2'
        },
        {   
            title: "Chainsaw Man",
            synopsis:"Denji has a simple dream - to live happy and peacful life, spending time with a girl",
            mal_id: 44511,
            img: 'https://ik.imagekit.io/subanime/chainsawmanPoster.jpg'
        },
        {   
            title: "SPY×FAMILY Season 2",
            synopsis:"Second season of Spy x Family.",
            mal_id: 53887,
            img: 'https://ik.imagekit.io/subanime/spyxfamalyPoster.jpg'
        },
        {   
            title: "Watashi no Shiawase na Kekkon",
            synopsis:"Misery seems everlasting in Miyo Saimori's life. Born into an arranged marriage, she was quickly discarded after her mother's tragic death. Her father remarried, and her younger half-sister Kaya received all the affection, while Miyo was degraded to a lowly servant. Lacking the strength to fight against her family's abuse, Miyo loses hope that her luck will ever turn. Unexpectedly, Miyo's father summons her to deliver surprising news: she is to marry Kiyoka Kudou, the head of the distinguished Kudou family. Despite his noble background, Kiyoka is known to be a callous man who has thus far dismissed all of his former fiancées. Upon arriving at the Kudou household, Miyo expects coarse treatment and to be tossed aside. However, contrary to her assumptions, Kiyoka shows her the kindness and love that she has desperately needed. Marrying Kiyoka may be Miyo's one chance to break free from her neglectful family and embrace a life of happiness.",
            mal_id: 51552,
            img: 'https://ik.imagekit.io/subanime/myhappymarriagePoster?updatedAt=1696864851180'
        },
    ]
    return(
        <>
            <Swiper
                spaceBetween={30}
                centeredSlides={true}
                effect={'fade'}
                pagination={{
                    clickable: true,
                }}
                loop={true}     
                navigation={true}
                autoplay={{
                    delay: 5000,
                    disableOnInteraction: false,
                }}
                modules={[EffectFade, Autoplay]}
                className="mySwiper"
            >
                {data.map((item, index)=>(
                    <SwiperSlide key={index}>
                        <div className={s.block1} style={{backgroundImage: `url(${item.img})`}}>
                            <div className={s.block1__main}>
                                <div className={s.block1__wrapper}>
                                    <h1 className={s.block1__title}>{item.title}</h1>
                                    <h3 className={s.block1__synopsis}>{item.synopsis}</h3>
                                    <Link to={'/anime/' + item.mal_id} className={s.button__wrapper}>
                                        <button className={s.block1__button}>Watch Trailer</button>  
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </>
    )
}

export default MainContent