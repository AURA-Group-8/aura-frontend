import React, { useState, useEffect } from "react";
import Alerta from "./PopUp";
import axios from "axios";

export default function CardNotificacao() {
    const apiUrl = import.meta.env.VITE_API_URL_V2;
    const userId = sessionStorage.getItem("userId");
    const token = sessionStorage.getItem("authToken");

    const [notificacoes, setNotificacoes] = useState([]);
    const [mensagem, setMensagem] = useState("");
    const [caminho, setCaminho] = useState("");

    const [paginaAtual, setPaginaAtual] = useState(0);
    const [totalPaginas, setTotalPaginas] = useState(1);

    useEffect(() => {
        const fetchNotificacoes = async () => {
            try {
                const response = await axios.get(`${apiUrl}/notificacoes/${userId}`, {
                    headers: { Authorization: `Bearer ${token}` },
                    params: { page: paginaAtual, size: 4, sortBy: "id" },
                });

                const data = response.data;
                setNotificacoes(data.content);
                setTotalPaginas(data.totalPages);
            } catch (error) {
                console.error("Erro ao buscar notificações:", error);
            }
        };

        fetchNotificacoes();
    }, [apiUrl, userId, token, paginaAtual]);

    const mudarPagina = (novaPagina) => {
        if (novaPagina >= 0 && novaPagina < totalPaginas) {
            setPaginaAtual(novaPagina);
        }
    };

    return (
        <>
            {mensagem && <Alerta mensagem={mensagem} imagem={caminho} />}

            <div className="min-h-screen bg-[#fef3e2] p-6 flex justify-start items-center flex-col">
                <h1 className="text-center text-2xl font-bold text-[#7c1d34] mb-6 mt-20">Notificações</h1>

                <div className="space-y-4 max-h-[65vh] w-90 md:w-200 overflow-y-auto pr-2">
                    {notificacoes.length > 0 ? (
                        notificacoes.map((notificacao, index) => (
                            <div key={index} className="bg-white border border-[#7c1d34] border-l-8 w-full text-gray-600 rounded-lg p-6">
                                <p className="mb-2">{notificacao.message}</p>
                                <div className="flex justify-between items-center">
                                    <span className="text-sm">
                                        {new Date(notificacao.created_at).toLocaleString("pt-BR")}
                                    </span>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="text-center text-gray-500">Nenhuma notificação disponível.</p>
                    )}
                </div>

                {/* Controles de paginação */}
                <div className="flex justify-center mt-4 space-x-4">
                    <button
                        onClick={() => mudarPagina(paginaAtual - 1)}
                        disabled={paginaAtual === 0}
                        className="flex items-center justify-center"
                    >
                        <img
                            src="/assets/Back.png"
                            alt="Anterior"
                            className={`w-8 h-8 ${paginaAtual === 0 ? "opacity-50" : ""}`}
                        />
                    </button>
                    {/* <span className="text-gray-600">
                        Página {paginaAtual + 1} de {totalPaginas}
                    </span> */}
                    <button
                        onClick={() => mudarPagina(paginaAtual + 1)}
                        disabled={paginaAtual + 1 === totalPaginas}
                        className="flex items-center justify-center"
                    >
                        <img
                            src="/assets/Back.png"
                            alt="Próxima"
                            className={`w-8 h-8 transform rotate-180 ${paginaAtual + 1 === totalPaginas ? "opacity-50" : ""}`}
                        />
                    </button>
                </div>
            </div>
        </>
    );
}