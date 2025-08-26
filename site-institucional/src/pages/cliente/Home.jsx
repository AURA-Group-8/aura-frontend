import { BrowserRouter, useNavigate } from "react-router-dom";
import NavbarCli from "./componentes/Navbar";


export default function HomeClient() {

    const navigate = useNavigate();

    return (
        <>
            <div className="w-full h-full">

                <NavbarCli caminho={"/pages/client-pages/Login"} />


                <div className="bg-[url('/assets/bg-cli.png')] bg-contain bg-center h-90 w-full text-[#FFF3DC] flex flex-row justify-around items-center pt-10">

                    <h1 className="font-bold text-2xl w-60 text-center">
                        Seu agendamento
                        com praticidade
                        e agilidade!
                    </h1>

                    <div className="flex flex-col justify-center items-end gap-5">
                        <button onClick={() => navigate("/pages/client-pages/MeusAgendamentosCli")} className="bg-[#982546] border mt-14 border-[#FFF3DC]  text-[#FFF3DC] py-4 px-4 rounded-2xl font-bold cursor-pointer text-xl hover:bg-[#b36078] transition-colors">Consultar Agendamentos</button>
                        <button onClick={() => navigate("/pages/client-pages/Contact")} className="cursor-pointer bg-[#FFF3DC] border mb-4 border-[#982546] text-[#982546] flex flex-row items-center  py-0.5 px-4 rounded-2xl font-bold text-xl hover:bg-[#f1ecbd] transition-colors"><span>Contato</span> <img src="/assets/Help.png" alt="" className="h-8" /></button>
                    </div>

                </div>

                <div className="bg-[#FFF3DC] bg-[url('/assets/wave-background.png')] bg-center bg-cover p-10 w-full flex flex-col justify-center">

                    <button onClick={() => navigate("/pages/client-pages/AgendarCli")} className="cursor-pointer bg-[#341C1C] text-[#FFF3DC] w-70 h-15 rounded-2xl self-center text-xl font-bold mb-10 hover:bg-[#452f2e] transition-colors">Agendar atendimento</button>

                    <h1 className="text-[#341C1C] font-bold text-2xl self-center">Alguns dos serviços disponíveis</h1>

                    <div className="flex flex-row justify-evenly p-12 text-xl">

                        <div className="flex flex-col">
                            <div className="bg-[#982546] p-5 text-[#FFF3DC] font-bold rounded-tl-2xl rounded-tr-2xl">Nanopigmentação</div>
                            <img src="/assets/Lash-extension.jpg" alt="" className="max-h-60 rounded-bl-2xl rounded-br-2xl" />
                        </div>

                        <div className="flex flex-col">
                            <div className="bg-[#982546] p-5 text-[#FFF3DC] font-bold rounded-tl-2xl rounded-tr-2xl">Lashlifting</div>
                            <img src="/assets/Brow-lamination.jpg" alt="" className="max-h-60 rounded-bl-2xl rounded-br-2xl" />
                        </div>

                        <div className="flex flex-col">
                            <div className="bg-[#982546] p-5 text-[#FFF3DC] font-bold rounded-tl-2xl rounded-tr-2xl">Hydragloss</div>
                            <img src="/assets/Gloss-lips.jpg" alt="" className="max-h-60 rounded-bl-2xl rounded-br-2xl" />
                        </div>

                    </div>



                </div>
            </div>


        </>
    )

}