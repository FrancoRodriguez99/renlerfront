import { Link } from "react-router-dom";

export default function Personajes() {
  return (
    <div>
      Ezkiel:
      <br />
      <Link to="/mapa">Mapa</Link>
      <br />
      Inventario
      <br />
      Etc
      <br />
      Mapa
    </div>
  );
}
