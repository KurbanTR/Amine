import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import { mangaApi } from '../api/mangaApi';

export const fetchMangas = createAsyncThunk(
    'manga/fetchMangas',
    async function({page}, {dispatch}){
            const data = await mangaApi.getAllManga({page})
            dispatch(setMangas(data.data.data));
            dispatch(setPages(data.data.pagination.last_visible_page))
    }
)
// Запрос на все манги

export const fetchAnimeRank = createAsyncThunk(
    'anime/fetchAnimeRank',
    async function(_, {dispatch}){
        const data = await mangaApi.getMangaRank()
        dispatch(setReckMangas(data.data.data));
    }
)
// Запрос на 25 манг по рангу

export const fetchSearcMangas = createAsyncThunk(
    'manga/fetchSearcManga',
    async function({title}, {dispatch}){
        const data = await mangaApi.getMangaSerch({q: title})
            dispatch(setMangas(data.data.data));
    }
)
// Поиск манги по названию

export const fetchManga = createAsyncThunk(
    'manga/fetchManga',
    async function({id}, {dispatch}){
        const data = await mangaApi.getManga(id)
        dispatch(setManga(data.data.data));
    }
)
// Запрос на определённую мангу по айди

const mangaSlice = createSlice({
    name: 'manga',
    initialState: {
        mangas: [],
        manga: null,
        pages: 1,
        loading: false,
        error: false,
    },
    reducers: {
        setMangas(state, action){
            state.mangas = action.payload
        },
        setManga(state, action){
            state.manga = action.payload
        },
        setPages(state, action){
            state.pages = action.payload
        },
        setReckMangas(state, action){
            state.pages = action.payload
        },
    },
})
export const {setMangas, setManga, setPages, setReckMangas} = mangaSlice.actions
export default mangaSlice.reducer