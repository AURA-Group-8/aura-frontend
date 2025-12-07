import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import MenuLateral from "../componentes/MenuLateral";
import CardAgendamento from "../componentes/CardAgendamento";
import axios from "axios";
import SinoNotificacao from "../componentes/SinoNotificacao";

export default function Dashboard() {
    const apiUrl = import.meta.env.VITE_API_URL_V2;
    const navigate = useNavigate();
    const [agendamentos, setAgendamentos] = useState([]);
    const [agendamentosFiltrados, setAgendamentosFiltrados] = useState([]);
    const [periodoSelecionado, setPeriodoSelecionado] = useState(null);
    const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState(1);

    const aplicarFiltros = () => {
        let resultado = [...agendamentos];

        if (periodoSelecionado && periodoSelecionado !== "todos") {
            const hoje = new Date();
            resultado = resultado.filter((ag) => {
                const data = new Date(ag.startDatetime);

                if (periodoSelecionado === "hoje") {
                    return data.toDateString() === hoje.toDateString();
                } else if (periodoSelecionado === "semana") {
                    const primeiroDia = new Date(hoje);
                    primeiroDia.setDate(hoje.getDate() - hoje.getDay());

                    const ultimoDia = new Date(primeiroDia);
                    ultimoDia.setDate(primeiroDia.getDate() + 6);

                    return data >= primeiroDia && data <= ultimoDia;
                } else if (periodoSelecionado === "mes") {
                    return data.getMonth() === hoje.getMonth() &&
                        data.getFullYear() === hoje.getFullYear();
                }
            });
        }

        setAgendamentosFiltrados(resultado);
    };

    useEffect(() => {
        aplicarFiltros();
    }, [periodoSelecionado, agendamentos]);

    useEffect(() => {
        const token = sessionStorage.getItem("authToken");

        axios.get(`${apiUrl}/agendamentos/card`, {
            params: {
                page,
                size: 3
            },
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then((response) => {
                setAgendamentos(response.data.content);
                setAgendamentosFiltrados(response.data.content);
                setTotalPages(response.data.totalPages);
            })
            .catch((error) => {
                console.error("Erro ao buscar agendamentos:", error);
            });

    }, [page]);

    const formatDateDDMMYYYY = (date) => {
        const d = date.getDate().toString().padStart(2, '0');
        const m = (date.getMonth() + 1).toString().padStart(2, '0');
        const y = date.getFullYear();
        return `${d}/${m}/${y}`;
    };

    const isActive = (p) => periodoSelecionado === p;

    const handleNextPage = () => {
        if (page < totalPages - 1) {
            setPage(page + 1);
        }
    };

    const handlePreviousPage = () => {
        if (page > 0) {
            setPage(page - 1);
        }
    };

    return (
        <div className="w-full h-screen bg-[#FFF3DC]">
            <div className="h-full flex flex-row">

                <MenuLateral />

                <div className="flex flex-col w-full h-full items-center">
                    <SinoNotificacao />

                    <div className="flex flex-col justify-center items-center w-80 md:w-200">
                        <h1 className="text-[#982546] font-bold text-2xl">Agendamentos</h1>
                        <div className="w-full flex flex-row justify-between xl:w-300 items-center mt-5">
                            <div className="flex flex-col gap-4 md:gap-0 md:flex-row w-full justify-between items-center mt-4">
                                <div className="flex flex-row gap-2 justify-evenly">
                                    <button className={`p-2 rounded-2xl cursor-pointer transition-colors
                                            ${isActive("todos") ? "bg-[#b36078] text-[#FFF3DC]" : "bg-[#982546] text-[#FFF3DC] hover:bg-[#b36078]"}`}
                                        onClick={() => setPeriodoSelecionado("todos")}
                                    >
                                        Todos
                                    </button>

                                    <button className={`p-2 rounded-2xl cursor-pointer transition-colors
                                            ${isActive("hoje") ? "bg-[#b36078] text-[#FFF3DC]" : "bg-[#982546] text-[#FFF3DC] hover:bg-[#b36078]"}`}
                                        onClick={() => setPeriodoSelecionado("hoje")}>
                                        Hoje
                                    </button>

                                    <button className={`p-2 rounded-2xl cursor-pointer transition-colors
                                            ${isActive("semana") ? "bg-[#b36078] text-[#FFF3DC]" : "bg-[#982546] text-[#FFF3DC] hover:bg-[#b36078]"}`}
                                        onClick={() => setPeriodoSelecionado("semana")}>
                                        Essa semana
                                    </button>

                                    <button className={`p-2 rounded-2xl cursor-pointer transition-colors
                                            ${isActive("mes") ? "bg-[#b36078] text-[#FFF3DC]" : "bg-[#982546] text-[#FFF3DC] hover:bg-[#b36078]"}`}
                                        onClick={() => setPeriodoSelecionado("mes")}>
                                        Esse mês
                                    </button>
                                </div>

                                <button
                                    className="bg-[#982546] p-2 text-[#FFF3DC] rounded-2xl cursor-pointer hover:bg-[#b36078]"
                                    onClick={() => navigate("/profissional/agendar")}
                                >
                                    Adicionar agendamento
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 p-4  justify-center items-center gap-5 h-full overflow-y-auto">
                        {agendamentosFiltrados.length > 0 ? (
                            agendamentosFiltrados
                                .sort((a, b) => {
                                    const ordemStatus = {
                                        "Pendente": 0,
                                        "Feito": 1,
                                        "Cancelado": 2
                                    };
                                    return ordemStatus[a.status] - ordemStatus[b.status];
                                })
                                .map((agendamento, index) => (
                                    <CardAgendamento
                                        key={index}
                                        id={agendamento.idScheduling}
                                        status={agendamento.status}
                                        userId={agendamento.userId}
                                        name={agendamento.userName}
                                        service={agendamento.jobsNames.join(", ")}
                                        date={formatDateDDMMYYYY(new Date(agendamento.startDatetime))}
                                        time={new Date(agendamento.startDatetime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })}
                                        value={`R$ ${agendamento.totalPrice.toFixed(2).replace('.', ',')}`}
                                        paymentStatus={agendamento.paymentStatus}
                                    />
                                ))
                        ) : (
                            <p className="text-[#982546] font-semibold text-center text-lg m-auto">
                                Nenhum agendamento encontrado.
                            </p>
                        )}
                    </div>
                    <div className="flex justify-center items-center gap-4 mt-4">
                        <button
                            className=" p-2 text-[#FFF3DC] rounded-2xl cursor-pointer hover:bg-[#b36078]"
                            onClick={handlePreviousPage}
                            disabled={page === 0}
                        >
                            <img
                                    src="/assets/Back.png"
                                    alt="Próxima Página"
                                    className="h-6 w-6"
                                />
                        </button>
                        <span className="text-[#982546] font-semibold">
                            Página {page + 1} de {totalPages}
                        </span>
                        <button
                            className=" p-2 text-[#FFF3DC] rounded-2xl cursor-pointer hover:bg-[#b36078]"
                            onClick={handleNextPage}
                            disabled={page === totalPages - 1}
                        >
                            <img
                                    src="/assets/Back.png"
                                    alt="Próxima Página"
                                    className="h-6 w-6 transform rotate-180"
                                />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
