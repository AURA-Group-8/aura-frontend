import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import Alerta from "../../componentes/PopUp";
import NavbarPro from "../componentes/Navbar";

export default function EditarServico() {
    const navigate = useNavigate();
    const location = useLocation();

    const { id, name, description, averageTime, value } = location.state || {};

    const [nome, setNome] = useState("");
    const [descricao, setDescricao] = useState("");
    const [duracao, setDuracao] = useState("");
    const [preco, setPreco] = useState("");
    const [mensagem, setMensagem] = useState("");
    const [caminho, setCaminho] = useState("");

    const apiUrl = import.meta.env.VITE_API_URL;

    const limparAlert = () => {
        setTimeout(() => {
            setMensagem("");
        }, 2000);
    };

    const emojiRegex = /(\p{Emoji_Presentation}|\p{Emoji}\uFE0F)/u;

    useEffect(() => {
        if (location.state) {
            setNome(name);
            setDescricao(description);
            setDuracao(averageTime);
            setPreco(value);
        } else {
            navigate("/profissional/meus-servicos");
        }
    }, [location]);

    const editarServico = async (e) => {
        e.preventDefault();

        const nomeTrimmed = nome.trim();
        const descricaoTrimmed = descricao.trim();
        const duracaoTrimmed = duracao.toString().trim();
        const precoTrimmed = preco.toString().trim();

        if (!nomeTrimmed || !descricaoTrimmed || !duracaoTrimmed || !precoTrimmed) {
            setMensagem("Preencha todos os campos!");
            setCaminho("/assets/Alert.png");
            limparAlert();
            return;
        }

        if (
            emojiRegex.test(nomeTrimmed) ||
            emojiRegex.test(descricaoTrimmed)
        ) {
            setMensagem("🚫 Emojis não são permitidos no nome ou descrição.");
            setCaminho("/assets/Alert.png");
            limparAlert();
            return;
        }

        const token = sessionStorage.getItem("authToken");

        try {
            await axios.patch(
                `${apiUrl}/servicos/${id}`,
                {
                    name: nomeTrimmed,
                    description: descricaoTrimmed,
                    expectedDurationMinutes: Number(duracaoTrimmed),
                    price: Number(precoTrimmed)
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json"
                    }
                }
            );

            setMensagem("Serviço atualizado com sucesso!");
            setCaminho("/assets/Check-pop.png");
            limparAlert();

            setTimeout(() => {
                navigate("/profissional/meus-servicos");
            }, 2000);
        } catch (error) {
            console.error("Erro ao atualizar serviço:", error);
            setMensagem("Erro ao atualizar serviço.");
            setCaminho("/assets/Alert.png");
            limparAlert();
        }
    };

    return (
        <>
            {mensagem && <Alerta mensagem={mensagem} imagem={caminho} />}

            <NavbarPro caminho={"/profissional/meus-servicos"} />
            <div className="w-full h-screen bg-[#FFF3DC] flex flex-col justify-center items-center">
                <h1 className="text-[#982546] font-bold text-2xl">Editar serviço</h1>

                <form className="border-1 border-[#982546] bg-[#FFF3DC] w-90 md:w-150 xl-w-180 xl:text-lg p-10 rounded-2xl flex flex-row justify-center items-center mt-5">
                    <div className="flex flex-col w-full ">
                        <p className="mt-2">Nome</p>
                        <input
                            type="text"
                            name="nome"
                            className="bg-amber-50 p-2 rounded-2xl border-1 border-[#982546]"
                            value={nome}
                            onChange={e => setNome(e.target.value)}
                        />

                        <p className="mt-4">Descrição</p>
                        <textarea
                            name="descricao"
                            className="bg-amber-50 p-2 rounded-2xl border-1 border-[#982546]"
                            value={descricao}
                            onChange={e => setDescricao(e.target.value)}
                        />

                        <div className="flex flex-col md:flex-row w-full justify-between">
                            <div className="flex flex-col">
                                <p className="mt-4">Duração (Horas)</p>
                                <select
                                    name="duracao"
                                    className="bg-amber-50 p-2 rounded-2xl border-1 border-[#982546]"
                                    value={duracao}
                                    onChange={e => setDuracao(e.target.value)}
                                >
                                    <option value="">Selecione...</option>
                                    {Array.from({ length: 16 }, (_, i) => (i + 1) * 30).map((min) => (
                                        <option key={min} value={min}>
                                            {Math.floor(min / 60)}h {min % 60 !== 0 ? `${min % 60}min` : ""}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="flex flex-col">
                                <p className="mt-4">Preço</p>
                                <input
                                    type="number"
                                    name="preco"
                                    step="0.01"
                                    placeholder="Ex: R$ 0,00"
                                    className="bg-amber-50 p-2 rounded-2xl border-1 border-[#982546]"
                                    value={preco}
                                    onChange={e => setPreco(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="flex flex-col-reverse gap-5 md:gap-0 md:flex-row w-full justify-between mt-10">
                            <button
                                type="reset"
                                className="border-1 border-[#982546] py-2 px-8 rounded-2xl text-[#982546] cursor-pointer hover:bg-[#e6ddcce0] transition-colors"
                                onClick={() => navigate("/profissional/meus-servicos")}
                            >
                                Cancelar
                            </button>

                            <button
                                type="submit"
                                className="bg-[#982546] py-2 px-8 rounded-2xl text-[#FFF3DC] cursor-pointer hover:bg-[#b36078] transition-colors"
                                onClick={editarServico}
                            >
                                Editar serviço
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </>
    );
}
