import { useEffect } from "react";
import { useState } from "react";
import "./CraftingSlot.css";
import cruz from "../../assets/cruz_capital.png";
import { useDispatch, useSelector } from "react-redux";
import { getCharacters } from "../../redux/actions/characterActions";
import { loadingClickedOnSomething, notloadingClickedOnSomething } from "../../redux/slices/loadingSlice";
import Timer from "../Timer/Timer";

export default function CraftingSlot({ crafting }) {
  const [resources, setResources] = useState([]);
  const [idResource, setIdResource] = useState(null);
  const [show, setShow] = useState(null);
  const [required, setRequired] = useState(null);
  const [dropMenu, setDropMenu] = useState(false);
  const character = useSelector((state) => state.character.characterSelected);
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.userLoged._id);
  const [craftingItem, setCrafting] = useState({ empty: true });

  useEffect(() => {
    const a = resources.filter((x) => x._id === idResource)[0];

    setShow(a);

    setRequired(resources.filter((x) => x._id === a?.receta?.recurso)[0]);

    setCrafting(resources.filter((x) => x._id === crafting.recurso)[0]);
  }, [idResource, resources, crafting.recurso]);

  useEffect(() => {
    fetch("http://192.168.1.124:9000/api/build/getResources", { method: "GET" })
      .then((x) => x.json())
      .then((d) => {
        setResources(d);
        setIdResource(d[0]._id);
      });
  }, []);

  function calcualteTime() {
    if (show?.time) {
      const a = show?.time?.split(",");
      return `${a[0]}d ${a[1]}h ${a[2]}m`;
    }
  }

  function startCrafting() {
    dispatch(loadingClickedOnSomething());
    fetch("http://192.168.1.124:9000/api/build/startResourceCrafting", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        idRecurso: show._id,
        idCharacter: character._id,
        timeStarted: new Date(),
        consumed: {
          id: required._id,
          quantity: show.receta.quantity,
        },
      }),
    })
      .then((x) => x.json())
      .then((d) => {
        if (d._id) dispatch(getCharacters(userId));
        dispatch(notloadingClickedOnSomething());
      });
  }

  function calculateButtonCrafting() {
    if (character.recursos.filter((x) => x.id === required?._id)?.length > 0) {
      if (character.recursos.filter((x) => x.id === required?._id)[0].quantity >= show?.receta?.quantity) {
        return (
          <div className="barra_recurso_resoruce_required" onClick={() => startCrafting()}>
            {show?.receta?.quantity} <img alt="requiere" src={required?.icono} className="imagen_capital_required" />
          </div>
        );
      } else {
        return (
          <div className="barra_recurso_resoruce_required_disabled">
            {show?.receta?.quantity} <img alt="requiere" src={required?.icono} className="imagen_capital_required" />
          </div>
        );
      }
    }
  }

  function cancellarCrafteo() {
    dispatch(loadingClickedOnSomething());
    fetch("http://192.168.1.124:9000/api/build/cancelResourceCrafting", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        idRecursoCrafteado: crafting._id,
      }),
    })
      .then((x) => x.json())
      .then((d) => {
        if (d.ok) dispatch(getCharacters(userId));
        dispatch(notloadingClickedOnSomething());
      });
  }

  if (crafting.empty) {
    return (
      <div className="crafting_slot_box">
        <div className="icono_no_se_que" onClick={() => setDropMenu(!dropMenu)}>
          <img alt="icono" src={show?.icono} className="imagen_capital_grande" />
          <div className="amount_you_have">{character?.recursos?.filter((x) => x.id === show?._id)[0]?.quantity || 0}</div>
        </div>
        {dropMenu && (
          <div className={dropMenu ? "drop_menu" : "drop_menu_hide"}>
            {resources.map((x) => {
              if (x._id !== show._id)
                return (
                  <div
                    key={x._id}
                    className="drop_menu_item"
                    onClick={() => {
                      setIdResource(x._id);
                      setDropMenu(!dropMenu);
                    }}
                  >
                    <img alt="icono" src={x.icono} className="imagen_capital_grande" />
                    <div className="amount_you_have">{character.recursos.filter((xx) => xx.id === x._id)[0]?.quantity || 0}</div>
                  </div>
                );
              else return null;
            })}
          </div>
        )}
        <div className="crafting_second_box">
          <div className="crafting_second_box_inside_one">
            <div className="barra_recurso_in_crafting_empty">
              {show?.receta?.gives} {show?.nombre}
            </div>
            <img alt="cerrar" src={cruz} />
          </div>
          <div className="crafting_second_box_inside_two">
            {calculateButtonCrafting()}
            <div className="box_show_time">{calcualteTime()}</div>
          </div>
        </div>
      </div>
    );
  } else
    return (
      <div className="crafting_slot_box">
        <div className="icono_no_se_que_locked">
          <img alt="icono" src={craftingItem?.icono} className="imagen_capital_grande" />
          <div className="amount_you_have">{character?.recursos?.filter((x) => x.id === craftingItem?._id)[0]?.quantity || 0}</div>
        </div>
        <div className="crafting_second_box">
          <div className="crafting_second_box_inside_one">
            <div className="barra_recurso_in_crafting">
              {craftingItem?.receta?.gives} {craftingItem?.nombre}
            </div>
            <img alt="cerrar" src={cruz} onClick={() => cancellarCrafteo()} />
          </div>
          <Timer started={crafting?.timeStarted} takes={show?.time} id={crafting._id} />
        </div>
      </div>
    );
}
