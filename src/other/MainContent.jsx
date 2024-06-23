import { Link } from 'react-router-dom'
import s from '../styles/MainPage.module.css'
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/effect-fade';

import { EffectFade, Autoplay } from 'swiper/modules';
import { useState } from 'react';
import Trailer from './Trailer';

const MainContent = () => {
    const data = [
        {   
            title: "Wind Breaker",
            synopsis:"From an early age, Haruka Sakura was made an outcast due to his unconventional appearance and lack of social skills. However, the rough treatment turned him into a proficient fighter, which is now the only thing he prides himself on. Starting at Furin High School, where it is rumored that strength is valued over academics, Sakura has only one goal—taking the top spot. Involved in a street b",
            mal_id: 54900,
            id: 163270,
            img: "https://s4.anilist.co/file/anilistcdn/media/anime/banner/163270-QshLCttd04s6.jpg",
            trailer: 'https://www.youtube.com/embed/k5qM1PoLmUc?enablejsapi=1&wmode=opaque&autoplay=1',
        },
        {   
            title: "Jujutsu Kaisen",
            synopsis:"Idly indulging in baseless paranormal activities with the Occult Club, high schooler Yuuji Itadori spends his days at either the clubroom or the hospital, where he visits his bedridden grandfather. However, this leisurely lifestyle soon takes a turn for the strange when he unknowingly encounters a cursed item. Triggering a chain of supernatural occurrences, Yuuji finds himself suddenly thrust into the world of Curses—dreadful beings formed from human malice and negativity—after swallowing the said item, revealed to be a finger belonging to the demon Sukuna Ryoumen, the King of Curses.\n\nYuuji experiences first-hand the threat these Curses pose to society as he discovers his own newfound powers. Introduced to the Tokyo Prefectural Jujutsu High School, he begins to walk down a path from which he cannot return—the path of a Jujutsu sorcerer.",
            mal_id: 51009,
            id: 145064,
            img: 'https://ik.imagekit.io/subanime/jujutsukaisenPoster2',
            trailer: 'https://www.youtube.com/embed/PKHQuQF1S8k?enablejsapi=1&wmode=opaque&autoplay=1',
        },
        {   
            title: "Chainsaw Man",
            synopsis:"Denji has a simple dream - to live happy and peacful life, spending time with a girl",
            mal_id: 44511,
            id: 127230,
            img: 'https://ik.imagekit.io/subanime/chainsawmanPoster.jpg',
            trailer: 'https://www.youtube.com/embed/q15CRdE5Bv0?enablejsapi=1&wmode=opaque&autoplay=1',
        },
        {   
            title: "SPY×FAMILY Season 2",
            synopsis:"Second season of Spy x Family.",
            mal_id: 53887,
            id: 158927,
            img: 'https://ik.imagekit.io/subanime/spyxfamalyPoster.jpg',
            trailer: 'https://www.youtube.com/embed/75LyKY6AV4U?enablejsapi=1&wmode=opaque&autoplay=1',
        },
        {   
            title: "Watashi no Shiawase na Kekkon",
            synopsis:"Misery seems everlasting in Miyo Saimori's life. Born into an arranged marriage, she was quickly discarded after her mother's tragic death. Her father remarried, and her younger half-sister Kaya received all the affection, while Miyo was degraded to a lowly servant. Lacking the strength to fight against her family's abuse, Miyo loses hope that her luck will ever turn. Unexpectedly, Miyo's father summons her to deliver surprising news: she is to marry Kiyoka Kudou, the head of the distinguished Kudou family. Despite his noble background, Kiyoka is known to be a callous man who has thus far dismissed all of his former fiancées. Upon arriving at the Kudou household, Miyo expects coarse treatment and to be tossed aside. However, contrary to her assumptions, Kiyoka shows her the kindness and love that she has desperately needed. Marrying Kiyoka may be Miyo's one chance to break free from her neglectful family and embrace a life of happiness.",
            mal_id: 51552,
            id: 147103,
            img: 'https://ik.imagekit.io/subanime/myhappymarriagePoster?updatedAt=1696864851180',
            trailer: 'https://www.youtube.com/embed/dURh9kVzcw8?enablejsapi=1&wmode=opaque&autoplay=1',
        },
    ]

    const [trailerSrc, setTrailerSrc] = useState(null)
    const [trailerShow, setTrailerShow] = useState(null)

    const changeTrailer = (trailer) => {
        setTrailerSrc(trailer)
        setTrailerShow(true)
    }  

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
                        <div className="absolute inset-0 bg-black opacity-20"></div>
                            <div className={s.block1__main}>
                                <div className={s.block1__wrapper}>
                                    <h1 className={s.block1__title}>{item.title}</h1>
                                    <h3 className={s.block1__synopsis}>{item.synopsis}</h3>
                                    <div className='flex gap-3 items-center'>
                                        <Link to={`/anime/${item.id}`}  className={s.button__wrapper}>
                                            <button className={s.block1__button} style={{backgroundColor: 'white', color: '#1c1c1c'}}>Learn More</button>  
                                        </Link>
                                        <button className={`${s.block1__button} flex items-center gap-1`}  style={{backgroundColor: '#1c1c1c', color: 'white'}} onClick={()=>changeTrailer(item.trailer)}>
                                        <span>
                                            <svg className='w-[24px] h-[26px] 1100res:h-[20px] 400res:h-[15px]' xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                            <path d="M7.50632 3.14928C6.1753 2.29363 4.4248 3.24931 4.4248 4.83164V19.1683C4.4248 20.7506 6.1753 21.7063 7.50632 20.8507L18.6571 13.6823C19.8817 12.8951 19.8817 11.1049 18.6571 10.3176L7.50632 3.14928Z" fill="white"/>
                                            </svg>
                                        </span>
                                        <p>Watch Trailer</p>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
            <Trailer trailerShow={trailerShow} setTrailerShow={setTrailerShow} trailerSrc={trailerSrc} setTrailerSrc={setTrailerSrc}/>
        </>
    )
}

export default MainContent