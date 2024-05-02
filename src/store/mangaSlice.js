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

export const fetchMangaRank = createAsyncThunk(
    'anime/fetchMangaRank',
    async function(_, {dispatch}){
        const data = await mangaApi.getMangaRank()
        dispatch(setReckMangas(data.data.data));
    }
)
// Запрос на 25 манг по рангу

export const fetchSearcMangas = createAsyncThunk(
    'manga/fetchSearcManga',
    async function({title}, {dispatch}){
        const data = await mangaApi.getMangaSerch({q: title, genres_exclude: '12, 49, 28', limit: 24})
            dispatch(setMangas(data.data.data));
    }
)
// Поиск манги по названию

export const fetchManga = createAsyncThunk(
    'manga/fetchManga',
    async function({id}, {dispatch}){
        const data = await mangaApi.getManga(id)
        dispatch(setManga(data.data.data));
        console.log(data.data.data);
    }
)
// Запрос на определённую мангу по айди

export const fetchCharacters = createAsyncThunk(
    'anime/fetchCharacters',
    async function({id}, { dispatch }) {
        const data = await mangaApi.getCharacters(id)
        dispatch(setCharacters(data.data.data))
    }
);

export const fetchRecommendations = createAsyncThunk(
    'anime/fetchRecommendations',
    async function({id}, { dispatch }) {
        const data = await mangaApi.getRecommendations(id)
        dispatch(setRecommendations(data.data.data))
    }
);

export const fetchRandManga = createAsyncThunk(
    'anime/fetchRandManga',
    async function(_, { dispatch }) {
        const data = await mangaApi.getRand();
        const hasHentai = await data.data.data.genres.some(genre => genre.name === "Hentai" || genre.name === "Erotica");
        !hasHentai ? dispatch(setRandManga(data.data.data)) : dispatch(fetchRandManga());

    }
);
// Запрос на рандомное аниме

const mangaSlice = createSlice({
    name: 'manga',
    initialState: {
        mangas: [],
        manga: null,
        randManga: null,
        characters: [],
        recommendations: [],
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
        setCharacters(state, action){
            state.characters = action.payload
        },
        setRecommendations(state, action){
            state.recommendations = action.payload
        },
        setRandManga(state, action){
            state.randManga = action.payload
        }
    },
})
export const {setMangas, setManga, setPages, setReckMangas, setCharacters, setRecommendations, setRandManga} = mangaSlice.actions
export default mangaSlice.reducer