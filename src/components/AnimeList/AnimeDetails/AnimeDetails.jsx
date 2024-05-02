import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux'
import s from './AnimeDetails.module.css';
import { Rate } from 'antd';
import { fetchAnime, fetchCharacters, fetchRecommendations} from '../../../store/animeSlice';
import { Tabs, TabList, TabPanels, Tab, TabPanel, TabIndicator } from '@chakra-ui/react'
import Details from './Details/Details';
import Characters from './Characters/Characters';
import Recommendations from './Recommendations/Recommendations';

const AnimeDetails = () => {

    const params = useParams()
    const dispatch = useDispatch()

    useEffect(()=>{
        dispatch(fetchAnime({id: params.id}))
        dispatch(fetchCharacters({id: params.id}))
        dispatch(fetchRecommendations({id: params.id}))
        window.scrollTo({top: 0, behavior: "smooth"})
    },[params.id, dispatch])
    const anime = useSelector(state => state.anime.anime)
    const recommendations = useSelector(state => state.anime.recommendations)
    const characters = useSelector(state => state.anime.characters)

    return (
        <div className={s.block_1}>
            <div className={s.block_1__shapka}></div>
            <div className={s.block_1__titles}>
                <img src={anime?.images.jpg.image_url} alt="" />
                <div className='w-[57%]'>
                    <p className={s.title}>{anime?.title}</p>
                    <div className={s.ratings}>
                        {anime?.score && <><Rate allowHalf disabled={true} count={5} character={({ index }) => {
                            return index < Math.floor(anime?.score / 2) ? <span style={{color: '#fff', fontSize: '1.5em'}}>★</span> : <span style={{color: '#464646', fontSize: '1.7em'}}>★</span>;
                        }}/>
                        <p className={s.rating}>{anime?.score}</p></>}
                        <div className={s.buttons}>

                        </div>
                    </div>
                </div>
            </div>
            <Tabs position='relative' variant='unstyled' className='pl-[1.25em] w-full'>
                <TabList>
                    <Tab _selected={{color: 'white'}} sx={{ color: "#7C7C7C", fontWeight: '500', fontSize: '1.2em'}}>Overview</Tab>
                    {characters.length !== 0 && <Tab _selected={{color: 'white'}} sx={{ color: "#7C7C7C", fontWeight: '500', fontSize: '1.2em'}}>Characters</Tab>}
                    {recommendations.length !== 0 && <Tab _selected={{color: 'white'}} sx={{ color: "#7C7C7C", fontWeight: '500', fontSize: '1.2em'}}>Recommendations</Tab>}
                </TabList>
                <TabIndicator mt='-1.5px' height='2px' width='100%' bg='white' borderRadius='1px'/>
                <TabPanels>
                    <TabPanel>
                        <Details/>
                    </TabPanel>
                    {characters.length !== 0 && <TabPanel>
                        <Characters/>
                    </TabPanel>}
                    {recommendations.length !== 0 && <TabPanel>
                        <Recommendations/>
                    </TabPanel>}
                </TabPanels>
            </Tabs>
            {anime?.trailer.embed_url&&<div className='w-[70%] mx-auto'>
                <iframe className='w-full h-[28em] rounded-xl' src={anime?.trailer.embed_url} allow="encrypted-media" allowFullScreen></iframe>
            </div>}
        </div>
    );
};

export default AnimeDetails;
