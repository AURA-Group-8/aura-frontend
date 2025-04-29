import { useState } from 'react'

import { BrowserRouter, Routes, Route } from "react-router-dom";
import ConfigCli from './components/client-screens/Config';
import Cadastro from './components/client-screens/Cadastro'
import Login from './components/client-screens/Login'
import HomePage from './components/HomePage'
import AlterarSenha from './components/ChangePassword'
import HomeClient from './components/client-screens/Home-client'
import Contato from './components/Contato'

function App() {

  return (
    <>

      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/components/client-screens/Cadastro" element={<Cadastro />} />
          <Route path="/components/client-screens/Login" element={<Login />} />
          <Route path="/components/AlterarSenha" element={<AlterarSenha/>} />
          <Route path="/components/Contato" element={<Contato/>} />

          <Route path="/components/client-screens/Home-client" element={<HomeClient/>} />
          <Route path="/components/client-screens/Config" element={<ConfigCli />} />
        </Routes>
      </BrowserRouter>

    </>
  )
}

export default App
