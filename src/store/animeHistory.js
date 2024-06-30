import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { collection, doc, getDoc, updateDoc } from 'firebase/firestore';
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
        const historyDocRef = doc(historyCollectionRef, id);
        const historyDocSnap = await getDoc(historyDocRef);

        if (newAnime?.time && historyDocSnap.exists()) {
            let animeHistori = historyDocSnap.data().animeHistori;

            // Удаляем старое аниме, если оно уже существует
            animeHistori = animeHistori.filter(anime => anime.animeId !== newAnime.animeId);
            
            // Добавляем новое аниме в конец
            animeHistori.push(newAnime);

            await updateDoc(historyDocRef, { animeHistori });
            dispatch(setAnimeHistory(animeHistori));
        }
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