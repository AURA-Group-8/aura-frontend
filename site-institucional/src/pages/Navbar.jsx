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
      <div className="w-full h-15 bg-[#FFF3DC] fixed">
        <div className="w-full mx-auto h-full flex justify-around  items-center">

          <img src="/assets/logo-escuro-horizontal.png" alt="" className="max-h-30 " />

          <ul className="flex flex-row justify-around w-80 gap-8 ">
            <li><a href="#inicio" className="text-[#982546] font-bold">Início</a></li>
            <li><a href="#sobre" className="text-[#982546] font-bold">Sobre</a></li>
            <li><a href="#para_voce" className="text-[#982546] font-bold">Pra você</a></li>
            <li><a href="#contato" className="text-[#982546] font-bold">Contatos</a></li>
          </ul>

          <div className="flex gap-2 ">
            <button className="bg-transparent border border-[#982546] text-[#982546] w-20 h-9 rounded-xl cursor-pointer" onClick={() => navigate("/pages/client-pages/Cadastro")}>Cadastro</button>

            <select value={opcao} onChange={opcaoLogin}  className="appearance-none bg-[#982546] text-center text-[#FFF3DC] rounded-xl w-30 h-9 cursor-pointer">
              <option value="" disabled hidden>Login</option>
              <option value="cliente" className="bg-amber-50 text-[#982546] cursor-pointer">Sou cliente</option>
              <option value="profissional" className="bg-amber-50 text-[#982546] cursor-pointer">Sou profissional</option>
            </select>

          </div>

        </div>
      </div>
    </>
  )

}

export default Navbar