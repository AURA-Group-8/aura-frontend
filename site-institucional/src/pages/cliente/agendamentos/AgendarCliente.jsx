import { useState, useEffect } from "react";
import NavbarCli from "../componentes/Navbar";
import Confirmar from "../../componentes/Confirmar";
import SelecionarServico from "../componentes/SelecaoServico";
import CalendarioCarrossel from "../../componentes/DataHora";

export default function Agendar() {

    const [cliente, setCliente] = useState(null);
    const [servicos, setServicos] = useState([]);
    const [dataHora, setDataHora] = useState({ data: null, horario: null });

    const durationInMinutes = servicos.reduce((acc, item) => acc + (Number(item.expectedDurationMinutes) || 0), 0);

    const durationFormatted = (() => {
        if (!durationInMinutes) return "";
        const h = Math.floor(durationInMinutes / 60);
        const m = durationInMinutes % 60;
        return h > 0 ? `${h}h${m ? ` ${m}min` : ""}` : `${m}min`;
    })();

    return (
        <>
            <NavbarCli caminho={"/cliente/home"} />
            
            <div className="w-full h-[100vh] bg-[#FFF3DC] flex flex-col justify-center items-center">
                <div className=" w-full h-full flex flex-col md:flex-row justify-evenly items-center ">
                    <div className="flex flex-col items-center ">
                        <p className="text-[#982546] font-bold  mb-2 text-xl xl:text-2xl ">Selecione do detalhes do agendamento:</p>
                        <SelecionarServico
                            onSelecionarCliente={setCliente}
                            onSelecionarServicos={setServicos} 
                            />
                    </div>

                    <div className="bg-[#982546] w-0.5 h-full hidden md:block rounded-2xl"></div>

                    <div className="flex flex-col items-center">
                        <CalendarioCarrossel
                            duracaoTotal={durationInMinutes}
                            onSelecionarDataHora={setDataHora} />

                        <Confirmar
                            cliente={cliente}
                            servicos={servicos}
                            data={dataHora.data}
                            horario={dataHora.horario}
                            duracaoTotal={durationFormatted}
                            redirectTo="/cliente/meus-agendamentos"
                        />
                    </div>
                </div>

            </div>
        </>
    )

}
