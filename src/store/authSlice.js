import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword,  } from "firebase/auth";
import { auth, db } from '../firebaseConfig'
import { addDoc, collection, setDoc } from 'firebase/firestore';

export const usersColectionRef = collection(db, 'users')


export const createAccount = createAsyncThunk(
    'user/createAccount',
    async({email,password},{dispatch}) => {
        try{
            const userCredentials = await createUserWithEmailAndPassword(auth, email, password)
            console.log(userCredentials.user);
            dispatch(setToken(userCredentials.user.accessToken))
            dispatch(setEmail(userCredentials.user.email))
        }catch (error) {
            console.log(error);
        }
    }
)

export const singInToAccount = createAsyncThunk(
    'user/signInToAccount',
    async({email,password}, {dispatch}) => {
        try{
            const userCredentials = await signInWithEmailAndPassword(auth, email, password)
            console.log(userCredentials.user);
            dispatch(setToken(userCredentials.user.accessToken))
            dispatch(setEmail(userCredentials.user.email))
        }catch (error) {
            console.log(error);
        }
    }
)

export const signOut = createAsyncThunk(
    'user/signOutFromAccount',
    async(auth) => {
        signOut(auth)
    }
)

const authSlice = createSlice({
    name: 'user',
    initialState: {
        email: localStorage.getItem('email'),
        token: localStorage.getItem('token'),
        name: localStorage.getItem('name')
    },
    reducers: {
        setToken(state, actions) {
            state.token = actions.payload
            localStorage.setItem('token', actions.payload)
        },
        setEmail(state, actions) {
            state.email = actions.payload
            localStorage.setItem('email', actions.payload)
        },
        setName(state, actions) {
            state.name = actions.payload
            localStorage.setItem('name', actions.payload)
        },
        removeProfile(state){
            state.name = null
            state.email = null
            state.token = null
            localStorage.removeItem('name')
            localStorage.removeItem('email')
            localStorage.removeItem('token')
        }
    }

})


export const { setToken, setEmail, setName, removeProfile} = authSlice.actions
export default authSlice.reducer