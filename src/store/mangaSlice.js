import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'

export const fetchMangas = createAsyncThunk(
    'manga/fetchMangas',
    async function({page}, {rejectWithValue, dispatch}){
        try{
            const res = await fetch(`https://api.jikan.moe/v4/top/manga?page=${page}`)
            if(!res.ok) {
                throw new Error('Server Error!')
            }
            const data = await res.json()
            dispatch(setMangas(data.data));
            dispatch(setPages(data.pagination.last_visible_page))
        }catch(error){
            return rejectWithValue(error.message)
        }

    }
)

export const fetchSearcMangas = createAsyncThunk(
    'manga/fetchSearcManga',
    async function({title}, {rejectWithValue, dispatch}){
        try{
            const res = await fetch(`https://api.jikan.moe/v4/manga?q=${title}`)
            if(!res.ok) {
                throw new Error('Server Error!')
            }
            const data = await res.json()
            dispatch(setMangas(data.data));
        }catch(error){
            return rejectWithValue(error.message)
        }

    }
)

export const fetchManga = createAsyncThunk(
    'manga/fetchManga',
    async function({id}, {rejectWithValue, dispatch}){
        try{
            const res = await fetch(`https://api.jikan.moe/v4/manga/${id}/full`)
            if(!res.ok) {
                throw new Error('Server Error!')
            }
            const data = await res.json()
            dispatch(setManga(data.data));
        }catch(error){
            return rejectWithValue(error.message)
        }

    }
)

const mangaSlice = createSlice({
    name: 'manga',
    initialState: {
        mangas: [],
        manga: null,
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
    },
})
export const {setMangas, setManga, setPages} = mangaSlice.actions
export default mangaSlice.reducer