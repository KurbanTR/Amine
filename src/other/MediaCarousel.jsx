import { useState } from 'react';
import { SwiperSlide, Swiper } from "swiper/react";
import ss from '../styles/swiper.module.css';
import { Keyboard } from 'swiper/modules';
import 'swiper/css';
import LinkCard from './LinkCard';

const MediaCarousel = ({ data }) => {
    const [hoveredIndex, setHoveredIndex] = useState(null);

    return (
        <div className='py-[2em] gap-[1em] flex flex-col'>
            <p className='text-3xl font-medium 540res:text-xl 450res:text-base'>Characters</p>
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

                        // Извлечение изображений
                        const characterImage = item?.image;
                        const voiceActorImage = item?.voiceActors?.[0]?.image;

                        // Определение изображения для отображения в зависимости от состояния наведения
                        const displayImage = hoveredIndex === index
                            && voiceActorImage || characterImage

                        // Извлечение имен/названий
                        const characterName = item?.name?.full;
                        const voiceActorName = item?.voiceActors?.[0]?.name?.full;

                        // Определение имени/названия для отображения в зависимости от состояния наведения
                        const displayName = hoveredIndex === index
                            && voiceActorName || characterName

                        // Извлечение ролей/языков
                        const characterRole = item?.role;
                        const voiceActorLanguage = item?.voiceActors?.[0]?.language;

                        // Определение роли/языка для отображения в зависимости от состояния наведения
                        const displayRole = hoveredIndex === index
                            && voiceActorLanguage || characterRole

                        return (
                            <SwiperSlide 
                                className={ss.swiper__slide} 
                                key={index}
                                onMouseEnter={() => setHoveredIndex(index)}
                                onMouseLeave={() => setHoveredIndex(null)}
                            >
                                <LinkCard 
                                    index={index} 
                                    displayImage={displayImage} 
                                    displayName={displayName} 
                                    displayRole={displayRole} 
                                    setIsHovered={setHoveredIndex}
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
