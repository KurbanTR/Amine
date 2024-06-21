import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { mainApi } from '../api/mainApi';

export const fetchTrendingNow = createAsyncThunk(
    'main/fetchTrendingNow',
    async function(_, { dispatch }) {
        const data = await mainApi.getTrendingNow()
        console.log(data.data.results);
        dispatch(setTrendingNow(data.data.results))
    }
);

export const fetchPopular = createAsyncThunk(
    'main/fetchPopular',
    async function(_, { dispatch }) {
        const data = await mainApi.getPopular()
        console.log(data.data.results);
        dispatch(setPopular(data.data.results))
    }
);

export const fetchUpcoming = createAsyncThunk(
    'main/fetchUpcoming',
    async function(_, { dispatch }) {
        const data = await mainApi.getUpcoming()
        console.log(data.data.results);
        dispatch(setUpcoming(data.data.results))
    }
);

export const fetchBestScore = createAsyncThunk(
    'main/fetchBestScore',
    async function(_, { dispatch }) {
        const data = await mainApi.getBestScore()
        console.log(data.data.results);
        dispatch(setBestScore(data.data.results))
    }
);

const mainSlice = createSlice({
    name: 'main',
    initialState: {
        trendingnow: [],
        popular: [],
        upcoming: [],
        bestscore: [],
        loading: false,
        error: false,
    },
    reducers: {
        setTrendingNow(state, action){
            state.trendingnow = action.payload
        },
        setPopular(state, action){
            state.popular = action.payload
        },
        setUpcoming(state, action){
            state.upcoming = action.payload
        },  
        setBestScore(state, action){
            state.bestscore = action.payload
        },  
    }
})
export const {setTrendingNow, setPopular, setUpcoming, setBestScore} = mainSlice.actions
export default mainSlice.reducer