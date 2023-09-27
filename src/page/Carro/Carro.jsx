import React from "react";
import { useLocation } from "react-router-dom";
import styles from "./Carro.module.css";
export default function Carro() {
  const { state } = useLocation();
  const { carro } = state;
  return (
    <div>
      <div className={styles.carro}>
        <div className={styles.carro_img}>
          <img src={carro.foto} alt="" />
        </div>
        <div className={styles.carro_detalhes}>
          <div className={styles.carro_detalhes_titulo}>
            <div className={styles.carro_detalhes_titulo_MarcaModelo}>
              <span>
                {carro.marcas.NomeMarca} {carro.modelos.NomeModelo}
              </span>
            </div>
            <div className={styles.carro_detalhes_titulo_versao}>
              <span>{carro.versoes.NomeVersao}</span>
            </div>
          </div>
          <div className={styles.carro_detalhes_inspecoes}>
            <div>
              <p>Localidade</p>
              <p>{carro.Localidade}</p>
            </div>
            <div>
              <p>Ano</p>
              <p>{carro.anoFabricacao}/{carro.anoModelo}</p>
            </div>
            <div>
              <p>KM</p>
              <p>{carro.Quilometragem}</p>
            </div>
            <div>
              <p>Cambio</p>
              <p>{carro.Cambio}</p>
            </div>
            <div>
              <p>Combustivel</p>
              <p>{carro.Combustivel}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
