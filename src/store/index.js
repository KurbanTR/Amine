import {configureStore} from '@reduxjs/toolkit'
import personReducer from './animeSlice'

export default configureStore({
    reducer: {
        anime: personReducer,
    }
})