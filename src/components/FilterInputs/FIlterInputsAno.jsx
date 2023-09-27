import { useNavigate, useSearchParams } from "react-router-dom";
import styles from "./FilterInputsAno.module.css";
export default function FilterInputs({ anoDe, setAnoDe, anoAte, setAnoAte }) {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const handleSubmitAno = (e) => {
    e.preventDefault();

    const newSearchParams = new URLSearchParams(searchParams);
    if (anoDe) {
      newSearchParams.set("minAnoModelo", anoDe);
    } else {
      newSearchParams.delete("minAnoModelo");
    }

    if (anoAte) {
      newSearchParams.set("maxAnoModelo", anoAte);
    } else {
      newSearchParams.delete("maxAnoModelo");
    }

    navigate(`?${newSearchParams.toString()}`);
  };

  return (
    <div className={styles.form_container}>
      <span>Ano</span>
      <form onSubmit={handleSubmitAno}>
        <div className={styles.input_container}>
          <input
            type="text"
            placeholder="de"
            onChange={(e) => setAnoDe(e.target.value)}
            value={anoDe}
          />
          <div>ex: 2000</div>
        </div>
        <div className={styles.input_container}>
          <input
            type="text"
            placeholder="até"
            onChange={(e) => setAnoAte(e.target.value)}
            value={anoAte}
          />
          <div>ex: 2006</div>
        </div>
        <button type="submit" >Filtrar</button>
      </form>
    </div>
  );
}
