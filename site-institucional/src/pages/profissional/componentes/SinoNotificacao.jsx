import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from 'axios';

export default function SinoNotificacao({ atualizarNotificacoes }) {
    const [temNotificacaoNova, setTemNotificacaoNova] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const apiUrl = import.meta.env.VITE_API_URL_V2;
    const userId = sessionStorage.getItem("userId");
    const token = sessionStorage.getItem("authToken");

    useEffect(() => {
        const verificarNotificacoes = async () => {
            try {
                const response = await axios.get(`${apiUrl}/notificacoes/${userId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                const dataArray = Array.isArray(response.data)
                    ? response.data
                    : (response.data.content || []);
                const notificacoesNaoLidas = dataArray.some((notificacao) => !notificacao.isRead);
                setTemNotificacaoNova(notificacoesNaoLidas);
                if (atualizarNotificacoes) {
                    atualizarNotificacoes(notificacoesNaoLidas);
                }
            } catch (error) {
                console.error("Erro ao verificar notificações:", error);
            }
        };

        verificarNotificacoes();
    }, []);

    useEffect(() => {
        if (location.pathname === "/profissional/notificacoes") {
            setTemNotificacaoNova(false);
            if (atualizarNotificacoes) {
                atualizarNotificacoes(false);
            }
        }
    }, [location]);

    return (
        <div className="w-full flex flex-row justify-end">
            <div className="relative m-2">
                <Link to="/profissional/notificacoes">
                    <img src="/assets/Doorbell.png" alt="Notificações" className="h-8" />
                    {temNotificacaoNova && (
                        <span className="absolute top-0 right-0 w-3 h-3 bg-red-500 rounded-full"></span>
                    )}
                </Link>
            </div>
        </div>


    );
}