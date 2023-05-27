import { insertData } from "../slices/characterSlice";

export const getCharacters = (id) => async (dispatch) => {
  return fetch("https://back-renler.onrender.com/api/users/getCharacters/" + id, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((res) => {
      dispatch(insertData(res));
    });
};
