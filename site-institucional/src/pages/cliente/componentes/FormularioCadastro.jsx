import { useState } from "react";
import Alerta from "../../componentes/Popup";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";

export default function FormularioCadastro() {
    const [nomeCompleto, setNomeCompleto] = useState("");
    const [email, setEmail] = useState("");
    const [dataNasc, setDataNasc] = useState("");
    const [telefone, setTelefone] = useState("");
    const [senha, setSenha] = useState("");
    const [senhaConfirmada, setSenhaConfirmada] = useState("");
    const [mensagem, setMensagem] = useState("");
    const [caminho, setCaminho] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const [erros, setErros] = useState({
        nome: "",
        email: "",
        senha: "",
        senhaConfirmada: "",
    });

    const [mostrarSenha, setMostrarSenha] = useState(false);
    const [mostrarSenhaConfirmada, setMostrarSenhaConfirmada] = useState(false); 
    const apiUrl = import.meta.env.VITE_API_URL_V2;
    const navigate = useNavigate();
    const UserUrl = `${apiUrl}/usuarios`;

    const today = new Date().toISOString().split("T")[0]; 

    const limparAlert = () => {
        setTimeout(() => {
            setMensagem("");
        }, 2000);
    };

    const validarNome = (nome) => {
        const regex = /^[A-Za-zÀ-ÖØ-öø-ÿ\s]+$/; 
        if (nome.trim().length < 2) {
            setErros((prev) => ({ ...prev, nome: "O nome deve ter pelo menos 2 caracteres." }));
        } else if (!regex.test(nome)) {
            setErros((prev) => ({ ...prev, nome: "O nome deve conter apenas letras e acentos." }));
        } else {
            setErros((prev) => ({ ...prev, nome: "" }));
        }
        setNomeCompleto(nome);
    };

    const validarEmail = (email) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!regex.test(email)) {
            setErros((prev) => ({ ...prev, email: "O email deve ser válido (ex: usuario@dominio.com)." }));
        } else {
            setErros((prev) => ({ ...prev, email: "" }));
        }
        setEmail(email);
    };

    const validarSenha = (senha) => {
        const temMaiuscula = /[A-Z]/.test(senha);
        const temEspecial = /[!@#$%^&*(),.?":{}|<>]/.test(senha);
        const temTamanhoMinimo = senha.length >= 6;

        if (!temTamanhoMinimo) {
            setErros((prev) => ({ ...prev, senha: "A senha deve ter pelo menos 6 caracteres." }));
        } else if (!temMaiuscula) {
            setErros((prev) => ({ ...prev, senha: "A senha deve conter pelo menos uma letra maiúscula." }));
        } else if (!temEspecial) {
            setErros((prev) => ({ ...prev, senha: "A senha deve conter pelo menos um caractere especial." }));
        } else {
            setErros((prev) => ({ ...prev, senha: "" }));
        }
        setSenha(senha);
    };

    const validarSenhaConfirmada = (senhaConfirmada) => {
        if (senhaConfirmada !== senha) {
            setErros((prev) => ({ ...prev, senhaConfirmada: "As senhas não coincidem." }));
        } else {
            setErros((prev) => ({ ...prev, senhaConfirmada: "" }));
        }
        setSenhaConfirmada(senhaConfirmada);
    };

    const cadastrar = (e) => {
        e.preventDefault();

        if (isSubmitting) return;

        const camposInvalidos = Object.values(erros).some((erro) => erro);
        if (camposInvalidos) {
            setMensagem("Por favor, corrija os erros antes de enviar.");
            setCaminho("/assets/Alert.png");
            limparAlert();
            return;
        }

        const formattedDate = dataNasc ? `${dataNasc}T00:00:00` : null;

        const telefoneSemMascara = telefone.replace(/\D/g, "");
        const usuario = {
            username: nomeCompleto,
            email: email,
            dateOfBirth: formattedDate,
            phone: telefoneSemMascara,
            password: senha,
            roleId: 2
        };

        setIsSubmitting(true);

        axios.post(UserUrl, usuario)
            .then((response) => {
                setMensagem("✅ Cadastro realizado com sucesso!");
                setCaminho("/assets/Check-pop.png");
                setTimeout(() => {
                    navigate("/login");
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

            <div className="flex items-center justify-center min-h-screen bg-[#FFF2DC] bg-[url('/assets/wave-background.png')] bg-cover bg-center relative text">

                <div className="bg-[#982546] h-full w-90 mb-6 md:w-120 xl:w-200 mt-5 rounded-xl p-8 xl:p-10 flex flex-col items-center text-white shadow-lg font-bold xl:text-2xl ">
                    <div className="w-full text-[#FFF2DC] font-bold justify-start gap-10 xl:gap-25  flex items-center mb-8 hover:border-[#341C1C]">
                        <img className="h-10 xl:h-14 hidden md:flex" src="/assets/LOGO.png " alt="" />
                        <h1 className="text-2xl xl:text-3xl">Crie sua conta</h1>
                    </div>

                    <form onSubmit={cadastrar} className="w-full flex flex-col gap-5 text-[#FFF2DC]" method="POST">
                        <label>Nome Completo:
                            <input
                                type="text"
                                value={nomeCompleto}
                                onChange={e => validarNome(e.target.value)}
                                className={`p-2 rounded-xl w-full bg-white text-black border ${erros.nome ? "border-rose-200 bg-red-100" : "border-[#341C1C]"} hover:border-[#FFF2DC] mb-1`}
                                required
                            />
                            {erros.nome && <span className="text-rose-200 text-sm">{erros.nome}</span>}
                        </label>

                        <label>Email:
                            <input
                                type="text"
                                value={email}
                                onChange={e => validarEmail(e.target.value)}
                                className={`p-2 rounded-xl w-full bg-white text-black border ${erros.email ? "border-rose-200 bg-red-100" : "border-[#341C1C]"} hover:border-[#FFF2DC] mb-1`}
                                required
                            />
                            {erros.email && <span className="text-rose-200 text-sm">{erros.email}</span>}
                        </label>

                        <label>Data de Nascimento (Opcional):
                            <input
                                type="date"
                                value={dataNasc}
                                onChange={e => setDataNasc(e.target.value)}
                                max={today}
                                className="p-2 rounded-xl w-full bg-white text-black border border-[#341C1C] hover:border-[#FFF2DC] mb-4"
                            />
                        </label>

                        <label>Telefone:
                            <input
                                type="text"
                                value={telefone}
                                onChange={e => setTelefone(mascararTelefone(e.target.value))}
                                className="p-2 rounded-xl w-full bg-white text-black border border-[#341C1C] hover:border-[#FFF2DC] mb-4"
                                required
                            />
                        </label>

                        <label>Senha:
                            <div className="relative">
                                <input
                                    type={mostrarSenha ? "text" : "password"}
                                    value={senha}
                                    onChange={e => validarSenha(e.target.value)}
                                    className={`p-2 rounded-xl w-full bg-white text-black border ${erros.senha ? "border-rose-200 bg-red-100" : "border-[#341C1C]"} hover:border-[#FFF2DC] mb-1`}
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setMostrarSenha(!mostrarSenha)}
                                    className="absolute right-3 top-2 text-black font-light"
                                >
                                    {mostrarSenha ? "Ocultar" : "Mostrar"}
                                </button>
                            </div>
                            {erros.senha && <span className="text-rose-200 text-sm">{erros.senha}</span>}
                        </label>

                        <label>Confirmar senha:
                            <div className="relative">
                                <input
                                    type={mostrarSenhaConfirmada ? "text" : "password"}
                                    value={senhaConfirmada}
                                    onChange={e => validarSenhaConfirmada(e.target.value)}
                                    className={`p-2 rounded-xl w-full bg-white text-black border ${erros.senhaConfirmada ? "border-red-500 bg-red-100" : "border-[#341C1C]"} hover:border-[#FFF2DC] mb-1`}
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setMostrarSenhaConfirmada(!mostrarSenhaConfirmada)}
                                    className="absolute right-3 top-2 text-black font-light"
                                >
                                    {mostrarSenhaConfirmada ? "Ocultar" : "Mostrar"}
                                </button>
                            </div>
                            {erros.senhaConfirmada && <span className="text-rose-200 text-sm">{erros.senhaConfirmada}</span>}
                        </label>

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className={`mt-4 w-52 text-[#FFF3DC] bg-[#680E28] border border-[#FFF3DC] rounded-xl px-4 py-2 hover:border-[#341C1C] hover:bg-[#FFF3DC] hover:text-[#341C1C] transition hover:cursor-pointer self-center ${isSubmitting ? "opacity-50 cursor-not-allowed" : ""}`}
                        >
                            {isSubmitting ? "Enviando..." : "Cadastrar"}
                        </button>
                    </form>

                    <p className="mt-4 text-lg">
                        Já possui conta? <Link to="/login" className="underline">Login</Link>
                    </p>
                </div>
            </div>
        </>
    );
}