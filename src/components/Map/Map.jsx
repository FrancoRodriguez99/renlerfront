import { MapContainer, ImageOverlay, Marker, Popup } from "react-leaflet";
import image from "./assets/Render_1.png";
import "leaflet/dist/leaflet.css";
import "./App.css";

function App() {
  const mapMinLat = -90;
  const mapMinLng = -180;
  const mapMaxLat = 90;
  const mapMaxLng = 180;
  const position = [51.505, -0.09];
  return (
    <div id="contenedor">
      <div id="contenedor_mapa">
        <MapContainer
          center={[0, 0]} // Set the initial center of the map
          zoom={1} // Set the initial zoom level
          minZoom={1} // Set the minimum allowed zoom level
          maxZoom={10} // Set the maximum allowed zoom level
          maxBounds={[
            [-90, -180],
            [90, 180],
          ]} // Set the bounds of the map
          style={{ width: "100%", height: "500px" }} // Set the size of the map container
        >
          <ImageOverlay
            url={image}
            bounds={[
              [mapMinLat, mapMinLng],
              [mapMaxLat, mapMaxLng],
            ]}
          />
          <Marker position={position}>
            <Popup>
              A pretty CSS3 popup. <br /> Easily customizable.
            </Popup>
          </Marker>
        </MapContainer>
      </div>
    </div>
  );
}

export default App;
