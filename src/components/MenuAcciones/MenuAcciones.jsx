import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadingMenu, notLoadingMenu } from "../../redux/slices/loadingSlice";

export default function MenuAcciones() {
  const menu = useSelector((state) => state.menuAcciones.menu);

  const [titleClaim, setTitleClaim] = useState("Titulo Area");
  const User = useSelector((state) => state.userLoged._id);
  const [creando, setCreando] = useState(false);
  const [conjuntoCreado, setConjuntoCreado] = useState([]);
  const dispatch = useDispatch();
  const [resources, setResources] = useState({ habitaciones: [], edificios: [], recursos: [] });

  useEffect(() => {
    dispatch(loadingMenu());
    fetch(`https://back-renler.onrender.com/api/admin/all`, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((d) => setResources(d))
      .catch((e) => console.log(e));
    dispatch(notLoadingMenu());
  }, []);

  function handleTitleClaim(e) {
    setTitleClaim(e.target.value);
  }

  function handleCrear() {
    setCreando(!creando);
    if (creando)
      fetch("https://back-renler.onrender.com/api/build/claim", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: titleClaim,
          cuadrados: conjuntoCreado,
          User,
        }),
      })
        .then((x) => x.json())
        .then((d) => console.log(d));
  }

  console.log();

  if (menu === "downtime")
    return (
      <div id="options_mapa">
        <div>
          <div>Construcción</div>
          <div>Fabricación</div>
          <div>Empleados</div>
        </div>
        <div>
          <input></input>
          <button>Lista Completa</button>
        </div>
        <img alt="asd" />
        <div>Una institucion de educación mayor</div>
      </div>
    );
}

/*
Crear Nuevo Area
        <button onClick={() => handleCrear()}>{creando ? "Guardar" : "Crear"}</button>
        {creando ? (
          <>
            <input type="text" onChange={(e) => handleTitleClaim(e)} value={titleClaim}></input>{" "}
            <button
              onClick={() => {
                setConjuntoCreado([]);
                setTitleClaim("Titulo Area");
                setCreando(false);
              }}
            >
              Cancelar
            </button>
          </>
        ) : null}
        */
