import { useState } from "react";
import Alerta from "../../Pop-up";
import axios from "axios";


export default function CardAgendamento(props) {
    const [cor, setCor] = useState("#982546");
    const [text, setText] = useState("Marcar como feito");
    const [botaoAtivo, setBotaoAtivo] = useState(true);
    const [mostrarMotivo, setMostrarMotivo] = useState(false);
    const [motivoCancelamento, setMotivoCancelamento] = useState("");
    const [mensagem, setMensagem] = useState("");
    const [caminho, setCaminho] = useState("");

    const limparAlert = () => {
        setTimeout(() => {
            setMensagem("");
        }, 2000);
    }

    const marcarFeito = () => {
        setCor((card) => card === "#982546" ? "#a34862" : "#982546");
        setText((texto) => texto === "Marcar como feito" ? "Feito" : "Marcar como feito");
        setBotaoAtivo(!botaoAtivo);
        setMostrarMotivo(false);
    };

    const cancelar = () => {
        setMostrarMotivo(true);
    };

    const confirmarCancelamento = () => {


        if (motivoCancelamento.trim() === "") {
            
            fecharModal();

            setMensagem("Por favor, informe o motivo do cancelamento.");
            setCaminho("/assets/Alert.png");
            limparAlert();

        } else {

            setMensagem("Agendamento cancelado!");
            setCaminho("/assets/Check-pop.png");
            limparAlert();
           
            setCor("#807679");
            setText("Cancelado");
            setBotaoAtivo(false);
            setMostrarMotivo(false);
            
        }

    };

    const fecharModal = () => {
        setMostrarMotivo(false);
        setMotivoCancelamento("");
    };


    return (

        <>
            {mensagem && (
                <Alerta
                    mensagem={mensagem}
                    imagem={caminho}
                />
            )}

            <div className="flex flex-row  w-full relative mt-15">
                <div className="flex flex-col justify-center w-full h-40">
                    <div className={` h-20 rounded-t-2xl flex items-center p-2 z-10`} 
                    style={{
                        backgroundColor: cor,
                        boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.3)"
                    }}>
                        <p className="font-bold text-white text-lg">{props.name}</p>
                    </div>

                    <div className="rounded-b-2xl transition-all" style={{ backgroundColor: cor }}>
                        <div className="flex flex-col p-2 w-full text-white text-lg ">
                            <p className="mb-2 w-150 font-bold">{props.service}</p>
                            <div className="flex flex-row justify-between w-full">
                                <div className="flex flex-row justify-around gap-2">
                                    <p className="text-[#ffa8d8]">Data: <span className="text-white">{props.date}</span></p>
                                    <span> - </span>
                                    <p className="text-[#ffa8d8]">Horário: <span className="text-white">{props.time}</span></p>
                                </div>
                                <p className="font-bold text-3xl text-[#ffa8d8]">{props.value}</p>
                            </div>
                        </div>

                        <div className="w-full p-2 text-white text-lg">
                            <span className="text-[#ffa8d8] font-bold">Pagamento: </span>
                            <select className="outline-none  rounded p-1">
                                <option className="text-emerald-600">Pago</option>
                                <option className="text-amber-600">Pendente</option>
                            </select>
                        </div>

                        <div className="flex flex-row justify-between w-full p-2">
                            <button className="bg-[#FFF3DC] p-2 rounded-2xl text-[#982546] cursor-pointer" onClick={marcarFeito}>
                                {text}
                            </button>
                            {botaoAtivo && (
                                <button className="p-2 rounded-2xl border border-[#FFF3DC] text-[#FFF3DC] cursor-pointer" onClick={cancelar}>
                                    Cancelar atendimento
                                </button>
                            )}
                        </div>
                    </div>
                </div>

                {mostrarMotivo && (
                    <div className="fixed inset-0 flex items-center justify-center z-50">
                        <div className="bg-white p-6 rounded-2xl shadow-xl w-[30rem] max-w-[90%]">
                            <h2 className="text-[#982546] text-xl font-bold mb-4">Motivo do cancelamento</h2>
                            <textarea
                                className="w-full h-28 border border-[#982546] rounded-xl p-2 outline-none resize-none text-[#982546] placeholder:text-[#98254699]"
                                placeholder="Digite o motivo aqui"
                                value={motivoCancelamento}
                                onChange={(e) => setMotivoCancelamento(e.target.value)}
                            />
                            <div className="flex justify-between mt-4">
                                <button onClick={fecharModal} className="px-4 py-2 rounded-xl border border-[#982546] text-[#982546] cursor-pointer">
                                    Voltar
                                </button>
                                <button onClick={confirmarCancelamento} className="px-4 py-2 rounded-xl bg-[#982546] text-white cursor-pointer">
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
