import "./filter.css";
import iconFilter from "../../images/icons8-filtro-481.svg";
import { useState } from "react";
import ButtonFilter from "../Button Filter/button-filter";

function Filter(props) {
  const { applyFilters, categories } = props;

  const [hidden, setHidden] = useState("anime");

  const days = [
    "Segunda",
    "Terça",
    "Quarta",
    "Quinta",
    "Sexta",
    "Sabado",
    "domingo",
  ];

  const [minValue, setMinValue] = useState();
  const [maxValue, setMaxValue] = useState();

  const [daysFilter, setDaysFilter] = useState([]);
  const [categoryFilter, setCategoryFilter] = useState([]);

  const [clear, setClear] = useState(false);

  function handleAplyFilters(clear) {
    if (!clear) {
      const objFilter = {
        daysFilter,
        categoryFilter,
        minValue:
          minValue && Number(minValue.trim().replace(",", "").replace(".", "")),
        maxValue:
          maxValue && Number(maxValue.trim().replace(",", "").replace(".", "")),
      };
      applyFilters(objFilter);
    } else {
      const objFilter = {
        daysFilter: [],
        categoryFilter: [],
        minValue: 0,
        maxValue: 0,
      };
      applyFilters(objFilter);
    }
  }

  function handleDay(day, type) {
    if (type === "day") {
      if (daysFilter.includes(day)) {
        const newArr = daysFilter;
        newArr.splice(newArr.indexOf(day), 1);

        setDaysFilter(newArr);
      } else {
        setDaysFilter([...daysFilter, day]);
      }
    } else {
      if (categoryFilter.includes(day)) {
        const newArr = categoryFilter;
        newArr.splice(newArr.indexOf(categoryFilter), 1);
        setCategoryFilter(newArr);
      } else {
        setCategoryFilter([...categoryFilter, day]);
      }
    }
  }

  function handleClearFilters() {
    setMinValue(0);
    setMaxValue(0);
    setDaysFilter([]);
    setCategoryFilter([]);
    handleAplyFilters(true);

    clear ? setClear(false) : setClear(true);
  }

  return (
    <div className="filters">
      <button
        className="open-filters-button "
        onClick={() =>
          hidden === "animation" ? setHidden("") : setHidden("animation")
        }
      >
        <img src={iconFilter} alt="" /> Filtrar
      </button>
      <div className={`container-filters anime ${hidden} `}>
        <div className="div-dias">
          <p>Dia da semana</p>
          <div>
            {days.map((e, index) => (
              <ButtonFilter
                clear={clear}
                type={"day"}
                handleDay={handleDay}
                id={index}
                text={e}
              />
            ))}
          </div>
        </div>

        <div className="div-categorias">
          <p>Categorias</p>
          <div>
            {categories.map((e, index) => (
              <ButtonFilter
                clear={clear}
                type={"category"}
                id={index}
                handleDay={(e) => handleDay(e)}
                text={e}
              />
            ))}
          </div>
        </div>

        <div className="div-valor">
          <p>Valor</p>

          <label htmlFor="min-value">Min </label>
          <input
            onChange={(e) => setMinValue(e.target.value)}
            value={minValue > 0 ? minValue : ""}
            id="min-value"
            type="number"
            placeholder="Ex:50,00"
          />

          <label htmlFor="max-value">Max</label>
          <input
            onChange={(e) => setMaxValue(e.target.value)}
            value={maxValue > 0 ? maxValue : ""}
            id="max-value"
            type="number"
            placeholder="Ex:50,00"
          />
        </div>

        <div className="btn-clear-apply">
          <button
            className="btn-clear-filters"
            onClick={() => handleClearFilters()}
          >
            Limpar Filtros
          </button>
          <button
            className="btn-apply-filters"
            onClick={() => handleAplyFilters()}
          >
            Aplicar Filtros
          </button>
        </div>
      </div>
    </div>
  );
}

export default Filter;
