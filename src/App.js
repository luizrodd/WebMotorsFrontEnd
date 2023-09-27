import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import CadastroCar from './page/CadastrarCarros/CadastroCar';
import Loja from './page/Loja/Loja';
import Home from './page/Home/Home';
import Carro from './page/Carro/Carro';

export default function App() {
  return (
    <div>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/carros/" element={<Loja />}></Route>
          <Route path="/carro/:id" element={<Carro />}></Route>
          <Route path="/adm" element={<CadastroCar />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
