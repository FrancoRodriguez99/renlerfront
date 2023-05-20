import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "./NavBar.css";
import campana from "../../assets/campana.svg";

export default function NavBar() {
  const userLoged = useSelector((state) => state.userLoged);

  if (userLoged.loged)
    return (
      <div id="test">
        <div id="navbar_box">
          <div>
            <Link to="/personajes" className="link_decoration">
              Ezkiel Azodnem
            </Link>
          </div>
          <div id="links">
            <Link to="/personajes" className="link_decoration">
              Mercado
            </Link>
            <Link to="/personajes" className="link_decoration">
              Downtime
            </Link>
            <Link to="/personajes" className="link_decoration">
              Mapas
            </Link>
          </div>
          <img></img>
          <div id="navbar_vos">
            <img src={campana} id="campana_img" alt="campana"></img>
            <div className="link_decoration">{userLoged.email}</div>
            <img src={userLoged.avatar} alt="vos" id="img_vos_nav"></img>
          </div>
        </div>
      </div>
    );
  else
    return (
      <div id="test">
        <div id="navbar_box">
          <div>
            <Link to="/personajes" className="link_decoration">
              Ezkiel Azodnem
            </Link>
          </div>
          <div id="links">
            <Link to="/personajes" className="link_decoration">
              Mercado
            </Link>
            <Link to="/personajes" className="link_decoration">
              Downtime
            </Link>
            <Link to="/personajes" className="link_decoration">
              Mapas
            </Link>
          </div>
          <img></img>
          <div id="navbar_vos">
            <Link to="/ingresar" className="link_decoration">
              Login
            </Link>
            <Link to="/registrarse" className="link_decoration">
              Register
            </Link>
          </div>
        </div>
      </div>
    );
}
