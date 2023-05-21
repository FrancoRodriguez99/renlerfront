import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  menu: "downtime",
  mapa: "castillo",
};

const menuAcciones = createSlice({
  name: "menuAcciones",
  initialState,
  reducers: {
    downtime: (state) => {
      state.menu = "downtime";
    },
    mapa: (state, { payload }) => {
      state.mapa = payload;
    },
  },
});

export const { downtime, mapa } = menuAcciones.actions;
export default menuAcciones.reducer;
