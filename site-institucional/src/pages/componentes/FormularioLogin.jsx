import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Alerta from "./PopUp";
export default function FormularioLogin() {
    const apiUrl = import.meta.env.VITE_API_URL_V2;

    const [email, setEmail] = useState("");
    const [mensagem, setMensagem] = useState("");
    const [caminho, setCaminho] = useState("");
    const [senha, setSenha] = useState("");
    const [mostrarSenha, setMostrarSenha] = useState(false); 

    const navigate = useNavigate();

    const limparAlert = () => {
        setTimeout(() => {
            setMensagem("");
        }, 2000);
    };

    function loginUsuario(e) {
        e.preventDefault();
        const usuario = {
            email,
            password: senha,
        };
       
        axios
            .post(`${apiUrl}/usuarios/login`, usuario)
            .then((response) => {
                sessionStorage.setItem("authToken", response.data.token);
                sessionStorage.setItem("userId", response.data.id);
                sessionStorage.setItem("userName", response.data.username);
                sessionStorage.setItem("userEmail", response.data.email);

                axios.get(`${apiUrl}/usuarios/${response.data.id}`, {

                    headers: { Authorization: `Bearer ${response.data.token}` }

                }).then((res) => {
                    const role = res.data.id;

                    setMensagem("✅ Login realizado com sucesso!");
                    setCaminho("/assets/Check-pop.png");

                    setTimeout(() => {
                        if (role === 2) navigate("/cliente/home");
                        else if (role === 1) navigate("/profissional/dashboard");
                        else navigate("/");
                    }, 1500);

                }).catch(() => {
                    setMensagem("❌ Erro ao buscar dados do usuário");
                    setCaminho("/assets/Alert.png");
                    limparAlert();
                });
            })
            .catch((error) => {
                if (error.response && error.response.status === 401) {
                    setMensagem("❌ Email ou senha incorretos.");
                    setCaminho("/assets/Alert.png");
                    limparAlert();
                } else {
                    setMensagem("❌ Erro ao logar");
                    setCaminho("/assets/Alert.png");
                    limparAlert();
                }
            });
    }

    return (
        <>
            {mensagem && <Alerta mensagem={mensagem} imagem={caminho} />}

            <div className="flex items-center justify-center h-screen w-full bg-[#FFF2DC] bg-[url('/assets/wave-background.png')] bg-cover bg-center ">
                <div className="bg-[#982546] h-auto w-90 md:w-full max-w-lg rounded-xl p-6 flex flex-col items-center text-white shadow-lg font-bold z-10 xl:text-2xl">
                    <img className="h-12 ml-8 self-center" src="/assets/LOGO.png" alt="" />

                    <div className="w-full text-[#FFF2DC] font-bold flex justify-center items-center mb-10 md:mb-0 xl:mb-5">
                        <h1 className="text-2xl"> Acesse sua conta</h1>
                    </div>

                    <form onSubmit={loginUsuario} className="w-full flex flex-col gap-2 text-[#FFF2DC] xl:gap-5 xl:mb-10">
                        <label htmlFor="Campo">Email:</label>
                        <input
                            type="text"
                            onChange={(e) => setEmail(e.target.value)}
                            className="p-2 rounded-xl w-full bg-white text-black border border-[#341C1C] hover:border-[#FFF2DC] mb-4"
                            required
                        />

                        <label htmlFor="senha">Senha:</label>
                        <div className="relative">
                            <input
                                type={mostrarSenha ? "text" : "password"}
                                onChange={(e) => setSenha(e.target.value)}
                                className="p-2 rounded-xl w-full bg-white text-black border border-[#341C1C] hover:border-[#FFF2DC] mb-4"
                                required
                            />
                            <button
                                type="button"
                                onClick={() => setMostrarSenha(!mostrarSenha)} 
                                className="absolute right-3 top-2/5 transform -translate-y-1/2 text-black"
                            >
                                {mostrarSenha ? "👁️‍🗨️" : "👁️‍🗨️"}
                            </button>
                        </div>

                        <a
                            href=""
                            onClick={() => navigate("/cliente/esqueci-senha")}
                            className="text-white text-lg"
                        >
                            Esqueceu a senha?
                        </a>

                        <button className=" w-52 text-[#FFF3DC] bg-[#680E28] border border-[#FFF3DC] rounded-xl px-4 py-2 hover:border-[#341C1C] hover:bg-[#FFF3DC] hover:text-[#341C1C] transition hover:cursor-pointer self-center xl:mt-5">
                            Login
                        </button>
                    </form>

                    <p className="mt-4 text-lg">
                        Não possui conta?{" "}
                        <a href="/cliente/cadastro" className="underline">
                            Cadastre-se
                        </a>
                    </p>
                </div>
            </div>
        </>
    );
}