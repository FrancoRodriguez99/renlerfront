import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCharacters } from "../../redux/actions/characterActions";
import { loadingClickedOnSomething, notloadingClickedOnSomething } from "../../redux/slices/loadingSlice";
import { calculateRemainingTime, formatTime } from "../../utils/timeUtils";

const Timer = ({ started, takes, id }) => {
  const [remainingTime, setRemainingTime] = useState("");
  const [finish, setFinish] = useState(false);

  const userId = useSelector((state) => state.userLoged._id);

  const dispatch = useDispatch();

  useEffect(() => {
    const remainingTime = calculateRemainingTime(started, takes);
    setRemainingTime(formatTime(remainingTime));

    if (remainingTime > 0) {
      setFinish(false);
      const interval = setInterval(() => {
        const newRemainingTime = calculateRemainingTime(started, takes);
        setRemainingTime(formatTime(newRemainingTime));

        if (newRemainingTime <= 0) {
          clearInterval(interval);
          setRemainingTime("0:0:0:0");
          setFinish(true);
          // Handle the logic for when the time reaches zero
          // For example, you can trigger an action or update the component state
          // to indicate that the crafting is complete.
        }
      }, 1000);

      return () => {
        clearInterval(interval);
      };
    } else {
      setFinish(true);
    }
  }, [started, takes]);

  function claim() {
    dispatch(loadingClickedOnSomething());
    fetch("https://back-renler.onrender.com/api/build/claimResourceFinish", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        idRecursoCrafteado: id,
      }),
    })
      .then((x) => x.json())
      .then((d) => {
        if (d.ok) dispatch(getCharacters(userId));
        dispatch(notloadingClickedOnSomething());
      });
  }

  return (
    <div className="crafting_second_box_inside_two">
      {finish ? (
        <div className="barra_recurso_resoruce_terminar_completed" onClick={() => claim()}>
          Terminar
        </div>
      ) : (
        <div className="barra_recurso_resoruce_terminar_falta">Terminar</div>
      )}

      <div className="box_show_time">{remainingTime}</div>
    </div>
  );
};

export default Timer;
