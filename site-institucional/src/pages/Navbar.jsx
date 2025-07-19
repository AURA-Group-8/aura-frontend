import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"

function Navbar() {

  const navigate = useNavigate();

  const [opcao, setOpcao] = useState('');

  const opcaoLogin = (e) => {
    const loginSelecionado = e.target.value;

    setOpcao(loginSelecionado);

    if (loginSelecionado === "cliente") {

      navigate("/pages/client-pages/Login");

    } else if (loginSelecionado === "profissional") {

      navigate("/pages/professional-pages/Login");
    }
  }

  return (
    <>
      <div className="w-full h-15 fixed shadow-md z-100">
        <div className="w-full mx-auto h-full flex justify-around  items-center bg-[#241313] rounded-bl-2xl rounded-br-2xl">

          <img src="/assets/LOGO.png" alt="" className="max-h-10 " />

          <ul className="flex flex-row justify-around w-100 gap-8 text-[#FFF3DC] font-bold rounded-xl text-xl">
            <li><a href="#inicio" >Início</a></li>
            <li><a href="#sobre">Sobre</a></li>
            <li><a href="#para_voce">Pra você</a></li>
            <li><a href="#contato">Contatos</a></li>
          </ul>

          <div className="flex gap-2 ">
            <button className="border bg-[#FFF3DC] border-[#982546] text-[#982546] w-30 h-9 rounded-xl cursor-pointer hover:bg-[#d8d3af] transition duration-300 font-medium text-xl" onClick={() => navigate("/pages/client-pages/Cadastro")}>Cadastro</button>

            <select value={opcao} onChange={opcaoLogin}  className="appearance-none bg-[#982546] text-center text-[#FFF3DC] rounded-xl w-30 h-9 cursor-pointer hover:bg-[#7f1d3f] transition duration-300 font-medium text-xl">
              <option value="" disabled hidden>Login</option>
              <option value="cliente" className="bg-amber-50 text-[#982546] cursor-pointe">Sou cliente</option>
              <option value="profissional" className="bg-amber-50 text-[#982546] cursor-pointer">Sou profissional</option>
            </select>

          </div>

        </div>
      </div>
    </>
  )

}

export default Navbar