import {configureStore} from '@reduxjs/toolkit'
import animeReducer from './animeSlice'
import mangaReducer from './mangaSlice'

export default configureStore({
    reducer: {
        anime: animeReducer,
        manga: mangaReducer, 
    }
})