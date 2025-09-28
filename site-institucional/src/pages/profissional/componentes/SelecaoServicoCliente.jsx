import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function SelecaoServicoCliente({ onSelecionarCliente, onSelecionarServicos }) {

    const [servicos, setServicos] = useState([]);
    const [servicoSelecionado, setServicoSelecionado] = useState("");
    const [clientes, setClientes] = useState([]);
    const [clienteSelecionado, setClienteSelecionado] = useState("");
    const [servicosSelecionados, setServicosSelecionados] = useState([]);
    const [isClienteOpen, setIsClienteOpen] = useState(false);
    const [isServicoOpen, setIsServicoOpen] = useState(false);

    const apiUrl = import.meta.env.VITE_API_URL;

    const navigate = useNavigate();

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

    useEffect(() => {
        const clienteObj = clientes.find(cli => cli.id == clienteSelecionado);
        if (onSelecionarCliente) onSelecionarCliente(clienteObj);
    }, [clienteSelecionado, clientes]);

    useEffect(() => {
        if (onSelecionarServicos) onSelecionarServicos(servicosSelecionados);
    }, [servicosSelecionados]);


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

    const cadastrarNovoCliente = () => {
        navigate("/profissional/cadastro-cliente");
    }

    return (
        <>
            <form className="w-80 md:w-120 xl:w-180 xl:text-lg rounded-2xl flex flex-row justify-center">
                <div className="flex flex-col w-100 text-left">

                    <p className="text-lg mt-2 font-bold text-[#5a5a5a]">Cliente</p>
                    <div className="relative w-full mt-2">
                        <button
                            type="button"
                            className="bg-amber-50 p-2 rounded-2xl border border-[#982546] w-full flex justify-between items-center"
                            onClick={() => setIsClienteOpen(!isClienteOpen)}
                        >
                            {clienteSelecionado
                                ? clientes.find(cli => cli.id.toString() === clienteSelecionado)?.username
                                : 'Selecione um cliente'}
                            <span className="ml-2">{isClienteOpen ? '▾' : '▸'}</span>
                        </button>
                        {isClienteOpen && (
                            <ul className="absolute bg-white border border-[#982546] w-full mt-1 rounded-2xl max-h-44 overflow-auto z-10">

                                {Array.isArray(clientes) && clientes.map(cli => (
                                    <li
                                        key={cli.id}
                                        className="p-2 hover:bg-gray-100 cursor-pointer"
                                        onClick={() => { setClienteSelecionado(cli.id.toString()); setIsClienteOpen(false); }}
                                    >{cli.username}</li>
                                ))}
                            </ul>
                        )}
                    </div>

                    <button className="border border-[#982546] p-2 rounded-2xl text-[#982546] mt-5 cursor-pointer" onClick={cadastrarNovoCliente}>Cadastrar novo cliente</button>

                    <p className="text-lg mt-2 font-bold text-[#5a5a5a]">Serviços</p>
                    <div className="relative w-full mt-2">
                        <button
                            type="button"
                            className="bg-amber-50 p-2 rounded-2xl border border-[#982546] w-full flex justify-between items-center"
                            onClick={() => setIsServicoOpen(!isServicoOpen)}
                        >
                            {servicoSelecionado
                                ? servicos.find(s => s.id === servicoSelecionado)?.name
                                : 'Selecione um serviço'}
                            <span className="ml-2">{isServicoOpen ? '▾' : '▸'}</span>
                        </button>
                        {isServicoOpen && (
                            <ul className="absolute bg-white border border-[#982546] w-full mt-1 rounded-2xl max-h-44 overflow-auto z-10">
                                {servicos.map(servico => (
                                    <li
                                        key={servico.id}
                                        className="p-2 hover:bg-gray-100 cursor-pointer"
                                        onClick={() => { setServicoSelecionado(servico.id); adicionarServico(servico.id); setIsServicoOpen(false); }}
                                    >
                                        {servico.name} - R${servico.price},00
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>

                    <div className="border-1 border-[#982546] bg-[#FFF3DC] w-full h-40 mt-5 rounded-2xl overflow-y-auto">
                        {servicosSelecionados.length > 0 ? (
                            servicosSelecionados.map((item) => (
                                <div key={item.id} className="flex justify-between items-center p-2 border-b border-[#982546]">
                                    <p className="text-[#982546] text-lg">{item.name} - R${item.price},00</p>
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

                </div>
            </form>
        </>)

}