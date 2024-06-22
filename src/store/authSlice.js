import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db } from '../firebaseConfig'
import { collection, doc, getDoc, setDoc, updateDoc} from 'firebase/firestore';
import { setData } from './profileSlice';

export const usersColectionRef = collection(db, 'users')
export const messagesColectionRef = collection(db, 'messages')

export const fetchName = createAsyncThunk(
    'user/fetchName',
    async ({displayName}) => {
        await updateProfile(auth.currentUser, {displayName})
    }
)

export const updateUserProfile = createAsyncThunk(
    'user/updateUserProfile',
    async ({userName, bio, img, user}) => {
        await updateProfile(auth.currentUser, {displayName: userName})
        const userDocRef = doc(usersColectionRef, user)
        const messagesDocRef = doc (messagesColectionRef, user)
        await updateDoc(messagesDocRef, {
            img: img,
            name: userName,
        });
        await updateDoc(userDocRef, {
            img: img,
            bio: bio,
            name: userName,
        });
    }
)

export const fetchToken = createAsyncThunk(
    'user/fetchToken',
    async ({token, user}) => {
        const userDocRef = doc(usersColectionRef, user)
        await updateDoc(userDocRef, {
            token: token
        });
        console.log();
    }
)

export const createAccount = createAsyncThunk(
    'user/createAccount',
    async({email, password, name, nav, success, errorReg},{dispatch}) => {
        try{
            const userCredentials = await createUserWithEmailAndPassword(auth, email, password)
            dispatch(setId(userCredentials.user.uid))
            dispatch(fetchName({displayName: name}))
            const userID = userCredentials.user.uid
            const newUserDocRef = doc (usersColectionRef, userID)
            const newMessagesDocRef = doc (messagesColectionRef, userID)
            await setDoc(newUserDocRef, {email, name, bio: '', img: 'https://freesvg.org/img/abstract-user-flat-4.png', animes:[], mangas:[], token: userCredentials.user.accessToken})
            await setDoc(newMessagesDocRef, {id: userID, messages: [], name, img: 'https://freesvg.org/img/abstract-user-flat-4.png', isAdmin: false})
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
            dispatch(fetchToken({token: userCredentials.user.accessToken, user: userCredentials.user.uid}))
            success()
            dispatch(setId(userCredentials.user.uid))
            nav('/profile')
            userCredentials.user.email == 'kurban@gmail.com' && dispatch(setAdmin(true))
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
        token: localStorage.getItem('token'),
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


export const { setToken, setAdmin, removeProfile, setId } = authSlice.actions
export default authSlice.reducer