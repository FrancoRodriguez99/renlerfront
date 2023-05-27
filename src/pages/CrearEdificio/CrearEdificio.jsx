import { useEffect, useState } from "react";
import { cloudinary } from "../../utils/cloudinary";

export default function CrearEdificio() {
  const [datos, setDatos] = useState({ loading: false, avatar: [] });
  const [create, setCreate] = useState({ loading: false, descripcion: "", time: "", nombre: "", size: "", quantity: "", bonificacionNumero: "", bonificadores: "" });
  const [recursos, setRecursos] = useState([]);
  const [habitaciones, setHabitaciones] = useState([]);

  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const [ingredient, setIngredient] = useState("");
  const [quantity, setQuantity] = useState("");

  const [selectedReward, setSelectedReward] = useState([]);
  const [rewards, setRewards] = useState("");
  const [rewardQuantity, setRewardQuantity] = useState("");

  useEffect((x) => {
    fetch(`http://192.168.1.124:9000/api/admin/all`, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((d) => {
        setRecursos(d.recursos);
        setHabitaciones(d.habitaciones);
      })
      .catch((e) => console.log(e));
  }, []);

  async function handleImage(e) {
    setDatos({ ...datos, loading: true });
    const response = cloudinary(e);
    const d = await response();
    setDatos({ ...datos, avatar: d, loading: false });
  }

  function handleTitle(e) {
    setCreate({ ...create, nombre: e.target.value });
  }
  function handleDescripcion(e) {
    setCreate({ ...create, descripcion: e.target.value });
  }
  function handleBonificadores(e) {
    setCreate({ ...create, bonificadores: e.target.value });
  }
  function handleTime(e) {
    setCreate({ ...create, time: e.target.value });
  }

  function calcularSize() {
    let arrayMinimos = selectedIngredients.map((x) => (x.quantity > 1 ? parseInt(x.name.split("//")[2].split(",")[0]) * x.quantity : x.name.split("//")[2].split(",")[0]));
    let arrayMaximos = selectedIngredients.map((x) => (x.quantity > 1 ? parseInt(x.name.split("//")[2].split(",")[1]) * x.quantity : x.name.split("//")[2].split(",")[1]));
    return arrayMinimos.reduce((acumulador, valor) => acumulador + parseInt(valor), 0) + "," + arrayMaximos.reduce((acumulador, valor) => acumulador + parseInt(valor), 0);
  }

  function crear() {
    fetch(`http://192.168.1.124:9000/api/admin/generateEdificio`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        datos: { icono: datos.avatar, ...create, size: calcularSize() },
        ganancias: selectedReward,
        recetas: selectedIngredients,
      }),
    })
      .then((response) => response.json())
      .then((d) => {
        if (d.ok) {
          setSelectedReward([]);
          setCreate({ loading: false, time: "", descripcion: "", nombre: "", size: "", quantity: "", bonificacionNumero: "", bonificadores: "" });
          setSelectedIngredients([]);
          setDatos({ loading: false, avatar: [] });
        }
      })
      .catch((e) => console.log(e));
  }

  const handleIngredientChange = (event) => {
    setIngredient(event.target.value);
  };

  const handleQuantityChange = (event) => {
    setQuantity(event.target.value);
  };

  const handleIngredientAdd = () => {
    const ingredientObj = {
      id: Date.now(),
      name: ingredient,
      quantity: quantity,
    };

    setSelectedIngredients([...selectedIngredients, ingredientObj]);
    setIngredient("");
    setQuantity("");
  };

  const handleIngredientDelete = (id) => {
    const updatedIngredients = selectedIngredients.filter((ingredient) => ingredient.id !== id);

    setSelectedIngredients(updatedIngredients);
  };

  const handleRewardChange = (event) => {
    setRewards(event.target.value);
  };

  const handleRewardQuantity = (event) => {
    setRewardQuantity(event.target.value);
  };

  const handleRewardAdd = () => {
    const ingredientObj = {
      id: Date.now(),
      name: rewards,
      quantity: rewardQuantity,
    };

    setSelectedReward([...selectedReward, ingredientObj]);
    setRewards("");
    setRewardQuantity("");
  };

  const handleRewardDelete = (id) => {
    const updatedReward = selectedReward.filter((ingredient) => ingredient.id !== id);

    setSelectedReward(updatedReward);
  };

  const handleBonificadorNumero = (e) => {
    setCreate({ ...create, bonificacionNumero: e.target.value });
  };

  return (
    <div id="mas_abajo">
      <input placeholder="Nombre" onChange={(e) => handleTitle(e)} value={create.nombre}></input>
      {datos.loading ? (
        "Subiendo Imagen..."
      ) : (
        <div>
          icono:
          <img id="imagen_prueba" src={datos.avatar[0]} alt="la foto que subiste" />
          wallpaper:
          <img id="imagen_prueba" src={datos.avatar[1]} alt="la foto que subiste" />
        </div>
      )}
      <input type="file" accept="image/png, image/jpeg, image/svg+xml" multiple="true" onChange={(e) => handleImage(e)} />
      <input placeholder="descripcion" onChange={(e) => handleDescripcion(e)} value={create.descripcion}></input>
      <div>
        <input placeholder="bonificadores texto" onChange={(e) => handleBonificadores(e)} value={create.bonificadores}></input>
        <input placeholder="bonificadores numero" onChange={(e) => handleBonificadorNumero(e)} value={create.bonificacionNumero} />
      </div>
      <input placeholder="tiempo" onChange={(e) => handleTime(e)} value={create.time}></input>
      <input placeholder="tamaño" value={calcularSize()}></input>

      <div>
        <div>
          <label>Receta:</label>
          <select value={ingredient} onChange={handleIngredientChange}>
            <option value="">Selecciona Ingrediente</option>
            {habitaciones.map((ingredient) => (
              <option key={ingredient._id} value={ingredient._id + "//" + ingredient.nombre + "//" + ingredient.size}>
                {ingredient.nombre}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>Quantity:</label>
          <input type="text" value={quantity} onChange={handleQuantityChange} />
        </div>
        <button type="button" onClick={handleIngredientAdd}>
          Add Ingredient
        </button>
        <ul>
          {selectedIngredients.map((ingredient) => (
            <li key={ingredient.id}>
              {ingredient.name.split("//")[1]} - {ingredient.quantity}
              <button type="button" onClick={() => handleIngredientDelete(ingredient.id)}>
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <div>
          <label>Reward:</label>
          <select value={rewards} onChange={handleRewardChange}>
            <option value="">Selecciona Ingrediente</option>
            {recursos.map((ingredient) => (
              <option key={ingredient._id} value={ingredient._id + "//" + ingredient.nombre}>
                {ingredient.nombre}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>Quantity:</label>
          <input type="text" value={rewardQuantity} onChange={handleRewardQuantity} />
        </div>
        <button type="button" onClick={handleRewardAdd}>
          Add Ingredient
        </button>
        <ul>
          {selectedReward.map((ingredient) => (
            <li key={ingredient.id}>
              {ingredient.name.split("//")[1]} - {ingredient.quantity}
              <button type="button" onClick={() => handleRewardDelete(ingredient.id)}>
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>

      <button onClick={() => crear()}>Crear</button>
    </div>
  );
}
