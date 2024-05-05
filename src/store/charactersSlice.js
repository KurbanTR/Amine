import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { charactersApi } from '../api/charactersApi';

export const fetchCharacters = createAsyncThunk(
    'characters/fetchCharacters',
    async function({ page }, { dispatch }) {
        const data = await charactersApi.getAllCharacters({page});
        dispatch(setCharacters(data.data.data)); 
        dispatch(setPages(data.data.pagination.last_visible_page)); 
    }
);
// Запрос на всех персонажей

export const fetchCharacter = createAsyncThunk(
    'characters/fetchCharacter',
    async function({id}, {dispatch}){
        const data = await charactersApi.getCharacter(id);
        dispatch(setCharacter(data.data.data)); 
    }
)
// Запрос на определённого персонажа по айди

export const fetchSearchCharacters = createAsyncThunk(
    'characters/fetchSearchCharacters',
    async function({title}, {dispatch}){
        const data = await charactersApi.getSerch({q: title})
        dispatch(setCharacters(data.data.data));
    }
)
// Поиск персонажа по имени

export const fetchRandCharacters = createAsyncThunk(
    'characters/fetchRandCharacters',
    async function(_, { dispatch }) {
        const data = await charactersApi.getRand();
        dispatch(fetchRandCharacters(data.data.data));
    }
);
// Запрос на рандомного персонажа

const charactersSlice = createSlice({
    name: 'characters',
    initialState: {
        characters: [],
        character: null,
        randCharacter: null,
        pages: null,
        loading: false,
        error: false,
    },
    reducers: {
        setCharacters(state, action){
            state.characters = action.payload
        },
        setCharacter(state, action){
            state.character = action.payload
        },
        setRandCharacters(state, action){
            state.randCharacter = action.payload
        },
        setPages(state, action){
            state.pages = action.payload
        },
    },
})
export const { setCharacters, setCharacter, setRandAnime, setPages} = charactersSlice.actions
export default charactersSlice.reducer