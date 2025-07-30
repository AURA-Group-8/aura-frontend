import { useState } from "react";
import Alerta from "../../Pop-up";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Login from "../Login";

export default function FormularioCadastro() {
    const [nomeCompleto, setNomeCompleto] = useState("");
    const [email, setEmail] = useState("");
    const [dataNasc, setDataNasc] = useState("");
    const [telefone, setTelefone] = useState("");
    const [senha, setSenha] = useState("");
    const [mensagem, setMensagem] = useState("");
    const [caminho, setCaminho] = useState('');
    const [senhaConfirmada, setSenhaConfirmada] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false); 

    const apiUrl = import.meta.env.VITE_API_URL;

    const navigate = useNavigate();
    const UserUrl = `${apiUrl}/usuarios`;

    const limparAlert = () => {
        setTimeout(() => {
            setMensagem("");
        }, 2000);
    };

    const cadastrar = (e) => {
        e.preventDefault(); 

        if (isSubmitting) return;

        if (nomeCompleto.trim() === "" || telefone.trim() === "" || email.trim() === "" || senha.trim() === "") {
            setMensagem("Não pode haver campo obrigatório vazio");
            setCaminho("/assets/Alert.png");
            limparAlert();
            return;
        }
        if (nomeCompleto.trim().length < 2) {
            setMensagem("Nome completo deve ter mais de 2 caracteres");
            setCaminho("/assets/Alert.png");
            limparAlert();
            return;
        }
        if (telefone.trim().length !== 15) {
            setMensagem("Telefone deve ter 15 dígitos (com DDD)");
            setCaminho("/assets/Alert.png");
            limparAlert();
            return;
        }
        if (senha.trim().length < 6) {
            setMensagem("Senha deve ter mais de 6 caracteres");
            setCaminho("/assets/Alert.png");
            limparAlert();
            return;
        }
        if (senhaConfirmada !== senha) {
            setMensagem("❌ As senhas não coincidem.");
            setCaminho("/assets/Alert.png");
            limparAlert();
            return;
        }

        const formattedDate = dataNasc ? `${dataNasc}T00:00:00` : null;

        const usuario = {
            username: nomeCompleto,
            email: email,
            dateOfBirth: formattedDate,
            phone: telefone,
            password: senha,
            roleId: 2
        };

        setIsSubmitting(true); 

        axios.post(UserUrl, usuario)
            .then((response) => {
                console.log("Usuário cadastrado com sucesso:", response.data);
                setMensagem("✅ Cadastro realizado com sucesso!");
                setCaminho("/assets/Check-pop.png");
                setTimeout(() => {
                    navigate("/pages/client-pages/Login");
                }, 2000);
            })
            .catch((error) => {
                console.error("Erro ao cadastrar usuário:", error);
                setMensagem("❌ Erro ao cadastrar usuário. Tente novamente mais tarde.");
                setCaminho("/assets/Alert.png");
                limparAlert();
            })
            .finally(() => {
                setIsSubmitting(false); 
            });
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

            <div className="flex items-center justify-center h-full bg-[#FFF2DC] relative">
                <div className="absolute inset-0 bg-[url('/assets/wave-background.png')] bg-cover bg-center opacity-65 z-0"></div>

                <div className="bg-[#982546] h-170 w-[40vw] mt-5 rounded-xl p-8 flex flex-col items-center text-white shadow-lg font-bold z-10">
                    <div className="w-full bg-[#982546] text-[#FFF2DC] font-bold justify-start gap-2 flex items-center mb-8  hover:border-[#341C1C]">
                        <img className="h-10 " src="/assets/LOGO.png " alt="" />
                        <h1 className="text-2xl ml-10">Crie sua conta</h1>
                    </div>

                    <form onSubmit={cadastrar} className="w-full flex flex-col gap-[0.5vh] text-xl text-[#FFF2DC]" method="POST">
                        <label>Nome Completo:
                            <input type="text" onChange={e => setNomeCompleto(e.target.value)} className="p-2 rounded-xl w-full bg-white text-black border border-[#341C1C] hover:border-[#FFF2DC] mb-4" required />
                        </label>

                        <label>Email:
                            <input type="text" onChange={e => setEmail(e.target.value)} className="p-2 rounded-xl w-full bg-white text-black border border-[#341C1C] hover:border-[#FFF2DC] mb-4" required />
                        </label>

                        <label>Data de Nascimento (Opcional):
                            <input type="date" onChange={e => setDataNasc(e.target.value)} className="p-2 rounded-xl w-full bg-white text-black border border-[#341C1C] hover:border-[#FFF2DC] mb-4" />
                        </label>

                        <label>Telefone:
                            <input type="text" value={telefone} onChange={e => setTelefone(mascararTelefone(e.target.value))} className="p-2 rounded-xl w-full bg-white text-black border border-[#341C1C] hover:border-[#FFF2DC] mb-4" required />
                        </label>

                        <div className="flex gap-4 w-full">
                            <div className="flex flex-col w-1/2 gap-[0.5vh]">
                                <label>Senha:
                                    <input type="password" onChange={e => setSenha(e.target.value)} className="p-2 rounded-xl w-full bg-white text-black border border-[#341C1C] hover:border-[#FFF2DC] " required />
                                </label>
                            </div>

                            <div className="flex flex-col w-1/2 gap-[0.5vh]" >
                                <label>Confirmar senha:
                                    <input id="confirmarSenha" type="password" onChange={e => setSenhaConfirmada(e.target.value)} className="p-2 rounded-xl w-full bg-white text-black border border-[#341C1C] hover:border-[#FFF2DC] " required />
                                </label>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={isSubmitting} 
                            className={`mt-4 w-52 text-[#FFF3DC] bg-[#680E28] border border-[#FFF3DC] rounded-xl px-4 py-2 hover:border-[#341C1C] hover:bg-[#FFF3DC] hover:text-[#341C1C] transition hover:cursor-pointer self-center ${isSubmitting ? "opacity-50 cursor-not-allowed" : ""}`}
                        >
                            {isSubmitting ? "Enviando..." : "Cadastrar"}
                        </button>
                    </form>

                    <p className=" mt-4">Já possui conta? <a href="/pages/client-pages/Login" className="underline">Login</a></p>
                </div>
            </div>
        </>
    );
}