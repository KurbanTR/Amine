import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { mainApi } from '../api/mainApi';

export const fetchAnimeScore = createAsyncThunk(
    'main/fetchAnimeScore',
    async function(_, { dispatch }) {
        const data = await mainApi.getScore({min_score: 9})
        dispatch(setScore(data.data.data))
    }
);

export const fetchAnimeNow = createAsyncThunk(
    'main/fetchAnimeNow',
    async function(_, { dispatch }) {
        const data = await mainApi.getNow()
        dispatch(setNow(data.data.data))
    }
);

export const fetchCharactres = createAsyncThunk(
    'main/fetchCharactres',
    async function(_, { dispatch }) {
        const data = await mainApi.getCharacters()
        dispatch(setCharacters(data.data.data))
    }
);

export const fetchTopCharactres = createAsyncThunk(
    'main/fetchTopCharactres',
    async function(_, { dispatch }) {
        const data = await mainApi.getTopCharacters()
        dispatch(setTopCharacters(data.data.data))
    }
);

export const fetchPerson = createAsyncThunk(
    'main/fetchPerson',
    async function(_, { dispatch }) {
        const data = await mainApi.getPerson()
        dispatch(setPerson(data.data.data))
    }
);

export const fetchTopPerson = createAsyncThunk(
    'main/fetchTopPerson',
    async function(_, { dispatch }) {
        const data = await mainApi.getTopPerson()
        dispatch(setTopPerson(data.data.data))
    }
);

const mainSlice = createSlice({
    name: 'main',
    initialState: {
        characters: [],
        topcharacters: [],
        person: [],
        topperson: [],
        score: [],
        now: null,
        loading: false,
        error: false,
    },
    reducers: {
        setScore(state, action){
            state.score = action.payload
        },
        setNow(state, action){
            state.now = action.payload
        },
        setCharacters(state, action){
            state.characters = action.payload
        },  
        setTopCharacters(state, action){
            state.topcharacters = action.payload
        },  
        setPerson(state, action){
            state.person = action.payload
        },  
        setTopPerson(state, action){
            state.person = action.payload
        },  
    }
})
export const {setScore, setNow, setCharacters, setTopCharacters, setTopPerson, setPerson} = mainSlice.actions
export default mainSlice.reducer