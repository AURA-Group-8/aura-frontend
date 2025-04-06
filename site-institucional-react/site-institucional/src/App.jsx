import { useState } from 'react'
import viteLogo from '/vite.svg'
import './App.css'
import Navbar from './components/Navbar'

function App() {

  return (
    <>
      <header>
        <Navbar />
      </header>
      <section className="bg-[url('src/assets/bg-img.png')] bg-cover bg-center h-140 w-full">
        <div className="h-full flex flex-col justify-center items-center gap-15">
          <img src="src/assets/Bem-Vindo.png" alt="" className='h-20'/>
          <span className="text-white text-xl">Facilidade para clientes, organização para profissionais!</span>
          <button className="bg-[#982546] border border-[#FFF3DC] text-[#FFF3DC] w-30 h-8 rounded-xl">Criar conta</button>
        </div>
      </section>
    </>
  )
}

export default App
