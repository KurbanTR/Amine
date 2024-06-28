import {configureStore} from '@reduxjs/toolkit'
import animeReducer from './animeSlice'
import mainReducer from './mainSlice'
import authReducer from './authSlice'
import profileReducer from './profileSlice'
import messageReducer from './messageSlice'
import historyReducer from './animeHistory'

export default configureStore({
    reducer: {
        anime: animeReducer,
        main: mainReducer,
        user: authReducer,
        profile: profileReducer,
        messages: messageReducer,
        histori: historyReducer
    }
})