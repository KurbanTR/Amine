import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db } from '../firebaseConfig'
import { addDoc, collection, doc, getDoc, setDoc} from 'firebase/firestore';
import { setData } from './profileSlice';

export const usersColectionRef = collection(db, 'users')

export const updateUserProfile = createAsyncThunk(
    'user/updateuserProfile',
    async ({displayName}, {dispatch}) => {
        await updateProfile(auth.currentUser, {displayName})
        await dispatch(setName(auth.currentUser.displayName))
    }
)


export const createAccount = createAsyncThunk(
    'user/createAccount',
    async({email, password, name, nav},{dispatch}) => {
        try{
            const userCredentials = await createUserWithEmailAndPassword(auth, email, password)
            console.log(userCredentials.user);
            dispatch(setToken(userCredentials.user.accessToken))
            dispatch(setEmail(userCredentials.user.email))
            dispatch(setId(userCredentials.user.uid))
            dispatch(setName(userCredentials.user.displayName))
            dispatch(updateUserProfile({displayName: name}))
            const userID = userCredentials.user.uid
            const newUserDocRef = doc (usersColectionRef, userID)
            await setDoc(newUserDocRef, {email, name})
            nav('/profile')
            
        }catch (error) {
            console.log(error);
        }
    }
)

export const getDefineUser = createAsyncThunk(
    'user/getDefineUser',
    async({id},{dispatch}) => {
        try{
            console.log(id);
            const defineUserDocRef = doc(usersColectionRef, id)
            const defineUser = await getDoc(defineUserDocRef)
            const userData = defineUser.data()
            dispatch(setData(userData))
            console.log(userData);
        } catch(error){
            console.error(error.message);
        }
    }
)

export const singInToAccount = createAsyncThunk(
    'user/signInToAccount',
    async({email, password, nav}, {dispatch}) => {
        try{
            const userCredentials = await signInWithEmailAndPassword(auth, email, password)
            console.log(userCredentials.user);
            dispatch(setToken(userCredentials.user.accessToken))
            dispatch(setEmail(userCredentials.user.email))
            dispatch(setName(userCredentials.user.displayName))
            nav('/profile')
        }catch (error) {
            console.log(error);
        }
    }
)

export const signOut = createAsyncThunk(
    'user/signOutFromAccount',
    async({nav}, {dispatch}) => {
        signOut(auth)
        dispatch(setName(''))
        dispatch(setEmail(''))
        dispatch(setToken(''))
        dispatch(setId(''))
        nav('/')
    }
)

const authSlice = createSlice({
    name: 'user',
    initialState: {
        email: localStorage.getItem('email'),
        token: localStorage.getItem('token'),
        name: '',
        id: '',
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
        setId(state, actions) {
            state.id = actions.payload            
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


export const { setToken, setEmail, setName, removeProfile, setId } = authSlice.actions
export default authSlice.reducer