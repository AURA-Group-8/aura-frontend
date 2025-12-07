import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import Alerta from "./PopUp";

export default function FormularioAlterarSenha() {
    const apiUrl = import.meta.env.VITE_API_URL_V2;
    const navigate = useNavigate();
    const location = useLocation();
    const [senha, setSenha] = useState("");
    const [confirmarSenha, setConfirmarSenha] = useState("");
    const [mensagem, setMensagem] = useState("");
    const [caminho, setCaminho] = useState('');
    const [usuario, setUsuario] = useState(null);
    const token = sessionStorage.getItem("authToken");
    const userId = sessionStorage.getItem("userId");


    const limparAlert = () => {
        setTimeout(() => {
            setMensagem("");
        }, 2000);
    }

    const alterarSenha = async (e) => {
        e.preventDefault();

        const senhaTrim = senha.trim();
        const confirmarTrim = confirmarSenha.trim();


        const emojiRegex = /(\p{Emoji_Presentation}|\p{Emoji}\uFE0F)/u;

        if (senhaTrim.length === 0 || confirmarTrim.length === 0) {
            setMensagem("Preencha ambos os campos de senha.");
            setCaminho("/assets/Alert.png");
            limparAlert();
            return;
        }

        if (emojiRegex.test(senhaTrim) || emojiRegex.test(confirmarTrim)) {
            setMensagem("Emojis não são permitidos na senha.");
            setCaminho("/assets/Alert.png");
            limparAlert();
            return;
        }

        if (senhaTrim.length < 6) {
            setMensagem("A senha deve ter no mínimo 6 caracteres.");
            setCaminho("/assets/Alert.png");
            limparAlert();
            return;
        }

        if (senhaTrim !== confirmarTrim) {
            setMensagem("As senhas não coincidem.");
            setCaminho("/assets/Alert.png");
            limparAlert();
            return;
        }

        if (!usuario) {
            setMensagem("Erro ao carregar dados do usuário.");
            setCaminho("/assets/Alert.png");
            limparAlert();
            return;
        }

        try {
            const corpoAtualizado = {
                password: senhaTrim
            };
            await axios.patch(`${apiUrl}/usuarios/${userId}`, corpoAtualizado, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            setMensagem("Senha alterada com sucesso!");
            setCaminho("/assets/Check-pop.png");
            limparAlert();

            setSenha("");
            setConfirmarSenha("");

            setTimeout(() => {
                navigate("/profissional/configuracoes");
            }, 2000);

        } catch (error) {
            console.error("Erro ao alterar senha:", error.response?.data || error.message);
            setMensagem("Erro ao alterar a senha. Tente novamente.");
            setCaminho("/assets/Alert.png");
            limparAlert();
        }
    };

    return (
        <>
            {mensagem && (
                <Alerta
                    mensagem={mensagem}
                    imagem={caminho}
                />
            )}

            <div className="h-full flex justify-center items-center">

                <div className="flex flex-col h-screen ">

                    <h1 className="self-center text-[#982546] font-bold text-2xl p-4">Alterar senha</h1>

                    <form action="#" method="get" className="w-90 md:w-120 xl:w-150 flex flex-col text-[#362323]  border border-[#982546] py-5 px-8 rounded-2xl gap-2 mt-10 text-xl">

                        <label>Nova Senha:</label>
                        <input type="password"
                            onChange={(e) => setSenha(e.target.value)}
                            id="telefone" name="senha" className="bg-[#ffffff] p-2 rounded-xl" />

                        <label >Confirmar Senha:</label>
                        <input type="password"
                            onChange={(e) => setConfirmarSenha(e.target.value)}
                            id="nome" name="confirmarSenha" className="bg-[#ffffff] p-2 rounded-xl" />

                        <div className="flex flex-row justify-between gap-4 pt-5">
                            <button type="submit" className="text-[#982546] border border-[#982546]  rounded-xl py-2 px-6 cursor-pointer hover:bg-[#dedbbf] transition duration-300" onClick={() => navigate("/cliente/esqueci-senha")}>Cancelar</button>
                            <button className="bg-[#982546] border border-[#FFF3DC] text-[#FFF3DC] rounded-xl py-2 px-6 cursor-pointer hover:bg-[#7f1d3f] transition duration-300" onClick={alterarSenha}>Alterar</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}
