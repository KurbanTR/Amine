import {configureStore} from '@reduxjs/toolkit'
import animeReducer from './animeSlice'
import mangaReducer from './mangaSlice'
import charactersReducer from './charactersSlice'

export default configureStore({
    reducer: {
        anime: animeReducer,
        manga: mangaReducer, 
        character: charactersReducer,
    }
})