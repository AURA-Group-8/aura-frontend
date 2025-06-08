import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import MenuLateral from "./components/MenuLateral";
import CardAgendamento from "./components/CardAgendamento";
import axios from "axios";

export default function Dashboard() {
    const apiUrl = import.meta.env.VITE_API_URL;
    const navigate = useNavigate();

    const [agendamentos, setAgendamentos] = useState([]);
    const [agendamentosFiltrados, setAgendamentosFiltrados] = useState([]);

    const [periodoSelecionado, setPeriodoSelecionado] = useState(null);
    const [pagamentoSelecionado, setPagamentoSelecionado] = useState(null);
    const [servicoSelecionado, setServicoSelecionado] = useState("");
    const [servicosDisponiveis, setServicosDisponiveis] = useState([]);

    const [menuAberto, setMenuAberto] = useState(false);

    const handleSelectRadio = (grupo, valor) => {
        if (grupo === 'periodo') {
            setPeriodoSelecionado(periodoSelecionado === valor ? null : valor);
        } else if (grupo === 'pagamento') {
            setPagamentoSelecionado(pagamentoSelecionado === valor ? null : valor);
        }
    };

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

        if (pagamentoSelecionado) {
            resultado = resultado.filter(ag => {
                const status = ag.paymentStatus?.toLowerCase().trim();
                if (pagamentoSelecionado === "pago") return status === "pago";
                if (pagamentoSelecionado === "pendente") return status === "pendente";
                return true;
            });
        }

        if (servicoSelecionado) {
            resultado = resultado.filter(ag => ag.jobsNames.includes(servicoSelecionado));
        }

        setAgendamentosFiltrados(resultado);
    };

    const limparFiltros = () => {
        setPeriodoSelecionado(null);
        setPagamentoSelecionado(null);
        setServicoSelecionado("");
        setAgendamentosFiltrados(agendamentos);
    };

    const fecharMenu = () => {
        setMenuAberto(false);
    };

    useEffect(() => {
        const token = sessionStorage.getItem("authToken");

        axios.get(`${apiUrl}/agendamentos/card`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then((response) => {
                setAgendamentos(response.data);
                setAgendamentosFiltrados(response.data);

                const servicos = new Set();
                response.data.forEach((ag) => {
                    ag.jobsNames.forEach(servico => servicos.add(servico));
                });
                setServicosDisponiveis(Array.from(servicos));
            })
            .catch((error) => {
                console.error("Erro ao buscar agendamentos:", error);
            });

        axios.get(`${apiUrl}/servicos`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then((response) => {
                const data = response.data;
                const lista = Array.isArray(data) ? data : (data.servicos ?? []);
                setServicosDisponiveis(lista);
            })
            .catch((error) => {
                console.error("Erro ao buscar serviços:", error);
            });

    }, []);

    return (
        <div className="w-full h-screen bg-[#FFF3DC]">
            <div className="h-full flex flex-row">

                <MenuLateral />

                <div className="flex flex-col w-full h-full items-center">
                    <div className="w-full flex flex-row justify-end">
                        <img className="h-8 m-2" src="/assets/Doorbell.png" alt="" />
                    </div>

                    <div className="flex flex-col justify-center items-center ml-20 w-200">
                        <h1 className="text-[#982546] font-bold text-2xl">Agendamentos</h1>

                        <div className="w-full flex flex-row justify-between items-start mt-5">

                            <div className="flex flex-row-reverse justify-between w-110 items-start relative">
                                <div className="w-full transition-all duration-300 ml-2 relative">
                                    {menuAberto && (
                                        <div className="max-w-2xl flex flex-col absolute z-999 border-1 border-[#982546] rounded-2xl p-5 bg-[#FFF3DC] shadow-lg shadow-[#982546]">
                                            <div className="flex flex-col">
                                                <p className="font-bold text-[#982546]">Período</p>
                                                <div className="flex flex-row gap-2 mt-2 border-b-1 border-[#982546]">
                                                    <input type="radio" name="periodo" checked={periodoSelecionado === "todos"} onChange={() => handleSelectRadio("periodo", "todos")} /><span>Todos</span>
                                                    <input type="radio" name="periodo" checked={periodoSelecionado === "hoje"} onChange={() => handleSelectRadio("periodo", "hoje")} /><span>Hoje</span>
                                                    <input type="radio" name="periodo" checked={periodoSelecionado === "semana"} onChange={() => handleSelectRadio("periodo", "semana")} /><span>Essa semana</span>
                                                    <input type="radio" name="periodo" checked={periodoSelecionado === "mes"} onChange={() => handleSelectRadio("periodo", "mes")} /><span>Esse mês</span>
                                                </div>
                                            </div>

                                            <div className="flex flex-col mt-5">
                                                <p className="font-bold text-[#982546]">Pagamento</p>
                                                <div className="flex flex-row gap-2 mt-2 border-b-1 border-[#982546]">
                                                    <input type="radio" name="pagamento" checked={pagamentoSelecionado === "pago"} onChange={() => handleSelectRadio("pagamento", "pago")} /><span>Pago</span>
                                                    <input type="radio" name="pagamento" checked={pagamentoSelecionado === "pendente"} onChange={() => handleSelectRadio("pagamento", "pendente")} /><span>Pendente</span>
                                                </div>
                                            </div>

                                            <div className="flex flex-col mt-5">
                                                <p className="font-bold text-[#982546]">Serviço</p>
                                                <div className="flex flex-row gap-2 mt-2">
                                                    <select
                                                        name="service"
                                                        className="border-1 border-[#982546] bg-white rounded-2xl p-2 w-full"
                                                        value={servicoSelecionado}
                                                        onChange={(e) => setServicoSelecionado(e.target.value)}
                                                    >
                                                        <option value="">Todos os serviços</option>
                                                        {Array.isArray(servicosDisponiveis) && servicosDisponiveis.map((servico, index) => (
                                                            <option key={index} value={servico}>{servico}</option>
                                                        ))}
                                                    </select>
                                                </div>
                                                <div className="flex flex-row gap-2 justify-between mt-5">
                                                    <button
                                                        className="bg-[#FFF3DC] text-[#982546] rounded-2xl p-2 border border-[#982546] cursor-pointer"
                                                        onClick={() => {
                                                            limparFiltros();
                                                            fecharMenu();
                                                        }}
                                                    >
                                                        Limpar filtros
                                                    </button>
                                                    <button
                                                        className="bg-[#982546] text-[#FFF3DC] rounded-2xl p-2 cursor-pointer"
                                                        onClick={() => {
                                                            aplicarFiltros();
                                                            fecharMenu();
                                                        }}
                                                    >
                                                        Filtrar
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                <button
                                    className="bg-[#982546] p-2 text-[#FFF3DC] rounded-2xl mt-5 cursor-pointer hover:bg-[#b36078]"
                                    onClick={() => setMenuAberto((aberto) => !aberto)}
                                >
                                    <img src="/assets/Slider.png" alt="" className="h-6" />
                                </button>
                            </div>

                            <button
                                className="bg-[#982546] p-2 text-[#FFF3DC] rounded-2xl mt-5 cursor-pointer hover:bg-[#b36078]"
                                onClick={() => navigate("/pages/professional-pages/Agendar")}
                            >
                                Adicionar agendamento
                            </button>
                        </div>
                    </div>

                    <div className="flex flex-col p-2 gap-8 w-210 h-100 ml-20 mt-5 overflow-y-auto">
                        {agendamentosFiltrados.length > 0 ? (
                            agendamentosFiltrados
                                .sort((a, b) => {
                                    if (a.status === 'Pendente' && b.status !== 'Pendente') return -1;
                                    if (a.status !== 'Pendente' && b.status === 'Pendente') return 1;
                                    return 0;
                                })
                                .map((agendamento, index) => (
                                    <CardAgendamento
                                        key={index}
                                        id={agendamento.idScheduling}
                                        status={agendamento.status}
                                        userId={agendamento.userId}
                                        name={agendamento.userName}
                                        service={agendamento.jobsNames.join(", ")}
                                        date={new Date(agendamento.startDatetime).toLocaleDateString()}
                                        time={new Date(agendamento.startDatetime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                        value={`R$ ${agendamento.totalPrice.toFixed(2).replace('.', ',')}`}
                                        paymentStatus={agendamento.paymentStatus}
                                    />
                                ))
                        ) : (
                            <p className="text-[#982546] font-semibold text-lg m-auto">
                                Nenhum agendamento encontrado.
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
