import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

import NavbarPro from "./components/Navbar";
import Alerta from "../Pop-up";

export default function AlterarSenha() {
    const navigate = useNavigate();
    const apiUrl = import.meta.env.VITE_API_URL;

    const [novaSenha, setNovaSenha] = useState("");
    const [confirmarSenha, setConfirmarSenha] = useState("");
    const [usuario, setUsuario] = useState(null);

    const [mensagem, setMensagem] = useState("");
    const [caminho, setCaminho] = useState("");

    const token = sessionStorage.getItem("authToken");
    const userId = sessionStorage.getItem("userId");

    const limparAlert = () => {
        setTimeout(() => {
            setMensagem("");
            setCaminho("");
        }, 2000);
    };

    useEffect(() => {
        const token = sessionStorage.getItem("authToken");

        const buscarUsuario = async () => {
            try {
                const response = await axios.get(`${apiUrl}/usuarios/${userId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                setUsuario(response.data);
            } catch (error) {
                console.error("Erro ao buscar dados do usuário:", error);
            }
        };

        buscarUsuario();
    }, []);

    const alterarSenha = async (e) => {
        e.preventDefault();

        if (novaSenha !== confirmarSenha) {
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
                password: novaSenha
            };

            await axios.patch(`${apiUrl}/usuarios/${usuario.id}`, corpoAtualizado, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            setMensagem("Senha alterada com sucesso!");
            setCaminho("/assets/Check-pop.png");
            limparAlert();

            setTimeout(() => {
                navigate("/pages/professional-pages/Login");
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

            <div className="h-full w-full bg-[#FFF3DC] flex justify-center">
                <NavbarPro caminho={"/pages/professional-pages/Configuracoes"} />

                <div className="h-full flex justify-center items-center">
                    <div className="flex flex-col h-screen justify-center items-center">
                        <h1 className="self-center text-[#982546] font-bold text-2xl p-4">Alterar senha</h1>

                        <form className="w-120 flex flex-col text-[#362323] border border-[#982546] py-5 px-8 rounded-2xl gap-2" onSubmit={alterarSenha}>
                            <label>Nova Senha:</label>
                            <input
                                type="password"
                                value={novaSenha}
                                onChange={(e) => setNovaSenha(e.target.value)}
                                className="bg-[#ffffff] p-2 rounded-xl"
                            />

                            <label>Confirmar Senha:</label>
                            <input
                                type="password"
                                value={confirmarSenha}
                                onChange={(e) => setConfirmarSenha(e.target.value)}
                                className="bg-[#ffffff] p-2 rounded-xl"
                            />

                            <div className="flex flex-row justify-between gap-4 pt-5">
                                <button
                                    type="button"
                                    className="text-[#982546] border border-[#982546] rounded-xl py-2 px-6 cursor-pointer"
                                    onClick={() => navigate("/pages/client-pages/Login")}
                                >
                                    Cancelar
                                </button>
                                <button
                                    type="submit"
                                    className="bg-[#982546] border border-[#FFF3DC] text-[#FFF3DC] rounded-xl py-2 px-6 cursor-pointer"
                                >
                                    Alterar
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}
