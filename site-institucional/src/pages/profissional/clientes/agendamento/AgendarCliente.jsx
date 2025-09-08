import { useState, useEffect } from "react";
import NavbarPro from "../../componentes/Navbar";
import { useNavigate } from "react-router-dom";
import Alerta from "../../../componentes/PopUp";
import axios from "axios";


export default function Agendar() {

    const navigate = useNavigate();

    const [mensagem, setMensagem] = useState("");
    const [caminho, setCaminho] = useState("");
    const [servicos, setServicos] = useState([]);
    const [servicoSelecionado, setServicoSelecionado] = useState("");
    const [clientes, setClientes] = useState([]);
    const [clienteSelecionado, setClienteSelecionado] = useState("");
    const [servicosSelecionados, setServicosSelecionados] = useState([]);

    const apiUrl = import.meta.env.VITE_API_URL;

    useEffect(() => {
        async function pegarDados() {
            try {
                const token = sessionStorage.getItem("authToken");
                const headers = { Authorization: `Bearer ${token}` };

                const servicosResponse = await axios.get(`${apiUrl}/servicos`, { headers });
                setServicos(servicosResponse.data.content);


                const clientesResponse = await axios.get(`${apiUrl}/usuarios`, { headers });
                setClientes(clientesResponse.data);

            } catch (error) {
                console.error("Erro ao buscar dados da API:", error);
            }
        }
        pegarDados();
    }, []);


    const limparAlert = () => {
        setTimeout(() => {
            setMensagem("");
        }, 2000);
    }

    const cancelar = () => {
        navigate("/profissional/dashboard");
    }


    const agendar = (e) => {

        const clienteObj = clientes.find(cli => cli.id == clienteSelecionado);
        
        e.preventDefault();

        if (servicoSelecionado === "" || clienteSelecionado === "") {
            setMensagem("Selecione cliente e serviço!");
            setCaminho("/assets/Alert.png");
            limparAlert();
            return;
        }

        if (clienteSelecionado === "cadastroCli") {
            navigate("/profissional/cadastro-cliente");

        } else {

            const duracaoTotal = servicosSelecionados.reduce((acc, servico) => acc + (servico.durationInMinutes || 0), 0);
            navigate("/profissional/data-hora",
                {
                    state: {
                        servicos: servicosSelecionados,
                        cliente: clienteObj,
                        duracaoTotal
                    }
                }
            );
        }

    };

    const adicionarServico = (id) => {
        const servicoExistente = servicosSelecionados.find((item) => item.id === id);
        if (!servicoExistente) {
            const servico = servicos.find((item) => item.id === id);
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


            <NavbarPro caminho={"/profissional/dashboard"} />
            <div className="w-full h-screen bg-[#FFF3DC] flex flex-col justify-center items-center">
                <h1 className="text-[#982546] font-bold text-2xl">Agendar</h1>
                <form onSubmit={agendar} className="border-1 border-[#982546] bg-[#FFF3DC] w-90 p-5 md:w-150 xl:w-180 xl:text-lg rounded-2xl flex flex-row justify-center mt-5">
                    <div className="flex flex-col w-120 ">
                        <p className="text-lg mt-2">Serviços</p>
                        <select
                            onChange={(e) => {
                                const id = parseInt(e.target.value);
                                setServicoSelecionado(id); 
                                adicionarServico(id);
                            }}
                            name="servico"
                            className="bg-amber-50 p-2 rounded-2xl border-1 border-[#982546] w-full h-10 mt-2"
                            value={servicoSelecionado}
                        >
                            <option value="">Selecione um serviço</option>
                            {servicos.map(servico => (
                                <option key={servico.id} value={servico.id}>
                                    {servico.name}
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
                                <p className="text-[#982546] text-lg p-2 self-center w-full">Nenhum serviço selecionado</p>
                            )}
                        </div>

                        <p className="text-lg mt-2">Clientes</p>
                        <select
                            onChange={e => setClienteSelecionado(e.target.value)}
                            name="cliente"
                            className="bg-amber-50 p-2 rounded-2xl border-1 border-[#982546] w-full h-10 mt-2"
                            value={clienteSelecionado}
                        >
                            <option value="">Selecione um cliente</option>
                            <option value="cadastroCli" className="font-bold text-[#982546]">Cadastrar novo cliente</option>
                            {Array.isArray(clientes) && clientes.map(cli => (
                                <option key={cli.id} value={cli.id}>
                                    {cli.username}
                                </option>
                            ))}
                        </select>

                        <div className="flex flex-col-reverse gap-5 md:gap-0 md:flex-row w-full justify-between mt-8 md:mt-4">
                            <button
                                type="reset"
                                className="border-1 border-[#982546] py-2 px-8 rounded-2xl text-[#982546] cursor-pointer"
                                onClick={cancelar}

                            >
                                Cancelar
                            </button>

                            <button
                                type="submit"
                                className="bg-[#982546] py-2 px-4 rounded-2xl text-[#FFF3DC] flex flex-row gap-2 items-center justify-center cursor-pointer hover:bg-[#b36078]"

                            >
                                Selecionar data e hora
                                <img src="/assets/Calendar.png" className="h-8" />
                            </button>
                        </div>
                    </div>
                </form>

            </div>
        </>
    )

}
