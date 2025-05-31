import NavbarPro from "./components/Navbar";
import { useState } from "react";
import Alerta from "../Pop-up";
import { useNavigate } from "react-router-dom";

export default function Mensagem() {

    const navigate = useNavigate();
    const [assunto, setAssunto] = useState("");
    const [textMensagem, setTextMensagem] = useState("");
    const [mensagem, setMensagem] = useState("");
    const [caminho, setCaminho] = useState("");

    const limparAlert = () => {
        setTimeout(() => {
            setMensagem("");
        }, 2000);
    }

    const enviar = (e) => {
        e.preventDefault();

        if (assunto === "" || textMensagem === "" || assunto.trim().length < 2 || textMensagem.trim().length < 10) {
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

    return (
        <>

            {mensagem && (
                <Alerta
                    mensagem={mensagem}
                    imagem={caminho}
                />
            )}


            <NavbarPro caminho={"/pages/professional-pages/MeusClientes"} />
            <div className="w-full h-screen bg-[#FFF3DC] flex flex-col justify-center items-center">
                <h1 className="text-[#982546] font-bold text-2xl">Enviar mensagem</h1>

                <form className="border-1 border-[#982546] bg-[#FFF3DC] w-150 p-4 rounded-2xl flex flex-row justify-center items-center mt-5">
                    <div className="flex flex-col w-120 ">
                        <p className=" mt-2">Assunto</p>
                        <input type="text" name="nome" className="bg-amber-50 p-2 rounded-2xl border-1 border-[#982546]" onChange={e => setAssunto(e.target.value)} />

                        <p className="mt-4">Mensagem</p>
                        <textarea type="text" name="nome" className="bg-amber-50 p-2 rounded-2xl border-1 border-[#982546]" onChange={e => setTextMensagem(e.target.value)} />



                        <div className="flex flex-row w-full justify-between mt-10">
                            <button
                                type="reset"
                                className="border-1 border-[#982546] py-2 px-8 rounded-2xl text-[#982546] cursor-pointer"
                            >
                                Cancelar
                            </button>

                            <button className="bg-[#982546] py-2 px-8 rounded-2xl text-[#FFF3DC] cursor-pointer" onClick={enviar}>Enviar</button>
                        </div>
                    </div>
                </form>
            </div>
        </>
    )

}


