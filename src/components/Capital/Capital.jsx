import { useSelector } from "react-redux";
import CraftingSlot from "../CraftingSlot/CraftingSlot";
import "./Capital.css";

export default function Capital() {
  const character = useSelector((state) => state.character.characterSelected);

  let array = character.craftingRecursos;

  const filledArray = [...array, ...Array.from({ length: 3 - array.length }, () => ({ empty: true }))];

  return (
    <div id="capital_box">
      <h1 id="capital_title">Capital</h1>
      {filledArray.map((x, i) => (
        <CraftingSlot key={"crafintslotkey" + i} crafting={x} />
      ))}
    </div>
  );
}
