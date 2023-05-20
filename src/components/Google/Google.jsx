import { GoogleLogin } from "@react-oauth/google";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { loginGoogle } from "../../redux/actions/logedUserActions";
import "./Google.css";

export default function Google() {
  const [user, setUser] = useState(null);
  const dispatch = useDispatch();

  const responseMessage = (response) => {
    var base64Url = response.credential.split(".")[1];
    var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    var jsonPayload = decodeURIComponent(
      window
        .atob(base64)
        .split("")
        .map(function (c) {
          return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join("")
    );

    setUser(JSON.parse(jsonPayload));
  };

  const errorMessage = (error) => {
    console.log(error);
  };

  useEffect(() => {
    if (user) dispatch(loginGoogle(user));
  }, [user, dispatch]);
  return (
    <div id="google_login">
      <GoogleLogin onSuccess={responseMessage} onError={errorMessage} />{" "}
    </div>
  );
}
