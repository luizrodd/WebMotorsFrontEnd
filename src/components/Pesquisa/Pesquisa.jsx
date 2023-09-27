import React from "react";
import { BsSearch, BsX } from "react-icons/bs"; // Importe o ícone para o botão de limpar
import styles from "./Pesquisa.module.css";
import { useNavigate } from "react-router-dom";
import { useSearchParams } from "react-router-dom";

export default function Pesquisa({
  buscaProps,
  setBuscaProps,
  localidade,
  setLocalidade,
}) {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const newSearchParams = new URLSearchParams(searchParams);
    if (localidade) {
      newSearchParams.set("Localidade", localidade);
    } else {
      newSearchParams.delete("Localidade");
    }
    navigate(`?${newSearchParams.toString()}`);
  };

  // Função para limpar o campo de localidade
  const handleClear = () => {
    setLocalidade(""); // Limpa o campo de localidade
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.delete("Localidade"); // Remove o parâmetro de consulta
    navigate(`?${newSearchParams.toString()}`);
  };

  return (
    <div className={styles.container}>
      <form action="" onSubmit={handleSubmit}>
        <div className={styles.pesquisa}>
          <span className={styles.icon}>
            <BsSearch />
          </span>
          <input
            className={styles.input}
            type="text"
            placeholder="Busca"
            onChange={(e) => setLocalidade(e.target.value)}
            value={localidade}
          />
          {localidade && ( // Renderiza o botão de limpar apenas se o campo de localidade não estiver vazio
            <button
              type="button"
              className={styles.clearButton}
              onClick={handleClear}
            >
              <BsX />
            </button>
          )}
          <button type="submit" style={{ display: "none" }}>
            Filtrar
          </button>
        </div>
      </form>
    </div>
  );
}
