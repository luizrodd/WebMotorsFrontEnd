import React, { useEffect, useState } from "react";
import styles from "./Loja.module.css";
import Card from "../../components/Card/Card";
import axios from "axios";
import CardMarca from "../../components/FIlterSelection/FilterSelection";
import { BsSearch } from "react-icons/bs";
import { useSearchParams } from "react-router-dom";
import FilterInputs from "../../components/FilterInputs/FIlterInputsAno";
import Pesquisa from "../../components/Pesquisa/Pesquisa";
import FilterInputsQuilometragem from "../../components/FilterInputs/FilterInputsQuilometragem";
import FilterInputPreco from "../../components/FilterInputs/FilterInputPreco";

export default function Loja() {
  const [searchParams, setSearchParams] = useSearchParams();
  const NomeMarca = searchParams.get("NomeMarca");
  const NomeModelo = searchParams.get("NomeModelo");
  const NomeVersao = searchParams.get("NomeVersao");
  const minAnoModelo = searchParams.get("minAnoModelo");
  const maxAnoModelo = searchParams.get("maxAnoModelo");
  const minQuilometragem = searchParams.get("minQuilometragem");
  const maxQuilometragem = searchParams.get("maxQuilometragem");
  const minPreco = searchParams.get("minPreco");
  const maxPreco = searchParams.get("maxPreco");
  const Localidade = searchParams.get("Localidade")
  const [marcaSelecionada, setMarcaSelecionada] = useState("");
  const [modeloSelecionado, setModeloSelecionado] = useState("");
  const [versaoSelecionada, setVersaoSelecionada] = useState("");
  const [anoDe, setAnoDe] = useState("");
  const [anoAte, setAnoAte] = useState("");
  const [kmDe, setKmDe] = useState("");
  const [kmAte, setKmAte] = useState("");
  const [precoDe, setPrecoDe] = useState("");
  const [precoAte, setPrecoAte] = useState("");
  const [localidade, setLocalidade] = useState("")
  const [carros, setCarros] = useState([]);
  const [modelos, setModelos] = useState([]);
  const [versoes, setVersoes] = useState([]);
  const [marcas, setMarcas] = useState([]);
  const [search, setSearch] = useState("");

  async function fetchCarros() {
    try {
      const response = await axios.get(`http://localhost:8000/carros/`);
      setCarros(response.data);
    } catch (error) {
      console.error("Erro ao buscar carros:", error);
    }
  }

  async function fetchCarrosParams(params) {
    try {
      const response = await axios.get(
        `http://localhost:8000/carros/busca${params}`
      );
      setCarros(response.data);
    } catch (error) {
      console.error("Erro ao buscar carros:", error);
    }
  }

  async function fetchMarcas() {
    try {
      const response = await axios.get("http://localhost:8000/marcas/");
      setMarcas(response.data);
    } catch (error) {
      console.error("Erro ao buscar marcas:", error);
    }
  }

  useEffect(() => {
    fetchMarcas();
    const queryParams = [];
    if (NomeMarca) queryParams.push(`NomeMarca=${NomeMarca}`);
    if (NomeModelo) queryParams.push(`NomeModelo=${NomeModelo}`);
    if (NomeVersao) queryParams.push(`NomeVersao=${NomeVersao}`);
    if (minAnoModelo) queryParams.push(`minAnoModelo=${minAnoModelo}`);
    if (maxAnoModelo) queryParams.push(`maxAnoModelo=${maxAnoModelo}`);
    if (marcaSelecionada) queryParams.push(`NomeMarca=${marcaSelecionada}`);
    if (modeloSelecionado) queryParams.push(`NomeModelo=${modeloSelecionado}`);
    if (versaoSelecionada) queryParams.push(`NomeVersao=${versaoSelecionada}`);
    if (minQuilometragem) queryParams.push(`minQuilometragem=${minQuilometragem}`);
    if (maxQuilometragem) queryParams.push(`maxQuilometragem=${maxQuilometragem}`);
    if (minPreco) queryParams.push(`minPreco=${minPreco}`);
    if (maxPreco) queryParams.push(`maxPreco=${maxPreco}`);
    if (Localidade) queryParams.push(`Localidade=${Localidade}`)
      const queryString = queryParams.length > 0 ? `?${queryParams.join("&")}` : "";

    if (
      !NomeMarca &&
      !NomeModelo &&
      !NomeVersao &&
      !minAnoModelo &&
      !maxAnoModelo &&
      !minQuilometragem &&
      !maxQuilometragem &&
      !minPreco &&
      !maxPreco &&
      !Localidade
    ) {
      fetchCarros();
    } else {
      fetchCarrosParams(queryString);
    }
  }, [
    NomeMarca,
    NomeModelo,
    NomeVersao,
    minAnoModelo,
    maxAnoModelo,
    marcaSelecionada,
    modeloSelecionado,
    versaoSelecionada,
    minQuilometragem,
    maxQuilometragem,
    minPreco,
    maxPreco,
    Localidade,
  ]);

  return (
    <div className={styles.Main}>
      <div className={styles.left}>
        <div className={styles.left_carros_title}>
          <span>Carros</span>
        </div>
        <div className={styles.left_searchBar}>
          <span>Localização</span>
          <div>
            <Pesquisa size={300} placeholder={"Digite sua Cidade"} localidade={localidade} setLocalidade={setLocalidade}/>
          </div>
        </div>
        <div className={styles.left_brands}>
          <div>
            <span>Marca do carro</span>
          </div>
          <div className={styles.left_marca}>
            <CardMarca
              marcas={marcas}
              setModelos={setModelos}
              modelos={modelos}
              setVersoes={setVersoes}
              versoes={versoes}
              setMarcas={setMarcas}
              setMarcaSelecionada={setMarcaSelecionada}
              marcaSelecionada={marcaSelecionada}
              setModeloSelecionado={setModeloSelecionado}
              modeloSelecionado={modeloSelecionado}
              setVersaoSelecionada={setVersaoSelecionada}
              versaoSelecionada={versaoSelecionada}
            />
          </div>
        </div>
        <div className={styles.left_detalhes}>
          <div>
            <FilterInputs
              anoDe={anoDe}
              setAnoDe={setAnoDe}
              anoAte={anoAte}
              setAnoAte={setAnoAte}
            />
          </div>
          <div>
            <FilterInputsQuilometragem
              kmDe={kmDe}
              setKmDe={setKmDe}
              kmAte={kmAte}
              setKmAte={setKmAte}
            />
          </div>
          <div>
            <FilterInputPreco
              precoDe={precoDe}
              setPrecoDe={setPrecoDe}
              precoAte={precoAte}
              setPrecoAte={setPrecoAte}
            />
          </div>
        </div>
      </div>
      <div className={styles.right}>
        <div className={styles.right_top}>
          <div>|||</div>
          <div>
            <Pesquisa setSearch={setSearch} search={search} />
          </div>
        </div>
        <div>
          <Card carros={carros} />
        </div>
      </div>
    </div>
  );
}
