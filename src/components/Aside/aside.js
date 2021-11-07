import { useEffect, useState } from "react/cjs/react.development";
import "./aside.css";

function Aside(props) {
  const { documents, openModal } = props;

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const credit = [];
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debit = [];

  documents.map((e) => {
    return e.type === "credit" ? credit.push(e) : debit.push(e);
  });

  const [creditValue, setCreditValue] = useState(0);
  const [debitValue, setDebitValue] = useState(0);
  const [totalValue, setTotalValue] = useState(0);

  useEffect(() => {
    let numberCred = 0;
    for (let i of credit) {
      numberCred += i.value;
    }
    setCreditValue(
      "R$ " + String((numberCred / 100).toFixed(2)).replace(".", ",")
    );

    let numberDeb = 0;
    for (let i of debit) {
      numberDeb += i.value;
    }
    setDebitValue(
      "R$ " + String((numberDeb / 100).toFixed(2)).replace(".", ",")
    );

    setTotalValue(
      "R$ " +
        String(((numberCred - numberDeb) / 100).toFixed(2)).replace(".", ",")
    );
  }, [credit, debit]);

  return (
    <aside>
      <div className="container-resume">
        <h2>Resumo</h2>

        <p>
          <span>Entradas</span>
          <span className="in">{creditValue}</span>
        </p>
        <p>
          <span>Saidas</span>
          <span className="out">{debitValue}</span>
        </p>

        <p className="saldo">
          <span>Saldo</span>
          <span className="balance">{totalValue}</span>
        </p>
      </div>

      <button onClick={() => openModal("add")} className="btn-add">
        Adicionar Registro
      </button>
    </aside>
  );
}

export default Aside;
