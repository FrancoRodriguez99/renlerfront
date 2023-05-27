//Si sos un programador viendo como funciona el codigo... Ignora esto diagmos que no ayuda en la web y podria ser obviado.

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  trigger: false,
};

const egdm = createSlice({
  name: "egdm",
  initialState,
  reducers: {
    trigger: (state, { payload }) => {
      state.trigger = payload;
    },
  },
});

export const { trigger } = egdm.actions;
export default egdm.reducer;
