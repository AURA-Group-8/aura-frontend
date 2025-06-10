import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Header from "../Header-login";
import Alerta from "../Pop-up";
import axios from "axios";

export default function LoginPro() {
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

    const logar = (e) => {
        e.preventDefault();

        const emojiRegex = /(\p{Emoji_Presentation}|\p{Emoji}\uFE0F)/u;

        if (email.trim() === "" || senha.trim() === "") {
            setMensagem("Preencha todos os campos!");
            setCaminho("/assets/Alert.png");
            limparAlert();
            return;
        }

        if (emojiRegex.test(email) || emojiRegex.test(senha)) {
            setMensagem("🚫 Emojis não são permitidos no email ou senha.");
            setCaminho("/assets/Alert.png");
            limparAlert();
            return;
        }

        if (email.trim() !== "aura@gmail.com") {
            setMensagem("E-mail inválido!");
            setCaminho("/assets/Alert.png");
            limparAlert();
            return;
        }

        const usuario = {
            email: email.trim(),
            password: senha.trim()
        };
        console.log(usuario);

        axios.post(`${apiUrl}/usuarios/login`, usuario)
            .then((response) => {
                console.log("Usuário logado com sucesso:", response.data);

                sessionStorage.setItem('authToken', response.data.token);
                sessionStorage.setItem('userId', response.data.id);
                sessionStorage.setItem('userEmail', response.data.email);

                setMensagem("✅ Login realizado com sucesso!");
                setCaminho("/assets/Check-pop.png");
                limparAlert();
                setTimeout(() => {
                    navigate("/pages/professional-pages/Dashboard");
                }, 1000);
            }).catch((error) => {
                if (error.response && error.response.status === 401) {
                    console.error("Erro ao logar:", error.data);
                    setMensagem("❌ Email ou senha incorretos.");
                    setCaminho("/assets/Alert.png");
                    limparAlert();
                } else {
                    console.error("Erro ao logar:", error.data);
                    setMensagem("❌ Erro ao logar");
                    setCaminho("/assets/Alert.png");
                    limparAlert();
                }
            });
    }


    return (

        <>
            {mensagem && (
                <Alerta
                    mensagem={mensagem}
                    imagem={caminho}
                />
            )}

            <Header caminho={"/"} />
            <div className="flex items-center justify-center h-screen bg-[#FFF2DC] relative ">
                <div className="absolute inset-0 bg-[url('/assets/wave-background.png')] bg-cover bg-center opacity-65 z-0"></div>

                <div className="bg-[#351818] w-[40vw] rounded-xl p-8 flex flex-col items-center text-white shadow-lg font-bold z-10">
                    <img className="h-20 ml-8 self-center" src="/assets/LOGO.png" alt="" />

                    <div className="w-[40vw]  text-[#FFF2DC] font-bold flex justify-center items-center mb-8 gap-x-16 hover:border-[#341C1C]">
                        <h1 className="text-2xl mt-5"> Acesse sua conta</h1>
                    </div>

                    <form onSubmit={logar} className="w-full flex flex-col gap-[0.5vh] text-xs text-[#FFF2DC]">

                        <label htmlFor="Campo">Email:</label>
                        <input type="text" onChange={e => setEmail(e.target.value)} className="p-2 rounded-xl w-full bg-white text-black border border-[#341C1C] hover:border-[#FFF2DC] mb-4" required />

                        <label htmlFor="senha">Senha:</label>
                        <input type="password" onChange={e => setSenha(e.target.value)} className="p-2 rounded-xl w-full bg-white text-black border border-[#341C1C] hover:border-[#FFF2DC] mb-4" required />

                        <button className="mt-4 w-52 text-[#FFF3DC] bg-[#281111] border border-[#FFF3DC] rounded-xl px-4 py-2 hover:border-[#341C1C] hover:bg-[#FFF3DC] hover:text-[#341C1C] transition hover:cursor-pointer self-center">
                            Entrar
                        </button>

                    </form>


                </div>
            </div>

        </>
    )

}