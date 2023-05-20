import { MapContainer, ImageOverlay } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { CRS } from "leaflet";
import GridOverlay from "../../components/GridOverlay/GridOverlay";

import pasto from "../../assets/grass.jpg";
import "./MapaCastillo.css";
import { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";

const MapaCastillo = () => {
  const [creando, setCreando] = useState(false);
  const [conjuntoCreado, setConjuntoCreado] = useState([]);
  const [data, setData] = useState([]);
  const [titleClaim, setTitleClaim] = useState("Titulo Area");

  const User = useSelector((state) => state.userLoged._id);

  useEffect(() => {
    fetch("https://back-renler.onrender.com/api/build/getMap", { method: "GET" })
      .then((x) => x.json())
      .then((d) => setData(d));
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

  return (
    <div id="mapa_castillo_box_general">
      <div id="options_mapa">
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
      </div>
      <div id="mapa_leaflet">
        <MapContainer crs={CRS.Simple} zoomControl={false} center={[300, 300]} zoom={2} style={{ width: "100%", height: "100%" }} minZoom={-1} maxZoom={5}>
          <ImageOverlay
            url={pasto}
            bounds={[
              [0, 0],
              [600, 600],
            ]}
          />
          {data.map((x) => (
            <GridOverlay x={x} key={x._id} creando={creando} conjuntoCreado={conjuntoCreado} setConjuntoCreado={setConjuntoCreado} />
          ))}
        </MapContainer>
      </div>
    </div>
  );
};

export default MapaCastillo;
