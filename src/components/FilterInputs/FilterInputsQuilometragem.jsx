import React from 'react'
import { useNavigate, useSearchParams } from "react-router-dom";
import styles from "./FilterInputsAno.module.css";

export default function FilterInputsQuilometragem({kmDe,setKmDe,kmAte,setKmAte}) {
const navigate = useNavigate();
const [searchParams, setSearchParams] = useSearchParams();

const handleSubmitKm = (e) => {
  e.preventDefault();

  const newSearchParams = new URLSearchParams(searchParams);
  if (kmDe) {
    newSearchParams.set("minQuilometragem", kmDe);
  } else {
    newSearchParams.delete("minQuilometragem");
  }
  if (kmAte) {
    newSearchParams.set("maxQuilometragem", kmAte);
  } else {
    newSearchParams.delete("maxQuilometragem");
  }

  navigate(`?${newSearchParams.toString()}`);
};
  return (
    <div className={styles.form_container}>
      <span>Quilometragem</span>
      <form onSubmit={handleSubmitKm}>
        <div className={styles.input_container}>
          <input
            type="text"
            placeholder="de"
            onChange={(e) => setKmDe(e.target.value)}
            value={kmDe}
          />
          <div>ex: 1000km</div>
        </div>
        <div className={styles.input_container}>
          <input
            type="text"
            placeholder="até"
            onChange={(e) => setKmAte(e.target.value)}
            value={kmAte}
          />
          <div>ex: 5000km</div>
        </div>
        <button type="submit" >Filtrar</button>
      </form>
    </div>
  )
}
