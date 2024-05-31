import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { SwiperSlide, Swiper } from "swiper/react";
import ss from '../components/swiper.module.css';
import { Keyboard } from 'swiper/modules';
import 'swiper/css';
import LinkCard from './LinkCard';

const MediaCarousel = ({ category, mediaTitle, to }) => {
    const [hoveredIndex, setHoveredIndex] = useState(null);
    const data = useSelector(state => {
        if (category === 'characters' || category === 'recommendations') {
            return state.anime[mediaTitle];
        } else {
            return state.anime.anime[mediaTitle];
        }
    });

    useEffect(() => {
        console.log(data);
    }, [data]);

    return (
        <div className='py-[2em] gap-[1em] flex flex-col'>
            <p className='text-3xl font-medium'>{mediaTitle.toUpperCase()}</p>
            <div className='container flex overflow-hidden overflow-x-auto scrollbar-hidden'>
                <Swiper
                    className={ss.swipers}
                    grabCursor={true}
                    spaceBetween={20}
                    keyboard={{ enabled: true }}
                    modules={[Keyboard]}
                    slidesPerView={'auto'}
                >
                    {data?.map((item, index) => {
                        // Извлечение ID
                        const displayId = item?.character?.mal_id || item?.entry?.mal_id || item?.anime?.mal_id || item?.manga?.mal_id || item?.person?.mal_id;

                        // Извлечение изображений
                        const characterImage = item?.character?.images?.jpg?.image_url;
                        const voiceActorImage = item?.voice_actors?.[0]?.person?.images?.jpg?.image_url;
                        const entryImage = item?.entry?.images?.jpg?.image_url;
                        const animeImage = item?.anime?.images?.jpg?.image_url;
                        const mangaImage = item?.manga?.images?.jpg?.image_url;
                        const personImage = item?.person?.images?.jpg?.image_url;

                        // Определение изображения для отображения в зависимости от состояния наведения
                        const displayImage = category === 'characters' && hoveredIndex === index
                            ? (voiceActorImage || characterImage)
                            : characterImage || entryImage || animeImage || mangaImage || personImage;

                        // Извлечение имен/названий
                        const characterName = item?.character?.name;
                        const voiceActorName = item?.voice_actors?.[0]?.person?.name;
                        const entryTitle = item?.entry?.title;
                        const animeTitle = item?.anime?.title;
                        const mangaTitle = item?.manga?.title;
                        const personTitle = item?.person?.name;

                        // Определение имени/названия для отображения в зависимости от состояния наведения
                        const displayName = category === 'characters' && hoveredIndex === index
                            ? (voiceActorName || characterName)
                            : characterName || entryTitle || animeTitle || mangaTitle || personTitle;

                        // Извлечение ролей/языков
                        const characterRole = item?.role;
                        const voiceActorLanguage = item?.voice_actors?.[0]?.language;
                        const animeRole = item?.role;
                        const mangaRole = item?.role;
                        const personLanguage = item?.language;

                        // Определение роли/языка для отображения в зависимости от состояния наведения
                        const displayRole = category === 'characters' && hoveredIndex === index
                            ? (voiceActorLanguage || characterRole)
                            : characterRole || animeRole || mangaRole || personLanguage || '';

                        return (
                            <SwiperSlide 
                                className={ss.swiper__slide} 
                                key={index}
                                onMouseEnter={() => setHoveredIndex(index)}
                                onMouseLeave={() => setHoveredIndex(null)}
                            >
                                <LinkCard 
                                    displayId={displayId} 
                                    index={index} 
                                    displayImage={displayImage} 
                                    displayName={displayName} 
                                    displayRole={displayRole} 
                                    to={to} 
                                />
                            </SwiperSlide>
                        );
                    })}
                </Swiper>
            </div>
        </div>
    );
};

export default MediaCarousel;
