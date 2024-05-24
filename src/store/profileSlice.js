import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { arrayUnion, collection, doc, getDoc, updateDoc} from 'firebase/firestore';
import { db } from '../firebaseConfig'

export const usersColectionRef = collection(db, 'users')

export const fetchAnimes = createAsyncThunk(
  'profile/fetchAnimes',
  async ({idUser}, { dispatch }) => {
    const userDocRef = doc(usersColectionRef, idUser);
    const docSnap = await getDoc(userDocRef);
    const animes = docSnap.data().animes;
    dispatch(setAnimes(animes))
  }
)

export const fetchMangas = createAsyncThunk(
  'profile/fetchMangas',
  async ({idUser}, { dispatch }) => {
    const userDocRef = doc(usersColectionRef, idUser);
    const docSnap = await getDoc(userDocRef);
    const mangas = docSnap.data().mangas;
    dispatch(setMangas(mangas))
  }
)

export const addAnimes = createAsyncThunk(
    'profile/addAnimes',
    async ({ idUser, newAnime }, { dispatch }) => {
      const userDocRef = doc(usersColectionRef, idUser);
      await updateDoc(userDocRef, {
        animes: arrayUnion(newAnime)
      });
      dispatch(addAnime(newAnime))
    }
)

export const addMangas = createAsyncThunk(
    'profile/addMangas',
    async ({ idUser, newManga }, { dispatch }) => {
      const userDocRef = doc(usersColectionRef, idUser);
      await updateDoc(userDocRef, {
        mangas: arrayUnion(newManga)
      });
      dispatch(addManga(newManga))
    }
)

const profileSlice = createSlice({
  name: 'profile',
  initialState: {
    mangas: [],
    animes: [],
  },
  reducers: {
    setAnimes(state, actions) {
      state.animes = actions.payload
    },
    setMangas(state, actions) {
      state.mangas = actions.payload
    },
    addAnime(state, actions){
      state.animes.push(actions.payload)
    },
    addManga(state, actions){
      state.mangas.push(actions.payload)
    },
  },
});

export const { setMangas, setAnimes, addAnime, addManga } = profileSlice.actions;
export default profileSlice.reducer;
