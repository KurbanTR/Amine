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
        success('Add to favorite')
      }else{
        error('This anime is already in favorites')
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

const profileSlice = createSlice({
  name: 'profile',
  initialState: {
    animes: [],
    data: JSON.parse(localStorage.getItem('profileData')),
    profile: null,
  },
  reducers: {
    setAnimes(state, actions) {
      state.animes = actions.payload
    },
    addAnime(state, actions){
      state.animes.unshift(actions.payload)
    },
    setData(state, actions){
      state.data = actions.payload
    },
    setProfile(state, action){
      state.profile = action.payload
    },
    deleteAnime(state, action) {
      state.animes = state.animes.filter(anime => anime.id !== action.payload);
    },
  },
});

export const {setProfile, setMangas, setAnimes, addAnime, addManga, setData, deleteAnime, deleteManga } = profileSlice.actions;
export default profileSlice.reducer;
