import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"

function Navbar() {

  const navigate = useNavigate();

  const [menuOpen, setMenuOpen] = useState(false);

  const opcaoLogin = () => {
    
      navigate("/pages/client-pages/Login");
  }

  return (
    <>

      <div className="w-full h-15 fixed shadow-md z-100 rounded-bl-2xl rounded-br-2xl xl:text-xl">
        <div className="w-full h-full flex justify-around items-center bg-[#241313] rounded-bl-2xl rounded-br-2xl">

          <img src="/assets/LOGO.png" alt="" className="max-h-10 m-2" />

          <button className="md:hidden p-2 ml-auto" onClick={() => setMenuOpen(!menuOpen)} >
            <svg
              className="w-8 h-8 text-[#FFF3DC]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8h16M4 16h16" />
            </svg>
          </button>

          {menuOpen && (
            <div className="absolute top-12 right-0 bg-[#241313] rounded-bl-2xl rounded-br-2xl shadow-lg">
              <ul className="flex flex-col p-4">
                <li className="py-2">
                  <a href="#inicio" className="text-[#FFF3DC]">Início</a>
                </li>
                <li className="py-2">
                  <a href="#sobre" className="text-[#FFF3DC]">Sobre</a>
                </li>
                <li className="py-2">
                  <a href="#para_voce" className="text-[#FFF3DC]">Pra você</a>
                </li>
                <li className="py-2">
                  <a href="#contato" className="text-[#FFF3DC]">Contatos</a>
                </li>
              </ul>

              <div className="flex gap-2 p-4">
                <button className="appearance-none bg-[#982546] text-center text-[#FFF3DC] rounded-xl w-30 h-9 cursor-pointer hover:bg-[#7f1d3f] transition duration-300 font-medium" onClick={opcaoLogin}>
                  Login
                </button>
              </div>
            </div>
          )}

          
            <ul className="hidden md:flex flex-row justify-around w-100 xl:w-150 gap-8  text-[#FFF3DC] font-bold rounded-xl">
              <li><a href="#inicio" >Início</a></li>
              <li><a href="#sobre">Sobre</a></li>
              <li><a href="#para_voce">Pra você</a></li>
              <li><a href="#contato">Contatos</a></li>
            </ul>

            <div className="flex gap-2 ">

              <button className="hidden md:block appearance-none bg-[#982546] text-center text-[#FFF3DC] rounded-xl w-30 h-9 cursor-pointer hover:bg-[#7f1d3f] transition duration-300 font-medium" onClick={opcaoLogin}>
                Login
              </button>

            </div>
          </div>

        </div>
    </>
  )

}

export default Navbar