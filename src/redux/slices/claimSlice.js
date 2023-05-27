import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  building: false,
  conjuntoEnCreacion: [],
  habitacion: {},
  edificio: {},
  alreadyClaimed: [],
  triggerReload: false,
  fromDatabase: false,
};

const claim = createSlice({
  name: "claim",
  initialState,
  reducers: {
    buildingState: (state) => {
      state.building = !state.building;
    },
    modificarConjuntoEnCreacion: (state, { payload }) => {
      state.conjuntoEnCreacion = payload;
    },
    habitacionEnEdicion: (state, { payload }) => {
      state.habitacion = payload;
      state.building = true;
      state.conjuntoEnCreacion = [];
      if (state.alreadyClaimed.filter((x) => x.room.id._id === payload.id._id && x.room.copia === payload.copia).length > 0) {
        state.building = false;
      }
    },
    edificioEnEdicion: (state, { payload }) => {
      if (state?.edificio?._id === payload?._id) return;
      state.edificio = payload;
      state.conjuntoEnCreacion = [];
      state.alreadyClaimed = [];
    },
    deleteAll: (state, { payload }) => {
      state.building = true;
      state.conjuntoEnCreacion = [];
      state.habitacion = payload?.habitacion;
      state.edificio = payload?.edificio || "";
      state.alreadyClaimed = [];
    },

    saveClaim: (state) => {
      state.building = false;
      state.alreadyClaimed = [...state.alreadyClaimed, { room: state.habitacion, coordenadas: state.conjuntoEnCreacion }];
      state.conjuntoEnCreacion = [];
    },
    retryCurrentRoom: (state) => {
      state.building = true;
      state.alreadyClaimed = state.alreadyClaimed.filter((x) => !(x.room.id._id === state.habitacion.id._id && x.room.copia === state.habitacion.copia));
    },
  },
});

export const { buildingState, modificarConjuntoEnCreacion, habitacionEnEdicion, edificioEnEdicion, deleteAll, saveClaim, retryCurrentRoom } = claim.actions;
export default claim.reducer;
