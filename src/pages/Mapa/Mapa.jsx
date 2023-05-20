import { MapContainer, ImageOverlay, Marker, Popup } from "react-leaflet";
import image from "../../assets/Render_2.jpg";
import "leaflet/dist/leaflet.css";
import { useCallback, useMemo, useRef, useState } from "react";

function Mapa() {
  function DraggableMarker() {
    const [draggable, setDraggable] = useState(false);
    const position = [51.505, -0.09];
    const [positionMark, setPosition] = useState(position);
    const markerRef = useRef(null);
    const eventHandlers = useMemo(
      () => ({
        dragend() {
          const marker = markerRef.current;
          if (marker != null) {
            setPosition(marker.getLatLng());
          }
        },
      }),
      []
    );
    const toggleDraggable = useCallback(() => {
      setDraggable((d) => !d);
    }, []);

    return (
      <Marker draggable={draggable} eventHandlers={eventHandlers} position={positionMark} ref={markerRef}>
        <Popup minWidth={90}>
          <span onClick={toggleDraggable}>{draggable ? "Marker is draggable" : "Click here to make marker draggable"}</span>
        </Popup>
      </Marker>
    );
  }

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
          zoom={3} // Set the initial zoom level
          minZoom={1} // Set the minimum allowed zoom level
          maxZoom={10} // Set the maximum allowed zoom level
          maxBounds={[
            [-90, -180],
            [90, 180],
          ]} // Set the bounds of the map
          style={{ width: "100%", height: "100%" }} // Set the size of the map container
          onClick={(e) => console.log(e)}
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
              Hola Lucas <br /> Easily customizable.
            </Popup>
          </Marker>
          <DraggableMarker />
        </MapContainer>
      </div>
    </div>
  );
}

export default Mapa;
