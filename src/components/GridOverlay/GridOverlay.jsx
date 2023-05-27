import React, { useState } from "react";
import { Polygon, Polyline, Tooltip } from "react-leaflet";
import { useDispatch, useSelector } from "react-redux";
import { modificarConjuntoEnCreacion } from "../../redux/slices/claimSlice";
import "./GridOverlay.css";

export default function GridOverlay({ x, arriba, abajo, derecha, izquierda }) {
  const alreadyClaimed = x.habitacion ? true : false;
  const [isHovered, setIsHovered] = useState(false);
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.userLoged._id);

  const estadoCreando = useSelector((state) => state.claim);

  const isSelected = estadoCreando.conjuntoEnCreacion.includes(x._id);

  const inProcessOfClimingByYou = estadoCreando.alreadyClaimed.filter((xx) => xx.coordenadas.includes(x._id)).length > 0;

  const className = alreadyClaimed ? "gridline_pink" : isSelected ? "gridline_blue" : inProcessOfClimingByYou ? "gridline_blue" : "gridline";

  const handleSquareClick = () => {
    if (x?.habitacion?.claimedEdificio?.usuario === userId) {
    }

    //si ya esta reclamado no pongo nada
    if (alreadyClaimed || inProcessOfClimingByYou) return;
    //compruebo si estas creando y si es el primer punto del conjunto que marcas
    if (estadoCreando.building && estadoCreando.conjuntoEnCreacion.length > 0) {
      //comprobacion de que tenga cuadrados del mismo edificio/habitacion adyacentes
      if (estadoCreando.conjuntoEnCreacion.includes(arriba) || estadoCreando.conjuntoEnCreacion.includes(abajo) || estadoCreando.conjuntoEnCreacion.includes(izquierda) || estadoCreando.conjuntoEnCreacion.includes(derecha) || isSelected) {
        if (isSelected) {
          dispatch(modificarConjuntoEnCreacion(estadoCreando.conjuntoEnCreacion.filter((id) => id !== x._id)));
        } else {
          dispatch(modificarConjuntoEnCreacion([...estadoCreando.conjuntoEnCreacion, x._id]));
        }
      }
    } else if (estadoCreando.building) {
      dispatch(modificarConjuntoEnCreacion([x._id]));
    } else return;
  };

  /*
  useEffect(() => {
    if (estadoCreando.conjuntoEnCreacion.length < 1) setSelectedSquare(false);
  }, [conjuntoCreado]);
*/

  function showData() {
    if (isHovered && alreadyClaimed)
      return (
        <Tooltip sticky>
          <div className="sticky_id">
            <div>{x.habitacion?.claimedEdificio?.edificio.nombre}</div>
            <div>{x.habitacion?.habitacion?.nombre}</div>
            <div> Creado por: {x.user?.name}</div>
          </div>
        </Tooltip>
      );
  }

  return (
    <>
      {isSelected ? estadoCreando.conjuntoEnCreacion.includes(arriba) ? null : <Polyline positions={[x.coordenadas[2], x.coordenadas[1]]} color="#0347CA" /> : null}
      {isSelected ? estadoCreando.conjuntoEnCreacion.includes(abajo) ? null : <Polyline positions={[x.coordenadas[0], x.coordenadas[3]]} color="#0347CA" /> : null}
      {isSelected ? estadoCreando.conjuntoEnCreacion.includes(izquierda) ? null : <Polyline positions={[x.coordenadas[0], x.coordenadas[1]]} color="#0347CA" /> : null}
      {isSelected ? estadoCreando.conjuntoEnCreacion.includes(derecha) ? null : <Polyline positions={[x.coordenadas[2], x.coordenadas[3]]} color="#0347CA" /> : null}
      <Polygon
        key={isSelected ? "blue" : inProcessOfClimingByYou ? "climed" : "nope"}
        positions={x.coordenadas}
        className={className}
        eventHandlers={{
          click: () => handleSquareClick(),
          mouseover: () => (alreadyClaimed ? setIsHovered(true) : null),
          mouseout: () => (alreadyClaimed ? setIsHovered(false) : null),
        }}
      >
        {showData()}
      </Polygon>
    </>
  );
}
