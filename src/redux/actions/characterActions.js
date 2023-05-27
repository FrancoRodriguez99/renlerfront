import { insertData } from "../slices/characterSlice";

export const getCharacters = (id) => async (dispatch) => {
  return fetch("http://192.168.1.124:9000/api/users/getCharacters/" + id, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((res) => {
      dispatch(insertData(res));
    });
};
