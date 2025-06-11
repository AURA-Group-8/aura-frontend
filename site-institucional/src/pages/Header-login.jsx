import { useNavigate } from "react-router-dom";

export default function Header({caminho}) {

  const navigate = useNavigate();

  return (
    <header className="bg-[#FFF3DC] shadow-2xs w-full h-16 z-20 relative">
      <div className="max-w-7xl ml-2 py-4 flex items-center justify-between">

        <div>
          <img src="/assets/Back.png" alt="" className="h-10 cursor-pointer" onClick={() => navigate(caminho)} />
        </div>

      </div>
    </header>
  );
}
