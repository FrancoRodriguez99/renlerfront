import { MapContainer, ImageOverlay } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { CRS } from "leaflet";
import GridOverlay from "../../components/GridOverlay/GridOverlay";
import pasto from "../../assets/grass.jpg";
import "./MapaCastillo.css";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loading, notLoading } from "../../redux/slices/loadingSlice";
import MenuAcciones from "../../components/MenuAcciones/MenuAcciones";

const MapaCastillo = () => {
  const [conjuntoCreado, setConjuntoCreado] = useState([]);
  const [data, setData] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loading());
    fetch("https://back-renler.onrender.com/api/build/getMap", { method: "GET" })
      .then((x) => x.json())
      .then((d) => {
        setData(d);
        dispatch(notLoading());
      });
  }, [dispatch]);

  return (
    <div id="mapa_castillo_box_general">
      <MenuAcciones />
      <div id="mapa_leaflet">
        <MapContainer crs={CRS.Simple} zoomControl={false} center={[300, 300]} zoom={2} style={{ width: "100%", height: "100%" }} minZoom={-1} maxZoom={5}>
          <ImageOverlay
            url={pasto}
            bounds={[
              [0, 0],
              [600, 600],
            ]}
          />
        </MapContainer>
      </div>
    </div>
  );
};

export default MapaCastillo;

/*
{data.map((x) => (
            <GridOverlay x={x} key={x._id} creando={false} conjuntoCreado={conjuntoCreado} setConjuntoCreado={setConjuntoCreado} />
          ))}
          */
