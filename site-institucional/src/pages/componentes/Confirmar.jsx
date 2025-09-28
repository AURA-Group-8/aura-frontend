import { parse, format } from 'date-fns';
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Alerta from './PopUp';
import axios from "axios";

export default function Confirmar({ cliente, servicos, data, horario, redirectTo = "/profissional/dashboard" }) {

    const [mensagem, setMensagem] = useState("");
    const [imagemCaminho, setImagemCaminho] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();

    const limparAlert = () => {
        setTimeout(() => {
            setMensagem("");
        }, 2000);
    }

    const confirmar = () => {
        if (cliente === null || servicos.length === 0 || data === null || horario === null) {
            setMensagem("Por favor, preencha todos os campos obrigatórios.");
            setImagemCaminho("/assets/Alert.png");
            limparAlert();
            return;
        }

        if (isLoading) return;

        setIsLoading(true);

        const apiUrl = import.meta.env.VITE_API_URL;
        const dataFormatada = format(parse(data, 'dd/MM/yyyy', new Date()), 'yyyy-MM-dd');

        const agendamento = {
            userId: cliente?.id,
            jobsIds: Array.isArray(servicos) ? servicos.map(s => s.id) : [servicos?.id],
            startDatetime: `${dataFormatada}T${horario}:00`,
            roleId: 1,
        };

        axios.post(`${apiUrl}/agendamentos`, agendamento, {
            headers: {
                Authorization: `Bearer ${sessionStorage.getItem("authToken")}`
            }
        })
            .then(() => {
                setMensagem("Agendamento confirmado com sucesso!");
                setImagemCaminho("/assets/Check-pop.png");
                setTimeout(() => {
                    setMensagem("");
                    navigate(redirectTo);
                }, 1000);
            })
            .catch((error) => {

                console.error("Erro ao confirmar agendamento:", error);
                setMensagem("Erro ao confirmar agendamento. Tente novamente.");
                setImagemCaminho("/assets/Alert.png");
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
                    imagem={imagemCaminho}
                />
            )}

            <div className="border-1 border-[#982546] w-90 md:w-130 xl:w-160 xl:text-2xl h-auto pb-2 rounded-2xl mt-10 mb-10 md:mb-0 flex flex-col ">
                <div className="bg-[#982546] w-full h-10 rounded-t-2xl flex p-2 items-center">
                    <h1 className="text-white font-bold text-lg">{cliente?.username}</h1>
                </div>
                <div className="flex flex-row w-full justify-center p-5">
                    <div className="h-20">
                        <p className="font-bold text-[#5a5a5a]">Serviços:</p>
                        <ul className='border border-[#982546] max-h-20 xl:max-h-30 overflow-y-auto p-1 rounded-2xl md:w-70'>
                            {Array.isArray(servicos) && servicos.length > 0 ? (
                                servicos.map((servico, key) => (
                                    <li key={key}>{servico.name}</li>
                                ))
                            ) : (
                                <li >{servicos?.name || servicos?.nome || "Nenhum serviço selecionado"}</li>
                            )}
                        </ul>
                    </div>

                    <div className="flex flex-col items-end gap-2 w-full">
                        <div className="flex flex-col gap-2">
                            <span className="font-bold text-[#5a5a5a]">Data: <span className="text-black font-normal">{data}</span></span>
                            <span className="font-bold text-[#5a5a5a]">Hora: <span className="text-black font-normal">{horario}</span></span>
                        </div>

                        <div className='flex flex-col font-bold text-[#982546] md:text-xl text-right'>
                            <p>Total a pagar:</p>
                            <p>
                                R$ {
                                    Array.isArray(servicos)
                                        ? servicos.reduce((acc, item) => acc + (Number(item.price) || 0), 0).toFixed(2)
                                        : (Number(servicos?.price) || 0).toFixed(2)
                                }
                            </p>
                        </div>
                    </div>
                </div>

                <button
                    className={`bg-[#982546] font-bold w-60 self-center p-2 text-[#FFF3DC] rounded-2xl cursor-pointer hover:bg-[#b36078] transition-colors ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                    onClick={confirmar}
                    disabled={isLoading}
                >
                    {isLoading ? "Confirmando..." : "Confirmar agendamento"}
                </button>
            </div>
        </>
    );
}
