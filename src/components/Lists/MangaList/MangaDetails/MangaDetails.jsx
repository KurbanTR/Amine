import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux'
import s from './MangaDetails.module.css';
import { Rate } from 'antd';
import { fetchCharacters, fetchManga, fetchRecommendations } from '../../../../store/mangaSlice';
import { Tabs, TabList, TabPanels, Tab, TabPanel, TabIndicator } from '@chakra-ui/react'
import Details from './Details/Details';
import Characters from './Characters/Characters';
import Recommendations from './Recommendations/Recommendations';
import line from '../../../../assets/line.svg'
import { addMangas } from '../../../../store/profileSlice';
import { message } from 'antd';

const MangaDetails = () => {
    const params = useParams()
    const dispatch = useDispatch()

    useEffect(()=>{
        dispatch(fetchManga({id: params.id}))
        dispatch(fetchCharacters({id: params.id}))
        dispatch(fetchRecommendations({id: params.id}))
        window.scrollTo({top: 0, behavior: "smooth"})
    },[params.id, dispatch])
    const manga = useSelector(state => state.manga.manga)
    const characters = useSelector(state => state.manga.characters)
    const recommendations = useSelector(state => state.manga.recommendations)
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
    // const warning = () => {
    //   messageApi.open({
    //     type: 'warning',
    //     content: 'This is a warning message',
    //   });
    // };

    const Fevorite = ()=>{
        const newManga = {
            id: params.id,
            img: manga?.images.jpg.image_url,
            title: manga?.title,
            score: manga?.score
        }
        dispatch(addMangas({idUser, newManga, success, error}))
    }


    return (
        <div className={s.block_1}>
            <div className={s.block_1__shapka}></div>
            <div className={s.block_1__titles}>
                <img src={manga?.images.jpg.image_url} className={s.persImg} alt="" />
                <div>
                    <p className={s.title}>{manga?.title}</p>
                    <div className={s.ratings}>
                        {manga?.score && <Rate allowHalf disabled={true} count={5} character={({ index }) => {
                            return index < Math.floor(manga?.score / 2) ? <span style={{color: '#fff', fontSize: '1.5em'}}>★</span> : <span style={{color: '#464646', fontSize: '1.7em'}}>★</span>;
                        }}/>}
                        <p className={s.rating}>{manga?.score}</p>
                    </div>
                    <button onClick={Fevorite} className={`${s.span} active:scale-95`}>
                        <img className='w-5 h-5' src={line} alt="" />
                        <p>Add to Fovarite</p>
                    </button>
                </div>
            </div>
            <div className={s.block_1__details}>  
                <Tabs position='relative' variant='unstyled' className='pl-[1.25em] w-full'>
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
            {contextHolder}
        </div>
    );
};

export default MangaDetails;