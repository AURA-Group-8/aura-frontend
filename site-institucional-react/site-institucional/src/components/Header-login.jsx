import { useNavigate } from "react-router-dom";

export default function Header() {

  const navigate = useNavigate();

    return (
      <header className="bg-[#FFF3DC] shadow-2xs w-full h-14 z-20 relative">
        <div className="max-w-7xl ml-2 py-4 flex items-center justify-between">

          <div className="text-2xl font-bold text-black ">

            <button className="border border-transparent hover:border-[#341C1C] hover:cursor-pointer" onClick={() => navigate("/")}><img className="h-8" src="/assets/Back.png" alt="botão de voltar" /></button>
          
          </div>

        </div>
      </header>
    );
  }
  