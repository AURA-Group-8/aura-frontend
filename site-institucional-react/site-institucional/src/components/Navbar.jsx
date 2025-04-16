function Navbar() {

  return (
    <>
      <div className="w-full h-15 bg-[#FFF3DC] fixed">
        <div className="w-full mx-auto h-full flex justify-around items-center">

          <img src="src/assets/logo-aura-escuro.png" alt="" className="max-h-30" />

          <ul className="flex flex-row justify-around w-80 ">
            <li><a href="" className="text-[#982546] font-bold">Início</a></li>
            <li><a href="" className="text-[#982546] font-bold">Sobre</a></li>
            <li><a href="" className="text-[#982546] font-bold">Pra você</a></li>
            <li><a href="" className="text-[#982546] font-bold">Contato</a></li>
          </ul>

          <div className="flex gap-5">
            <button className="bg-transparent  border border-[#982546] text-[#982546] w-20 h-9 rounded-xl">Cadastro</button>
            <select defaultValue="" className=" bg-[#982546] text-center text-[#FFF3DC] rounded-xl p-2 " >
              <option value="" disabled hidden>Login</option>
              <option value="" className="bg-white text-[#982546] text-start ">Sou Cliente</option>
              <option value="" className="bg-white text-[#982546] text-start ">Sou Profissional</option>
            </select>
          </div>

        </div>
      </div>
    </>
  )

}

export default Navbar