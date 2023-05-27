import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  characters: [],
  characterSelected: {},
};

const character = createSlice({
  name: "character",
  initialState,
  reducers: {
    insertData: (state, { payload }) => {
      state.characters = payload;
      state.characterSelected = payload[0];
    },
    selectCharacter: (state, { payload }) => {
      state.characterSelected = payload;
    },
  },
});

export const { insertData, selectCharacter } = character.actions;
export default character.reducer;
