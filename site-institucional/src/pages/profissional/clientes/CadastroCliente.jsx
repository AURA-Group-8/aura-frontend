import NavbarPro from "../componentes/Navbar";
import { useState } from "react";
import Alerta from "../../Popup";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function CadastroCliente() {
    const navigate = useNavigate();
    const [nome, setNome] = useState("");
    const [telefone, setTelefone] = useState("");
    const [mensagem, setMensagem] = useState("");
    const [email, setEmail] = useState("");
    const [caminho, setCaminho] = useState("");

    const limparAlert = () => {
        setTimeout(() => {
            setMensagem("");
        }, 2000);
    };

    const mascararTelefone = (valor) => {
        return valor
            .replace(/\D/g, "")
            .replace(/(\d{2})(\d)/, "($1) $2")
            .replace(/(\d{5})(\d)/, "$1-$2")
            .replace(/(-\d{4})\d+?$/, "$1");

    }

    const agendar = async (e) => {
        e.preventDefault();

        const emojiRegex = /([\u2700-\u27BF]|[\uE000-\uF8FF]|[\uD800-\uDBFF][\uDC00-\uDFFF])/;

        if (
            nome.trim() === "" ||
            telefone.trim() === "" ||
            emojiRegex.test(nome)
        ) {
            setMensagem(
                nome.trim() === "" || telefone.trim() === ""
                    ? "Preencha todos os campos!"
                    : "Nome contém caracteres inválidos (emojis não são permitidos)!"
            );
            setCaminho("/assets/Alert.png");
            limparAlert();
            return;
        }

        try {
            const token = sessionStorage.getItem("authToken");
            const telefoneSemMascara = telefone.replace(/\D/g, "");

            const novoCliente = {
                username: nome.trim(),
                email: email.trim(),
                password: "123456",
                phone: telefoneSemMascara,
                dateOfBirth: "2000-01-01T00:00:00",
                roleId: 2,
            };

            await axios.post(`${apiUrl}/usuarios`, novoCliente, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });

            setMensagem("Cliente cadastrado com sucesso!");
            setCaminho("/assets/Check-pop.png");
            limparAlert();

            setNome("");
            setTelefone("");
            setEmail("");

            setTimeout(() => {
                navigate("/profissional/agendar");
            }, 2000);

        } catch (error) {
            console.error("Erro ao cadastrar cliente:", error.response?.data || error.message);
            setMensagem("Erro ao cadastrar cliente. Tente novamente.");
            setCaminho("/assets/Alert.png");
            limparAlert();
        }
    };

    const apiUrl = import.meta.env.VITE_API_URL;

    return (
        <>
            {mensagem && (
                <Alerta
                    mensagem={mensagem}
                    imagem={caminho}
                />
            )}

            <NavbarPro caminho={ "/profissional/agendar"} />
            <div className="w-full h-screen bg-[#FFF3DC] flex flex-col justify-center items-center ">
                <h1 className="text-[#982546] font-bold text-2xl">Cadastrar cliente</h1>

                <form className="border-1 border-[#982546] bg-[#FFF3DC] md:w-150 p-5 md:h-80 rounded-2xl flex flex-row justify-center items-center mt-5 ">
                    <div className="flex flex-col w-full ">
                        <p className=" mt-2">Nome</p>
                        <input
                            type="text"
                            name="nome"
                            className="bg-amber-50 p-2 rounded-2xl border-1 border-[#982546]"
                            onChange={e => setNome(e.target.value)}
                            value={nome}
                        />

                        <p className="mt-4">Telefone</p>
                        <input
                            type="tel"
                            name="telefone"
                            className="bg-amber-50 p-2 rounded-2xl border-1 border-[#982546]"
                            onChange={e => setTelefone(mascararTelefone(e.target.value))}
                            value={telefone}
                            maxLength={15}
                        />

                        <p className="mt-4">E-mail</p>
                        <input
                            type="email"
                            name="email"
                            className="bg-amber-50 p-2 rounded-2xl border-1 border-[#982546]"
                            onChange={e => setEmail(e.target.value)}
                            value={email}
                        />

                        <div className="flex flex-col gap-4 md:gap-0 md:flex-row w-full justify-between mt-10 md:mt-5">
                            <button
                                type="reset"
                                className="border-1 border-[#982546] py-2 px-8 rounded-2xl text-[#982546] cursor-pointer hover:bg-[#eaead5] transition-colors"
                                onClick={() => navigate("/profissional/agendar")}
                            >
                                Cancelar
                            </button>

                            <button
                                className="bg-[#982546] py-2 px-8 rounded-2xl text-[#FFF3DC] cursor-pointer hover:bg-[#b36078] transition-colors"
                                onClick={agendar}
                            >
                                Cadastrar
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </>
    );
}
