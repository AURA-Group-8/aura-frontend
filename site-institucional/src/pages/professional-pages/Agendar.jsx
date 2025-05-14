import { use } from "react";
import NavbarPro from "./Navbar";
import { useNavigate } from "react-router-dom";

export default function Agendar() {

    const navigate = useNavigate();

    return (
        <>
            <NavbarPro caminho={"/pages/professional-pages/Dashboard"} />
            <div className="w-full h-screen bg-[#FFF3DC] flex flex-col justify-center items-center">
                <h1 className="text-[#982546] font-bold text-2xl">Agendar</h1>
                <div className="border-1 border-[#982546] bg-[#FFF3DC] w-150 h-100 rounded-2xl flex flex-row justify-center mt-5">
                    <div className="flex flex-col w-120">
                        <p className=" text-xl mt-2">Serviços</p>
                        <select className="bg-amber-50 p-2 rounded-2xl border-1 border-[#982546] w-full h-10 mt-2">
                            <option value=""></option>
                            <option value=""></option>
                        </select>
                        
                        <div className="border-1 border-[#982546] bg-[#FFF3DC] w-full h-30 mt-5 rounded-2xl overflow-y-auto">

                        </div>

                        <p className=" text-xl mt-2">Clientes</p>
                        <select className="bg-amber-50 p-2 rounded-2xl border-1 border-[#982546] w-full h-10 mt-2">
                            <option value=""></option>
                            <option value=""></option>
                        </select>

                        <div className="flex flex-row w-full justify-between mt-4">
                            <button className="border-1 border-[#982546] py-2 px-8 rounded-2xl text-[#982546] cursor-pointer">Cancelar</button>

                            <button className="bg-[#982546] py-2 px-4 rounded-2xl text-[#FFF3DC] flex flex-row gap-2 items-center cursor-pointer hover:bg-[#b36078]" onClick={() => navigate("/pages/professional-pages/DataHora")}>Selecionar data e hora<img src="/assets/Calendar.png" className="h-8"/></button>
                        </div>

                    </div>
                </div>

            </div>
        </>
    )
}