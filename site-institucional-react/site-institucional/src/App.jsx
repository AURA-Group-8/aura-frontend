import { useState } from 'react'
import viteLogo from '/vite.svg'
import './App.css'
import Navbar from './components/Navbar'
import Section_1 from './components/Section-1'
import Section_2 from './components/Section-2'
import Section_3 from './components/Section-3'
import Section_4 from './components/Section-4'
import Footer from './components/Footer'

function App() {

  return (
    <>
      <div className='scroll-smooth'>
        <header>
          <Navbar />
        </header>

        <section className="bg-[url('src/assets/bg-img.png')] bg-cover bg-center h-140 w-full" id='inicio'>
          <Section_1 />
        </section>

        <section className="bg-[#FFF3DC] bg-[url('src/assets/wave-background.png')] bg-center bg-cover h-140 w-full " id='sobre'>
          <Section_2 />
        </section>

        <section className="bg-[#FFF3DC] h-140 w-full " id='para_voce'>
          <Section_3 />
        </section>

        <section className="bg-[#241313] h-140 w-full " id='contato'>
          <Section_4 />
        </section>

        <section className="bg-[#1D0F0F] h-90 w-full " id='footer'>
          <Footer />
        </section>
      </div>

    </>
  )
}

export default App
