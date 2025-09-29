import { useEffect, useState } from "react";
import Alerta from "../../componentes/Popup";
import axios from "axios";

export default function CardAgendamento(props) {
    const apiUrl = import.meta.env.VITE_API_URL;

    const [cor, setCor] = useState("#982546");
    const [text, setText] = useState("Marcar como feito");
    const [botaoAtivo, setBotaoAtivo] = useState(true);
    const [mostrarMotivo, setMostrarMotivo] = useState(false);
    const [motivoCancelamento, setMotivoCancelamento] = useState("");
    const [mensagem, setMensagem] = useState("");
    const [caminho, setCaminho] = useState("");
    const [paymentStatus, setPaymentStatus] = useState("PENDENTE");

    useEffect(() => {
        const status = props.status?.toUpperCase();

        if (status === "FEITO") {
            setCor("#a34862");
            setText("Feito");
            setBotaoAtivo(true);
            setPaymentStatus("PAGO");
        } else if (status === "CANCELADO") {
            setCor("#807679");
            setText("Cancelado");
            setBotaoAtivo(false);
            setPaymentStatus("CANCELADO");
        } else {
            setCor("#982546");
            setText("Marcar como feito");
            setBotaoAtivo(true);
            setPaymentStatus("PENDENTE");
        }
    }, [props.status]);

    const limparAlert = () => {
        setTimeout(() => setMensagem(""), 2000);
    };

    const cancelar = () => setMostrarMotivo(true);

    const confirmarCancelamento = () => {

        if (motivoCancelamento.trim() === "") {
            fecharModal();
            setMensagem("Por favor, informe o motivo do cancelamento.");
            setCaminho("/assets/Alert.png");
            limparAlert();
            return;
        }

        const role = 2;
        
        axios.delete(`${apiUrl}/agendamentos/${props.id}`, {
            headers: {
                Authorization: `Bearer ${sessionStorage.getItem("authToken")}`
            },
            params: {
                roleId: role,
                message: motivoCancelamento
            }

        }).then(() => {
            setMensagem("Agendamento cancelado!");
            setCaminho("/assets/Check-pop.png");

            setCor("#807679");
            setText("Cancelado");
            setBotaoAtivo(false);
            setPaymentStatus("CANCELADO");
            setMostrarMotivo(false);

            limparAlert();
        }).catch((error) => {
            console.error("Erro ao cancelar agendamento:", error.response?.data || error.message);
            setMensagem("Erro ao cancelar o agendamento.");
            setCaminho("/assets/Alert.png");
            limparAlert();
        });
    };

    const fecharModal = () => {
        setMostrarMotivo(false);
        setMotivoCancelamento("");
    };

    return (
        <>
            {mensagem && <Alerta mensagem={mensagem} imagem={caminho} />}

            <div className="flex flex-row w-full mt-12 justify-center mb-10 md:mb-0 md:mt-5">
                <div className="flex flex-col justify-center w-150 h-40">
                    <div
                        className="h-20 rounded-t-2xl flex items-center p-2 z-10"
                        style={{
                            backgroundColor: props.isHistorico ? "#b0b0b0" : cor,
                            boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.3)",
                        }}
                    >
                        <p className="font-bold text-white text-lg">{props.name}</p>
                    </div>

                    <div
                        className="rounded-b-2xl"
                        style={{
                            backgroundColor: props.isHistorico ? "#b0b0b0" : cor,
                        }}
                    >
                        <div className="flex flex-col p-2 text-white text-lg">
                            <label className="font-bold text-[#ffa8d8]">Serviços:</label>
                            <select
                                className="w-full p-1 rounded-lg mb-5 text-[#982546] bg-white border border-[#ffa8d8]"
                            >
                                {props.service?.split(",").map((serv, index) => (
                                    <option key={index} value={serv.trim()} className="p-2 rounded-md">
                                        {serv.trim()}
                                    </option>
                                ))}
                            </select>
                            <div className="flex flex-col md:flex-row justify-between">
                                <div className="flex gap-2">
                                    <p className="text-[#ffa8d8]">
                                        Data: <span className="text-white">{props.date}</span>
                                    </p>
                                    <span> - </span>
                                    <p className="text-[#ffa8d8]">
                                        Horário: <span className="text-white">{props.time}</span>
                                    </p>
                                </div>
                                <p className="font-bold text-3xl text-[#ffa8d8] mt-5 md:mt-0">{props.value}</p>
                            </div>
                        </div>

                        <div className="flex justify-between p-2">
                            {!props.isHistorico && botaoAtivo && text !== "Feito" && paymentStatus !== "CANCELADO" && paymentStatus !== "PAGO" && (
                                <button
                                    className="p-2 rounded-2xl border cursor-pointer border-[#FFF3DC] text-[#FFF3DC] hover:bg-[#b36078]"
                                    onClick={cancelar}
                                >
                                    Cancelar atendimento
                                </button>
                            )}
                        </div>
                    </div>
                </div>


                {mostrarMotivo && (
                    <div className="fixed inset-0 flex items-center justify-center z-50 ">
                        <div className="bg-white p-6 rounded-2xl shadow-xl w-[30rem] max-w-[90%]">
                            <h2 className="text-[#982546] text-xl font-bold mb-4">Motivo do cancelamento</h2>
                            <textarea
                                className="w-full h-28 border border-[#982546] rounded-xl p-2 outline-none resize-none text-[#982546] placeholder:text-[#98254699]"
                                placeholder="Digite o motivo aqui"
                                value={motivoCancelamento}
                                onChange={(e) => setMotivoCancelamento(e.target.value)}
                            />
                            <div className="flex justify-between mt-4">
                                <button
                                    onClick={fecharModal}
                                    className="px-4 py-2 rounded-xl border cursor-pointer border-[#982546] bg-[#982546] text-white"
                                >
                                    Voltar
                                </button>
                                <button
                                    onClick={confirmarCancelamento}
                                    className="px-4 py-2 rounded-xl cursor-pointer  text-[#982546]"
                                >
                                    Cancelar atendimento
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}
