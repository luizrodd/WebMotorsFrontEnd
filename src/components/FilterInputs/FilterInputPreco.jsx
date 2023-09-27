import React from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import styles from "./FilterInputsAno.module.css";
export default function FilterInputPreco({
  precoDe,
  setPrecoDe,
  precoAte,
  setPrecoAte,
}) {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const handleSubmitPreco = (e) => {
    e.preventDefault();

    const newSearchParams = new URLSearchParams(searchParams);
    if (precoDe) {
      newSearchParams.set("minPreco", precoDe);
    } else {
      newSearchParams.delete("minPreco");
    }

    if (precoAte) {
      newSearchParams.set("maxPreco", precoAte);
    } else {
      newSearchParams.delete("maxPreco");
    }

    navigate(`?${newSearchParams.toString()}`);
  };
  return (
    <div className={styles.form_container}>
      <span>Preco</span>
      <form onSubmit={handleSubmitPreco}>
        <div className={styles.input_container}>
          <input
            type="text"
            placeholder="de"
            onChange={(e) => setPrecoDe(e.target.value)}
            value={precoDe}
          />
          <div>ex: R$ 30000</div>
        </div>
        <div className={styles.input_container}>
          <input
            type="text"
            placeholder="até"
            onChange={(e) => setPrecoAte(e.target.value)}
            value={precoAte}
          />
          <div>ex: R$ 50000</div>
        </div>
        <button type="submit" >Filtrar</button>
      </form>
    </div>
  );
}
