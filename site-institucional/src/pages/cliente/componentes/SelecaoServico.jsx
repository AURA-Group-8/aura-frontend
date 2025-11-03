import { useState, useEffect } from "react";
import axios from "axios";

export default function SelecionarServico({ onSelecionarCliente, onSelecionarServicos }) {
    const apiUrl = import.meta.env.VITE_API_URL_V2;

    const [servicosSelecionados, setServicosSelecionados] = useState([]);
    const [listaServicos, setListaServicos] = useState([]);
    const [isServicoOpen, setIsServicoOpen] = useState(false);
    const [servicoSelecionado, setServicoSelecionado] = useState(null);


    const servicos = async () => {
        try {
            const authToken = sessionStorage.getItem("authToken");
            const response = await axios.get(`${apiUrl}/servicos`, {
                headers: {
                    Authorization: `Bearer ${authToken}`,
                },
            });
            setListaServicos(response.data);
        } catch (error) {
            console.error("Erro ao buscar serviços:", error);

        }
    };

    useEffect(() => {
        servicos();
    }, []);


    const clienteObj = {
        id: Number(sessionStorage.getItem("userId")),
        userName: sessionStorage.getItem("userName")
    };

    useEffect(() => {
        if (onSelecionarCliente) onSelecionarCliente(clienteObj);
    }, []);

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

    useEffect(() => {
        if (onSelecionarServicos) onSelecionarServicos(servicosSelecionados);
    }, [servicosSelecionados]);

    return (
        <>
            <form
                className=" bg-[#FFF3DC] w-90 p-4 xl:p-6 xl:text-xl md:w-150 xl:w-180 rounded-2xl flex flex-row items-center justify-center mt-5"
            >
                <div className="flex flex-col w-full">
                    <p className="text-lg mt-2 font-bold text-[#982546]">Serviços</p>
                    <div className="relative w-full mt-2">
                        <button
                            type="button"
                            className="bg-amber-50 p-2 rounded-2xl border border-[#982546] w-full flex justify-between items-center"
                            onClick={() => setIsServicoOpen(open => !open)}
                        >
                            {servicoSelecionado
                                ? listaServicos.find(s => s.id === servicoSelecionado)?.name
                                : 'Selecione um serviço'}
                            <span className="ml-2">{isServicoOpen ? '▾' : '▸'}</span>
                        </button>
                        {servicos.length > 0 ? (
                            isServicoOpen && (
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
                            )) : (

                            isServicoOpen && (
                                <ul className="absolute bg-white border border-[#982546] w-full mt-1 rounded-2xl max-h-44 overflow-auto z-10">
                                    <li
                                        className="p-2 hover:bg-gray-100 cursor-pointer"
                                    >
                                        Nenhum serviço disponível
                                    </li>
                                </ul>
                            )
                        )}
                    </div>

                    <div className="border-1 border-[#982546] bg-[#FFF3DC] w-full h-30 mt-5 rounded-2xl overflow-y-auto">
                        {servicosSelecionados.length > 0 ? (
                            servicosSelecionados.map((item) => (
                                <div key={item.id} className="flex justify-between items-center p-2 border-b border-[#982546]">
                                    <p className="text-[#982546] text-lg">{item.name}  {item.price ? ` - R$ ${item.price.toFixed(2)}` : ""}</p>
                                    <button
                                        type="button"
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
                </div>
            </form>
        </>
    );
}
