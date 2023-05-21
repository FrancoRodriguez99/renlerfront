import { useEffect, useState } from "react";
import Edificio from "../../components/Habitacion/Habitacion";

export default function Edificios() {
  const [edificios, setEdificios] = useState([]);

  useEffect(() => {
    fetch(`http://192.168.1.124:9000/api/admin/all`, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((d) => setEdificios(d.edificios))
      .catch((e) => console.log(e));
  }, []);

  return (
    <div id="habitaciones_box">
      {edificios.map((x) => (
        <Edificio x={x} key={x._id} />
      ))}
    </div>
  );
}
