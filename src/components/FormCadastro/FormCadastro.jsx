import axios from 'axios';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function FormCadastro({ idMarcaSelecionada, idModeloSelecionado, idVersaoSelecionada }) {
  const [Marca_ID, setMarcaId] = useState('');
  const [Modelo_ID, setModeloId] = useState('');
  const [Versao_ID, setVersaoId] = useState('');
  const [Quilometragem, setQuilometragem] = useState('');
  const [Cor, setCor] = useState('');
  const [Carroceria, setCarroceria] = useState('');
  const [Cambio, setCambio] = useState('');
  const [foto, setFoto] = useState('');
  const [preco, setPreco] = useState('');
  const [anoFabricacao, setAnoFabricacao] = useState('');
  const [anoModelo, setAnoModelo] = useState('');
  const [Combustivel, setCombustivel] = useState('');
  const [Localidade, setLocalidade] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    // Crie um objeto com os dados do formulário
    const formData = {
      Marca_ID: idMarcaSelecionada,
      Modelo_ID: idModeloSelecionado,
      Versao_ID: idVersaoSelecionada,
      Quilometragem,
      Cor,
      Carroceria,
      Cambio,
      foto,
      preco,
      anoFabricacao,
      anoModelo,
      Combustivel,
      Localidade,
    };

    // Chame a função assíncrona que envia os dados
    enviarDados(formData);
  };

  // Função assíncrona para enviar os dados
  const enviarDados = async (formData) => {
    try {
      // Faça uma requisição POST para enviar os dados para o servidor
      await axios.post('http://localhost:8000/carros', formData);
    } catch (error) {
      console.error('Erro ao enviar o formulário:', error);
    }
  };

  return (
    <div>
      <div>
        <h2>Formulário de Cadastro de Carro</h2>
        <form onSubmit={handleSubmit}>
          <div style={{display: 'none'}}>
            <label>Marca:</label>
            <input type="text" required={true} value={idMarcaSelecionada} onChange={(e) => setMarcaId(e.target.value)} />
          </div>
          <div style={{display: 'none'}}>
            <label>Modelo:</label>
            <input type="text" required={true} value={idModeloSelecionado} onChange={(e) => setModeloId(e.target.value)} />
          </div>
          <div style={{display: 'none'}}>
            <label>Versão:</label>
            <input type="text" required={true} value={idVersaoSelecionada} onChange={(e) => setVersaoId(e.target.value)} />
          </div>
          <div>
            <label>Quilometragem:</label>
            <input type="number" required={true} value={Quilometragem} onChange={(e) => setQuilometragem(e.target.value)} />
          </div>
          <div>
            <label>Cor:</label>
            <input type="text" value={Cor} required={true} onChange={(e) => setCor(e.target.value)} />
          </div>
          <div>
            <label>Carroceria:</label>
            <input type="text" value={Carroceria} required={true} onChange={(e) => setCarroceria(e.target.value)} />
          </div>
          <div>
            <label>Câmbio:</label>
            <input type="text" value={Cambio} required={true} onChange={(e) => setCambio(e.target.value)} />
          </div>
          <div>
            <label>Foto:</label>
            <input type="text" value={foto} required={true} onChange={(e) => setFoto(e.target.value)} />
          </div>
          <div>
            <label>Preço:</label>
            <input type="number" value={preco} required={true} onChange={(e) => setPreco(e.target.value)} />
          </div>
          <div>
            <label>Ano de Fabricação:</label>
            <input type="number" value={anoFabricacao} required={true} onChange={(e) => setAnoFabricacao(e.target.value)} />
          </div>
          <div>
            <label>Ano Modelo:</label>
            <input type="number" value={anoModelo} required={true} onChange={(e) => setAnoModelo(e.target.value)} />
          </div>
          <div>
            <label>Combustível:</label>
            <input type="text" value={Combustivel} required={true} onChange={(e) => setCombustivel(e.target.value)} />
          </div>
          <div>
            <label>Localidade:</label>
            <input type="text" value={Localidade} required={true} onChange={(e) => setLocalidade(e.target.value)} />
          </div>
          <button type="submit">Cadastrar</button>
        </form>
        <Link to="/carros">Ver carro</Link>
      </div>
    </div>
  );
}
