import MenuLateral from "../componentes/MenuLateral";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Bar } from "react-chartjs-2";
import SinoNotificacao from "../componentes/SinoNotificacao";

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
    const apiUrl = import.meta.env.VITE_API_URL_V2;

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

    const hoje = new Date();
    const mesAtual = hoje.getMonth() + 1;
    const dadosMes = dadosMensais.find((item) => item.mes === mesAtual) || {};

    return (
        <div className="w-full h-screen bg-[#FFF3DC]">
            <div className=" flex flex-row h-screen">
                <MenuLateral />

                <div className="flex flex-col w-full items-center xl:text-lg">
                    <SinoNotificacao />

                    <div className="flex flex-col md:flex-row md:w-210 justify-center gap-5 xl:gap-20 md:justify-around ">
                        <div className="flex flex-col justify-center items-center md:items-start">
                            <h1 className="text-[#982546] font-bold text-lg xl:text-2xl mb-2">Balanço mensal</h1>
                            <div className="flex flex-col md:flex-row gap-5 xl:gap-15 xl:text-xl">
                                <div className="flex flex-col gap-2">
                                    <div className=" w-80 bg-[#982546] rounded-2xl flex flex-col justify-center p-2">
                                        <div className="flex flex-col text-[#FFF3DC] gap-2 text-center h-full xl:text-xl">
                                            <p className="text-lg">Faturamento mensal</p>
                                            <span className="font-bold mb-2 text-3xl">
                                                R$ {dadosMes.totalFaturadoMes ? Number(dadosMes.totalFaturadoMes).toLocaleString('pt-BR', { minimumFractionDigits: 2 }) : '0,00'}

                                            </span>
                                            
                                        </div>

                                    </div>

                                    <button
                                        className="p-2 rounded-2xl w-full bg-[#FFF3DC] border border-[#982546] text-[#982546] self-end cursor-pointer hover:bg-[#f0e4d1] transition-colors"
                                        onClick={() => navigate("/profissional/financeiro/historico")}
                                    >
                                        Ver histórico de atendimentos
                                    </button>
                                </div>


                                <div className="w-auto  bg-[#982546] rounded-2xl flex flex-col justify-start text-center p-2">
                                    <div className="flex flex-col text-[#FFF3DC] p-2 xl:text-xl">
                                        <div className="flex flex-col gap-5">
                                            <p className="text-lg">Total de atendimentos </p>
                                            <span className="font-bold mb-2 text-3xl">{dadosMes.totalAtendimentosMes ?? 0}</span>
                                            
                                        </div>

                                    </div>
                                </div>

                                <div className="w-auto bg-[#982546] rounded-2xl flex flex-col justify-start text-center items-center p-2">
                                    <div className="flex flex-col text-[#FFF3DC] p-2 xl:text-xl">
                                        <div className="flex flex-col gap-5">
                                            <p className="text-lg">Total de cancelamentos</p>
                                            <span className="font-bold mb-2 text-3xl">{dadosMes.totalAtendimentosCanceladosMes ?? 0}</span>
                                            
                                        </div>

                                    </div>
                                </div>
                            </div>

                        </div>

                    </div>

                    <div className="flex flex-col md:flex-row md:w-210 gap-5 md:gap-0 xl:gap-20 justify-end md:justify-around mt-5">
                        <div className="flex flex-col justify-center items-center md:items-start xl:text-xl">
                            <h1 className="text-[#982546] font-bold text-lg xl:text-2xl mb-2">Movimentação semanal</h1>
                            <div className="flex md:w-100 w-80 h-70 xl:h-90 border border-[#982546] rounded-2xl justify-end items-end">
                                <Bar data={chartData} options={options} />
                            </div>
                        </div>

                        <div className="flex flex-col xl:gap-10">
                            <div className="flex flex-col justify-center items-center md:items-start xl:text-xl">
                                <h1 className="text-[#982546] font-bold text-lg xl:text-2xl mb-2">Serviços mais realizados</h1>
                                <div className="md:w-100 w-80 h-auto border border-[#982546] rounded-2xl p-2">
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

                            <div className="flex flex-col justify-center items-center md:items-start">
                                <h1 className="text-[#982546] font-bold text-lg xl:text-2xl mb-2">Clientes regulares</h1>
                                <div className="md:w-100 w-80 h-auto border border-[#982546] mb-5 md:mb-0 rounded-2xl p-2">
                                    <ul className="grid grid-cols-2 gap-2">
                                        {topClientes.map((cliente, index) => (
                                            <li key={index} className="flex items-center gap-2">
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
        </div>
    );
}
