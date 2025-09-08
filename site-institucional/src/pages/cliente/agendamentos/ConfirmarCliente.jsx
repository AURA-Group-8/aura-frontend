import { parse, format } from 'date-fns';
import NavbarCli from '../componentes/Navbar';
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Alerta from '../../componentes/Popup';
import axios from "axios";

export default function ConfirmarCli() {

    const [mensagem, setMensagem] = useState("");
    const [caminho, setCaminho] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const location = useLocation();
    const {cliente, data, hora, servicos } = location.state || {};
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
            userId: cliente.id,
            jobsIds: Array.isArray(servicos) ? servicos.map(s => s.id) : [servicos?.id],
            startDatetime: `${dataFormatada}T${hora}:00`,
            roleId: 2,
        };

        axios.post(`${apiUrl}/agendamentos`, agendamento, {
            headers: {
                Authorization: `Bearer ${sessionStorage.getItem("authToken")}`
            }
        })
            .then(() => {
                setMensagem("Agendamento confirmado!");
                setCaminho("/assets/Check-pop.png");
                setTimeout(() => {
                    setMensagem("");
                    navigate("/cliente/meus-agendamentos");
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

            <NavbarCli caminho={"/cliente/agendar"} />

            <div className="w-full h-screen bg-[#FFF3DC] flex flex-col justify-center items-center">
                <h1 className="text-[#982546] font-bold text-2xl">Confirmar agendamento</h1>
                <div className="border-1 border-[#982546] bg-[#FFF3DC] md:w-150 xl:text-2xl h-auto pb-2 rounded-2xl m-5 flex flex-col ">
                    <div className="bg-[#982546] w-full h-10 rounded-t-2xl flex p-2 items-center">
                    </div>
                    <div className="flex flex-row justify-between p-5">
                        <div className="h-20">
                            <p className="font-bold text-[#982546]">Serviços</p>
                            <ul className='border border-[#982546] max-h-20 xl:max-h-30 overflow-y-auto p-1 rounded-2xl md:w-60'>
                                {Array.isArray(servicos) && servicos.length > 0 ? (
                                    servicos.map((servico, key) => (
                                        <li key={key}>{servico.name}</li>
                                    ))
                                ) : (
                                    <li>{servicos?.name || servicos?.nome || "Nenhum serviço selecionado"}</li>
                                )}
                            </ul>
                        </div>

                        <div className="flex flex-col items-end gap-5 w-full">
                            <div className="flex flex-col gap-2">
                                <span className="font-bold text-[#982546]">Data: <span className="text-black font-normal">{data}</span></span>
                                <span className="font-bold text-[#982546]">Hora: <span className="text-black font-normal">{hora}</span></span>
                            </div>

                            <div>
                                <h1 className="font-bold text-[#982546] md:text-2xl text-lg">
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
                        className={`bg-[#982546] w-60 self-center mt-5 p-2 text-[#FFF3DC] rounded-2xl cursor-pointer ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
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
