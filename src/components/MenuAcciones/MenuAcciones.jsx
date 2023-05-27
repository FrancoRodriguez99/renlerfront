import { useSelector } from "react-redux";
import DownTime from "../Downtime/Downtime";
import Fabricacion from "../Fabricacion/Fabricacion";

export default function MenuAcciones() {
  const menu = useSelector((state) => state.menuAcciones.menu);

  switch (menu) {
    case "downtime":
      return <DownTime />;
    case "fabricacion":
      return <Fabricacion />;
    default:
      break;
  }
}
