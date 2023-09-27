import React from "react";
import styles from "./Home.module.css";
import { Link } from "react-router-dom";
import { AiOutlineSearch } from "react-icons/ai";

export default function Home() {
  return (
    <div>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.top}>
            <ul className={styles.menu}>
              <li>Comprar carros</li>
              <li>Comprar motos</li>
            </ul>
          </div>
          <div className={styles.bottom}>
            <div className={styles.searchContainer}>
              <span className={styles.searchIcon}>
                <AiOutlineSearch />
              </span>
              <input
                type="text"
                placeholder="Digite Marca ou modelo do carro"
              />
            </div>
            <Link to="/carros/">
              <button className={styles.verOfertasButton}>Ver Ofertas</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
