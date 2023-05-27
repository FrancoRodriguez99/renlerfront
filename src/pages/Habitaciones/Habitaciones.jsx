import { useEffect, useState } from "react";
import Habitacion from "../../components/Habitacion/Habitacion";
import "./Habitaciones.css";

export default function Habitaciones() {
  const [habitaciones, setHabitaciones] = useState([]);

  useEffect(() => {
    fetch(`https://back-renler.onrender.com/api/admin/all`, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((d) => setHabitaciones(d.habitaciones))
      .catch((e) => console.log(e));
  }, []);

  console.log(habitaciones);

  return (
    <div id="habitaciones_box">
      {habitaciones.map((x) => (
        <Habitacion x={x} key={x._id} />
      ))}
    </div>
  );
}
