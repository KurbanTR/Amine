import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'

export const fetchPersons = createAsyncThunk(
    'todos/fetchPersons',
    async function(_, {rejectWithValue, dispatch}){
        try{
            const res = await fetch('https://api.jikan.moe/v4/anime')
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
    },
})
export const {setPersons, setPerson} = animeSlice.actions
export default animeSlice.reducer