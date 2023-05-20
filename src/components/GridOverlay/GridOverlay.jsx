import React, { useState } from "react";
import { useEffect } from "react";
import { Polygon, Tooltip } from "react-leaflet";

const GridOverlay = React.memo(({ x, creando, conjuntoCreado, setConjuntoCreado }) => {
  const [selectedSquare, setSelectedSquare] = useState(false);
  const alreadyClaimed = x.claimed ? true : false;
  const [isHovered, setIsHovered] = useState(false);

  const handleSquareClick = () => {
    if (alreadyClaimed) return;
    if (creando) {
      setSelectedSquare((prevSelectedSquare) => {
        const updatedSelectedSquare = !prevSelectedSquare;
        if (updatedSelectedSquare) {
          setConjuntoCreado((prevConjuntoCreado) => [...prevConjuntoCreado, x._id]);
        } else {
          setConjuntoCreado((prevConjuntoCreado) => prevConjuntoCreado.filter((id) => id !== x._id));
        }
        return updatedSelectedSquare;
      });
    }
  };

  useEffect(() => {
    if (conjuntoCreado.length < 1) setSelectedSquare(false);
  }, [conjuntoCreado]);

  function showData() {
    if (isHovered && alreadyClaimed)
      return (
        <Tooltip sticky>
          <div className="sticky_id">
            <div>{x.claimed?.title}</div>
            <div> Creado por: {x.claimed?.User}</div>
          </div>
        </Tooltip>
      );
  }

  return (
    <>
      <Polygon
        key={selectedSquare ? "blue" : "default"}
        positions={x.coordenadas}
        className={selectedSquare ? "gridline_blue" : alreadyClaimed ? "gridline_pink" : "gridline"}
        eventHandlers={{
          click: () => handleSquareClick(),
          mouseover: () => setIsHovered(true),
          mouseout: () => setIsHovered(false),
        }}
      >
        {showData()}
      </Polygon>
    </>
  );
});

export default GridOverlay;
