
import NavbarCli from "../componentes/Navbar";
import { useState } from "react";
import Alerta from "../../componentes/PopUp";
import { set } from "date-fns";

export default function Contato() {

      const [mensagem, setMensagem] = useState("");
    const [caminho, setCaminho] = useState("");

      const limparAlert = () => {
        setTimeout(() => {
            setMensagem("");
        }, 2000);
    };

    const envio = () => {
        if(mensagem){
            setMensagem("Mensagem enviada!");
            setCaminho("/assets/Check-pop.png");
            limparAlert();
        }else{
            setMensagem("Por favor, escreva uma mensagem.");
            setCaminho("/assets/Alert.png");
            limparAlert();
        }
        
    }

    return (

        <>
            <NavbarCli caminho={"/cliente/home"} />

            {mensagem && (
                <Alerta
                    mensagem={mensagem}
                    imagem={caminho}
                />
            )}

            <div className="h-screen w-full text-[#982546] bg-[#FFF3DC] flex flex-col justify-center items-center">

                <h1 className="font-bold text-2xl">Contato</h1>

                <div className="flex flex-col w-90 md:w-full text-center xl:text-xl">
                    <p className="mt-5 md:mt-10">Tem alguma dúvida ou sugestão para a equipe da Aura? </p>

                    <p className="mt-5 font-bold"> Envie aqui e receberá as respostas por e-mail em breve</p>
                </div>

                <div className=" mt-5 border border-[#982546] h-60 w-90 md:w-120 xl:w-150 xl:text-xl p-5 flex  flex-col justify-center rounded-2xl">

                    <span>Mensagem:</span>

                    <textarea className="border border-[#982546] bg-[#fff] h-100 w-full rounded-2xl p-2 mt-4" placeholder="Envie suas dúvidas"></textarea>

                    <button className="bg-[#982546] text-[#FFF3DC] cursor-pointer p-1 mt-5 rounded-2xl w-50 self-end hover:bg-[#7f1d3f] transition duration-300" onClick={envio}>Enviar</button>
                </div>

            </div>
        </>


    )

}