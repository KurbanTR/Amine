import {configureStore} from '@reduxjs/toolkit'
import animeReducer from './animeSlice'
import mangaReducer from './mangaSlice'
import charactersReducer from './charactersSlice'
import authReducer from './authSlice'
import profileReducer from './profileSlice'

export default configureStore({
    reducer: {
        anime: animeReducer,
        manga: mangaReducer, 
        character: charactersReducer,
        user: authReducer,
        profile: profileReducer,
    }
})