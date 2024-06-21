import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { animeApi } from '../api/animeApi';

export const searchAnimeWithPagination = createAsyncThunk(
  'anime/searchAnimeWithPagination',
  async function({ genres, type, status, start_date, end_date, page, q, category }, { dispatch, rejectWithValue }) {
    try {
      const data = await animeApi.searchAnimeWithPagination({ genres, type, status, start_date, end_date, page, q, genres_exclude: '9,12,49,28' }, category);
      if (!data) {
        throw new Error('Server Error!');
      }
      const filteredAnime = category !== 'characters' ? data.data.data.filter(anime => !anime.title.toLowerCase().includes("hentai")) : data.data.data;
      dispatch(setPages(data.data.pagination.last_visible_page));
      console.log(category);
      return filteredAnime;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);


export const fetchAnimes = createAsyncThunk(
    'anime/fetchAnimes',
    async function({page, category}, { dispatch, rejectWithValue }) {
        try {
            const data = await animeApi.getAllAnime({page}, category);
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

// Запрос на все аниме

export const fetchAnime = createAsyncThunk(
    'anime/fetchAnime',
    async function({id, category}, {rejectWithValue}){
        try{
            const data = await animeApi.getAnime(id, category);
            return data.data.data
        }catch(error){
            return rejectWithValue(error.message)
        }
    }
)
// Запрос на определённое аниме по айди

export const fetchRandAnime = createAsyncThunk(
    'anime/fetchRandAnime',
    async function(_, { dispatch }) {
        const data = await animeApi.getRand({genres_exclude: [12, 49]});
        const hasHentai = await data.data.data.genres.some(genre => genre.name === "Hentai" || genre.name === "Erotica");
        !hasHentai ? dispatch(setRandAnime(data.data.data)) : dispatch(fetchRandAnime());
    }
);
// Запрос на рандомное аниме

export const fetchCharacters = createAsyncThunk(
    'anime/fetchCharacters',
    async function({id, category}, { dispatch }) {
        const data = await animeApi.getCharacters(id, category)
        dispatch(setCharacters(data.data.data))
    }
);

export const fetchRecommendations = createAsyncThunk(
    'anime/fetchRecommendations',
    async function({id, category}, { dispatch }) {
        const data = await animeApi.getRecommendations(id, category)
        dispatch(setRecommendations(data.data.data))
    }
);

export const fetchPerson = createAsyncThunk(
    'anime/fetchPerson',
    async function({id}, {dispatch}){
        const data = await animeApi.getPerson(id)
        dispatch(setPerson(data.data.data));
    }
)

export const fetchAnimeInfo = createAsyncThunk(
    'anime/fetchAnimeInfo',
    async function({id}, {dispatch, rejectWithValue}){
        try{
            const data = await animeApi.getAnimeInfo(id)
            console.log(data.data);
            dispatch(setMalId(data.data.malId))
            dispatch(setAnimeInfo(data.data))
            dispatch(fetchEpisodes({id: data.data.id}))
        }catch(error){
            return rejectWithValue(error.message)
        }
    }
)
export const fetchEpisodes = createAsyncThunk(
    'anime/fetchEpisodes',
    async function({id}, {dispatch}){
        const data = await animeApi.getEpisodes(id)
        dispatch(setEpisodes(data.data.episodes))
    }
)
const animeSlice = createSlice({
    name: 'anime',
    initialState: {
        animes: [],
        anime: null,
        animeInfo: null,
        malid: null,
        episodes: [],
        characters: [],
        recommendations: [],
        person: null,
        randAnime: null,
        pages: 1,
        loading: false,
        error: false,
    },
    reducers: {
        setAnime(state, action){
            state.anime = action.payload
        },
        setAnimeInfo(state, action){
            state.animeInfo = action.payload
        },
        setMalId(state, action){
            state.malid = action.payload
        },
        setPages(state, action){
            state.pages = action.payload
        },
        setRandAnime(state, action){
            state.randAnime = action.payload
        },
        setCharacters(state, action){
            state.characters = action.payload
        },
        setRecommendations(state, action){
            state.recommendations = action.payload
        },
        setPerson(state, action){
            state.person = action.payload
        },
        setAnimes(state, action){
            state.animes = action.payload
        },
        setEpisodes(state, action){
            state.episodes = action.payload
        }
    },
    extraReducers: (bilder) => {
        bilder.addCase(fetchAnimes.pending, (state) => {
            state.loading = true
            state.error = false
        }),
        bilder.addCase(fetchAnimes.fulfilled, (state, action) => {
            state.loading = false
            state.error = false
            state.animes = action.payload
        }),
        bilder.addCase(fetchAnimes.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
        }),
        bilder.addCase(searchAnimeWithPagination.pending, (state) => {
            state.loading = true
            state.error = false
        }),
        bilder.addCase(searchAnimeWithPagination.fulfilled, (state, action) => {
            state.loading = false
            state.error = false
            state.animes = action.payload
        }),
        bilder.addCase(searchAnimeWithPagination.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
        }),
        bilder.addCase(fetchAnime.pending, (state) => {
            state.loading = true
            state.error = false
        }),
        bilder.addCase(fetchAnime.fulfilled, (state, action) => {
            state.loading = false
            state.error = false
            state.anime = action.payload
        }),
        bilder.addCase(fetchAnime.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
        }),
        bilder.addCase(fetchAnimeInfo.pending, (state) => {
            state.loading = true
            state.error = false
        }),
        bilder.addCase(fetchAnimeInfo.fulfilled, (state) => {
            state.loading = false
            state.error = false
        }),
        bilder.addCase(fetchAnimeInfo.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
        })
    }
})
export const {setAnime,setMalId,setAnimeInfo,setEpisodes, setAnimes, setPages, setRandAnime, setCharacters, setRecommendations, setScore, setNow, setPerson} = animeSlice.actions
export default animeSlice.reducer