import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux'
import s from './Voices.module.css';
import { fetchPerson} from '../../../store/animeSlice';
import { Tabs, TabList, TabPanels, Tab, TabPanel, TabIndicator } from '@chakra-ui/react'
import Details from './Details/Details';
import Characters from './Characters/Characters';
import Anime from './Anime/Anime';
import Manga from './Manga/Manga';

const Person = () => {

    const params = useParams()
    const dispatch = useDispatch()

    useEffect(()=>{
        dispatch(fetchPerson({id: params.id}))
        window.scrollTo({top: 0, behavior: "smooth"})
    },[params.id, dispatch])
    const anime = useSelector(state => state.anime.person)

    return (
        <div className={s.block_1}>
            <div className={s.block_1__shapka}></div>
            <div className={s.block_1__titles}>
                <img src={anime?.images.jpg.image_url} className={s.persImg} alt="" />
                <div>
                    <p className={s.title}>{anime?.name}</p>
                </div>
            </div>
            <div className={s.block_1__details}>  
                <Tabs position='relative' variant='unstyled' className='pl-[1.25em] w-full'>
                    <TabList>
                        <Tab _selected={{color: 'white'}} sx={{ color: "#7C7C7C", fontWeight: '500', fontSize: '1.2em', '@media screen and (max-width: 450px)': {fontSize: '.9em'}}}>Overview</Tab>
                        {anime?.anime.length !== 0 && <Tab _selected={{color: 'white'}} sx={{ color: "#7C7C7C", fontWeight: '500', fontSize: '1.2em', '@media screen and (max-width: 450px)': {fontSize: '.9em'}}}>Anime</Tab>}
                        {anime?.manga.length !== 0 && <Tab _selected={{color: 'white'}} sx={{ color: "#7C7C7C", fontWeight: '500', fontSize: '1.2em', '@media screen and (max-width: 450px)': {fontSize: '.9em'}}}>Manga</Tab>}
                        {anime?.voices.length !== 0 && <Tab _selected={{color: 'white'}} sx={{ color: "#7C7C7C", fontWeight: '500', fontSize: '1.2em', '@media screen and (max-width: 450px)': {fontSize: '.9em'}}}>Voices</Tab>}
                    </TabList>
                    <TabIndicator mt='-1.5px' height='2px' width='100%' bg='white' borderRadius='1px'/>
                    <TabPanels>
                        <TabPanel>
                            <Details/>
                        </TabPanel>
                        {anime?.anime.length !== 0 && <TabPanel>
                            <Anime/>
                        </TabPanel>}
                        {anime?.manga.length !== 0 && <TabPanel>
                            <Manga/>
                        </TabPanel>}
                        {anime?.voices.length !== 0 && <TabPanel>
                            <Characters/>
                        </TabPanel>}
                    </TabPanels>
                </Tabs>
            </div>
        </div>
    );
};

export default Person;
