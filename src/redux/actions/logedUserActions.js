import { logIn } from "../slices/userLogedSlice";

export const loginAction = (data) => async (dispatch) => {
  return fetch(`http://192.168.1.124:9000/api/users/signIn`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: data.email,
      password: data.password,
    }),
  })
    .then((response) => response.json())
    .then((d) => {
      console.log(d);
      if (d.message === "ok") dispatch(logIn(d.data.u));
      else return d.message;
    })
    .catch((e) => e);
};

export const loginGoogle = (data) => async (dispatch) => {
  return fetch(`http://192.168.1.124:9000/api/users/googleLogIn`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: data.email,
      avatar: data.picture,
      name: data.name,
      password: data.sub,
    }),
  })
    .then((response) => response.json())
    .then((d) => {
      dispatch(logIn(d.data.u));
    })
    .catch((e) => e);
};
