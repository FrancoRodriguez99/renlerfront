import BotonesHabitacion from "../BotonesHabitacion/BotonesHabitacion";
import { habitacionEnEdicion, edificioEnEdicion, deleteAll } from "../../redux/slices/claimSlice";
import "./downtime.css";
import { useDispatch, useSelector } from "react-redux";
import { loadingMenu, notLoadingMenu } from "../../redux/slices/loadingSlice";
import { useEffect, useState } from "react";
import cruz from "../../assets/cruz.png";
import { trigger } from "../../redux/slices/egdmSlice";
import { calculateRemainingTime } from "../../utils/timeUtils";

export default function DownTime() {
  const [indiceEdificio, setIndiceEdificio] = useState(0);
  const [indiceHabitacion, setIndiceHabitacion] = useState(0);
  const [listaCompletaOpen, setListaCompletaOpen] = useState(false);
  const [filterEdificios, setFilterEdificios] = useState([]);
  const [resources, setResources] = useState({ habitaciones: [], edificios: [], recursos: [] });
  const dispatch = useDispatch();
  const crecion = useSelector((state) => state.claim);
  const character = useSelector((state) => state.character.characterSelected);
  const [state, setState] = useState(false);

  const triggerReaload = () => {
    setState(!state);
  };

  useEffect(() => {
    dispatch(habitacionEnEdicion(resources?.edificios[indiceEdificio]?.receta[indiceHabitacion]));
    dispatch(edificioEnEdicion(resources.edificios[indiceEdificio]));
  }, [indiceHabitacion, indiceEdificio, resources, dispatch]);

  useEffect(() => {
    setFilterEdificios(resources.edificios);
  }, [resources.edificios]);

  useEffect(() => {
    setIndiceHabitacion(0);
  }, [indiceEdificio]);

  function handleCrear() {
    dispatch(loadingMenu());
    fetch("http://192.168.1.124:9000/api/build/claim", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        characterID: character._id,
        edificioId: crecion.edificio._id,
        claimedHabitacionesYCoordenadas: crecion.alreadyClaimed.map((x) => {
          return {
            id: x.room.id._id,
            coordenadas: x.coordenadas,
          };
        }),
      }),
    })
      .then((x) => x.json())
      .then((d) => {
        dispatch(notLoadingMenu());
        window.location.reload();
      });
  }

  useEffect(() => {
    dispatch(loadingMenu());
    fetch(`http://192.168.1.124:9000/api/admin/all`, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((d) => {
        let tetas = d.edificios.map((x) => {
          let array = [];

          x.receta.forEach((xx) => {
            if (xx.quantity > 1) {
              for (let i = 0; i < xx.quantity; i++) {
                array.push({ ...xx, copia: i });
              }
            } else array.push({ ...xx });
          });

          return { ...x, receta: array };
        });

        tetas = tetas.concat(
          character?.claimedEdificios?.map((x) => {
            return { ...tetas.filter((i) => i._id === x.edificio)[0], claimedHabitaciones: x.claimedHabitaciones };
          })
        );

        setResources({
          habitaciones: d.habitaciones,
          edificios: tetas.reverse(),
          recursos: d.recursos,
        });
      })
      .catch((e) => console.log(e));
    dispatch(notLoadingMenu());
  }, [dispatch, character, state]);

  function checkHabitaciones(element, e) {
    return element.id.nombre.toLowerCase().includes(e.toLowerCase());
  }

  function edificiosConstruidos(data) {
    let construido = 0;
    data.forEach((x) => {
      if (x.started === undefined) return;
      let takesString = resources.habitaciones.filter((i) => i._id === x.habitacion)[0];
      let remainingTime = calculateRemainingTime(x.started, takesString.time);
      if (remainingTime === 0) construido++;
    });

    return (
      <div id="edificios_colados">
        <div id="aksfj2">
          {construido}/{data.length} habitaciones construidas
        </div>
      </div>
    );
  }

  function procesoBotones() {
    //la habitacion tiene receta Mejora ergo se requiere otra habitacion para construir?
    if (resources.edificios[indiceEdificio]?.receta[indiceHabitacion]?.id.recetaMejora) {
      //la habitacion pertence a un edificio ya construido?
      if (resources.edificios[indiceEdificio]?.claimedHabitaciones) {
        //la habitacion que se requiere para mejorar ya esta construida?
        if (resources.edificios[indiceEdificio]?.claimedHabitaciones?.filter((t) => t.habitacion === resources.edificios[indiceEdificio]?.receta[indiceHabitacion]?.id.recetaMejora)[0].started) {
          return (
            <div id="box_general_habitacion">
              <div id="box_habitacion_blanca">
                <div id="parte_arriba_box_h_b">
                  <div id="box_habitacion_primeros_datos">
                    <div id="titulo_habitacion">{resources.edificios[indiceEdificio]?.receta[indiceHabitacion]?.id.nombre}</div>
                    <div id="data_construir_habitacion_tiempo_size">
                      <div>Tamaño: {resources.edificios[indiceEdificio]?.receta[indiceHabitacion]?.id.size.split(",").join("-")}sq.</div>
                      <div>
                        Tiempo:
                        {resources.edificios[indiceEdificio]?.receta[indiceHabitacion]?.id.time.split(",").map((x, i) => {
                          if (i === 0) return x + "Días";
                          else if (i === 1) return x + "hs";
                          else return x + "m";
                        })}
                      </div>
                    </div>
                    <div id="bonificacion_habitacion">
                      +{resources.edificios[indiceEdificio]?.receta[indiceHabitacion]?.id.bonificacionNumero} {resources.edificios[indiceEdificio]?.receta[indiceHabitacion]?.id.bonificacion}
                    </div>
                  </div>
                  <img src={resources.edificios[indiceEdificio]?.receta[indiceHabitacion]?.id.icono} id="icono_habitacion_selected" alt="imagen_de_habitacion" />
                </div>
                <div id="divisior_estandar_downtime"></div>

                <div id="descripcion_habitacion">{resources.edificios[indiceEdificio]?.receta[indiceHabitacion]?.id.descripcion}</div>
                <div id="botones_habitacion_box">
                  <BotonesHabitacion
                    setIndiceEdificio={setIndiceHabitacion}
                    indiceEdificio={indiceHabitacion}
                    length={resources.edificios[indiceEdificio]?.receta.length}
                    databasedAlready={resources?.edificios[indiceEdificio]?.claimedHabitaciones ? resources?.edificios[indiceEdificio]?.claimedHabitaciones[indiceHabitacion] : false}
                    habitacion={resources.edificios[indiceEdificio]?.receta[indiceHabitacion]?.id}
                    hayQueUpgradear={true}
                    triggerReload={triggerReaload}
                  />
                </div>
              </div>
            </div>
          );
        }
      } else {
        return (
          <div id="box_general_habitacion">
            <div id="box_habitacion_blanca">
              <div id="parte_arriba_box_h_b">
                <div id="box_habitacion_primeros_datos">
                  <div id="titulo_habitacion">{resources.edificios[indiceEdificio]?.receta[indiceHabitacion]?.id.nombre}</div>
                  <div id="data_construir_habitacion_tiempo_size">
                    <div>Tamaño: {resources.edificios[indiceEdificio]?.receta[indiceHabitacion]?.id.size.split(",").join("-")}sq.</div>
                    <div>
                      Tiempo:
                      {resources.edificios[indiceEdificio]?.receta[indiceHabitacion]?.id.time.split(",").map((x, i) => {
                        if (i === 0) return x + "Días";
                        else if (i === 1) return x + "hs";
                        else return x + "m";
                      })}
                    </div>
                  </div>
                  <div id="bonificacion_habitacion">
                    +{resources.edificios[indiceEdificio]?.receta[indiceHabitacion]?.id.bonificacionNumero} {resources.edificios[indiceEdificio]?.receta[indiceHabitacion]?.id.bonificacion}
                  </div>
                </div>
                <img src={resources.edificios[indiceEdificio]?.receta[indiceHabitacion]?.id.icono} id="icono_habitacion_selected" alt="imagen_de_habitacion" />
              </div>
              <div id="divisior_estandar_downtime"></div>

              <div id="descripcion_habitacion">{resources.edificios[indiceEdificio]?.receta[indiceHabitacion]?.id.descripcion}</div>
              <div id="botones_habitacion_box">
                <BotonesHabitacion
                  setIndiceEdificio={setIndiceHabitacion}
                  indiceEdificio={indiceHabitacion}
                  length={resources.edificios[indiceEdificio]?.receta.length}
                  databasedAlready={resources?.edificios[indiceEdificio]?.claimedHabitaciones ? resources?.edificios[indiceEdificio]?.claimedHabitaciones[indiceHabitacion] : false}
                  habitacion={resources.edificios[indiceEdificio]?.receta[indiceHabitacion]?.id}
                  triggerReload={triggerReaload}
                />
              </div>
            </div>
          </div>
        );
      }

      let habitacionRequeridaParaMejorar = resources.habitaciones.filter((x) => x._id === resources.edificios[indiceEdificio]?.receta[indiceHabitacion]?.id.recetaMejora)[0];
      let databased = resources?.edificios[indiceEdificio]?.claimedHabitaciones ? resources?.edificios[indiceEdificio]?.claimedHabitaciones[0]?.claimedEdificio : null;

      return (
        <div id="box_general_habitacion">
          <div id="box_habitacion_blanca">
            <div id="parte_arriba_box_h_b">
              <div id="box_habitacion_primeros_datos">
                <div id="titulo_habitacion">{habitacionRequeridaParaMejorar.nombre}</div>
                <div id="data_construir_habitacion_tiempo_size">
                  <div>Tamaño: {habitacionRequeridaParaMejorar.size.split(",").join("-")}sq.</div>
                  <div>
                    Tiempo:
                    {habitacionRequeridaParaMejorar.time.split(",").map((x, i) => {
                      if (i === 0) return x + "Días";
                      else if (i === 1) return x + "hs";
                      else return x + "m";
                    })}
                  </div>
                </div>
                <div id="bonificacion_habitacion">
                  +{habitacionRequeridaParaMejorar.bonificacionNumero} {habitacionRequeridaParaMejorar.bonificacion}
                </div>
              </div>
              <img src={habitacionRequeridaParaMejorar.icono} id="icono_habitacion_selected" alt="imagen_de_habitacion" />
            </div>
            <div id="divisior_estandar_downtime"></div>

            <div id="descripcion_habitacion">{habitacionRequeridaParaMejorar.descripcion}</div>
            <div id="botones_habitacion_box">
              <BotonesHabitacion
                triggerReload={triggerReaload}
                setIndiceEdificio={setIndiceHabitacion}
                indiceEdificio={indiceHabitacion}
                length={resources.edificios[indiceEdificio]?.receta.length}
                databasedAlready={databased}
                habitacion={habitacionRequeridaParaMejorar}
              />
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div id="box_general_habitacion">
          <div id="box_habitacion_blanca">
            <div id="parte_arriba_box_h_b">
              <div id="box_habitacion_primeros_datos">
                <div id="titulo_habitacion">{resources.edificios[indiceEdificio]?.receta[indiceHabitacion]?.id.nombre}</div>
                <div id="data_construir_habitacion_tiempo_size">
                  <div>Tamaño: {resources.edificios[indiceEdificio]?.receta[indiceHabitacion]?.id.size.split(",").join("-")}sq.</div>
                  <div>
                    Tiempo:
                    {resources.edificios[indiceEdificio]?.receta[indiceHabitacion]?.id.time.split(",").map((x, i) => {
                      if (i === 0) return x + "Días";
                      else if (i === 1) return x + "hs";
                      else return x + "m";
                    })}
                  </div>
                </div>
                <div id="bonificacion_habitacion">
                  +{resources.edificios[indiceEdificio]?.receta[indiceHabitacion]?.id.bonificacionNumero} {resources.edificios[indiceEdificio]?.receta[indiceHabitacion]?.id.bonificacion}
                </div>
              </div>
              <img src={resources.edificios[indiceEdificio]?.receta[indiceHabitacion]?.id.icono} id="icono_habitacion_selected" alt="imagen_de_habitacion" />
            </div>
            <div id="divisior_estandar_downtime"></div>

            <div id="descripcion_habitacion">{resources.edificios[indiceEdificio]?.receta[indiceHabitacion]?.id.descripcion}</div>
            <div id="botones_habitacion_box">
              <BotonesHabitacion
                setIndiceEdificio={setIndiceHabitacion}
                indiceEdificio={indiceHabitacion}
                length={resources.edificios[indiceEdificio]?.receta.length}
                databasedAlready={resources?.edificios[indiceEdificio]?.claimedHabitaciones ? resources?.edificios[indiceEdificio]?.claimedHabitaciones[indiceHabitacion] : false}
                habitacion={resources.edificios[indiceEdificio]?.receta[indiceHabitacion]?.id}
                triggerReload={triggerReaload}
              />
            </div>
          </div>
        </div>
      );
    }
  }

  return (
    <div id="options_mapa">
      <div id="box_lista_edificios">
        <input
          id="buscador_downtime_edificios"
          placeholder="Buscar"
          onClick={() => setListaCompletaOpen(true)}
          onChange={(e) => {
            if (e.target.value.length > 0) setFilterEdificios(resources.edificios.filter((x, ii) => x.nombre.toLowerCase().includes(e.target.value.toLowerCase()) || x.receta.some((element) => checkHabitaciones(element, e.target.value))));
            else setFilterEdificios(resources.edificios);
            if (e.target.value === "la cola de mendoza") dispatch(trigger(true));
            else dispatch(trigger(false));
          }}
        />
        <button id={listaCompletaOpen ? "lista_completa_open" : "lista_completa"} onClick={() => setListaCompletaOpen(!listaCompletaOpen)}>
          Lista Completa
        </button>
      </div>

      {listaCompletaOpen ? (
        <div className="lista_completa_box">
          {filterEdificios.map((x, i) => (
            <div
              key={x.claimedHabitaciones ? x._id + i : x._id}
              onClick={() => {
                setIndiceEdificio(i);
                setListaCompletaOpen(false);
              }}
              className={x.claimedHabitaciones ? "lista_completa_box_individual_claimed" : "lista_completa_box_individual"}
            >
              <img src={x.icono[0]} id="imagen_icono_edificio" alt="logo" />
              <div>
                <div className="nombre_y_length">
                  <div>{x.nombre}</div> <div>{x.receta?.length}</div>
                </div>
                <div>
                  <div className="lista_bonuses_costado">
                    {resources.edificios[indiceEdificio]?.ganancias.map((x, ii) => (
                      <div key={x.id._id + ii} className="centrame_estos_dos">
                        +{x.quantity}
                        <img src={x.id.icono} className="icono_recurso" alt="icono_del_recurso" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <>
          <div id="title_downtime">
            <h2 id="edificio_titulo">{resources?.edificios[indiceEdificio]?.nombre}</h2>
            {resources?.edificios[indiceEdificio]?.claimedHabitaciones ? (
              edificiosConstruidos(resources.edificios[indiceEdificio]?.claimedHabitaciones)
            ) : crecion.alreadyClaimed?.length !== crecion.edificio?.receta?.length ? (
              <div id="edificios_colados">
                <div id="aksfj2">
                  {crecion?.alreadyClaimed?.length}/{resources?.edificios[indiceEdificio]?.receta.length} habitaciones colocadas
                </div>
                <img onClick={() => dispatch(deleteAll({ habitacion: resources?.edificios[indiceEdificio]?.receta[indiceHabitacion], edificio: resources.edificios[indiceEdificio] }))} alt="cancelar construccion" src={cruz} className="x"></img>
              </div>
            ) : (
              <button
                id="boton_construir_edificio"
                onClick={() => {
                  handleCrear();
                }}
              >
                Construir
              </button>
            )}
          </div>
          <div id="wallpaper_descripcion">
            <img alt="asd" id="wallpaper_edifico" src={resources?.edificios[indiceEdificio]?.icono[1]} />
          </div>
          <div id="box_descripcion_edificio">
            <div id="descripcion_edificio">{resources?.edificios[indiceEdificio]?.descripcion}</div>
          </div>
          <div id="recursos_que_pide_edificio">
            {resources.edificios[indiceEdificio]?.ganancias.map((x, ii) => (
              <div key={x.id._id + ii} className="centrame_estos_dos">
                +{x.quantity}
                <img src={x.id.icono} className="icono_recurso" alt="icono_del_recurso" />
              </div>
            ))}
          </div>
          <div id="beneficios_que_da_edificio">
            {resources.edificios[indiceEdificio]?.receta.map((x, indi) => {
              if (x.copia === 0)
                return (
                  <div key={x.id._id + indi} className="data_beneficio">
                    +{x.id.bonificacionNumero} {x.id.bonificacion}
                  </div>
                );
              else return null;
            })}
          </div>
          <div id="box_divisor">
            <div id="divisior_estandar_downtime"></div>
          </div>

          {procesoBotones()}

          <div id="box_general_habitaciones">
            {resources.edificios[indiceEdificio]?.receta.map((x, i) => (
              <div key={i} onClick={() => setIndiceHabitacion(i)} className={indiceHabitacion === i ? "glow" : "asd545dsa"}>
                <img src={x.id.icono} alt="crafteables" className="crafteables_habitaciones_icono"></img>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
