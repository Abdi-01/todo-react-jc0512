import { configureStore } from "@reduxjs/toolkit";
import languageReducer from "@/lib/redux/features/languageSlice";
export const store = configureStore({
  reducer: {
    // define reducer config here
    languageState: languageReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>; // untuk mendefinisikan struktur data yang tersimpan pada redux
export type AppDispatch = typeof store.dispatch; // untuk mendefinisikan struktur data apa yang disimpan pada reducer store redux
