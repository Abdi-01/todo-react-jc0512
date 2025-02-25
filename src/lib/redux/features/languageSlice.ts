import { createSlice } from "@reduxjs/toolkit";

interface ILanguageState {
  value: string;
}

const initialState: ILanguageState = {
  value: "en",
};

export const languageSlice = createSlice({
  name: "language",
  initialState,
  reducers: {
    // define object methode for modify data in reducer store
    setEnglish: (state) => {
      state.value = "en";
    },
    setIndonesian: (state) => {
      state.value = "id";
    },
  },
});

// slice menghasilkan dua fungsi utama yaitu fungsi ACTION dan REDUCER
// bagian fungsi ACTION
export const { setEnglish, setIndonesian } = languageSlice.actions;

// fungsi REDUCER
export default languageSlice.reducer;
