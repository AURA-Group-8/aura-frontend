import { useState, useEffect } from "react";
import NavbarPro from "../../componentes/Navbar";
import CalendarioCarrossel from "../../../componentes/DataHora";
import SelecaoServicoCliente from "../../componentes/SelecaoServicoCliente";
import Confirmar from "../../../componentes/Confirmar";

export default function Agendar() {

    const [cliente, setCliente] = useState(null);
    const [servicos, setServicos] = useState([]);
    const [dataHora, setDataHora] = useState({ data: null, horario: null });

    return (
        <>
            <NavbarPro caminho={"/profissional/dashboard"} />
            <div className="w-full h-[100vh] bg-[#FFF3DC] flex flex-col justify-center items-center">
                <div className=" w-full h-full flex flex-col md:flex-row justify-evenly items-center ">
                    <div className="flex flex-col items-center text-center ">
                        <p className="text-[#982546] font-bold mt-20 mb-2 text-xl xl:text-2xl ">Selecione do detalhes do agendamento:</p>
                        <SelecaoServicoCliente
                            onSelecionarCliente={setCliente}
                            onSelecionarServicos={setServicos} />
                    </div>

                    <div className="bg-[#982546] w-0.5 h-full hidden md:block rounded-2xl"></div>

                    <div className="flex flex-col items-center">
                        <CalendarioCarrossel
                            duracaoTotal={servicos.reduce((acc, item) => acc + (Number(item.expectedDurationMinutes) || 0), 0)}
                            onSelecionarDataHora={setDataHora} />

                        <Confirmar
                            cliente={cliente}
                            servicos={servicos}
                            data={dataHora.data}
                            horario={dataHora.horario}
                            duracaoTotal={servicos.reduce((acc, item) => acc + (Number(item.expectedDurationMinutes) || 0), 0)}
                        />
                    </div>
                </div>

            </div>
        </>
    )

}
