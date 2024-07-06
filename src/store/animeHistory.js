import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { collection, doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig';

export const historyCollectionRef = collection(db, 'animeHistory');

export const fetchAnimes = createAsyncThunk(
    'histori/fetchAnimes',
    async ({ idUser }) => {
        const historyDocRef = doc(historyCollectionRef, idUser);
        const historyDocSnap = await getDoc(historyDocRef);
        const animeHistori = historyDocSnap.data().animeHistori || [];
        return animeHistori.reverse();
    }
);

export const postAnime = createAsyncThunk(
    'history/postAnime',
    async ({ id, newAnime }, { dispatch }) => {
        if (!newAnime?.time) return;

        const historyDocRef = doc(historyCollectionRef, id);
        const historyDocSnap = await getDoc(historyDocRef);

        let animeHistori = [];

        if (historyDocSnap.exists()) {
            animeHistori = historyDocSnap.data().animeHistori || [];
            animeHistori = animeHistori.filter(anime => anime.animeId !== newAnime.animeId);
        }
        animeHistori.push(newAnime);
        await setDoc(historyDocRef, { animeHistori });
        dispatch(setAnimeHistory(animeHistori));
    }
);

const animeHistory = createSlice({
    name: 'histori',
    initialState: {
        animes: [],
        animeHistory: null,
        loading: false,
        error: null,
    },
    reducers: {
        setAnimeHistory(state, action) {
            state.animeHistory = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchAnimes.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(fetchAnimes.fulfilled, (state, action) => {
            state.loading = false;
            state.animes = action.payload;
        });
        builder.addCase(fetchAnimes.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        });
    }
});

export const { setAnimeHistory } = animeHistory.actions;
export default animeHistory.reducer;