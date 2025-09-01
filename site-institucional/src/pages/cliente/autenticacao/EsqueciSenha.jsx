import { useNavigate } from "react-router-dom";

import Header from '../componentes/HeaderLogin';
import { useState } from "react";
import axios from "axios";
import Alerta from "../../PopUp";

export default function EsqueceuSenha() {
    const navigate = useNavigate();
    const apiUrl = import.meta.env.VITE_API_URL;
    const [email, setEmail] = useState("");
    const [mensagem, setMensagem] = useState("");
    const [caminho, setCaminho] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const limparAlert = () => {
        setTimeout(() => {
            setMensagem("");
        }, 2000);
    }

    const enviarEmail = (e) => {
        e.preventDefault();

        if (isSubmitting) return;

        setIsSubmitting(true);
        axios.post(`${apiUrl}/mensagens/esqueci-senha`, { email })
            .then((response) => {
                console.log("Email enviado com sucesso:", response.data);
                setMensagem("✅ Email enviado com sucesso!");
                setCaminho("/assets/Check-pop.png");
                setTimeout(() => {
                    navigate("/cliente/validar-token", {
                        state: {
                            token: response.data.token,
                            userId: response.data.userId,
                            email: email
                        }
                    });
                }, 2000);
            })
            .catch((error) => {
                console.error("Erro ao enviar email:", error);
                setMensagem("❌ Erro ao enviar email. Verifique se o email está cadastrado.");
                setCaminho("/assets/Alert.png");
                limparAlert();
            })
            .finally(() => {
                setIsSubmitting(false);
            });
    };

    return (
        <>
            {mensagem && (
                <Alerta
                    mensagem={mensagem}
                    imagem={caminho}
                />
            )}

            <div className="h-full w-full bg-[#FFF3DC] flex flex-col items-center justify-center">

                <Header caminho={"/cliente/login"} />

                <div className="h-full flex justify-center items-center">
                    <div className="flex flex-col h-screen justify-start items-center">
                        <h1 className="self-center text-[#982546] font-bold text-2xl p-4">Esqueci a senha</h1>
                        <p className="w-96 flex justify-center font-semibold text-[#982546] mb-4 mt-5 text-center text-xl">Confirme seu E-mail cadastrado para receber o código de redefinição de senha</p>

                        <form action="#" method="get" className="w-120 flex flex-col text-[#362323] border border-[#982546] py-5 px-8 rounded-2xl gap-2 mt-10">
                            <label>Confirmar E-mail:</label>
                            <input onChange={(e) => setEmail(e.target.value)} type="text" id="nome" name="nome" className="bg-[#ffffff] p-2 rounded-xl" />
                            <div className="flex flex-row justify-between gap-4 pt-5">

                                <button type="button" className="text-[#982546] border border-[#982546] rounded-xl py-2 px-6 cursor-pointer hover:bg-[#dedbbf] transition duration-300" onClick={() => navigate("/pages/client-pages/Login")}>Cancelar</button>
                                <button
                                    className={`bg-[#982546] border border-[#FFF3DC] text-[#FFF3DC] rounded-xl py-2 px-6 cursor-pointer hover:bg-[#7f1d3f] transition duration-300 ${isSubmitting ? "opacity-50 cursor-not-allowed" : ""}`}
                                    onClick={enviarEmail}
                                    disabled={isSubmitting} 
                                >
                                    {isSubmitting ? "Enviando..." : "Alterar"}
                                </button>

                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}