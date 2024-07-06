import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db } from '../firebaseConfig'
import { collection, doc, getDoc, setDoc, updateDoc} from 'firebase/firestore';
import { setData, setProfile } from './profileSlice';

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
    async({email, password, name, nav, errorMessage},{dispatch}) => {
        try{
            const userCredentials = await createUserWithEmailAndPassword(auth, email, password)
            dispatch(setId(userCredentials.user.uid))
            dispatch(fetchName({displayName: name}))
            const userID = userCredentials.user.uid
            const newUserDocRef = doc (usersColectionRef, userID)
            const newMessagesDocRef = doc (messagesColectionRef, userID)
            await setDoc(newUserDocRef, {email, name, bio: '', img: 'https://freesvg.org/img/abstract-user-flat-4.png', animes:[], mangas:[], token: userCredentials.user.accessToken, isAdmin: false})
            await setDoc(newMessagesDocRef, {id: userID, messages: [], name, img: 'https://freesvg.org/img/abstract-user-flat-4.png', isAdmin: false})
            nav(`/profile/${userCredentials.user.uid}`)
            
        }catch (error) {
            errorMessage(error.message)
        }
    }
)

export const getDefineUser = createAsyncThunk(
    'user/getDefineUser',
    async({id}, {dispatch}) => {
        try{
            const defineUserDocRef = doc(usersColectionRef, id)
            const defineUser = await getDoc(defineUserDocRef)
            const userData = defineUser.data()
            dispatch(setData(userData))
            localStorage.setItem('profileData', JSON.stringify(userData))
        } catch(error){
            console.error(error.message);
        }
    }
)
export const getUser = createAsyncThunk(
    'user/getUser',
    async({id},{dispatch}) => {
        try{
            const defineUserDocRef = doc(usersColectionRef, id)
            const defineUser = await getDoc(defineUserDocRef)
            const userData = defineUser.data()
            dispatch(setProfile(userData))
        } catch(error){
            console.error(error.message);
        }
    }
)

export const singInToAccount = createAsyncThunk(
    'user/signInToAccount',
    async({email, password, nav, errorMessage}, {dispatch}) => {
        try{
            const userCredentials = await signInWithEmailAndPassword(auth, email, password)
            dispatch(fetchToken({token: userCredentials.user.accessToken, user: userCredentials.user.uid}))
            dispatch(setId(userCredentials.user.uid))
            nav(`/profile/${userCredentials.user.uid}`)
            userCredentials.user.email == 'kurban@gmail.com' && dispatch(setAdmin(true))
        }catch (error) {
            errorMessage(error.message)
            console.log(error.message);
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
        loadingUser: false,
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
            localStorage.removeItem('bio')
            localStorage.removeItem('profileData')
        },
    },
    extraReducers: (bilder) => {
        bilder.addCase(getUser.pending, (state) => {
            state.loading = true
        })
        bilder.addCase(createAccount.pending, (state) => {
            state.loading = true
        })
        bilder.addCase(createAccount.fulfilled, (state) => {
            state.loading = false
        })
        bilder.addCase(singInToAccount.pending, (state) => {
            state.loading = true
        })
        bilder.addCase(singInToAccount.fulfilled, (state) => {
            state.loading = false
        })
    }

})


export const { setToken, setAdmin, removeProfile, setId } = authSlice.actions
export default authSlice.reducer