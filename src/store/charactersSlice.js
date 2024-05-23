import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { charactersApi } from '../api/charactersApi';

export const fetchSearch = createAsyncThunk(
    'characters/fetchSearch',
    async function({ value, page }, { dispatch, rejectWithValue }) {
        try{
            const data = await charactersApi.getSerch({page, q: value, genres_exclude: '9, 12, 49, 28'})
            if(data.ok) {
                throw new Error('Server Error!')
            }
            dispatch(setPages(data.data.pagination.last_visible_page)); 
            return data.data.data
        }catch(error){
            return rejectWithValue(error.message)
        }
    }
);

export const fetchCharacters = createAsyncThunk(
    'characters/fetchCharacters',
    async function({ value, page }, { dispatch, rejectWithValue }) {
        try {
            const data = await charactersApi.getAllCharacters({q: value, page});
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
// Запрос на всех персонажей

export const fetchCharacter = createAsyncThunk(
    'characters/fetchCharacter',
    async function({id}, {dispatch}){
        const data = await charactersApi.getCharacter(id);
        dispatch(setCharacter(data.data.data)); 
    }
)
// Запрос на определённого персонажа по айди

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
    extraReducers: (bilder) => {
        bilder.addCase(fetchCharacters.pending, (state) => {
            state.loading = true
            state.error = false
        }),
        bilder.addCase(fetchCharacters.fulfilled, (state, action) => {
            state.loading = false
            state.characters = action.payload
        }),
        bilder.addCase(fetchCharacters.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
        }),
        bilder.addCase(fetchSearch.pending, (state) => {
            state.loading = true
            state.error = false
        }),
        bilder.addCase(fetchSearch.fulfilled, (state, action) => {
            state.loading = false
            state.characters = action.payload
        }),
        bilder.addCase(fetchSearch.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
        })  
    }
})
export const { setCharacters, setCharacter, setRandAnime, setPages} = charactersSlice.actions
export default charactersSlice.reducer