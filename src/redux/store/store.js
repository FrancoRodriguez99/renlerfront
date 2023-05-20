import { configureStore } from "@reduxjs/toolkit";
import userLoged from "../slices/userLogedSlice";

export default configureStore({
  reducer: {
    userLoged,
  },
});
