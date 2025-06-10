import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import Alerta from "../Pop-up";


import Header from '../Header-login';

export default function AlterarSenha() {


    const apiUrl = import.meta.env.VITE_API_URL;
    const navigate = useNavigate();
    const location = useLocation();
    const { userId, email } = location.state || {};

    const [senha, setSenha] = useState("");
    const [confirmarSenha, setConfirmarSenha] = useState("");
    const [mensagem, setMensagem] = useState("");
    const [caminho, setCaminho] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false); // Estado para controlar o envio
    const limparAlert = () => {
        setTimeout(() => {
            setMensagem("");
        }, 2000);
    }




    const alterar = (e) => {
        e.preventDefault();
        if (isSubmitting) return; // Evita duplicidade
        setIsSubmitting(true); // Bloqueia o botão
        if (senha !== confirmarSenha) {
            setMensagem("❌ As senhas não coincidem.");
            setCaminho("/assets/Alert.png");
            limparAlert();
            setIsSubmitting(false);
            return;
        }
        axios.patch(`${apiUrl}/usuarios/alterar-senha/${userId}?password=${senha}`)
            .then((response) => {
                console.log("Senha alterada com sucesso:", response.data);
                setMensagem("✅ Senha alterada com sucesso!");
                setCaminho("/assets/Check-pop.png");
                setTimeout(() => {
                    navigate("/pages/client-pages/Login");
                }, 2000);
            })
            .catch((error) => {
                console.error("Erro ao alterar senha:", error);
                setMensagem("❌ Erro ao alterar senha. Tente novamente.");
                setCaminho("/assets/Alert.png");
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
            <div className="h-full w-full bg-[#FFF3DC] flex flex-col justify-center ">

            <Header caminho={"/pages/client-pages/ForgotPassword"} />


                <div className="h-full flex justify-center items-center">

                    <div className="flex flex-col h-screen justify-center items-center">

                        <h1 className="self-center text-[#982546] font-bold text-2xl p-4">Alterar senha</h1>

                        <form action="#" method="get" className="w-120 flex flex-col text-[#362323]  border border-[#982546] py-5 px-8 rounded-2xl gap-2 ">

                            <label>Nova Senha:</label>
                            <input type="password"
                                onChange={(e) => setSenha(e.target.value)}
                                id="telefone" name="senha" className="bg-[#ffffff] p-2 rounded-xl" />

                            <label >Confirmar Senha:</label>
                            <input type="password"
                                onChange={(e) => setConfirmarSenha(e.target.value)}
                                id="nome" name="confirmarSenha" className="bg-[#ffffff] p-2 rounded-xl" />

                            <div className="flex flex-row justify-between gap-4 pt-5">
                                <button type="submit" className="text-[#982546] border border-[#982546]  rounded-xl py-2 px-6 cursor-pointer" onClick={() => navigate("/pages/client-pages/ForgotPassword")}>Cancelar</button>
                                <button className="bg-[#982546] border border-[#FFF3DC] text-[#FFF3DC] rounded-xl py-2 px-6 cursor-pointer" onClick={alterar}>Alterar</button>
                            </div>
                        </form>
                    </div>
                </div>

            </div>
        </>
    );

}