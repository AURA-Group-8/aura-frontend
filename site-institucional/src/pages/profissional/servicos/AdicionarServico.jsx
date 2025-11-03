import { useState } from "react";
import axios from "axios";
import Alerta from "../../componentes/PopUp";
import { useNavigate } from "react-router-dom";
import NavbarPro from "../componentes/Navbar";

export default function AddServico() {

    const navigate = useNavigate();
    const [nome, setNome] = useState("");
    const [descricao, setDescricao] = useState("");
    const [duracao, setDuracao] = useState("");
    const [preco, setPreco] = useState("");
    const [mensagem, setMensagem] = useState("");
    const [caminho, setCaminho] = useState("");

    const apiUrl = import.meta.env.VITE_API_URL_V2;

    const limparAlert = () => {
        setTimeout(() => {
            setMensagem("");
        }, 2000);
    }

    const adicionar = async (e) => {
        e.preventDefault();

        const emojiRegex = /\p{Extended_Pictographic}/u;

        if (
            nome.trim() === "" ||
            descricao.trim() === "" ||
            duracao === "" ||
            preco === "" ||
            isNaN(duracao) ||
            isNaN(preco)
        ) {
            setMensagem("Preencha todos os campos corretamente!");
            setCaminho("/assets/Alert.png");
            limparAlert();
            return;
        }

        if (emojiRegex.test(nome) || emojiRegex.test(descricao)) {
            setMensagem("Emojis não são permitidos!");
            setCaminho("/assets/Alert.png");
            limparAlert();
            return;
        }

        if (
            nome.trim().length < 2 ||
            descricao.trim().length < 10 ||
            Number(duracao) <= 0 ||
            Number(preco) <= 0
        ) {
            setMensagem("Preencha com dados válidos!");
            setCaminho("/assets/Alert.png");
            limparAlert();
            return;
        }

        try {
            const token = sessionStorage.getItem("authToken");

            const body = {
                name: nome.trim(),
                description: descricao.trim(),
                expectedDurationMinutes: Number(duracao),
                price: Number(preco),
            };

            await axios.post(`${apiUrl}/servicos`, body, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            setMensagem("Serviço cadastrado com sucesso!");
            setCaminho("/assets/Check-pop.png");
            limparAlert();

            setNome("");
            setDescricao("");
            setDuracao("");
            setPreco("");

            setTimeout(() => {
                navigate("/profissional/meus-servicos");
            }, 2000);

        } catch (error) {
            console.error("Erro ao cadastrar serviço:", error);
            setMensagem("Erro ao cadastrar serviço.");
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

            <NavbarPro caminho={"/profissional/meus-servicos"} />
            <div className="w-full h-screen bg-[#FFF3DC] flex flex-col justify-center items-center xl:text-2xl">
                <h1 className="text-[#982546] font-bold text-2xl">Adicionar serviço</h1>

                <form className="border-1 border-[#982546] bg-[#FFF3DC]  w-90 md:w-150 p-4 rounded-2xl flex flex-row justify-center items-center mt-5">
                    <div className="flex flex-col w-120 ">
                        <p className=" mt-2">Nome</p>
                        <input
                            type="text"
                            name="nome"
                            className="bg-amber-50 p-2 rounded-2xl border-1 border-[#982546]"
                            onChange={e => setNome(e.target.value)}
                        />

                        <p className="mt-4">Descrição</p>
                        <textarea
                            name="descricao"
                            className="bg-amber-50 p-2 rounded-2xl border-1 border-[#982546]"
                            onChange={e => setDescricao(e.target.value)}
                        />

                        <div className="flex flex-col md:flex-row xl:flex-col w-full justify-between">
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
                                    placeholder="Ex: R$ 0,00"
                                    className="bg-amber-50 p-2 rounded-2xl border-1 border-[#982546]"
                                    onChange={e => setPreco(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="flex flex-col-reverse gap-2 md:gap-0 md:flex-row w-full justify-between mt-10">
                            <button
                                type="reset"
                                className="border-1 border-[#982546] py-2 px-8 rounded-2xl text-[#982546] hover:bg-[#f9ebdb] transition-colors cursor-pointer"
                                onClick={() => navigate("/pages/profissional-pages/MeusServicos")}
                            >
                                Cancelar
                            </button>

                            <button
                                className="bg-[#982546] py-2 px-8 rounded-2xl text-[#FFF3DC] hover:bg-[#b36078] transition-colors cursor-pointer"
                                onClick={adicionar}
                            >
                                Adicionar serviço
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </>
    );
}
