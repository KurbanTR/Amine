import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux'
import s from './AnimeDetails.module.css';
import { Rate } from 'antd';
import { fetchAnime } from '../../../store/animeSlice';
import { Tabs, TabList, TabPanels, Tab, TabPanel, TabIndicator } from '@chakra-ui/react'

const AnimeDetails = () => {
    const [height, setHeight] = useState('7em')
    const params = useParams()
    const dispatch = useDispatch()


    useEffect(()=>{
        dispatch(fetchAnime({id : params.id}))
        window.scrollTo({top: 0, behavior: "smooth"})
      },[params.id, dispatch])
    const anime = useSelector(state => state.anime.person)

    const SetDescription = ()=>{
        height == '7em' ? setHeight('auto') : setHeight('7em')
    }

    return (
        <div className={s.block_1}>
            <div className={s.block_1__shapka}></div>
            <div className={s.block_1__titles}>
                <img src={anime?.images.jpg.image_url} alt="" />
                <div>
                    <p className={s.title}>{anime?.title}</p>
                    <div className={s.ratings}>
                        <Rate allowHalf disabled={true} count={5} character={({ index }) => {
                            return index < Math.floor(anime?.score / 2) ? <span style={{color: '#fff', fontSize: '1.5em'}}>★</span> : <span style={{color: '#464646', fontSize: '1.7em'}}>★</span>;
                        }}/>
                        <p className={s.rating}>{anime?.score}</p>
                        <div className={s.buttons}>

                        </div>
                    </div>
                </div>
            </div>
            <Tabs position='relative' variant='unstyled' className='pl-[1.25em]'>
                <TabList>
                    <Tab _selected={{color: 'white'}} sx={{ color: "#7C7C7C", fontWeight: '500', fontSize: '1.2em'}}>Overview</Tab>
                    <Tab _selected={{color: 'white'}} sx={{ color: "#7C7C7C", fontWeight: '500', fontSize: '1.2em'}}>Characters</Tab>
                    <Tab _selected={{color: 'white'}} sx={{ color: "#7C7C7C", fontWeight: '500', fontSize: '1.2em'}}>Relations</Tab>
                </TabList>
                <TabIndicator mt='-1.5px' height='2px' bg='white' borderRadius='1px'/>
                <TabPanels>
                    <TabPanel>
                        <div className='py-[2em] flex gap-[7em]'>
                            <div>
                                <p className='text-3xl font-medium w-[12em]'>Details</p>
                                <div>
                                    {anime?.type && <div className='flex gap-10 pt-7 w-[10em]'>
                                        <p className='text-[#7c7c7c] text-lg'>Type</p>
                                        <p className='text-lg'>{anime?.type}</p>
                                    </div>}
                                    {anime?.episodes && <div className='flex gap-10 pt-7'>
                                        <p className='text-[#7c7c7c] text-lg'>Episodes</p>
                                        <p className='text-lg'>{anime?.episodes}</p>
                                    </div>}
                                    {anime?.genres.length !== 0 && <div className='flex gap-10 pt-7'>
                                        <p className='text-[#7c7c7c] text-lg'>Genres</p>
                                        <p className='text-lg'>{anime?.genres.map(genre => genre.name).join(", ")}</p>
                                    </div>}
                                    {anime?.aired?.string && <div className='flex gap-10 pt-7'>
                                        <p className='text-[#7c7c7c] text-lg'>Aired</p>
                                        <p className='text-lg'>{anime?.aired.string}</p>
                                    </div>}
                                    {anime?.status && <div className='flex gap-10 pt-7'>
                                        <p className='text-[#7c7c7c] text-lg'>Status</p>
                                        <p className='text-lg'>{anime?.status}</p>
                                    </div>}
                                    {anime?.season && <div className='flex gap-10 pt-7'>
                                        <p className='text-[#7c7c7c] text-lg'>Season</p>
                                        <p className='text-lg'>{anime?.season}</p>
                                    </div>}
                                    {anime?.studios[0]?.name && <div className='flex gap-10 pt-7'>
                                        <p className='text-[#7c7c7c] text-lg'>Studios</p>
                                        <p className='text-lg'>{anime?.studios[0].name}</p>
                                    </div>}
                                    {anime?.source && <div className='flex gap-10 pt-7'>
                                        <p className='text-[#7c7c7c] text-lg'>Source</p>
                                        <p className='text-lg'>{anime?.source}</p>
                                    </div>}
                                    {anime?.rating && <div className='flex gap-10 pt-7'>
                                        <p className='text-[#7c7c7c] text-lg'>Rating</p>
                                        <p className='text-lg'>{anime?.rating}</p>
                                    </div>}
                                    {anime?.duration && <div className='flex gap-10 pt-7'>
                                        <p className='text-[#7c7c7c] text-lg'>Duration</p>
                                        <p className='text-lg'>{anime?.duration}</p>
                                    </div>}
                                </div>
                            </div>
                            <div>
                                <p className='text-3xl font-medium'>Desription</p>
                                <div className='pt-10'>
                                    <div className='overflow-hidden ' style={{height: height}}>
                                        <p className='text-[#7c7c7c] text-lg font-medium leading-9'>{anime?.synopsis}</p>
                                    </div>
                                    <span onClick={SetDescription} className='cursor-pointer'>{height == 'auto' ? 'Свернуть описание' : 'Показать...'}</span>
                                </div>
                            </div>
                        </div>
                    </TabPanel>
                    <TabPanel>
                        <p>Characters</p>
                    </TabPanel>
                    <TabPanel>
                        <p>Relations</p>
                    </TabPanel>
                </TabPanels>
            </Tabs>
        {/* <div className={s.center}>
                <div className={s.card}><img className={s.image} src={anime?.images.jpg.image_url} alt="" /></div>
                <div className={s.titles}>
                    <p className={s.title}>{anime?.title}</p>
                    <div className={s.megapon_title}>
                        <div className={s.center_rating}>
                            <Rate allowHalf disabled={true} defaultValue={anime?.score} count={10} style={{ color: '#c9af1c', }}/>
                            <p className={s.rating}>{anime?.score}</p>
                        </div>
                        <p className={s.number_of_episodes}>Серий: {anime?.episodes}</p>
                    </div>
                </div>
                <div className={s.info}>
                    <div className={s.megapon}>
                        <p className={s.pon}>Год выпуска:</p>
                        <p className={s.pon_info}>{anime?.year ? anime.year : 'Неизвестно'}</p>
                    </div>
                    <div className={s.megapon}>
                        <p className={s.pon}>Жанр:</p>
                        <p className={s.pon_info}>{anime?.genres.map(genre => ` ${genre.name},`)}</p>
                    </div>
                    <div className={s.megapon}>
                        <p className={s.pon}>Студия:</p>
                        <p className={s.pon_info}>{anime?.studios ? anime?.studios[0].name : 'Нету'}</p>
                    </div>
                </div>
            </div>
            <div className={s.block_2}>
                <div className={s.description} style={{height: height}}>
                    <p className={s.synopsis}>{anime?.synopsis}</p>
                </div>
                <span onClick={SetDescription} className={s.span}>{height == 'auto' ? 'Свернуть описание' : 'Показать...'}</span>
                <div className={s.videoTreiler}>
                    <iframe
                    className={s.iframe}
                    title='trailer'
                    src={anime?.trailer.embed_url}
                    allowFullScreen
                    />
                </div>
            </div> */}
        </div>
    );
};

export default AnimeDetails;
