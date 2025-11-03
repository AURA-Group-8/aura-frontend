import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CardAgendamento from "../componentes/CardAgendamento";
import axios from "axios";
import NavbarCli from "../componentes/Navbar";
import Alerta from "../../componentes/PopUp";

export default function MeusAgendamentosCli() {
    const apiUrl = import.meta.env.VITE_API_URL_V2;

    const navigate = useNavigate();

    const [agendamentos, setAgendamentos] = useState([]);
    const [mensagem, setMensagem] = useState("");
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0); 

    useEffect(() => {
        fetchAgendamentos(currentPage);
    }, [currentPage]);

    const fetchAgendamentos = (page) => {
        const token = sessionStorage.getItem("authToken");
        const userName = sessionStorage.getItem("userName");

        axios
            .get(`${apiUrl}/agendamentos/card`, {
                params: {
                    sortBy: "id",
                    page: page,
                    size: 4, 
                },
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((response) => {
                const { content, totalPages } = response.data;

                
                const agendamentosFiltrados = content.filter(
                    (agendamento) =>
                        agendamento.userName === userName &&
                        new Date(agendamento.startDatetime) > new Date()
                );

                setAgendamentos(agendamentosFiltrados);
                setTotalPages(totalPages); 
            })
            .catch((error) => {
                console.error("Erro ao buscar agendamentos:", error);
            });
    };

    const handleNextPage = () => {
        if (currentPage < totalPages - 1) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePreviousPage = () => {
        if (currentPage > 0) {
            setCurrentPage(currentPage - 1);
        }
    };

    return (
        <>
            <NavbarCli caminho={"/cliente/home"} />

            {mensagem && (
                <Alerta
                    mensagem={mensagem}
                    imagem="/assets/Check-pop.png"
                />
            )}

            <div className="w-full h-screen bg-[#FFF3DC] ">
                <div className="h-full flex flex-row">
                    <div className="flex flex-col w-full h-full items-center ">
                        <div className="w-full flex flex-row justify-end">
                            <img className="h-8 m-2" src="/assets/Doorbell.png " alt="" />
                        </div>

                        <div className="flex flex-col justify-center items-center w-200">
                            <h1 className="text-[#982546] mt-2 mb-10 font-bold text-2xl">
                                Meus Agendamentos
                            </h1>
                        </div>

                        <div className="grid grid-cols-1 h-120 gap-18 xl:h-150 overflow-y-auto p-4">
                            {agendamentos.length > 0 ? (
                                agendamentos
                                    .sort((a, b) => {
                                        const ordemStatus = {
                                            Pendente: 0,
                                            Feito: 1,
                                            Cancelado: 2,
                                        };
                                        return ordemStatus[a.status] - ordemStatus[b.status];
                                    })
                                    .map((agendamento, index) => (
                                        <CardAgendamento
                                            key={index}
                                            id={agendamento.idScheduling}
                                            name={agendamento.userName}
                                            service={agendamento.jobsNames.join(", ")}
                                            date={new Date(agendamento.startDatetime).toLocaleDateString()}
                                            time={new Date(agendamento.startDatetime).toLocaleTimeString([], {
                                                hour: "2-digit",
                                                minute: "2-digit",
                                                hour12: false,
                                            })}
                                            value={`R$ ${agendamento.totalPrice
                                                .toFixed(2)
                                                .replace(".", ",")}`}
                                            status={agendamento.status}
                                        />
                                    ))
                            ) : (
                                <p className="text-[#982546] font-semibold text-lg m-auto">
                                    Nenhum agendamento encontrado.
                                </p>
                            )}
                        </div>

                        <div className="w-full flex justify-center mt-5">
                            <button
                                onClick={handlePreviousPage}
                                disabled={currentPage === 0}
                                className=" text-white py-2 px-4 rounded-lg cursor-pointer hover:bg-[#b36078] transition-colors mb-10 disabled:opacity-50 flex items-center justify-center"
                            >
                                <img
                                    src="/assets/Back.png"
                                    alt="Página Anterior"
                                    className="h-6 w-6"
                                />
                            </button>
                            <button
                                onClick={handleNextPage}
                                disabled={currentPage === totalPages - 1}
                                className=" text-white py-2 px-4 rounded-lg cursor-pointer hover:bg-[#b36078] transition-colors mb-10 ml-4 disabled:opacity-50 flex items-center justify-center"
                            >
                                <img
                                    src="/assets/Back.png"
                                    alt="Próxima Página"
                                    className="h-6 w-6 transform rotate-180"
                                />
                            </button>
                        </div>

                        <div className="w-full flex justify-center mt-5">
                            <button
                                onClick={() => navigate("/cliente/historico")}
                                className="bg-[#982546] text-white py-2 px-4 rounded-lg cursor-pointer hover:bg-[#b36078] transition-colors mb-10"
                            >
                                Visualizar Histórico
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}