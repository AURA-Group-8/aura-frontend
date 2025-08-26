import MenuLateral from "./components/MenuLateral";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Bar } from "react-chartjs-2";
import SinoNotificacao from "./components/SinoNotificacao";

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function Financeiro() {
    const apiUrl = import.meta.env.VITE_API_URL;

    const [dadosMensais, setDadosMensais] = useState([]);
    const [topServicos, setTopServicos] = useState([]);
    const [topClientes, setTopClientes] = useState([]);
    const [atendimentosSemana, setAtendimentosSemana] = useState([]);

    const navigate = useNavigate();
    const token = sessionStorage.getItem("authToken");

    useEffect(() => {
        axios.get(`${apiUrl}/insights/finance/dashboard`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then((response) => {
                const data = response.data;

                let servicos = data.topServicos;
                if (typeof servicos === 'string') {
                    try {
                        servicos = JSON.parse(servicos.replace(/'/g, '"'));
                    } catch (e) {
                        servicos = [];
                    }
                }
                setTopServicos(Array.isArray(servicos) ? servicos : []);

                let clientes = data.topClientes;
                if (typeof clientes === 'string') {
                    try {
                        clientes = JSON.parse(clientes.replace(/'/g, '"'));
                    } catch (e) {
                        clientes = [];
                    }
                }
                setTopClientes(Array.isArray(clientes) ? clientes : []);

                let semana = data.atendimentosDiaDaSemanaNoMes;
                if (typeof semana === 'string') {
                    try {
                        semana = JSON.parse(semana.replace(/'/g, '"'));
                    } catch (e) {
                        semana = [];
                    }
                }
                setAtendimentosSemana(Array.isArray(semana) ? semana : []);
            })
            .catch((error) => {
                console.error("Erro ao buscar dados financeiros:", error);
            });

        axios.get(`${apiUrl}/insights/finance/historico`, {
            headers: { Authorization: `Bearer ${token}` },
        })
            .then((response) => {
                setDadosMensais(response.data);
            })
            .catch((error) => {
                console.error("Erro ao buscar histórico financeiro:", error);
            });
    }, []);

    const chartData = {
        labels: ["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb", "Dom"],
        datasets: [
            {
                label: "Movimentação",
                data: atendimentosSemana,
                backgroundColor: "#362323",
                borderRadius: 6,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: { display: false },
        },
        scales: {
            x: { grid: { display: false } },
            y: {
                beginAtZero: true,
                grid: { display: false },
                ticks: { stepSize: 1 },
            },
        },
    };

    return (
        <div className="w-full h-screen bg-[#FFF3DC]">
            <div className="h-full flex flex-row">
                <MenuLateral />

                <div className="flex flex-col w-full h-full items-center">
                    <SinoNotificacao />

                    <h1 className="text-[#982546] font-bold text-2xl ml-20">Meus serviços</h1>

                    <div className="flex flex-row w-210 justify-around ml-20 mt-5">
                        <div className="flex flex-col">
                            <h1 className="text-[#982546] font-bold text-lg mb-2">Balanço mensal</h1>
                            <div className="w-100 bg-[#982546] rounded-2xl flex flex-col justify-between p-2">
                                <div className="flex flex-col text-[#FFF3DC] p-4 h-full gap-4">
                                    {(() => {
                                        
                                        const hoje = new Date();
                                        const mesAtual = hoje.getMonth() + 1;
                                        const dadosMes = dadosMensais.find((item) => item.mes === mesAtual) || {};
                                        return (
                                            <>
                                                <span className="font-bold mb-2 text-3xl">
                                                    R$ {dadosMes.totalFaturadoMes ? Number(dadosMes.totalFaturadoMes).toLocaleString('pt-BR', { minimumFractionDigits: 2 }) : '0,00'}
                                                </span>
                                                <div className="flex flex-col">
                                                    <span>Total de atendimentos: {dadosMes.totalAtendimentosMes ?? 0}</span>
                                                    <span>Total de cancelamentos: {dadosMes.totalAtendimentosCanceladosMes ?? 0}</span>
                                                </div>
                                            </>
                                        );
                                    })()}
                                </div>
                                <button
                                    className="p-2 rounded-2xl bg-[#FFF3DC] text-[#982546] self-end cursor-pointer hover:bg-[#f0e4d1] transition-colors"
                                    onClick={() => navigate("/pages/professional-pages/HistoricoFinanceiro")}
                                >
                                    Ver histórico
                                </button>
                            </div>
                        </div>

                        <div className="flex flex-col">
                            <h1 className="text-[#982546] font-bold text-lg mb-2">Serviços mais realizados</h1>
                            <div className="w-100 h-40 border border-[#982546] rounded-2xl p-2">
                                <ul>
                                    {topServicos.map((servico, index) => (
                                        <li key={index} className="flex flex-row gap-2 items-center">
                                            <img src="/assets/Eyebrow-purple.png" alt="" className="h-5" />
                                            <span>{servico}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-row w-210 justify-around ml-20 mt-5">
                        <div className="flex flex-col">
                            <h1 className="text-[#982546] font-bold text-lg mb-2">Movimentação semanal</h1>
                            <div className="flex w-100 h-40 border border-[#982546] rounded-2xl justify-center items-center">
                                <Bar data={chartData} options={options} />
                            </div>
                        </div>

                        <div className="flex flex-col">
                            <h1 className="text-[#982546] font-bold text-lg mb-2">Clientes regulares</h1>
                            <div className="w-100 h-40 border border-[#982546] rounded-2xl p-2">
                                <ul>
                                    {topClientes.map((cliente, index) => (
                                        <li key={index} className="flex flex-row gap-2 items-center">
                                            <img src="/assets/user.png" alt="" className="h-5" />
                                            <span>{cliente}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
