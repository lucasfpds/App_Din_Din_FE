import { useState } from "react";
import { useEffect } from "react";

function ButtonFilterCategory(props) {
  const { text, id, handleDay, type, clear, clearCat } = props;

  const [icon, setIcon] = useState("+");
  const [clickedButton, setClickedButton] = useState("");

  function handleBtnDay() {
    icon === "+" ? setIcon("x") : setIcon("+");
    clickedButton === ""
      ? setClickedButton("btnFilterClicked")
      : setClickedButton("");
  }

  function handleClick(day, type) {
    handleDay(day, type);
    handleBtnDay();
  }

  useEffect(() => {
    setIcon("+");
    setClickedButton("");
  }, [clear]);

  useEffect(() => {
    setIcon("+");
    setClickedButton("");
  }, [clearCat]);

  return (
    <button
      id={id}
      className={`container-chip ${clickedButton}`}
      onClick={(e) => handleClick(text, type)}
    >
      {text}
      <p id={id} className="icon-filter">
        {icon}
      </p>
    </button>
  );
}

export default ButtonFilterCategory;
