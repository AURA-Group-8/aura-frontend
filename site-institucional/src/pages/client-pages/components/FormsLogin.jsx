import axios from "axios";
import { useState } from "react"
import { useNavigate } from "react-router-dom";
import Alerta from "../../Pop-up";

export default function FormularioLogin() {

    const apiUrl = import.meta.env.VITE_API_URL;

    const [email, setEmail] = useState("");
    const [mensagem, setMensagem] = useState("");
    const [caminho, setCaminho] = useState('');
    const [senha, setSenha] = useState("");


    const navigate = useNavigate();

    const limparAlert = () => {
        setTimeout(() => {
            setMensagem("");
        }, 2000);
    }

    function loginUsuario(e) {
        e.preventDefault();
        const usuario = {
            email,
            password: senha
        };
        console.log(usuario);

        axios.post(`${apiUrl}/usuarios/login`, usuario)
            .then((response) => {
                console.log("Usuário logado com sucesso:", response.data);

                sessionStorage.setItem('authToken', response.data.token);
                sessionStorage.setItem('userId', response.data.id);
                sessionStorage.setItem('userName', response.data.username);
                sessionStorage.setItem('userEmail', response.data.email);

                setMensagem("✅ Login realizado com sucesso!");
                setCaminho("/assets/Check-pop.png")
                setTimeout(() => {
                    navigate("/pages/client-pages/Home");
                }, 1500);
            })
            .catch((error) => {
                if (error.response && error.response.status === 401) {
                    console.log("entrei aqui")
                    console.error("Erro ao logar:", error.data);
                    setMensagem("❌ Email ou senha incorretos.");
                    setCaminho("/assets/Alert.png")
                    limparAlert();
                } else {
                    console.error("Erro ao logar:", error.data);
                    setMensagem("❌ Erro ao logar");
                    setCaminho("/assets/Alert.png")
                    limparAlert();
                }
            }
            );

    }


    return (

        <>
            {mensagem && (
                <Alerta
                    mensagem={mensagem}
                    imagem={caminho}
                />
            )}

            <div className="flex items-center justify-center min-h-screen w-full bg-[#FFF2DC] bg-[url('/assets/wave-background.png')] bg-cover bg-center ">

                <div className="bg-[#982546] h-auto w-full max-w-lg rounded-xl p-6 flex flex-col items-center text-white shadow-lg font-bold z-10">
                    <img className="h-12 ml-8 self-center" src="/assets/LOGO.png" alt="" />

                    <div className="w-full text-[#FFF2DC] font-bold flex justify-center items-center ">
                        <h1 className="text-2xl"> Acesse sua conta</h1>
                    </div>

                    <form onSubmit={loginUsuario} className="w-full flex flex-col gap-2  text-[#FFF2DC] ">

                        <label htmlFor="Campo">Email:</label>
                        <input type="text" onChange={e => setEmail(e.target.value)} className="p-2 rounded-xl w-full bg-white text-black border border-[#341C1C] hover:border-[#FFF2DC] mb-4" required />

                        <label htmlFor="senha">Senha:</label>
                        <input type="password" onChange={e => setSenha(e.target.value)} className="p-2 rounded-xl w-full bg-white text-black border border-[#341C1C] hover:border-[#FFF2DC] mb-4" required />
                        <a href="" onClick={() => navigate("/pages/client-pages/ForgotPassword")} className="text-white">Esqueceu a senha?</a>

                        <button className=" w-52 text-[#FFF3DC] bg-[#680E28] border border-[#FFF3DC] rounded-xl px-4 py-2 hover:border-[#341C1C] hover:bg-[#FFF3DC] hover:text-[#341C1C] transition hover:cursor-pointer self-center">
                            Login
                        </button>

                    </form>

                    <p className="mt-4">Não possui conta? <a href="./Cadastro" className="underline">Cadastre-se</a></p>
                </div>
            </div>

        </>
    )
}