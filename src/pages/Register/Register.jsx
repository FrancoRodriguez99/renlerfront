import { useEffect, useState } from "react";
import Banner from "../../components/Banner/Banner";
import "./Register.css";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginAction } from "../../redux/actions/logedUserActions";
import Google from "../../components/Google/Google";
import { NotificationManager } from "react-notifications";

export default function Register() {
  const [state, setState] = useState({ name: { ok: null }, email: { ok: null }, password: { ok: null }, checkpassword: { ok: null, value: null } });

  const dispatch = useDispatch();

  const createNotification = (type) => {
    switch (type) {
      case "email":
        NotificationManager.error("Ingrese un email válido");
        break;
      case "password":
        NotificationManager.error("Contraseña Debe contener 1 mayúscula, 1 minúscula, 1 número y ser al menos 8 caracteres de largo");
        break;
      case "coinsiden":
        NotificationManager.error("Las contraseñas no coinciden");
        break;
      case "name":
        NotificationManager.error("Nombre demasiado corto");
        break;
      case "emailexiste":
        NotificationManager.error("El Email ya existe");
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    if (state.password.value !== state.checkpassword.value) setState({ ...state, checkpassword: { ok: false, value: state.checkpassword.value } });
    else setState({ ...state, checkpassword: { ok: true, value: state.checkpassword.value } });
    //eslint-disable-next-line
  }, [state.password.value]);

  function checkName(e) {
    if (e.target.value.length > 3) setState({ ...state, name: { ok: true, value: e.target.value } });
    else setState({ ...state, name: { ok: false, value: "name_no_valido" } });
  }

  function checkEmail(e) {
    //eslint-disable-next-line
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(e.target.value)) setState({ ...state, email: { value: e.target.value, ok: true } });
    else {
      setState({ ...state, email: { value: "email_no_valido", ok: false } });
    }
  }

  function checkPassword(e) {
    if (/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{8,32}$/.test(e.target.value)) setState({ ...state, password: { ok: true, value: e.target.value } });
    else setState({ ...state, password: { ok: false, value: e.target.value } });
  }

  function checkPasswordSimilutd(e) {
    if (e.target.value === state.password.value) setState({ ...state, checkpassword: { ok: true, value: e.target.value } });
    else setState({ ...state, checkpassword: { ok: false, value: e.target.value } });
  }

  function CreateAccountButton() {
    if (state.name.ok === true && state.email.ok === true && state.password.ok === true && state.checkpassword.ok === true)
      return (
        <button id="register_crear_cuenta" onClick={() => createAccount()}>
          Crear Cuenta
        </button>
      );
    else
      return (
        <button
          id="register_crear_cuenta"
          onClick={() => {
            if (!state.password.ok) createNotification("password");
            else if (!state.email.ok) createNotification("email");
            else if (!state.checkpassword.ok) createNotification("coinsiden");
            else createNotification("name");
          }}
        >
          Crear Cuenta
        </button>
      );
  }

  function createAccount() {
    fetch(`http://192.168.1.124:9000/api/users/singUp`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: state.name.value,
        email: state.email.value,
        password: state.password.value,
      }),
    })
      .then((response) => response.json())
      .then((d) => {
        if (d.message === "User created successfully") {
          dispatch(loginAction({ email: state.email.value, password: state.password.value }));
        } else {
          setState({ ...state, email: { value: "email_no_valido", ok: false } });
          createNotification("emailexiste");
        }
      })
      .catch((e) => console.log(e));
  }

  return (
    <div id="register_big_box">
      <Banner />
      <form id="formulario_registro">
        <h1 id="titulo_registro">Registrarme</h1>

        <div className="box_input_registro">
          <label className={state.name.ok ? "labelinputsregistro_green" : state.name.ok === null ? "labelinputsregistro" : "labelinputsregistro_red"}>Nombre y apellido</label>
          <input className={state.name.ok ? "inputregister_green" : state.name.ok === null ? "inputregister" : "inputregister_red"} onChange={(e) => checkName(e)}></input>
        </div>

        <div className="box_input_registro">
          <label className={state.email.ok ? "labelinputsregistro_green" : state.email.ok === null ? "labelinputsregistro" : "labelinputsregistro_red"}>Email</label>
          <input type="email" className={state.email.ok ? "inputregister_green" : state.email.ok === null ? "inputregister" : "inputregister_red"} onChange={(e) => checkEmail(e)}></input>
        </div>

        <div className="box_input_registro">
          <label className={state.password.ok ? "labelinputsregistro_green" : state.password.ok === null ? "labelinputsregistro" : "labelinputsregistro_red"}>Contraseña</label>
          <input type="password" className={state.password.ok ? "inputregister_green" : state.password.ok === null ? "inputregister" : "inputregister_red"} onChange={(e) => checkPassword(e)}></input>
        </div>

        <div className="box_input_registro">
          <label className={state.checkpassword.ok ? "labelinputsregistro_green" : state.checkpassword.ok === null ? "labelinputsregistro" : "labelinputsregistro_red"}>Repetir Contraseña</label>
          <input type="password" className={state.checkpassword.ok ? "inputregister_green" : state.checkpassword.ok === null ? "inputregister" : "inputregister_red"} onChange={(e) => checkPasswordSimilutd(e)}></input>
        </div>
      </form>
      <div id="register_botones">
        {CreateAccountButton()}

        <Google />

        <Link to="/login" id="tengo_cuenta">
          Tengo Cuenta
        </Link>
      </div>

      <div className="copyright">©2023 Lo de walter</div>
    </div>
  );
}
