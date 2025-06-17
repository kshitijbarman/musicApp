import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  darkMode: true,  // Initial theme state
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.darkMode = !state.darkMode;  // Toggle dark mode
    },
  },
});

export const { toggleTheme } = themeSlice.actions;  // Export action
export default themeSlice.reducer;  // Export reducer
