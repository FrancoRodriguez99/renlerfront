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
import FlapsOptionsMaps from "../../components/FlapsOptionsMap/FlapsOptionsMap";

const MapaCastillo = () => {
  const [data, setData] = useState([]);
  const dispatch = useDispatch();
  const reload = useSelector((state) => state.claim.reload);

  useEffect(() => {
    dispatch(loading());
    fetch("http://192.168.1.124:9000/api/build/getMap", { method: "GET" })
      .then((x) => x.json())
      .then((d) => {
        setData(d);
        dispatch(notLoading());
      });
  }, [dispatch, reload]);

  return (
    <div id="mapa_castillo_box_general">
      <div id="genova_suggestion">
        <FlapsOptionsMaps />
        <MenuAcciones />
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

          {data.map((x, i) => (
            <GridOverlay
              x={x}
              key={x._id}
              derecha={x.coordenadas[0][1] !== 590 ? data[i + 1]._id : "false"}
              izquierda={x.coordenadas[0][1] !== 0 ? data[i - 1]._id : "false"}
              abajo={x.coordenadas[0][0] !== 0 ? data[i - 60]._id : "false"}
              arriba={x.coordenadas[0][0] !== 590 ? data[i + 60]._id : "false"}
            />
          ))}
        </MapContainer>
      </div>
    </div>
  );
};

export default MapaCastillo;
