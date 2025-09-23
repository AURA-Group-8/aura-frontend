import { useNavigate } from "react-router-dom";
import MenuLateral from "../componentes/MenuLateral";
import { use, useState } from "react";
import Alerta from "../../componentes/PopUp";
import SinoNotificacao from "../componentes/SinoNotificacao";


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

                        <div className="h-screen text-[#982546] bg-[#FFF3DC] flex flex-col items-center ">

                            <h1 className="font-bold text-2xl">Contato</h1>

                            <div className="flex flex-col text-center w-80 md:w-full h-40 items-center xl:text-lg">
                                <p className="mt-20">Tem alguma dúvida ou sugestão para a equipe da Aura? </p>

                                <p className="mt-5 font-bold"> Envie aqui e receberá as respostas por e-mail em breve</p>
                            </div>


                            <div className=" mt-15 md:mt-5 border border-[#982546] border-t-8 h-60 xl:h-80 w-90 md:w-150 xl:w-180 p-5 flex flex-col justify-center rounded-2xl">

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

