import axios from "axios";
import { useState } from "react"
import { useNavigate } from "react-router-dom";

export default function FormularioLogin() {
    const [nomeCompleto, setNomeCompleto] = useState("");
    const [email, setEmail] = useState("");
    const [dataNasc, setDataNasc] = useState("");
    const [telefone, setTelefone] = useState("");

    const [senha, setSenha] = useState("");

    const navigate = useNavigate();

    function loginUsuario(e) {
        e.preventDefault();
        const usuario = {
            email,
            password: senha
        };
        axios.post("http://localhost:8080/usuarios/login", usuario)
            .then((response) => {
                console.log("Usuário logado com sucesso:", response.data);
                setMensagem("✅ Login realizado com sucesso!");
                setCaminho("/assets/Check-pop.png")
                setTimeout(() => {
                    navigate("/components/client-screens/home-client");
                }, 2000);
            })
            .catch((error) => {
                if(error.status === 401){
                    console.log("entrei aqui")
                    console.error("Erro ao logar:", error.data);
                    alert("Email ou senha incorretos.");
                    return;
                }
            }
        );
        
    }


    return (

        <>
            <div className="flex items-center justify-center h-screen bg-[#FFF2DC] relative ">
                <div className="absolute inset-0 bg-[url('/assets/wave-background.png')] bg-cover bg-center opacity-65 z-0"></div>

                <div className="bg-[#982546] w-[40vw] rounded-xl p-8 flex flex-col items-center text-white shadow-lg font-bold z-10">
                    <img className="h-12 ml-8 self-center" src="/assets/LOGO.png" alt="" />

                    <div className="w-[40vw] bg-[#982546] text-[#FFF2DC] font-bold flex justify-center items-center mb-8 gap-x-16 hover:border-[#341C1C]">
                        <h1 className="text-2xl"> Acesse sua conta</h1>
                    </div>

                    <form className="w-full flex flex-col gap-[0.5vh] text-xs text-[#FFF2DC]">

                        <label htmlFor="Campo">Email:</label>
                        <input type="text" onChange={e => setEmail(e.target.value)} className="p-2 rounded-xl w-full bg-white text-black border border-[#341C1C] hover:border-[#FFF2DC] mb-4" required />

                        <label htmlFor="senha">Senha:</label>
                        <input type="password" onChange={e => setSenha(e.target.value)} className="p-2 rounded-xl w-full bg-white text-black border border-[#341C1C] hover:border-[#FFF2DC] mb-4" required />

                        <button type="submit" onClick={loginUsuario} className="mt-4 w-52 text-[#FFF3DC] bg-[#680E28] border border-[#FFF3DC] rounded-xl px-4 py-2 hover:border-[#341C1C] hover:bg-[#FFF3DC] hover:text-[#341C1C] transition hover:cursor-pointer self-center">
                            Login
                        </button>

                    </form>

                    <p className="text-xs mt-4">Não possui conta? <a href="./Cadastro" className="underline">Cadastre-se</a></p>
                </div>
            </div>

        </>
    )
}