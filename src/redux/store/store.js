import { configureStore } from "@reduxjs/toolkit";
import userLoged from "../slices/userLogedSlice";
import loading from "../slices/loadingSlice";
import menuAcciones from "../slices/menuAccionesSlice";

export default configureStore({
  reducer: {
    userLoged,
    loading,
    menuAcciones,
  },
});
