import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {auth, provider} from "../../../firebase";


const initialState = {
    user: {},
    loading: false,
    errorMessage: '',
}

//async actions
export const signIn = createAsyncThunk(
    'authSlice/signIn',
    async (_, {dispatch}) => {
        const data = await auth.signInWithPopup(provider);
        dispatch(setUser(data.user));
    }
)
export const signOut = createAsyncThunk(
    'authSlice/signIn',
    async (_, {dispatch}) => {
        await auth.signOut();
        dispatch(setUser({}));
    }
)
export const authChecking = createAsyncThunk(
    'authSlice/authChecking',
     (_, {dispatch}) => {
        let user = JSON.parse(localStorage.getItem('user') || "{}");
        dispatch(setUser(user));
         // auth.onAuthStateChanged((user) => {
         //     if (user) {
         //         dispatch(setUser(auth.currentUser));
         //     }
         // })
    }
)

const authSlice = createSlice({
    name: 'auth',
    initialState,

    reducers: {
        setUser(state, action) {
            localStorage.setItem('user', JSON.stringify(action.payload));
            state.user = action.payload;
        }
    }
})

export default authSlice.reducer;
export const {setUser} = authSlice.actions;