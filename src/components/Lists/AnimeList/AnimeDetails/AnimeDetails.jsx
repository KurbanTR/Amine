import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux'
import s from './AnimeDetails.module.css';
import { Rate } from 'antd';
import { fetchAnime, fetchCharacters, fetchRecommendations} from '../../../../store/animeSlice';
import { Tabs, TabList, TabPanels, Tab, TabPanel, TabIndicator } from '@chakra-ui/react'
import Details from './Details/Details';
import Characters from './Characters/Characters';
import Recommendations from './Recommendations/Recommendations';
import YouTube from 'react-youtube';
import line from '../../../../assets/line.svg'
import { addAnimes } from '../../../../store/profileSlice';

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
    const idUser = useSelector(state => state.user.id)
    
    const Fevorite = ()=>{
        const newAnime = {
            id: params.id,
            img: anime?.images.jpg.image_url,
            title: anime?.title,
            score: anime?.score
        }
        dispatch(addAnimes({idUser, newAnime}))
    }

    return (
        <div className={s.block_1}>
            <div className={s.block_1__shapka}></div>
            <div className={s.block_1__titles}>
                <img src={anime?.images.jpg.image_url} className={s.persImg} alt="" />
                <div className='w-[57%]'>
                    <h2 className={s.title}>{anime?.title}</h2>
                    <div className={s.ratings}>
                        {anime?.score && <><Rate allowHalf disabled={true} count={5} character={({ index }) => {
                            return index < Math.floor(anime?.score / 2) ? <span style={{color: '#fff', fontSize: '1.5em'}}>★</span> : <span style={{color: '#464646', fontSize: '1.7em'}}>★</span>;
                        }}/>
                        <p className={s.rating}>{anime?.score}</p></>}
                    </div>
                    <button onClick={Fevorite()} className={s.span}>
                        <img className='w-5 h-5' src={line} alt="" />
                        <p>Add to Fovarite</p>
                    </button>
                </div>
            </div>
            <div className={s.block_1__details}>                
                <Tabs position='relative' variant='unstyled'>
                    <TabList>
                        <Tab _selected={{color: 'white'}} sx={{ color: "#7C7C7C", fontWeight: '500', fontSize: '1.2em', '@media screen and (max-width: 450px)': {fontSize: '.9em'}}}>Overview</Tab>
                        {characters.length !== 0 && <Tab _selected={{color: 'white'}} sx={{ color: "#7C7C7C", fontWeight: '500', fontSize: '1.2em', '@media screen and (max-width: 450px)': {fontSize: '.9em'}}}>Characters</Tab>}
                        {recommendations.length !== 0 && <Tab _selected={{color: 'white'}} sx={{ color: "#7C7C7C", fontWeight: '500', fontSize: '1.2em', '@media screen and (max-width: 450px)': {fontSize: '.9em'}}}>Recommendations</Tab>}
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
            </div>
            {anime?.trailer.youtube_id && <div className='w-[70%] mx-auto'>
                <YouTube className={s.video} videoId={anime?.trailer.youtube_id}/>
            </div>}
        </div>
    );
};

export default AnimeDetails;
