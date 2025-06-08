import { useState } from "react";
import axios from "axios";
import Alerta from "../Pop-up";
import { useNavigate } from "react-router-dom";
import NavbarPro from "./components/Navbar";

export default function AddServico() {

    const navigate = useNavigate();
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
    }

    const adicionar = async (e) => {
        e.preventDefault();

        const emojiRegex = /([\u2700-\u27BF]|[\uE000-\uF8FF]|[\uD800-\uDBFF][\uDC00-\uDFFF])/;

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
            setMensagem("Emojis não são permitidos nos campos Nome e Descrição.");
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
                expectedDurationMinutes: Number(duracao) * 60,
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
                navigate("/pages/professional-pages/MeusServicos");
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

            <NavbarPro caminho={"/pages/professional-pages/MeusServicos"} />
            <div className="w-full h-screen bg-[#FFF3DC] flex flex-col justify-center items-center">
                <h1 className="text-[#982546] font-bold text-2xl">Adicionar serviço</h1>

                <form className="border-1 border-[#982546] bg-[#FFF3DC] w-150 p-4 rounded-2xl flex flex-row justify-center items-center mt-5">
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

                        <div className="flex flex-row w-full justify-between">
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

                        <div className="flex flex-row w-full justify-between mt-10">
                            <button
                                type="reset"
                                className="border-1 border-[#982546] py-2 px-8 rounded-2xl text-[#982546] cursor-pointer"
                                onClick={() => navigate("/pages/professional-pages/MeusServicos")}
                            >
                                Cancelar
                            </button>

                            <button
                                className="bg-[#982546] py-2 px-8 rounded-2xl text-[#FFF3DC] cursor-pointer"
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
