import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from 'axios';

export default function NavbarCli({ caminho, atualizarNotificacoes }) {
    const [temNotificacaoNova, setTemNotificacaoNova] = useState(false);
    const navigate = useNavigate();
    const location = useLocation(); // Hook para monitorar a navegação
    const apiUrl = import.meta.env.VITE_API_URL;
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
                const notificacoesNaoLidas = response.data.some((notificacao) => !notificacao.wasAnswered);
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

    // Atualiza o estado quando o usuário acessa a página de notificações
    useEffect(() => {
        if (location.pathname === "/cliente/notificacoes") {
            setTemNotificacaoNova(false);
            if (atualizarNotificacoes) {
                atualizarNotificacoes(false);
            }
        }
    }, [location]);

    return (
        
        <div className="bg-[#FFF3DC] w-full h-15 flex flex-row justify-between items-center p-2 fixed shadow-2xs">
            <div>
                <img src="/assets/Back.png" alt="" className="h-10 cursor-pointer" onClick={() => navigate(caminho)} />
            </div>

            <div className="flex flex-row items-center gap-5">
                <img src="/assets/user.png" alt="" className="h-8 cursor-pointer " onClick={() => navigate("/cliente/configuracoes")} />
                <div className="relative">
                    <Link to="/cliente/notificacoes">
                        <img src="/assets/Doorbell.png" alt="Notificações" className="h-8" />
                        {temNotificacaoNova && (
                            <span className="absolute top-0 right-0 w-3 h-3 bg-red-500 rounded-full"></span>
                        )}
                    </Link>
                </div>
            </div>
        </div>
    );
}

