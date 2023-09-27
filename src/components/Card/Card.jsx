import styles from "./Card.module.css";
import { CiLocationOn } from "react-icons/ci";
import React from "react";
import { useNavigate } from "react-router-dom";
export default function Card(props) {
  const { carros } = props;
  const navigate = useNavigate();
  const formatPrice = (price) => {
    // Formate o preço usando toLocaleString
    return price.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
      minimumFractionDigits: 2,
    });
  };

  function redirecionarParaCarro(carro) {
    navigate(`/carro/${carro.id}`, { state: { carro } });
  }
  return (
    <div className={styles.CardBody}>
      {carros.map((carro) => (
        <div
          className={styles.card}
          onClick={() => redirecionarParaCarro(carro)}
        >
          <div className={styles.card_imagem}>
            <img src={carro.foto} alt="" />
          </div>
          <div className={styles.card_titulo}>
            <div>
              <strong>
                {carro.marcas.NomeMarca} {carro.modelos.NomeModelo}
              </strong>
            </div>
            <div>
              <span>{carro.versoes.NomeVersao}</span>
            </div>
          </div>
          <div className={styles.card_desc}>
            <div className={styles.card_preco}>
                <span>{formatPrice(carro.preco)}</span>
              <div>
                <span>Comprar</span>
              </div>
            </div>
            <div className={styles.card_info}>
              <span>
                {carro.anoFabricacao}/{carro.anoModelo}
              </span>
              <span>{carro.Quilometragem} km</span>
            </div>
          </div>
          <div className={styles.card_local}>
            <span>
              <CiLocationOn />
            </span>
            <span>{carro.Localidade}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
