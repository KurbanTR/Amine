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
            dispatch(setAnime(data.data.data));
    }
)
// Запрос на определённое аниме по айди

export const fetchRandAnime = createAsyncThunk(
    'anime/fetchRandAnime',
    async function(_, { dispatch }) {
            const res = await fetch('https://api.jikan.moe/v4/random/anime');
            const data = await res.json()
            console.log(data.data);
            dispatch(setRandAnime(data.data));
    }
);
// Запрос на рандомное аниме
const animeSlice = createSlice({
    name: 'anime',
    initialState: {
        persons: [],
        person: null,
        reckPersons: [],
        randAnime: null,
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
        setRandAnime(state, action){
            state.randAnime = action.payload
        }
    },
})
export const {setAnime, setAnimes, setPages, setReckAnimes, setRandAnime} = animeSlice.actions
export default animeSlice.reducer