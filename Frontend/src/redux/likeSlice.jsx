
import { createSlice } from "@reduxjs/toolkit";

const likedSong = createSlice({
    name: "like",  // 🔹 Keep name as "like" so it matches useSelector(state.like)
    initialState: { liked: [] },  // 🔹 Changed from an array to an object
    reducers: {
       

        addToPlaylist(state, action) {
            const songExists = state.liked.some(song => song.id === action.payload.id);
            if (!songExists) {
                state.liked.push(action.payload);
            }
        },
        
        removeFromPlaylist(state, action) {
            state.liked = state.liked.filter(song => song.id !== action.payload);
        },
        removeAll(state,action){
            state.liked = [];
        }
    }
});

export default likedSong.reducer;
export const { addToPlaylist, removeFromPlaylist, removeAll} = likedSong.actions;
