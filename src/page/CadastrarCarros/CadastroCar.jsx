import React, { useState } from 'react';
import ListaSuspensa from '../../components/ListaSuspensa/ListaSuspensa';
import FormCadastro from '../../components/FormCadastro/FormCadastro';

export default function CadastroCar() {
  const [idMarcaSelecionada, setIdMarcaSelecionada] = useState(null);
  const [idModeloSelecionado, setIdModeloSelecionado] = useState(null);
  const [idVersaoSelecionada, setIdVersaoSelecionada] = useState(null);

  const handleIdsSelected = (marcaId, modeloId, versaoId) => {
    setIdMarcaSelecionada(marcaId);
    setIdModeloSelecionado(modeloId);
    setIdVersaoSelecionada(versaoId);
  };

  return (
    <div style={{padding: '200px' }}>
      <div>
        <ListaSuspensa onIdsSelected={handleIdsSelected} />
      </div>
      <div>
        <FormCadastro
          idMarcaSelecionada={idMarcaSelecionada}
          idModeloSelecionado={idModeloSelecionado}
          idVersaoSelecionada={idVersaoSelecionada}
        />
      </div>
    </div>
  );
}
