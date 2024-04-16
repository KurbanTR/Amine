import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'

export const fetchPersons = createAsyncThunk(
    'todos/fetchPersons',
    async function({page}, {rejectWithValue, dispatch}){
        const ratings = ['g', 'pg', 'pg13', 'r', 'r17'];
        const ratingQueries = ratings.map(rating => `rated=${rating}`).join('&');
        try{
            const res = await fetch(`https://api.jikan.moe/v4/top/anime?page=${page}&${ratingQueries}`)
            if(!res.ok) {
                throw new Error('Server Error!')
            }
            const data = await res.json()
            dispatch(setPersons(data.data));
            dispatch(setPages(data.pagination.last_visible_page))
        }catch(error){
            return rejectWithValue(error.message)
        }

    }
)

export const fetchReckPersons = createAsyncThunk(
    'todos/fetchPersons',
    async function(_, {rejectWithValue, dispatch}){
        try{
            const res = await fetch(`https://api.jikan.moe/v4/recommendations/anime`)
            if(!res.ok) {
                throw new Error('Server Error!')
            }
            const data = await res.json()
            dispatch(setReckPersons(data.data));
            dispatch(setPages(data.pagination.last_visible_page))
        }catch(error){
            return rejectWithValue(error.message)
        }

    }
)

export const fetchSearchPersons = createAsyncThunk(
    'todos/fetchSearchPersons',
    async function({title}, {rejectWithValue, dispatch}){
        try{
            const res = await fetch(`https://api.jikan.moe/v4/anime?q=${title}&rating=pg13`)
            if(!res.ok) {
                throw new Error('Server Error!')
            }
            const data = await res.json()
            dispatch(setPersons(data.data));
        }catch(error){
            return rejectWithValue(error.message)
        }

    }
)

export const fetchPerson = createAsyncThunk(
    'todos/fetchPerson',
    async function({id}, {rejectWithValue, dispatch}){
        try{
            const res = await fetch(`https://api.jikan.moe/v4/anime/${id}/full`)
            if(!res.ok) {
                throw new Error('Server Error!')
            }
            const data = await res.json()
            dispatch(setPerson(data.data));
        }catch(error){
            return rejectWithValue(error.message)
        }

    }
)

const animeSlice = createSlice({
    name: 'anime',
    initialState: {
        persons: [],
        person: null,
        reckPersons: [],
        pages: NaN,
        loading: false,
        error: false,
    },
    reducers: {
        setPersons(state, action){
            state.persons = action.payload
        },
        setPerson(state, action){
            state.person = action.payload
        },
        setPages(state, action){
            state.pages = action.payload
        },
        setReckPersons(state, action){
            state.reckPersons = action.payload
        },
    },
})
export const {setPersons, setPerson, setPages, setReckPersons} = animeSlice.actions
export default animeSlice.reducer