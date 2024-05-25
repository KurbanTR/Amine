import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { arrayUnion, collection, doc, getDoc, updateDoc} from 'firebase/firestore';
import { db } from '../firebaseConfig'


export const usersColectionRef = collection(db, 'users')

export const addAnimes = createAsyncThunk(
  'profile/addAnimes',
  async ({ idUser, newAnime, success, error }, { dispatch }) => {
    const userDocRef = doc(usersColectionRef, idUser);
    const userDocSnap = await getDoc(userDocRef);
    if (userDocSnap.exists()) {
      const existingAnimes = userDocSnap.data().animes || [];
      if (!existingAnimes.some(anime => anime.id === newAnime.id)) {
        await updateDoc(userDocRef, {
          animes: arrayUnion(newAnime)
        });
        dispatch(addAnime(newAnime));
        success()
      }else{
        error()
      }
    }
  }
);


export const addMangas = createAsyncThunk(
  'profile/addMangas',
  async ({ idUser, newManga, success, error }, { dispatch }) => {
    const userDocRef = doc(usersColectionRef, idUser);
    const userDocSnap = await getDoc(userDocRef);
    if (userDocSnap.exists()) {
      const existingMangas = userDocSnap.data().mangas || [];
      if (!existingMangas.some(manga => manga.id === newManga.id)) {
        await updateDoc(userDocRef, {
          mangas: arrayUnion(newManga)
        });
        dispatch(addManga(newManga));
        success()
      }else{
        error()
      }
    }
  }
);

export const removeAnime = createAsyncThunk(
  'profile/removeAnime',
  async ({ idUser, animeId }, { dispatch }) => {
    const userDocRef = doc(usersColectionRef, idUser);
    const userDocSnap = await getDoc(userDocRef);
    
    if (userDocSnap.exists()) {
      const userData = userDocSnap.data();
      const updatedAnimes = userData.animes.filter(anime => anime.id !== animeId);

      await updateDoc(userDocRef, {
        animes: updatedAnimes
      });

      dispatch(deleteAnime(animeId))
    } else {
      throw new Error('User document does not exist');
    }
  }
);

export const removeManga = createAsyncThunk(
  'profile/removeManga',
  async ({ idUser, mangaId }, { dispatch }) => {
    const userDocRef = doc(usersColectionRef, idUser);
    const userDocSnap = await getDoc(userDocRef);
    
    if (userDocSnap.exists()) {
      const userData = userDocSnap.data();
      const updatedMangas = userData.mangas.filter(manga => manga.id !== mangaId);

      await updateDoc(userDocRef, {
        mangas: updatedMangas
      });

      dispatch(deleteManga(mangaId))
    } else {
      throw new Error('User document does not exist');
    }
  }
);

const profileSlice = createSlice({
  name: 'profile',
  initialState: {
    mangas: [],
    animes: [],
    data: null
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
    setData(state, actions){
      state.data = actions.payload
    },
    deleteAnime(state, action) {
      state.animes = state.animes.filter(anime => anime.id !== action.payload);
    },
    deleteManga(state, action) {
      state.mangas = state.mangas.filter(manga => manga.id !== action.payload);
    }
  },
});

export const { setMangas, setAnimes, addAnime, addManga, setData, deleteAnime, deleteManga } = profileSlice.actions;
export default profileSlice.reducer;
