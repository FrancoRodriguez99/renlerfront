import "./App.css";
import Home from "./pages/Home/Home";
import { Route, Routes } from "react-router-dom";
import NavBar from "./components/NavBar/NavBar";
import Login from "./pages/LogIn/LogIn";
import Register from "./pages/Register/Register";
import Personajes from "./pages/Personajes/Personajes";
import { useDispatch, useSelector } from "react-redux";
import { logIn } from "./redux/slices/userLogedSlice";
import { useEffect } from "react";
import Mapa from "./pages/Mapa/Mapa";
import MapaCastillo from "./pages/MapaCastillo/MapaCastillo";
import Crear from "./pages/Crear/Crear";
import Habitaciones from "./pages/Habitaciones/Habitaciones";
import CrearEdificio from "./pages/CrearEdificio/CrearEdificio";
import Edificios from "./pages/Edificios/Edificios";

function App() {
  const userLoged = useSelector((state) => state.userLoged);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!userLoged.loged) {
      const userLocal = JSON.parse(window.localStorage.getItem("user"));
      if (userLocal !== null) {
        dispatch(logIn(userLocal));
      }
    }
  }, [userLoged, dispatch]);

  if (userLoged.loged)
    return (
      <>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/ingresar" element={<Home />}></Route>
          <Route path="/registrarse" element={<Home />}></Route>
          <Route path="/personajes" element={<Personajes />}></Route>
          <Route path="/mapa" element={<Mapa />}></Route>
          <Route path="/mapaCastillo" element={<MapaCastillo />}></Route>
          <Route path="/crear" element={<Crear />}></Route>
          <Route path="/habitaciones" element={<Habitaciones />}></Route>
          <Route path="/edificios" element={<Edificios />}></Route>
          <Route path="/crearEdificio" element={<CrearEdificio />}></Route>
        </Routes>
      </>
    );
  else
    return (
      <>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/ingresar" element={<Login />}></Route>
          <Route path="/registrarse" element={<Register />}></Route>
          <Route path="/mapaCastillo" element={<MapaCastillo />}></Route>
          <Route path="/crear" element={<Crear />}></Route>
          <Route path="/habitaciones" element={<Habitaciones />}></Route>
          <Route path="/edificios" element={<Edificios />}></Route>
          <Route path="/crearEdificio" element={<CrearEdificio />}></Route>
        </Routes>
      </>
    );
}

export default App;
