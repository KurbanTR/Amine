import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { arrayUnion, collection, doc, getDoc, getDocs, updateDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig';

export const messagesCollectionRef = collection(db, 'messages');
export const usersColectionRef = collection(db, 'users')

export const fetchChats = createAsyncThunk(
  'messages/fetchChats',
  async () => {
    const usersSnapshot = await getDocs(messagesCollectionRef);
    const usersList = usersSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    return usersList;
  }
);

export const fetchAdmin = createAsyncThunk(
  'messages/fetchAdmin',
  async ({id}, {dispatch}) => {
    const usersSnapshot = await getDocs(messagesCollectionRef);
    const usersList = usersSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    const users = usersList.filter(chat=>chat.id == id)
    dispatch(setAdmin(users?.[0]?.isAdmin))
  }
);

export const fetchMessages = createAsyncThunk(
  'messages/fetchMessages',
  async ({ idUser }) => {
    const userDocRef = doc(messagesCollectionRef, idUser);
    const userDocSnap = await getDoc(userDocRef);
    const Messages = userDocSnap.data().messages || [];
    return Messages
    }
);

export const setRead = createAsyncThunk(
  'messages/setRead',
  async ({ ids, idUser }) => {
    const userDocRef = doc(messagesCollectionRef, idUser);
    const userDocSnap = await getDoc(userDocRef);

    if (userDocSnap.exists()) {
      const messages = userDocSnap.data().messages;
      const updatedMessages = messages.map(message =>
        ids.includes(message.id) ? { ...message, read: true } : message
      );
      await updateDoc(userDocRef, { messages: updatedMessages });
    }
  }
);


export const addMessages = createAsyncThunk(
  'messages/addMessages',
  async ({ id, newMessage }, { dispatch }) => {
    const userDocRef = doc(messagesCollectionRef, id);
    const userDocSnap = await getDoc(userDocRef);
    
    if (userDocSnap.exists()) {
      const existingMessages = userDocSnap.data().messages || [];
      if (!existingMessages.some(message => message.id === newMessage.id)) {
        await updateDoc(userDocRef, {
          messages: arrayUnion(newMessage),
          lastMessage: newMessage
        });
        dispatch(addMessage(newMessage));
      }
    }
  }
);

export const removeMessages = createAsyncThunk(
  'messages/removeMessages',
  async ({ idUser, messageId }, { dispatch }) => {
    const userDocRef = doc(messagesCollectionRef, idUser);
    const userDocSnap = await getDoc(userDocRef);
    
    if (userDocSnap.exists()) {
      const userData = userDocSnap.data();
      const updatedMessages = userData.messages.filter(message => message.id !== messageId);

      await updateDoc(userDocRef, {
        messages: updatedMessages,
        lastMessage: updatedMessages[updatedMessages.length - 1]
      });

      dispatch(deleteMessage(messageId));
    } else {
      throw new Error('User document does not exist');
    }
  }
);

export const getDefineChats = createAsyncThunk(
  'user/getDefineUser',
  async({id}) => {
      try{
          const defineUserDocRef = doc(usersColectionRef, id)
          const defineUser = await getDoc(defineUserDocRef)
          const userData = defineUser.data()
          return userData
      } catch(error){
          console.error(error.message);
      }
  }
)

const messagesSlice = createSlice({
  name: 'messages',
  initialState: {
    messages: [],
    data: null,
    chats: [],
    status: null,
    isAdmin: false,
  },
  reducers: {
    setMessages(state, action) {
      state.messages = action.payload;
    },
    addMessage(state, action) {
      state.messages.push(action.payload);
    },
    deleteMessage(state, action) {
      state.messages = state.messages.filter(message => message.id !== action.payload);
    },
    setAdmin(state, action) {
      state.isAdmin = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchChats.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchChats.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.chats = action.payload;
      })
      .addCase(fetchMessages.fulfilled, (state, action) => {
        state.messages = action.payload;
      })
      .addCase(getDefineChats.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getDefineChats.fulfilled, (state, action) => {
        state.data = action.payload;
        state.status = 'succeeded';
      })
  }
});

export const { setData, setMessages, addMessage, deleteMessage, setAdmin } = messagesSlice.actions;
export default messagesSlice.reducer;
