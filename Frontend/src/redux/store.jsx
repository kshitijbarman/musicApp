import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "./themeSlice";  
import searchSlice from './searchSlice'
import signupDatasclice from './signupDataSlice'
import likedSong from './likeSlice';

const store = configureStore({
  reducer: {
    theme: themeReducer,  
    search: searchSlice,
    data:signupDatasclice,
    like:likedSong,
  },
});

export default store;
