import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db } from '../firebaseConfig'
import { collection, doc, getDoc, setDoc, updateDoc} from 'firebase/firestore';
import { setData } from './profileSlice';

export const usersColectionRef = collection(db, 'users')

export const fetchName = createAsyncThunk(
    'user/fetchName',
    async ({displayName}, {dispatch}) => {
        await updateProfile(auth.currentUser, {displayName})
        dispatch(setName(auth.currentUser.displayName))
    }
)

export const updateUserProfile = createAsyncThunk(
    'user/updateUserProfile',
    async ({userName, bio, img, user}, {dispatch}) => {
        await updateProfile(auth.currentUser, {displayName: userName})
        const userDocRef = doc(usersColectionRef, user)
        await updateDoc(userDocRef, {
            img: img,
            bio: bio
        });
        dispatch(setName(auth.currentUser.displayName))
    }
)

export const createAccount = createAsyncThunk(
    'user/createAccount',
    async({email, password, name, nav, success, errorReg},{dispatch}) => {
        try{
            const userCredentials = await createUserWithEmailAndPassword(auth, email, password)
            dispatch(setToken(userCredentials.user.accessToken))
            dispatch(setId(userCredentials.user.uid))
            dispatch(fetchName({displayName: name}))
            const userID = userCredentials.user.uid
            const newUserDocRef = doc (usersColectionRef, userID)
            await setDoc(newUserDocRef, {email, name, bio: '', img: 'https://freesvg.org/img/abstract-user-flat-4.png', animes:[], mangas:[]})
            await success()
            nav('/profile')
        }catch (error) {
            console.log(error);
            errorReg(error.message)
        }
    }
)

export const getDefineUser = createAsyncThunk(
    'user/getDefineUser',
    async({id},{dispatch}) => {
        try{
            const defineUserDocRef = doc(usersColectionRef, id)
            const defineUser = await getDoc(defineUserDocRef)
            const userData = defineUser.data()
            dispatch(setData(userData))
        } catch(error){
            console.error(error.message);
        }
    }
)

export const singInToAccount = createAsyncThunk(
    'user/signInToAccount',
    async({email, password, nav, success, errorReg}, {dispatch}) => {
        try{
            const userCredentials = await signInWithEmailAndPassword(auth, email, password)
            success()
            dispatch(setToken(userCredentials.user.accessToken))
            dispatch(setId(userCredentials.user.uid))
            nav('/profile')
        }catch (error) {
            console.log(error);
            errorReg(error.message)
        }
    }
)

export const signOut = createAsyncThunk(
    'user/signOutFromAccount',
    async({nav}, {dispatch}) => {
        signOut()
        dispatch(removeProfile())
        nav('/')
    }
)

const authSlice = createSlice({
    name: 'user',
    initialState: {
        email: localStorage.getItem('email'),
        token: localStorage.getItem('token'),
        name: localStorage.getItem('name'),
        id: localStorage.getItem('id'),
        bio: localStorage.getItem('bio'),
    },
    reducers: {
        setToken(state, actions) {
            state.token = actions.payload
            localStorage.setItem('token', actions.payload)
        },
        setId(state, actions) {
            state.id = actions.payload   
            localStorage.setItem('id', actions.payload)        
        },
        removeProfile(){
            localStorage.removeItem('token')
            localStorage.removeItem('id')
        },
    }

})


export const { setToken, setEmail, setName, removeProfile, setId, setBio } = authSlice.actions
export default authSlice.reducer