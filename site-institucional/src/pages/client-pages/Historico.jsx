import { m } from "framer-motion";
import { use, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CardAgendamento from "./components/CardAgendamento";
import axios from "axios";
import NavbarCli from "./components/Navbar";
import Alerta from "../Pop-up";

export default function Historico() {
    const apiUrl = import.meta.env.VITE_API_URL;

    const navigate = useNavigate();

    const [agendamentos, setAgendamentos] = useState([]);
    const [periodoSelecionado, setPeriodoSelecionado] = useState(null);
    const [pagamentoSelecionado, setPagamentoSelecionado] = useState(null);

    const [menuAberto, setMenuAberto] = useState(false);
    const [mensagem, setMensagem] = useState("");
    const [caminho, setCaminho] = useState("");



    useEffect(() => {
        const token = sessionStorage.getItem("authToken");
        const userName = sessionStorage.getItem("userName");

        axios.get(`${apiUrl}/agendamentos/card`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then((response) => {
                console.log("Response data from API:", response.data); // Log dos dados retornados pela API

                // Filtra os agendamentos pelo userName no frontend
                const agendamentosFiltrados = response.data.filter(
                    (agendamento) => agendamento.userName === userName
                );

                console.log("Filtered agendamentos:", agendamentosFiltrados); // Log dos agendamentos filtrados

                // Filtra os agendamentos realizados anteriormente à data atual
                const agendamentosPassados = agendamentosFiltrados.filter(
                    (agendamento) => new Date(agendamento.startDatetime) < new Date()
                );

                console.log("Past agendamentos:", agendamentosPassados); // Log dos agendamentos passados

                setAgendamentos(agendamentosPassados);
            })
            .catch((error) => {
                console.error("Erro ao buscar agendamentos:", error);
            });
    }, []);

    return (
        <>

            <NavbarCli caminho={"/pages/client-pages/Home"} />

            {mensagem && (
                <Alerta
                    mensagem={mensagem}
                    imagem="/assets/Check-pop.png"
                />
            )}

            <div className="w-full h-screen bg-[#FFF3DC] ">
                <div className="h-full flex flex-row">

                    <div className="flex flex-col w-full h-full  items-center ">
                        <div className="w-full flex flex-row justify-end">
                            <img className="h-8 m-2" src="/assets/Doorbell.png " alt="" />
                        </div>

                        <div className=" flex flex-col justify-center items-center w-200">

                            <h1 className="text-[#982546] mt-3 font-bold text-2xl">Histórico de Agendamentos</h1>


                        </div>

                        <div className="grid grid-cols-1 gap-6 w-6xl h-100 mt-15 overflow-y-auto">
                            {agendamentos.length > 0 ? (
                                agendamentos.map((agendamento, index) => (
                                    <CardAgendamento
                                        key={index}
                                        name={agendamento.userName}
                                        service={agendamento.jobsNames.join(", ")}
                                        date={new Date(agendamento.startDatetime).toLocaleDateString()}
                                        time={new Date(agendamento.startDatetime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                        isHistorico={true} // Indica que é o histórico
                                    />
                                ))
                            ) : (
                                <p className="text-[#982546] font-semibold text-lg m-auto">
                                    Você ainda não participou de um procedimento.
                                </p>
                            )}
                        </div>

                        <div className="w-full flex justify-center it mt-5">
                            <button
                                onClick={() => navigate("/pages/client-pages/MeusAgendamentosCli")}
                                className="bg-[#982546] text-white py-2 cursor-pointer px-4 rounded-lg hover:bg-[#b36078] transition-colors"
                            >
                                Visualizar Agendamentos
                            </button>
                        </div>


                    </div>
                </div>
            </div>
        </>
    );
}