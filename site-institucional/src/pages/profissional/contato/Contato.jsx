
import MenuLateral from "../componentes/MenuLateral";
import {useState } from "react";
import Alerta from "../../componentes/PopUp";
import SinoNotificacao from "../componentes/SinoNotificacao";
import CardContato from "../../componentes/CardContato";

export default function ContatoPro() {

    const [mensagem, setMensagem] = useState("");
    const [textMensagem, setTextMensagem] = useState("");

    const [caminho, setCaminho] = useState('');


    const limparAlert = () => {
        setTimeout(() => {
            setMensagem("");
        }, 2000);
    }

    const envio = (e) => {

        e.preventDefault();

        if (textMensagem === "" || textMensagem === "" || textMensagem.trim().length < 2 || textMensagem.trim().length < 10) {
            setMensagem("Preencha todos os campos!");
            setCaminho("/assets/Alert.png");
            limparAlert();
            return;
        }

        setMensagem("Mensagem enviada!");
        setCaminho("/assets/Check-pop.png");
        limparAlert();
        return;

    }


    setTimeout(() => {
        setMensagem("");
    }, 2000);



    return (
        <>

            {mensagem && (
                <Alerta
                    mensagem={mensagem}
                    imagem={caminho}
                />
            )}

            <div className="w-full h-screen bg-[#FFF3DC] ">
                <div className="h-full flex flex-row">
                    <MenuLateral />

                    <div className="flex flex-col w-full h-full  items-center ">
                        <SinoNotificacao />

                        <CardContato/>

                    </div>

                </div>

            </div>

        </>
    )

}

