import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BsX } from "react-icons/bs"; // Importe o ícone para o botão de limpar
import styles from "./CardMarca.module.css";

export default function CardMarca({
  marcas,
  setMarcas,
  modelos,
  setModelos,
  versoes,
  setVersoes,
  marcaSelecionada,
  setMarcaSelecionada,
  modeloSelecionado,
  setModeloSelecionado,
  versaoSelecionada,
  setVersaoSelecionada,
}) {
  const navigate = useNavigate();

  const handleClearMarca = () => {
    setMarcaSelecionada("");
    setModeloSelecionado("");
    setVersaoSelecionada("");
  };

  const handleClearModelo = () => {
    setVersaoSelecionada("");
    setModeloSelecionado("");
  };

  const handleClearVersao = () => {
    setVersaoSelecionada("");
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get("http://localhost:8000/marcas/");
        setMarcas(response.data);
      } catch (error) {
        console.error("Erro ao buscar marcas:", error);
      }
    }

    fetchData();
  }, [setMarcas]);

  useEffect(() => {
    async function fetchModelos() {
      try {
        const response = await axios.get(
          `http://localhost:8000/marcas/busca?NomeMarca=${marcaSelecionada}`
        );
        setModeloSelecionado("");
        setVersaoSelecionada("");
        const modelosDaMarca = response.data[0]?.modelos || [];
        setModelos(modelosDaMarca);
      } catch (error) {
        console.error("Erro ao buscar modelos:", error);
      }
    }

    fetchModelos();
  }, [
    marcaSelecionada,
    setModelos,
    setModeloSelecionado,
    setVersaoSelecionada,
  ]);

  useEffect(() => {
    async function fetchVersoes() {
      if (modeloSelecionado) {
        try {
          const response = await axios.get(
            `http://localhost:8000/marcas/busca?NomeMarca=${marcaSelecionada}&NomeModelo=${modeloSelecionado}`
          );
          const versoesDoModelo = response.data[0]?.modelos[0]?.versoes || [];
          setVersoes(versoesDoModelo);
        } catch (error) {
          console.error("Erro ao buscar versões:", error);
        }
      } else {
        setVersoes([]);
      }
    }

    fetchVersoes();
  }, [marcaSelecionada, modeloSelecionado, setVersoes]);

  useEffect(() => {
    if (!marcaSelecionada) {
      setMarcaSelecionada("")
      setModeloSelecionado("")
      setVersaoSelecionada("")
    }

    let queryString = `?NomeMarca=${marcaSelecionada}`;
    if (modeloSelecionado) {
      queryString += `&NomeModelo=${modeloSelecionado}`;
    }

    if (versaoSelecionada) {
      queryString += `&NomeVersao=${versaoSelecionada}`;
    }

    navigate(queryString);
  }, [marcaSelecionada, modeloSelecionado, versaoSelecionada, navigate]);

  return (
    <div>
      <div className={styles.clearButtonContainer}>
        <button type="button" onClick={handleClearMarca}>
          <BsX />
        </button>
        <select
          onChange={(e) => setMarcaSelecionada(e.target.value)}
          className={styles.select}
        >
          <option value="">Selecione uma marca</option>
          {marcas.map((marca) => (
            <option key={marca.id}>{marca.NomeMarca}</option>
          ))}
        </select>
      </div>
      <div className={styles.clearButtonContainer}>
        <button type="button" onClick={handleClearModelo}>
          <BsX />
        </button>
        <select
          onChange={(e) => setModeloSelecionado(e.target.value)}
          className={styles.select}
        >
          <option value="">Selecione um modelo</option>
          {modelos &&
            modelos.map((modelo) => (
              <option key={modelo.id}>{modelo.NomeModelo}</option>
            ))}
        </select>
      </div>
      <div className={styles.clearButtonContainer}>
        <button type="button" onClick={handleClearVersao}>
          <BsX />
        </button>
        <select
          onChange={(e) => setVersaoSelecionada(e.target.value)}
          className={styles.select}
        >
          <option value="">Selecione uma versão</option>
          {versoes.map((versao) => (
            <option key={versao.id}>{versao.NomeVersao}</option>
          ))}
        </select>
      </div>
    </div>
  );
}
