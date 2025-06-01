import { useState, useEffect } from "react";
import NavbarCli from "./components/Navbar";
import { useNavigate } from "react-router-dom";
import Alerta from "../../pages/Pop-up";
import axios from "axios";
import React from "react";

export default function AgendarCli() {
    const navigate = useNavigate();

    const [mensagem, setMensagem] = useState("");
    const [caminho, setCaminho] = useState("");
    const [servico, setServico] = useState("");
    const [listaServicos, setListaServicos] = useState([]);

    const limparAlert = () => {
        setTimeout(() => {
            setMensagem("");
        }, 2000);
    };

    const cancelar = () => {
        navigate("/pages/client-pages/Home");
    };

    const servicos = async () => {
        try {
            const authToken = sessionStorage.getItem("authToken");

            const response = await axios.get("http://localhost:8080/servicos",
                {
                    headers: {
                        Authorization: `Bearer ${authToken}`,
                    },
                }
            );
            console.log(response.data);
            setListaServicos(response.data.content);
        } catch (error) {
            console.error("Erro ao buscar serviços:", error);
            setMensagem("Erro ao buscar serviços");
            setCaminho("/assets/Alert.png");
            limparAlert();
        }
    };

    useEffect(() => {
        servicos();
    }, []);

    const agendar = (e) => {
        e.preventDefault();

        if (servicosSelecionados === "") {
            setMensagem("Preencha todos os campos!");
            setCaminho("/assets/Alert.png");
            limparAlert();
            return;
        } else {
            navigate("/pages/client-pages/DataHoraCli", {
                state: {
                    servico: servicosSelecionados,
                },
            });
        }
    };

    const [servicosSelecionados, setServicosSelecionados] = useState([]);

    const adicionarServico = (id) => {
        const servicoExistente = servicosSelecionados.find((item) => item.id === id);
        if (!servicoExistente) {
            const servico = listaServicos.find((item) => item.id === id);
            if (servico) {
                setServicosSelecionados([...servicosSelecionados, servico]);
            }
        }
    };

    const removerServico = (id) => {
        setServicosSelecionados(servicosSelecionados.filter((item) => item.id !== id));
    };

    return (
        <>
            {mensagem && (
                <Alerta
                    mensagem={mensagem}
                    imagem={caminho}
                />
            )}

            <NavbarCli caminho={"/pages/client-pages/Home"} />
            <div className="w-full h-screen bg-[#FFF3DC] flex flex-col justify-center items-center">
                <h1 className="text-[#982546] font-bold text-2xl">Agendar</h1>
                <form onSubmit={agendar} className="border-1 border-[#982546] bg-[#FFF3DC] w-150 h-100 rounded-2xl flex flex-row justify-center mt-5">
                    <div className="flex flex-col w-120">
                        <p className="text-xl mt-2">Serviços</p>
                        <select
                            onChange={(e) => adicionarServico(parseInt(e.target.value))}
                            name="servico"
                            className="bg-amber-50 p-2 rounded-2xl border-1 border-[#982546] w-full h-10 mt-2"
                        >
                            <option value="" disabled={true} selected={true}>
                                Selecione um serviço
                            </option>
                            {listaServicos.map((item, index) => (
                                <option key={index} value={item.id}>
                                    {item.name}
                                </option>
                            ))}
                        </select>

                        <div className="border-1 border-[#982546] bg-[#FFF3DC] w-full h-30 mt-5 rounded-2xl overflow-y-auto">
                            {servicosSelecionados.length > 0 ? (
                                servicosSelecionados.map((item) => (
                                    <div key={item.id} className="flex justify-between items-center p-2 border-b border-[#982546]">
                                        <p className="text-[#982546] text-lg">{item.name}</p>
                                        <button
                                            className="text-[#982546] text-lg cursor-pointer font-extrabold"
                                            onClick={() => removerServico(item.id)}
                                        >
                                            x
                                        </button>
                                    </div>
                                ))
                            ) : (
                                <p className="text-[#982546] text-lg p-2">Nenhum serviço selecionado</p>
                            )}
                        </div>

                        <div className="flex flex-row w-full justify-between mt-4">
                            <button
                                type="reset"
                                className="border-1 border-[#982546] py-2 px-8 rounded-2xl text-[#982546] cursor-pointer"
                                onClick={cancelar}
                            >
                                Cancelar
                            </button>

                            <button
                                type="submit"
                                className="bg-[#982546] py-2 px-4 rounded-2xl text-[#FFF3DC] flex flex-row gap-2 items-center cursor-pointer hover:bg-[#b36078]"
                            >
                                Selecionar data e hora
                                <img src="/assets/Calendar.png" className="h-8" />
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </>
    );
}