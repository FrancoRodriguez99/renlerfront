import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  loadingmenu: false,
};

const loadScreen = createSlice({
  name: "loading",
  initialState,
  reducers: {
    loading: (state) => {
      state.loading = true;
    },
    notLoading: (state) => {
      state.loading = false;
    },
    loadingMenu: (state) => {
      state.loadingmenu = true;
    },
    notLoadingMenu: (state) => {
      state.loadingmenu = false;
    },
  },
});

export const { loading, notLoading, notLoadingMenu, loadingMenu } = loadScreen.actions;
export default loadScreen.reducer;
