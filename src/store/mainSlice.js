import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { mainApi } from '../api/mainApi';

export const fetchTrendingNow = createAsyncThunk(
    'main/fetchTrendingNow',
    async function(_, { dispatch }) {
        const data = await mainApi.getTrendingNow();
        dispatch(setTrendingNow(data.data.results));
        sessionStorage.setItem('trendingnow', JSON.stringify(data.data.results));
    }
);

export const fetchPopular = createAsyncThunk(
    'main/fetchPopular',
    async function(_, { dispatch }) {
        const data = await mainApi.getPopular();
        dispatch(setPopular(data.data.results));
        sessionStorage.setItem('popular', JSON.stringify(data.data.results));
    }
);

export const fetchUpcoming = createAsyncThunk(
    'main/fetchUpcoming',
    async function(_, { dispatch }) {
        const data = await mainApi.getUpcoming();
        dispatch(setUpcoming(data.data.results));
        sessionStorage.setItem('upcoming', JSON.stringify(data.data.results));
    }
);

export const fetchBestScore = createAsyncThunk(
    'main/fetchBestScore',
    async function(_, { dispatch }) {
        const data = await mainApi.getBestScore();
        dispatch(setBestScore(data.data.results));
        sessionStorage.setItem('bestscore', JSON.stringify(data.data.results));
        console.log(JSON.parse(sessionStorage.getItem('bestscore')));
    }
);

const mainSlice = createSlice({
    name: 'main',
    initialState: {
        trendingnow: JSON.parse(sessionStorage.getItem('trendingnow')) || [],
        popular: JSON.parse(sessionStorage.getItem('popular')) || [],
        upcoming: JSON.parse(sessionStorage.getItem('upcoming')) || [],
        bestscore: JSON.parse(sessionStorage.getItem('bestscore')) || [],
        loading: false,
        error: false,
    },
    reducers: {
        setTrendingNow(state, action) {
            state.trendingnow = action.payload;
        },
        setPopular(state, action) {
            state.popular = action.payload;
        },
        setUpcoming(state, action) {
            state.upcoming = action.payload;
        },
        setBestScore(state, action) {
            state.bestscore = action.payload;
        },
    },
});

export const { setTrendingNow, setPopular, setUpcoming, setBestScore } = mainSlice.actions;
export default mainSlice.reducer;
