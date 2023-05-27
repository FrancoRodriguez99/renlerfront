import "./Habitacion.css";

export default function Habitacion({ x }) {
  function handleDelete() {
    fetch(`https://back-renler.onrender.com/api/admin/deleteHabitacion/` + x._id, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((d) => window.location.reload())
      .catch((e) => console.log(e));
  }

  return (
    <div className="habitacion_box">
      <div>
        {x.nombre}
        <img alt="logo" src={typeof x.icono === "object" ? x.icono[0] : x.icono} className="habitacion_icono"></img>
        <img alt="logo" src={x.icono[1]} className="habitacion_icono"></img>
      </div>
      <div>{x.descripcion}</div>
      <div>{x.size.split(",")[0] + "-" + x.size.split(",")[1] + "sq"}</div>
      <div>
        {x.bonificacion} Bonus = +{x.bonificacionNumero}
      </div>
      <div>
        {x.time.split(",")[0] + " Dias."} {x.time.split(",")[1] + " Horas."} {x.time.split(",")[2] + " Minutos."}
      </div>
      <div>
        Receta:
        <div>
          {x.receta.map((x) => (
            <div key={x._id}>
              {x.id.nombre} = {x.quantity}
            </div>
          ))}
          {x.recetaMejora ? <div>{x.recetaMejora.nombre}</div> : null}
        </div>
      </div>
      <div>
        Reward:
        <div>
          {x.ganancias.map((x) => (
            <div key={x._id}>
              {x.id.nombre} = {x.quantity}
            </div>
          ))}
        </div>
      </div>
      {x.upgradeable ? "Esto se puede mejorar" : "No se puede mejorar"}
      <button onClick={() => handleDelete()}>!Borrar! Cuidado conmigo que no le puse un boton de confirmar (da paja)</button>
    </div>
  );
}
