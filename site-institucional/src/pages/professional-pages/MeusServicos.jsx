import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import MenuLateral from "./components/MenuLateral";
import CardServico from "./components/CardServico";

export default function MeusServicos() {
    const navigate = useNavigate();
    const [servicos, setServicos] = useState([]);
    const [busca, setBusca] = useState("");

    const apiUrl = import.meta.env.VITE_API_URL;

    useEffect(() => {
        const listarServicos = async () => {
            try {
                const token = sessionStorage.getItem("authToken");

                const response = await axios.get(`${apiUrl}/servicos`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                });

                setServicos(response.data.content);
            } catch (error) {
                console.error("Erro ao buscar serviços:", error);
            }
        };

        listarServicos();
    }, []);

   
    const filtrarServicos = () => {
        if (!busca) return servicos;
        return servicos.filter(servico =>
            servico.name.toLowerCase().includes(busca.toLowerCase()) ||
            servico.description.toLowerCase().includes(busca.toLowerCase())
        );
    };

    const servicosFiltrados = filtrarServicos();

    return (
        <div className="w-full h-screen bg-[#FFF3DC] ">
            <div className="h-full flex flex-row">
                <MenuLateral />

                <div className="flex flex-col w-full h-full items-center ">
                    <div className="w-full flex flex-row justify-end">
                        <img className="h-8 m-2" src="/assets/Doorbell.png" alt="Campainha" />
                    </div>

                    <h1 className="text-[#982546] font-bold text-2xl ml-20">Meus serviços</h1>

                    <div className="flex flex-row w-210 justify-between ml-20 mt-10">
                        <button
                            className="p-2 bg-[#982546] rounded-2xl text-[#FFF3DC] cursor-pointer"
                            onClick={() => navigate("/pages/professional-pages/AddServico")}
                        >
                            Adicionar serviço
                        </button>

                        <input
                            type="text"
                            placeholder="Buscar serviço"
                            className="p-2 bg-white rounded-2xl border border-[#982546]"
                            value={busca}
                            onChange={(e) => setBusca(e.target.value)}
                        />
                    </div>

                    <div className="flex flex-col h-90 mt-6 overflow-y-auto">
                        {servicosFiltrados.length > 0 ? (
                            servicosFiltrados.map((servico) => (
                                <CardServico
                                    key={servico.id}
                                    name={servico.name}
                                    description={servico.description}
                                    averageTime={`${servico.expectedDurationMinutes} min`}
                                    value={servico.price.toFixed(2)}
                                />
                            ))
                        ) : (
                            <p className="text-[#982546] mt-10">Nenhum serviço encontrado.</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
