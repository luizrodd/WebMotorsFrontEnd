import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function ListaSuspensa({ onIdsSelected }) {
  const [marcas, setMarcas] = useState([]);
  const [modelos, setModelos] = useState([]);
  const [versoes, setVersoes] = useState([]);
  const [marcaSelecionada, setMarcaSelecionada] = useState('');
  const [modeloSelecionado, setModeloSelecionado] = useState('');
  const [versaoSelecionada, setVersaoSelecionada] = useState('');
  const [idMarcaSelecionada, setIdMarcaSelecionada] = useState(null);
  const [idModeloSelecionado, setIdModeloSelecionado] = useState(null);
  const [idVersaoSelecionada, setIdVersaoSelecionada] = useState(null);

  // Carrega as opções de Marca ao montar o componente
  useEffect(() => {
    async function fetchMarcas() {
      try {
        const response = await axios.get('http://localhost:8000/marcas/');
        setMarcas(response.data);
      } catch (error) {
        console.error('Erro ao buscar marcas:', error);
      }
    }

    fetchMarcas();
  }, []);

  // Carrega as opções de Modelo quando a marca é selecionada
  useEffect(() => {
    async function fetchModelos() {
      if (marcaSelecionada) {
        try {
          const response = await axios.get(`http://localhost:8000/marcas/busca?NomeMarca=${marcaSelecionada}`);
          const modelosDaMarca = response.data[0]?.modelos || [];
          setModelos(modelosDaMarca);
          setIdMarcaSelecionada(response.data[0]?.id || null);
        } catch (error) {
          console.error('Erro ao buscar modelos:', error);
        }
      } else {
        setModelos([]);
        setIdMarcaSelecionada(null);
      }
    }

    fetchModelos();
  }, [marcaSelecionada]);

  // Carrega as opções de Versão quando o modelo é selecionado
  useEffect(() => {
    async function fetchVersoes() {
      if (modeloSelecionado) {
        try {
          const response = await axios.get(`http://localhost:8000/marcas/busca?NomeMarca=${marcaSelecionada}&NomeModelo=${modeloSelecionado}`);
          const versoesDoModelo = response.data[0]?.modelos[0]?.versoes || [];
          setVersoes(versoesDoModelo);
          setIdModeloSelecionado(response.data[0]?.modelos[0]?.id || null);
          
        } catch (error) {
          console.error('Erro ao buscar versões:', error);
        }
      } else {
        setVersoes([]);
        setIdModeloSelecionado(null);
      }
    }

    fetchVersoes();
  }, [modeloSelecionado]);

  // Atualiza o ID da versão selecionada quando uma versão é escolhida
  useEffect(() => {
    if (versaoSelecionada) {
      const versaoSelecionadaObj = versoes.find((versao) => versao.NomeVersao === versaoSelecionada);
      if (versaoSelecionadaObj) {
        setIdVersaoSelecionada(versaoSelecionadaObj.id);
      }
    } else {
      setIdVersaoSelecionada(null);
    }
    
    // Atualiza os IDs selecionados
    onIdsSelected(idMarcaSelecionada, idModeloSelecionado, idVersaoSelecionada);
  }, [versaoSelecionada, versoes, idMarcaSelecionada, idModeloSelecionado, idVersaoSelecionada]);

  return (
    <div>
      <h2>Filtro Inteligente</h2>
      <div>
        <label>Marca:</label>
        <select onChange={(e) => setMarcaSelecionada(e.target.value)}>
          <option value="">Selecione uma marca</option>
          {marcas.map((marca) => (
            <option key={marca.id}>{marca.NomeMarca}</option>
          ))}
        </select>
      </div>
      <div>
        <label>Modelo:</label>
        <select onChange={(e) => setModeloSelecionado(e.target.value)}>
          <option value="">Selecione um modelo</option>
          {modelos && modelos.map((modelo) => (
            <option key={modelo.id}>{modelo.NomeModelo}</option>
          ))}
        </select>
      </div>
      <div>
        <label>Versão:</label>
        <select onChange={(e) => setVersaoSelecionada(e.target.value)}>
          <option value="">Selecione uma versão</option>
          {versoes.map((versao) => (
            <option key={versao.id}>{versao.NomeVersao}</option>
          ))}
        </select>
      </div>
      {/* Aqui você pode exibir os resultados com base nas seleções feitas */}
    </div>
  );
}
