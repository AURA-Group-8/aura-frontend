import { useState } from "react";
import Alerta from "../../Pop-up";
import axios from "axios";
import NavbarCli from "./Navbar";


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
                    <div className={`w-96 h-20 rounded-t-2xl flex items-center p-2 z-10`} 
                    style={{
                        backgroundColor: cor,
                        boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.3)"
                    }}>
                        <p className="font-bold text-white text-lg">{props.name}</p>
                    </div>

                    <div className={`w-96 rounded-b-2xl transition-all`} style={{ backgroundColor: cor }}>
                        <div className="flex flex-col p-2 w-full text-white text-lg h-20 overflow-y-auto">
                            <p >{props.service}</p>
                            <div className="flex flex-row justify-between w-full">
                                <p>{props.date} - {props.time}</p>
                                <p className="font-bold text-3xl text-[#F0A8BC]">{props.value}</p>
                            </div>
                        </div>

                       
                        <div className="flex flex-row justify-between w-full p-2">
                            <button className="bg-[#FFF3DC] p-2 rounded-2xl text-[#982546] cursor-pointer" onClick={marcarFeito}>
                                {text}
                            </button>
                        </div>
                    </div>
                </div>

            </div>

        </>
    );
}
