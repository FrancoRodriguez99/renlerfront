import flechaderecha from "../../assets/flechaderecha.svg";
import flechaizquierda from "../../assets/flechaizquierda.svg";
import blueprint from "../../assets/blueprint.png";
import blueprintdisabled from "../../assets/bluepirntdisabled.png";
import retry from "../../assets/retry.png";
import "./BotonesHabitacion.css";
import { useDispatch, useSelector } from "react-redux";
import { saveClaim, retryCurrentRoom } from "../../redux/slices/claimSlice";
import martilloDisabled from "../../assets/martilloDisabled.png";
import { calculateRemainingTime } from "../../utils/timeUtils";
import martilloenabled from "../../assets/martilloenabled.png";
import upgradeDIsabled from "../../assets/upgradeDisabled.png";
import { loadingClickedOnSomething, notloadingClickedOnSomething } from "../../redux/slices/loadingSlice";
import { getCharacters } from "../../redux/actions/characterActions";
import upgradeableENabled from "../../assets/upgradeableEnabled.png";
import { useState } from "react";
import { formatTime } from "../../utils/timeUtils";
import { useEffect } from "react";
import flechaderechaHover from "../../assets/derechaHover.png";
import flechaizquierdaHover from "../../assets/izquierdaHover.png";

export default function BotonesHabitacion({ indiceEdificio, setIndiceEdificio, length, databasedAlready, habitacion, hayQueUpgradear, triggerReload }) {
  const building = useSelector((state) => state.claim);
  const dispatch = useDispatch();
  const resourcesYouhave = useSelector((state) => state.character.characterSelected.recursos);
  const userId = useSelector((state) => state.userLoged._id);
  const [remainingTime, setRemainingTime] = useState("");
  const [derechaHover, setDerechaHover] = useState(false);
  const [izquierdaHover, setIzquierdaHover] = useState(false);

  function startBuilding() {
    dispatch(loadingClickedOnSomething());
    fetch("https://back-renler.onrender.com/api/build/startBuildingCrafting", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        claimedHabitacionId: databasedAlready._id ? databasedAlready._id : databasedAlready,
        habitacionId: habitacion._id,
      }),
    })
      .then((x) => x.json())
      .then((d) => {
        if (d.ok) dispatch(getCharacters(userId));
        dispatch(notloadingClickedOnSomething());
      });
  }

  useEffect(() => {
    if (databasedAlready?.started) {
      const interval = setInterval(() => {
        const newRemainingTime = calculateRemainingTime(databasedAlready?.started, habitacion?.time);
        setRemainingTime(formatTime(newRemainingTime));
        if (newRemainingTime <= 0) {
          clearInterval(interval);
          setRemainingTime("0:0:0:0");
          triggerReload();
        }
      }, 1000);

      return () => {
        clearInterval(interval);
      };
    }
  }, [databasedAlready, habitacion?.time, triggerReload]);

  function calculateBtn() {
    function sizeAcording() {
      return building?.habitacion?.id?.size?.split(",")[0] <= building?.conjuntoEnCreacion?.length && building?.habitacion?.id?.size?.split(",")[1] >= building?.conjuntoEnCreacion?.length;
    }
    function checkIfBuilded() {
      if (databasedAlready.started === undefined) return "no_empezo";
      let remainingTime = calculateRemainingTime(databasedAlready?.started, habitacion?.time);
      if (remainingTime === 0) return "ya_construido";
      else {
        return "le_falta_tiempo";
      }
    }

    function checkIfResourcesEnough() {
      let resourcesRequiredArray = habitacion.receta;
      let youCan = true;
      resourcesRequiredArray.forEach((resource) => {
        let resorucesYouHaveArray = resourcesYouhave.filter((x) => x.id === resource.id);
        if (resorucesYouHaveArray.length > 0) {
          if (resorucesYouHaveArray[0].quantity < resource.quantity) youCan = false;
        }
      });
      return youCan;
    }

    let isAlreadyClaimed = false;

    if (typeof building.habitacion?.copia === "number") {
      if (building.alreadyClaimed.filter((x) => x.room.id._id === building.habitacion.id._id && x.room.copia === building.habitacion.copia).length > 0) {
        isAlreadyClaimed = true;
      }
    } else if (building.alreadyClaimed.filter((x) => x.room.id._id === building.habitacion.id._id).length > 0) {
      isAlreadyClaimed = true;
    } else isAlreadyClaimed = false;

    //chequear si habitacion claimeada
    if (isAlreadyClaimed || databasedAlready) {
      //chequear si esta claimeado en redux
      if (isAlreadyClaimed) {
        return <img alt="boton" src={retry} className="button_habitacion_estilos_principal" onClick={() => dispatch(retryCurrentRoom())} />;

        //esta claimeado en la base de datos
      } else {
        //ya esta construido?
        if (checkIfBuilded() === "ya_construido") {
          //es mejorable y necesitas mejorarlo?
          if (hayQueUpgradear) {
            return <img alt="boton" src={upgradeableENabled} className="button_habitacion_estilos_principal" onClick={() => startBuilding()} />;
          } else {
            return <img alt="boton" src={upgradeDIsabled} className="button_habitacion_estilos_principal" />;
          }
        } else {
          //esta bajo construccion pero le falta tiempo?
          if (checkIfBuilded() === "le_falta_tiempo") {
            return (
              <div className="button_habitacion_estilos_principal">
                <img alt="boton" src={upgradeDIsabled} id="imagen_falta_tiempo" />
                <div id="countdown">{remainingTime}</div>
              </div>
            );
          } else {
            //tenes los recursos para construirlo?
            if (checkIfResourcesEnough()) {
              return <img alt="boton" src={martilloenabled} className="button_habitacion_estilos_principal" onClick={() => startBuilding()} />;
            } else {
              return <img alt="boton" src={martilloDisabled} className="button_habitacion_estilos_principal" />;
            }
          }
        }
      }
    } else {
      //no esta claimeado, veamos si tenes el tamaño adecuado para claimearlo
      if (sizeAcording()) return <img alt="boton" src={blueprint} className="button_habitacion_estilos_principal" onClick={() => dispatch(saveClaim())} />;
      else return <img alt="boton" src={blueprintdisabled} className="button_habitacion_estilos_principal" />;
    }
  }

  return (
    <div id="botones_de_habitacion">
      <img
        alt="izquierda"
        src={izquierdaHover ? flechaizquierdaHover : flechaizquierda}
        className="button_habitacion_estilos"
        onMouseEnter={() => setIzquierdaHover(true)}
        onMouseLeave={() => setIzquierdaHover(false)}
        onClick={() => {
          if (indiceEdificio !== 0) setIndiceEdificio(indiceEdificio - 1);
          else setIndiceEdificio(length - 1);
        }}
      />
      {calculateBtn()}

      <img
        alt="derecha"
        src={derechaHover ? flechaderechaHover : flechaderecha}
        onMouseEnter={() => setDerechaHover(true)}
        onMouseLeave={() => setDerechaHover(false)}
        className="button_habitacion_estilos"
        onClick={() => {
          if (indiceEdificio !== length - 1) setIndiceEdificio(indiceEdificio + 1);
          else setIndiceEdificio(0);
        }}
      />
    </div>
  );
}
