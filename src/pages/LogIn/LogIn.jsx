import { useState } from "react";
import Banner from "../../components/Banner/Banner";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginAction } from "../../redux/actions/logedUserActions";
import Google from "../../components/Google/Google";
import { NotificationManager } from "react-notifications";

export default function LogIn() {
  const [state, setState] = useState({ email: { ok: null }, password: { ok: null } });
  const dispatch = useDispatch();

  function changeEmail(e) {
    //eslint-disable-next-line
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(e.target.value)) setState({ ...state, email: { value: e.target.value, ok: true } });
    else setState({ ...state, email: { value: "email_no_valido", ok: false } });
  }

  function changePassword(e) {
    if (/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{8,32}$/.test(e.target.value)) setState({ ...state, password: { ok: true, value: e.target.value } });
    else setState({ ...state, password: { ok: false, value: e.target.value } });
  }

  async function handleLogIn() {
    const a = await dispatch(loginAction({ email: state.email.value, password: state.password.value }));
    if (a === "email") {
      setState({ ...state, email: { ...state.email, ok: false } });
      createNotification("email");
    } else {
      setState({ ...state, password: { ...state.password, ok: false } });
      createNotification("password");
    }
  }

  const createNotification = (type) => {
    switch (type) {
      case "email":
        NotificationManager.error("Email No existe");
        break;
      case "password":
        NotificationManager.error("Contraseña Incorrecta");
        break;
      default:
        break;
    }
  };

  return (
    <div id="register_big_box">
      <div id="formulario_registro">
        <Banner />
        <h1 id="titulo_registro">Iniciar sesión</h1>
        <div className="box_input_registro">
          <label className={state.email.ok ? "labelinputsregistro_green" : state.email.ok === null ? "labelinputsregistro" : "labelinputsregistro_red"}>Email</label>
          <input type="email" className={state.email.ok ? "inputregister_green" : state.email.ok === null ? "inputregister" : "inputregister_red"} onChange={(e) => changeEmail(e)}></input>
        </div>
        <div className="box_input_registro">
          <label className={state.password.ok ? "labelinputsregistro_green" : state.password.ok === null ? "labelinputsregistro" : "labelinputsregistro_red"}>Contraseña</label>
          <input type="password" className={state.password.ok ? "inputregister_green" : state.password.ok === null ? "inputregister" : "inputregister_red"} onChange={(e) => changePassword(e)}></input>
        </div>
        <div id="register_botones">
          <button id="register_crear_cuenta" onClick={() => handleLogIn()}>
            Ingresar
          </button>

          <Google />

          <Link to="/registrarse" id="tengo_cuenta">
            Registrarme
          </Link>
        </div>

        <div className="copyright">©2023 Renler</div>
      </div>
    </div>
  );
}
