import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { animeApi } from '../api/animeApi';

export const fetchAnimes = createAsyncThunk(
    'anime/fetchAnimes',
    async function({ page }, { dispatch }) {
            const data = await animeApi.getAllAnime({page});
            console.log(data.data);
            dispatch(setAnimes(data.data.data)); 
            dispatch(setPages(data.data.pagination.last_visible_page)); 
    }
);
// Запрос на все аниме

export const fetchAnimeRank = createAsyncThunk(
    'anime/fetchAnimeRank',
    async function(_, {dispatch}){
        const data = await animeApi.getAnimeRank()
        dispatch(setReckAnimes(data.data.data));
    }
)
// Запрос на 25 аниме по рангу

export const fetchSearchAnimes = createAsyncThunk(
    'anime/fetchSearchAnimes',
    async function({title}, {dispatch}){
        const data = await animeApi.getAnimeSerch({q: title, rating: 'r17'})
        dispatch(setAnimes(data.data.data));
    }
)
// Поиск аниме по названию

export const fetchAnime = createAsyncThunk(
    'anime/fetchAnime',
    async function({id}, {dispatch}){
            const data = await animeApi.getAnime(id)
            console.log(id);
            dispatch(setAnime(data.data.data));
    }
)
// Запрос на определённое аниме по айди

const animeSlice = createSlice({
    name: 'anime',
    initialState: {
        persons: [],
        person: null,
        reckPersons: [],
        pages: null,
        loading: false,
        error: false,
    },
    reducers: {
        setAnimes(state, action){
            state.persons = action.payload
        },
        setAnime(state, action){
            state.person = action.payload
        },
        setPages(state, action){
            state.pages = action.payload
        },
        setReckAnimes(state, action){
            state.reckPersons = action.payload
        },
    },
})
export const {setAnime, setAnimes, setPages, setReckAnimes} = animeSlice.actions
export default animeSlice.reducer