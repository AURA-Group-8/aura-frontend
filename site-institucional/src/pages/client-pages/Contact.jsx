
import NavbarCli from "./components/Navbar";
import { useState } from "react";
import Alerta from "../Pop-up";

export default function Contato() {

    const [mensagem, setMensagem] = useState("");

    const envio = () => {

        setMensagem("Mensagem enviada!")

        setTimeout(() => {
            setMensagem("");
        }, 2000);
    }

    return (

        <>
            <NavbarCli caminho={"/pages/client-pages/Home"} />

            {mensagem && (
                <Alerta
                    mensagem={mensagem}
                    imagem="/assets/Check-pop.png"
                />
            )}

            <div className="h-screen w-full text-[#982546] bg-[#FFF3DC] flex flex-col justify-center items-center">

                <h1 className="font-bold text-2xl">Contato</h1>

                <div className="flex flex-col items-center ">
                    <p className="mt-20">Tem alguma dúvida ou sugestão para a equipe da Aura? </p>

                    <p className="mt-5 font-bold"> Envie aqui e receberá as respostas por e-mail em breve</p>
                </div>

                <div className=" mt-5 border border-[#982546] h-60 w-120 p-5 flex  flex-col justify-center rounded-2xl">

                    <span>Mensagem:</span>

                    <textarea className="border border-[#982546] bg-[#fff] h-100 w-full rounded-2xl p-2 mt-4" placeholder="Envie suas dúvidas"></textarea>

                    <button className="bg-[#982546] text-[#FFF3DC] cursor-pointer p-1 mt-5 rounded-2xl w-50 self-end hover:bg-[#7f1d3f] transition duration-300" onClick={envio}>Enviar</button>
                </div>

            </div>
        </>


    )

}