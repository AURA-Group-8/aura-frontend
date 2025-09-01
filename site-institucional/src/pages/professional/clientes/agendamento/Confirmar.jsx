import { parse, format } from 'date-fns';
import NavbarPro from '../../componentes/Navbar';
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Alerta from '../../../Popup';
import axios from "axios";

export default function Confirmar() {

    const [mensagem, setMensagem] = useState("");
    const [caminho, setCaminho] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const location = useLocation();
    const { cliente, data, hora, servicos } = location.state || {};
    const navigate = useNavigate();
[]
    const limparAlert = () => {
        setTimeout(() => {
            setMensagem("");
        }, 2000);
    }

    const confirmar = () => {
        if (isLoading) return; 

        setIsLoading(true);

        const apiUrl = import.meta.env.VITE_API_URL;
        const dataFormatada = format(parse(data, 'dd/MM/yyyy', new Date()), 'yyyy-MM-dd');

        const agendamento = {
            userId: cliente?.id,
            jobsIds: Array.isArray(servicos) ? servicos.map(s => s.id) : [servicos?.id],
            startDatetime: `${dataFormatada}T${hora}:00`,
            roleId: 1,
        };

        axios.post(`${apiUrl}/agendamentos`, agendamento, {
            headers: {
                Authorization: `Bearer ${sessionStorage.getItem("authToken")}`
            }
        })
            .then(() => {
                setMensagem("Agendamento confirmado com sucesso!");
                setCaminho("/assets/Check-pop.png");
                setTimeout(() => {
                    setMensagem("");
                    navigate("/professional/dashboard");
                }, 1000);
            })
            .catch((error) => {
                console.error("Erro ao confirmar agendamento:", error);
                setMensagem("Erro ao confirmar agendamento. Tente novamente.");
                setCaminho("/assets/Alert.png");
                limparAlert();
            })
            .finally(() => {
                setIsLoading(false); 
            });
    }

    return (
        <>
            {mensagem && (
                <Alerta
                    mensagem={mensagem}
                    imagem={caminho}
                />
            )}

            <NavbarPro caminho={"/pages/professional-pages/Agendar"} />

            <div className="w-full h-screen bg-[#FFF3DC] flex flex-col justify-center items-center">
                <h1 className="text-[#982546] font-bold text-2xl">Confirmar agendamento</h1>
                <div className="border-1 border-[#982546] bg-[#FFF3DC] w-150 h-60 rounded-2xl flex flex-col mt-5">
                    <div className="bg-[#982546] w-full h-10 rounded-t-2xl flex p-2 items-center">
                        <h1 className="text-white font-bold text-2xl">{cliente.username}</h1>
                    </div>
                    <div className="flex flex-row justify-between p-5">
                        <div className="h-20">
                            <p className="font-bold text-[#982546]">Serviços</p>
                            <ul>
                                {Array.isArray(servicos) && servicos.length > 0 ? (
                                    servicos.map((servico, key) => (
                                        <li key={key}>{servico.name}</li>
                                    ))
                                ) : (
                                    <li>{servicos?.name || servicos?.nome || "Nenhum serviço selecionado"}</li>
                                )}
                            </ul>
                        </div>

                        <div className="flex flex-col items-end gap-5">
                            <div className="flex flex-row gap-10">
                                <span className="font-bold text-[#982546]">Data: <span className="text-black font-normal">{data}</span></span>
                                <span className="font-bold text-[#982546]">Hora: <span className="text-black font-normal">{hora}</span></span>
                            </div>

                            <div>
                                <h1 className="font-bold text-[#982546] text-2xl">
                                    Total: R$ {
                                        Array.isArray(servicos)
                                            ? servicos.reduce((acc, item) => acc + (Number(item.price) || 0), 0).toFixed(2)
                                            : (Number(servicos?.price) || 0).toFixed(2)
                                    }
                                </h1>
                            </div>
                        </div>
                    </div>

                    <button
                        className={`bg-[#982546] w-60 self-center mt-5 p-2 text-[#FFF3DC] rounded-2xl cursor-pointer hover:bg-[#b36078] transition-colors ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                        onClick={confirmar}
                        disabled={isLoading}
                    >
                        {isLoading ? "Confirmando..." : "Confirmar agendamento"}
                    </button>
                </div>
            </div>
        </>
    );
}
