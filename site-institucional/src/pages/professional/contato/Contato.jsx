import { useNavigate } from "react-router-dom";
import MenuLateral from "./components/MenuLateral";
import { use, useState } from "react";
import Alerta from "../Pop-up";
import SinoNotificacao from "./components/SinoNotificacao";


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

                        <div className="h-screen  text-[#982546] bg-[#FFF3DC] flex flex-col items-center ml-20">

                            <h1 className="font-bold text-2xl">Contato</h1>

                            <div className="flex flex-col items-center ">
                                <p className="mt-20">Tem alguma dúvida ou sugestão para a equipe da Aura? </p>

                                <p className="mt-5 font-bold"> Envie aqui e receberá as respostas por e-mail em breve</p>
                            </div>


                            <div className=" mt-5 border border-[#982546] h-60 w-150 p-5 flex  flex-col justify-center rounded-2xl">

                                <span>Mensagem:</span>

                                <textarea className="border border-[#982546] bg-[#fff] h-100 w-full rounded-2xl p-2 mt-4" placeholder="Envie suas dúvidas" onChange={e => setTextMensagem(e.target.value)}></textarea>

                                <button className="bg-[#982546] text-[#FFF3DC] p-1 mt-5 rounded-2xl w-50 self-end cursor-pointer hover:bg-[#b36078] transition-colors" onClick={envio}>Enviar</button>
                            </div>

                        </div>



                    </div>

                </div>


            </div>

        </>
    )

}

