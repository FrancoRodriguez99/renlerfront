import { useEffect, useState } from "react";
import Habitacion from "../../components/Habitacion/Habitacion";
import "./Habitaciones.css";

export default function Habitaciones() {
  const [habitaciones, setHabitaciones] = useState([]);

  useEffect(() => {
    fetch(`http://192.168.1.124:9000/api/admin/all`, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((d) => setHabitaciones(d.habitaciones))
      .catch((e) => console.log(e));
  }, []);

  return (
    <div id="habitaciones_box">
      {habitaciones.map((x) => (
        <Habitacion x={x} key={x._id} />
      ))}
    </div>
  );
}
