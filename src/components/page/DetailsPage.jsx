import { useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux'
import s from '../../styles/DetailsPage.module.css';
import { Rate } from 'antd';
import { fetchAnime, fetchAnimeInfo, fetchCharacters, fetchRecommendations} from '../../store/animeSlice';
import { Tabs, TabList, TabPanels, Tab, TabPanel, TabIndicator } from '@chakra-ui/react'
import YouTube from 'react-youtube';
import line from '../../assets/line.svg'
import { addAnimes } from '../../store/profileSlice';
import { message } from 'antd';
import MediaCarousel from '../../other/MediaCarousel';
import Details from '../../other/Details';
import ErrorPage from './ErrorPage';
import Episodes from '../../other/Episodes';

const DetailsPage = ({category}) => {
    const {id} = useParams()
    const dispatch = useDispatch()
    const location = useLocation()

    const {malid} = useSelector(state=>state.anime)
    const {animeInfo} = useSelector(state=>state.anime)
    const {episodes} = useSelector(state=>state.anime)
    const {loading} = useSelector(state=>state.anime)
    const getError = useSelector(state=>state.anime.error)

    useEffect(()=>{
        dispatch(fetchAnimeInfo({id}))
    },[dispatch, id])

    useEffect(()=>{
        if(malid !== null){
            dispatch(fetchAnime({id: malid, category}))
            category !== 'characters'&&dispatch(fetchCharacters({id: malid, category}))
            category !== 'characters'&&dispatch(fetchRecommendations({id: malid, category}))
            window.scrollTo({top: 0, behavior: "smooth"})
        }
    },[malid, dispatch, location])

    const {anime} = useSelector(state => state.anime)
    const recommendations = useSelector(state => state.anime.recommendations)
    const characters = useSelector(state => state.anime.characters)
    const idUser = useSelector(state => state.user.id)
    
    const [messageApi, contextHolder] = message.useMessage();
    const success = () => {
      messageApi.open({
        type: 'success',
        content: 'This is a success message',
      });
    };
    const error = () => {
      messageApi.open({
        type: 'error',
        content: 'This is an error message',
      });
    };

    const Fevorite = ()=>{
        const newAnime = {
            id,
            img: anime?.images.jpg.image_url,
            title: anime?.title,
            score: anime?.score,
            year: anime?.aired.prop.from.year || anime?.published?.prop.from.year,
            genre: anime?.genres &&(anime?.genres.length !== 0 && anime?.genres[0]?.name)
        }
        dispatch(addAnimes({idUser, newAnime, success, error}))
    }

    return (
        <>
        {loading && <p className='absolute top-[40vh] left-[37vw] text-7xl font-bold'>Loading</p>}
        {getError && <ErrorPage error={getError}/>}
        { !loading && !getError &&
            <div className={s.block_1}>
                {contextHolder}
                <div className={s.block_1__shapka} style={{backgroundImage: `url(${animeInfo?.cover})`}}></div>
                <div className={s.block_1__titles}>
                    <img src={animeInfo?.image} className={s.persImg} alt=""/>
                    <div className='w-[57%]'>
                        <h2 className={s.title}>{anime?.title || anime?.name}</h2>
                        <div className={s.ratings}>
                            {anime?.score && <><Rate allowHalf disabled={true} count={5} character={({ index }) => {
                                return index < Math.floor(anime?.score / 2) ? <span style={{color: '#fff'}} className='text-[1.5em] 540res:text-[1.2em]'>★</span> : <span style={{color: '#464646'}} className='text-[1.7em] 540res:text-[1.41em]'>★</span>;
                            }}/>
                            <p className={s.rating}>{anime?.score}</p></>}
                        </div>
                        {(category == 'manga' || category == 'anime') &&
                            <button onClick={Fevorite} className={`${s.span} active:scale-95`}>
                                <img className='w-5 h-5' src={line} alt="" />
                                <p>Add to Fovarite</p>
                            </button>
                        }                    
                    </div>
                </div>
                <div className={s.block_1__details}>                
                    <Tabs position='relative' variant='unstyled'>
                        <TabList>
                            <Tab _selected={{color: 'white'}} sx={{ color: "#7C7C7C", fontWeight: '500', fontSize: '1.2em', '@media screen and (max-width: 450px)': {fontSize: '.7em'}}}>Overview</Tab>
                            {category == ('anime'||'manga') && <Tab _selected={{color: 'white'}} sx={{ color: "#7C7C7C", fontWeight: '500', fontSize: '1.2em', '@media screen and (max-width: 450px)': {fontSize: '.7em'}}}>{category=='anime'?'Episodes':'Glava'}</Tab>}
                            {(category == ('anime'||'manga') && characters.length !== 0) && <Tab _selected={{color: 'white'}} sx={{ color: "#7C7C7C", fontWeight: '500', fontSize: '1.2em', '@media screen and (max-width: 450px)': {fontSize: '.7em'}}}>Characters</Tab>}
                            {(category == ('anime'||'manga') && recommendations.length !== 0) && <Tab _selected={{color: 'white'}} sx={{ color: "#7C7C7C", fontWeight: '500', fontSize: '1.2em', '@media screen and (max-width: 450px)': {fontSize: '.7em'}}}>Recommendations</Tab>}
                            {(anime?.anime && anime?.anime.length !== 0) && <Tab _selected={{color: 'white'}} sx={{ color: "#7C7C7C", fontWeight: '500', fontSize: '1.2em', '@media screen and (max-width: 450px)': {fontSize: '.7em'}}}>Anime</Tab>}
                            {(anime?.manga && anime?.manga.length !== 0) && <Tab _selected={{color: 'white'}} sx={{ color: "#7C7C7C", fontWeight: '500', fontSize: '1.2em', '@media screen and (max-width: 450px)': {fontSize: '.7em'}}}>Manga</Tab>}
                            {(anime?.voices && anime?.voices.length !== 0) && <Tab _selected={{color: 'white'}} sx={{ color: "#7C7C7C", fontWeight: '500', fontSize: '1.2em', '@media screen and (max-width: 450px)': {fontSize: '.7em'}}}>Voices</Tab>}
                        </TabList>
                        <TabIndicator mt='-1px' height='2px' width='100%' bg='white' borderRadius='1px'/>
                        <TabPanels>
                            <TabPanel>
                                <Details category={category}/>
                            </TabPanel>
                            {category == ('anime'||'manga') && <TabPanel>
                                <Episodes episodeInfo={episodes} animeId={animeInfo?.id} type={category}/>
                            </TabPanel>}
                            {(category == ('anime'||'manga') && characters.length !== 0) && <TabPanel>
                                <MediaCarousel category='characters' mediaTitle='characters' to='characters'/>
                            </TabPanel>}
                            {(category == ('anime'||'manga') && recommendations.length !== 0) && <TabPanel>
                                <MediaCarousel category='recommendations' mediaTitle='recommendations' to='anime'/>
                            </TabPanel>}
                            {(anime?.anime && anime?.anime.length !== 0) && <TabPanel>
                                <MediaCarousel category='anime' mediaTitle='anime' to='anime'/>
                            </TabPanel>}
                            {(anime?.manga && anime?.manga.length !== 0) && <TabPanel>
                                <MediaCarousel category='manga' mediaTitle='manga' to='manga'/>
                            </TabPanel>}
                            {(anime?.voices && anime?.voices.length !== 0) && <TabPanel>
                                <MediaCarousel category='voices' mediaTitle='voices' to='people'/>
                            </TabPanel>}
                        </TabPanels>
                    </Tabs>
                </div>
                {category == 'anime'&&<div className={s.videoContainer}>
                    <YouTube className={s.video} videoId={anime?.trailer?.youtube_id} />
                </div>}
            </div>
            }
        </>
    );
};

export default DetailsPage;