import NavbarPro from "./components/Navbar"
import { useLocation } from "react-router-dom";

export default function Confirmar() {

    return (
        <>
            <NavbarPro caminho={"/pages/professional-pages/Agendar"} />

            <div className="w-full h-screen bg-[#FFF3DC] flex flex-col justify-center items-center">
                <h1 className="text-[#982546] font-bold text-2xl">Confirmar agendamento</h1>
                <div className="border-1 border-[#982546] bg-[#FFF3DC] w-150 h-60 rounded-2xl flex flex-col mt-5">
                    <div className=" bg-[#982546] w-full h-10 rounded-t-2xl flex p-2 items-center">
                        <h1 className="text-white font-bold text-2xl">nome</h1>
                    </div>
                    <div className="flex flex-row justify-between p-5">
                        <div className="h-20 ">
                            <p className="font-bold text-[#982546]">Serviços</p>
                            <ul>
                                <li>aaaaaaaaaaaa</li>
                            </ul>
                        </div>

                        <div className="flex flex-col items-end gap-5">
                            <div className="flex flex-row gap-10">
                                <span>Data: 18/05/25</span>
                                <span>Hora: 14:00</span>
                            </div>

                            <div>
                                <h1 className="font-bold text-[#982546] text-2xl">Total: R$ 20,00</h1>
                            </div>
                        </div>

                    </div>

                    <button className="bg-[#982546] w-60 self-center mt-5 p-2 text-[#FFF3DC] rounded-2xl" onClick={() => Navigate()}>Confirmar agendamento</button>

                </div>

            </div>
        </>
    )
}
