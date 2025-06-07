import NavbarCli from "./components/Navbar";
import { useState } from "react";
import Alerta from "../Pop-up";
import { useNavigate } from "react-router-dom";
import axios from "axios";


export default function ConfigCli() {
    const apiUrl = import.meta.env.VITE_API_URL;

    const [desabilitado, setDesabilitado] = useState(true);
    const [mensagem, setMensagem] = useState("");
    const [caminho, setCaminho] = useState('');

    const limparAlert = () => {
        setTimeout(() => {
            setMensagem("");
        }, 2000);
    }

    const [formData, setFormData] = useState({
        nome: "",
        email: "",
        telefone: "",
        senha: ""
    });
    
    const userId = sessionStorage.getItem("userId");
    console.log(userId);

    const navigate = useNavigate();

    const handleInputChange = (e) => {
        const { name, value } = e.target;

        if (name === "telefone") {
            setFormData({ ...formData, [name]: mascararTelefone(value) });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const usuarioParaAtualizar = {
        username: formData.nome,
        phone: formData.telefone,
        password: formData.senha
    };

    const editar = async () => {
        const { nome, telefone, senha } = formData;
    
        if (!desabilitado) {
            if (nome.trim() === "" || telefone.trim() === "" || senha.trim() === "") {
                setMensagem("Não pode haver campo obrigatório vazio"); 
                setCaminho("/assets/Alert.png");
                limparAlert();
                return;
            }
    
            try {
                const authToken = sessionStorage.getItem("authToken");
                await axios.patch(
                    `${apiUrl}/usuarios/${userId}`,
                    usuarioParaAtualizar,
                    {
                        headers: {
                            Authorization: `Bearer ${authToken}`,
                        },
                    }
                );
                setMensagem("Alterações salvas!");
                setCaminho("/assets/Check-pop.png");
                limparAlert();
            } catch (error) {
                console.error("Erro ao atualizar o usuário:", error);
                setMensagem("❌ Erro ao salvar as alterações");
                setCaminho("/assets/Alert.png");
                limparAlert();
            }
            setDesabilitado(!desabilitado);
        } else {
            setDesabilitado(false);
        }
    };

    const deletar = async (e) => {
        try {
            e.preventDefault();
            const authToken = sessionStorage.getItem("authToken"); 
            await axios.delete(
                `${apiUrl}/usuarios/${userId}`,
                {
                    headers: {
                        Authorization: `Bearer ${authToken}`,
                    },
                }
            );
            console.log("Resposta do backend:", e);
            setMensagem("Conta deletada com sucesso!");
            setCaminho("/assets/Check-pop.png");
            limparAlert();
            logoOff();
        } catch (error) {
            console.error("Erro ao deletar a conta:", error);
            setMensagem("❌ Erro ao deletar a conta");
            setCaminho("/assets/Alert.png");
            limparAlert();
        }
    }

    const logoOff = () => {
        sessionStorage.removeItem("authToken");
        sessionStorage.removeItem("userId");
        sessionStorage.removeItem("username");
        sessionStorage.removeItem("userEmail");
        navigate("/");
    };

    const mascararTelefone = (valor) => {
        return valor
            .replace(/\D/g, "")
            .replace(/(\d{2})(\d)/, "($1) $2")
            .replace(/(\d{5})(\d)/, "$1-$2")
            .replace(/(-\d{4})\d+?$/, "$1");
    };

    return (
        <>
            {mensagem && (
                <Alerta
                    mensagem={mensagem}
                    imagem={caminho}
                />
            )}
            <div className="h-full w-full bg-[#FFF3DC] justify-center ">
                <NavbarCli caminho={"/pages/client-pages/Home"} />

                {mensagem && (
                    <Alerta
                        mensagem={mensagem}
                        imagem="/assets/Check-pop.png"
                    />
                )}

                <div className="h-screen flex justify-center flex-col items-center pt-10">
                    <h1 className="self-center text-[#982546] font-bold text-2xl p-4">Configurações</h1>

                    <form className="flex flex-col text-[#362323] border border-[#982546] py-5 px-8 w-120 rounded-2xl gap-2 ">
                        <label htmlFor="nome">Nome:</label>
                        <input
                            type="text"
                            id="nome"
                            name="nome"
                            className="bg-[#ffffff] p-2 rounded-xl"
                            disabled={desabilitado}
                            value={formData.nome}
                            onChange={handleInputChange}
                        />

                        <label htmlFor="email">E-mail:</label>
                        <input
                            type="text"
                            id="email"
                            name="email"
                            className="bg-[#ffffff] p-2 rounded-xl"
                            disabled={true}
                            value={formData.email}
                            onChange={handleInputChange}
                            placeholder="Campo E-mail não pode ser editado"
                        />

                        <label htmlFor="telefone">Telefone:</label>
                        <input
                            type="text"
                            id="telefone"
                            name="telefone"
                            className="bg-[#ffffff] p-2 rounded-xl"
                            disabled={desabilitado}
                            value={formData.telefone}
                            onChange={handleInputChange}
                        />

                        <label htmlFor="senha">Senha:</label>
                        <div className="flex flex-row gap-5">
                            <input
                                type="password"
                                id="senha"
                                name="senha"
                                className="bg-[#ffffff] p-2 w-50 rounded-xl"
                                disabled={desabilitado}
                                value={formData.senha}
                                onChange={handleInputChange}
                            />
                            <button
                                type="button"
                                className="bg-[#982546] border border-[#FFF3DC] text-[#FFF3DC] rounded-xl py-2 px-4 cursor-pointer"
                                onClick={editar}
                            >
                                {desabilitado ? "Editar" : "Salvar"}
                            </button>
                        </div>

                        <div className="flex flex-row justify-between gap-4 pt-5">
                            <button
                                className="bg-[#982546] border border-[#FFF3DC] text-[#FFF3DC] rounded-xl py-2 px-6 self-end cursor-pointer"
                                onClick={logoOff}
                            >
                                Sair da conta
                            </button>
                            <button onClick={deletar} className="text-[#982546] cursor-pointer">Deletar conta</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}