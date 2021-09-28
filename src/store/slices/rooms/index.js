import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import db from "../../../firebase";


const initialState = {
    rooms: [],
    messages: [],
    loading: false,
    roomId: '',
    errorMessage: '',
}

//async actions
export const fetchRooms = createAsyncThunk(
    'fetchRooms/roomsSlice',
    async (_, {dispatch}) => {
        let roomsArr = [];

        db.collection('rooms').onSnapshot(snapshot => {
            roomsArr = snapshot.docs.map(doc => ({
                id: doc.id,
                data: doc.data()
            }));
            dispatch(setRooms(roomsArr));
        })
    }
)
export const addRoom = createAsyncThunk(
    'addRoom/roomsSlice',
    async (value, {dispatch}) => {
        await db.collection('rooms').add({name: value});
        dispatch(fetchRooms());
    }
)
export const getMessages = createAsyncThunk(
    'getMessages/roomsSlice',
    async (id, {dispatch}) => {
        let messagesArr = [];
        db.collection('rooms').doc(id).collection('messages').orderBy('time', 'asc').onSnapshot(snapshot => {
            messagesArr = snapshot.docs.map(doc => ({
                id: doc.id,
                data: doc.data()
            }));
            dispatch(setMessages(messagesArr));
        });
        dispatch(setCurrentRoom(id))
    }
)
export const setMessage = createAsyncThunk(
    'setMessage/roomsSlice',
    ({roomId, message}) => {
        console.log({roomId, message})
        db.collection('rooms').doc(roomId).collection('messages').add(message)
            .then(res => console.log(res))
            .catch(err => console.log(err))
    }
)


const roomsSlice = createSlice({
    name: 'roomsSlice',
    initialState,

    reducers: {
        setRooms(state, action) {
            state.rooms = action.payload;
        },
        setMessages(state, action) {
            state.messages = action.payload;
        },
        setCurrentRoom(state, action) {
            state.roomId = action.payload;
        }
    },
})

export default roomsSlice.reducer;
export const {setRooms, setMessages, setCurrentRoom} = roomsSlice.actions;