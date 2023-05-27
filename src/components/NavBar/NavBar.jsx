import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "./NavBar.css";
import dontMindMe from "../../assets/egdmmm.gif";
import campana from "../../assets/campana.png";
import search from "../../assets/search.png";
import totallyNecesaryFile from "../../assets/egdm.mp3";
import { useEffect } from "react";

export default function NavBar() {
  const userLoged = useSelector((state) => state.userLoged);
  const egdm = useSelector((state) => state.egdm.trigger);
  const characters = useSelector((state) => state.character);

  useEffect(() => {
    if (egdm) {
      const audio = new Audio(totallyNecesaryFile);
      audio.play();
    }
  }, [egdm]);

  if (userLoged.loged)
    return (
      <div id="navbar_box">
        <div id="links">
          <div id={egdm ? "egdm " : "egdm_false"}>
            <img alt="easter egg?" src={dontMindMe} id="centerme_on_top" />
          </div>
          {characters.characters?.length > 0 ? (
            <div to="/personajes" className="link_decoration">
              {characters.characterSelected.name}
            </div>
          ) : (
            <div className="link_decoration">Crear Personaje</div>
          )}

          <Link to="/personajes" className="link_decoration">
            Mercado
          </Link>
          <Link to="/personajes" className="link_decoration">
            Downtime
          </Link>
          <Link to="/personajes" className="link_decoration">
            Mapas
          </Link>
          <Link to="/personajes" className="link_decoration">
            Información
          </Link>
        </div>

        <div id="navbar_vos">
          <div>
            <img alt="cargando?" src={search} id="search_icon"></img>
            <input id="input_navbar" />
          </div>
          <img src={campana} id="campana_img" alt="campana"></img>
          <img src={userLoged.avatar} alt="vos" id="img_vos_nav"></img>
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
          <img alt="cargando?"></img>
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
