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
    fabricacion: (state, { payload }) => {
      state.menu = "fabricacion";
    },
  },
});

export const { downtime, fabricacion } = menuAcciones.actions;
export default menuAcciones.reducer;
