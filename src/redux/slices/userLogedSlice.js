import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loged: false,
  name: "",
  email: "",
  avatar: "",
  token: "",
  _id: "",
  selectedAddres: "",
  direccion: "",
};

const userLoged = createSlice({
  name: "userLoged",
  initialState,
  reducers: {
    logIn: (state, { payload }) => {
      if (payload._id) {
        state.loged = true;
        state.name = payload.name;
        state.email = payload.email;
        state.avatar = payload.avatar;
        state.token = payload.token;
        state._id = payload._id;
        state.selectedAddres = payload.selectAddres;
        localStorage.setItem("user", JSON.stringify(state));
      }
    },
    logOut: (state) => {
      state.loged = false;
      state.name = "";
      state.email = "";
      state.avatar = "";
      state.token = "";
      state._id = "";
      state.selectedAddres = "";
      localStorage.removeItem("user");
    },
    selectAddres: (state, { payload }) => {
      state.selectedAddres = payload.id;
      state.direccion = payload.title;
      localStorage.setItem("user", JSON.stringify(state));
    },
  },
});

export const { logIn, logOut, selectAddres } = userLoged.actions;
export default userLoged.reducer;
