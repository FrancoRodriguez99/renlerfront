import { useDispatch, useSelector } from "react-redux";
import "./FlapsOptionsMap.css";
import { downtime, fabricacion } from "../../redux/slices/menuAccionesSlice";

export default function FlapsOptionsMaps() {
  const dispatch = useDispatch();
  const menuSelected = useSelector((state) => state.menuAcciones.menu);
  return (
    <div id="pestanias_downtime">
      <div className={menuSelected === "downtime" ? "selected_flap" : "unselected_flap"} onClick={() => dispatch(downtime())}>
        Construcción
      </div>
      <div className={menuSelected === "fabricacion" ? "selected_flap" : "unselected_flap"} onClick={() => dispatch(fabricacion())}>
        Fabricación
      </div>
      <div className="unselected_flap">Empleados</div>
    </div>
  );
}
