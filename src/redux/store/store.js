import { configureStore } from "@reduxjs/toolkit";
import userLoged from "../slices/userLogedSlice";
import loading from "../slices/loadingSlice";
import menuAcciones from "../slices/menuAccionesSlice";
import claim from "../slices/claimSlice";
import egdm from "../slices/egdmSlice";
import character from "../slices/characterSlice";

export default configureStore({
  reducer: {
    userLoged,
    claim,
    loading,
    menuAcciones,
    egdm,
    character,
  },
});
