import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import { collection, doc, getDocs } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import { usersColectionRef } from './authSlice';

export const producsColectionRef = collection(db, 'products')
export const nikeAirForce = doc(producsColectionRef, '8Tb8Nv1jGvXglQlIiCcaFMgHRwc2')


export const getProductData = createAsyncThunk(
    'profile/getProductData',
    async(_, {dispatch})=>{
        const querySnapshot = await getDocs(producsColectionRef)
        const userDataArray = querySnapshot.docs.map(doc=>({
            id: doc.id,
            ...doc.data()
        }))
        dispatch(setData(userDataArray))
    }
)

export const addAmine = createAsyncThunk(
    'profile/addAmine',
    async function({id}, { dispatch }) {
        await addDoc(producsColectionRef, {})
    }
);

const profileSlice = createSlice({
    name: 'profile',
    initialState: {
        mangas: [],
        animes: [],
        data: [],
    },
    reducers: {
        setMangas(state, action){
            state.mangas = action.payload
        },
        setAnimes(state, action){
            state.animes = action.payload
        },
        setData(state, action){
            state.data = action.payload
        },
    },
})
export const {setMangas, setANimes, setData } = profileSlice.actions
export default profileSlice.reducer