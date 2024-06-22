import { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux'
import s from '../../styles/DetailsPage.module.css';
import { Rate } from 'antd';
import { fetchAnime, fetchAnimeInfo} from '../../store/animeSlice';
import { Tabs, TabList, TabPanels, Tab, TabPanel, TabIndicator } from '@chakra-ui/react'
import line from '../../assets/line.svg'
import { addAnimes } from '../../store/profileSlice';
import { message } from 'antd';
import MediaCarousel from '../../other/MediaCarousel';
import Details from '../../other/Details';
import ErrorPage from './ErrorPage';
import Episodes from '../../other/Episodes';
import Trailer from '../../other/Trailer';
import Preloader from '../../other/Preloader';

const DetailsPage = () => {
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
        document.title = `${animeInfo?.title?.romaji} - JumCloud`        
    },[dispatch, id])

    useEffect(()=>{
        if(malid !== null){
            dispatch(fetchAnime({id: malid}))
            window.scrollTo({top: 0, behavior: "smooth"})
        }
    },[malid, dispatch, location])

    const {anime} = useSelector(state => state.anime)
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
            img: animeInfo?.image,
            title: animeInfo?.title?.romaji,
            score: animeInfo?.rating,
            year: anime?.year,
            genre: anime?.genres && (anime?.genres.length !== 0 && anime?.genres[0]?.name)
        }
        dispatch(addAnimes({idUser, newAnime, success, error}))
    }

    const [trailerSrc, setTrailerSrc] = useState(null)
    const [trailerShow, setTrailerShow] = useState(null)

    const changeTrailer = () => {
        setTrailerSrc(anime?.trailer?.embed_url)
        setTrailerShow(true)
        console.log(anime);
    }  

    return (
        <>
        {loading && <Preloader/>}
        {getError && <ErrorPage error={getError}/>}
        { !loading && !getError &&
            <div className={s.block_1}>
                {contextHolder}
                <div className={`${s.block_1__shapka} flex justify-end p-3`} style={{backgroundImage: `url(${animeInfo?.cover})`}}>
                    {anime?.trailer && anime?.trailer?.youtube_id &&
                        <div className='self-end z-10 btn-base bg-white text-def-black flex items-center gap-2 text-center cursor-pointer' onClick={changeTrailer}>
                        <span>
                            <svg className='w-6 h-6' xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48" fill="none">
                            <path d="M47.5219 14.4001C47.5219 14.4001 47.0531 11.0907 45.6094 9.6376C43.7812 7.7251 41.7375 7.71572 40.8 7.60322C34.0875 7.11572 24.0094 7.11572 24.0094 7.11572H23.9906C23.9906 7.11572 13.9125 7.11572 7.2 7.60322C6.2625 7.71572 4.21875 7.7251 2.39062 9.6376C0.946875 11.0907 0.4875 14.4001 0.4875 14.4001C0.4875 14.4001 0 18.2907 0 22.172V25.8095C0 29.6907 0.478125 33.5813 0.478125 33.5813C0.478125 33.5813 0.946875 36.8907 2.38125 38.3438C4.20937 40.2563 6.60938 40.1907 7.67813 40.397C11.5219 40.7626 24 40.8751 24 40.8751C24 40.8751 34.0875 40.8563 40.8 40.3782C41.7375 40.2657 43.7812 40.2563 45.6094 38.3438C47.0531 36.8907 47.5219 33.5813 47.5219 33.5813C47.5219 33.5813 48 29.7001 48 25.8095V22.172C48 18.2907 47.5219 14.4001 47.5219 14.4001ZM19.0406 30.2251V16.7345L32.0062 23.5032L19.0406 30.2251Z" fill="black"/>
                            </svg>
                        </span>
                        <p>{`Watch Trailer`}</p>
                        </div>
                    }
                </div>
                <div className={s.block_1__titles}>
                    <img src={animeInfo?.image} className={`${s.persImg} 700res:hidden`} alt=""/>
                    <div className='pr-1'>
                        <h2 className='900res:text-3xl 400res:text-2xl text-5xl 1200res:text-4xl font-bold'>{animeInfo?.title?.romaji}</h2>
                        <span className="flex gap-5 items-center mb-12 mt-6">
                            <Rate allowHalf disabled defaultValue={4.5} className='text-4xl text-white 500res:text-3xl'/>
                            <p className="text-2xl font-[550]">{animeInfo?.rating / 10}</p> 
                        </span>
                        <button onClick={Fevorite} className={`${s.span} active:scale-95`}>
                            <img className='w-5 h-5' src={line} alt="" />
                            <p>Add to Fovarite</p>
                        </button>
                    </div>
                </div>
                <div className={s.block_1__details}>                
                    <Tabs position='relative' variant='unstyled'>
                        <TabList>
                            <Tab _selected={{color: 'white'}} sx={{ color: "#7C7C7C", fontWeight: '500', fontSize: '1.2em', '@media screen and (max-width: 600px)': {fontSize: '.7em'}, '@media screen and (max-width: 375px)': {fontSize: '.5em'}}}>Overview</Tab>
                            {episodes.length !== 0 && <Tab _selected={{color: 'white'}} sx={{ color: "#7C7C7C", fontWeight: '500', fontSize: '1.2em', '@media screen and (max-width: 600px)': {fontSize: '.7em'}, '@media screen and (max-width: 375px)': {fontSize: '.5em'}}}>Episodes</Tab>}
                            {animeInfo?.characters && <Tab _selected={{color: 'white'}} sx={{ color: "#7C7C7C", fontWeight: '500', fontSize: '1.2em', '@media screen and (max-width: 600px)': {fontSize: '.7em'}, '@media screen and (max-width: 375px)': {fontSize: '.5em'}}}>Characters</Tab>}
                            {(anime?.anime && anime?.anime.length !== 0) && <Tab _selected={{color: 'white'}} sx={{ color: "#7C7C7C", fontWeight: '500', fontSize: '1.2em', '@media screen and (max-width: 600px)': {fontSize: '.7em'}, '@media screen and (max-width: 375px)': {fontSize: '.5em'}}}>Anime</Tab>}
                        </TabList>
                        <TabIndicator mt='-1px' height='2px' width='100%' bg='white' borderRadius='1px'/>
                        <TabPanels>
                            <TabPanel>
                                <Details/>
                            </TabPanel>
                            {episodes.length !== 0 && <TabPanel>
                                <Episodes episodeInfo={episodes} animeId={animeInfo?.id}/>
                            </TabPanel>}
                            {animeInfo?.characters && <TabPanel>
                                <MediaCarousel data={animeInfo?.characters}/>
                            </TabPanel>}
                        </TabPanels>
                    </Tabs>
                </div>
                <Trailer trailerShow={trailerShow} setTrailerShow={setTrailerShow} trailerSrc={trailerSrc} setTrailerSrc={setTrailerSrc}/>
            </div>
            }
        </>
    );
};

export default DetailsPage;