import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import { mangaApi } from '../api/mangaApi';

export const searchMangaWithPagination = createAsyncThunk(
    'manga/searchMangaWithPagination',
    async function({ genres, type, status, start_date, page, q }, { dispatch, rejectWithValue }) {
        try{
            const data = await mangaApi.searchMangaWithPagination({genres, type, status, start_date, page, q, genres_exclude: '9, 12, 49, 28'})
            if(data.ok) {
                throw new Error('Server Error!')
            }
            const filteredManga = data.data.data.filter(anime => !anime.title.toLowerCase().includes("hentai"));
            dispatch(setPages(data.data.pagination.last_visible_page)); 
            return filteredManga
        }catch(error){
            return rejectWithValue(error.message)
        }
    }
);

export const fetchMangas = createAsyncThunk(
    'manga/fetchMangas',
    async function({title, page}, { dispatch, rejectWithValue }) {
        try {
            const data = await mangaApi.getAllManga({title, page});
            if (data.ok) {
                throw new Error('Server Error!');
            }
            dispatch(setPages(data.data.pagination.last_visible_page));
            return data.data.data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);
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
        const data = await mangaApi.getSerch({q: title, genres_exclude: '12, 49, 28', limit: 24})
        const filteredManga = data.data.data.filter(manga => !manga.title.toLowerCase().includes("hentai"));
        dispatch(setMangas(filteredManga));
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
    extraReducers: (bilder) => {
        bilder.addCase(fetchMangas.pending, (state) => {
            state.loading = true
            state.error = false
        }),
        bilder.addCase(fetchMangas.fulfilled, (state, action) => {
            state.loading = false
            state.mangas = action.payload
        }),
        bilder.addCase(fetchMangas.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
        }),
        bilder.addCase(searchMangaWithPagination.pending, (state) => {
            state.loading = true
            state.error = false
        }),
        bilder.addCase(searchMangaWithPagination.fulfilled, (state, action) => {
            state.loading = false
            state.mangas = action.payload
        }),
        bilder.addCase(searchMangaWithPagination.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
        })
    }
})
export const {setMangas, setManga, setPages, setReckMangas, setCharacters, setRecommendations, setRandManga} = mangaSlice.actions
export default mangaSlice.reducer