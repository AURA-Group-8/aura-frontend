import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import MenuLateral from "../componentes/MenuLateral";
import CardServico from "../componentes/CardServico";
import SinoNotificacao from "../componentes/SinoNotificacao";
import Alerta from "../../componentes/PopUp";

export default function MeusServicos() {
    const navigate = useNavigate();
    const [servicos, setServicos] = useState([]);
    const [busca, setBusca] = useState("");

    const [modalAberto, setModalAberto] = useState(false);
    const [servicoParaExcluir, setServicoParaExcluir] = useState(null);

    const [mensagem, setMensagem] = useState("");
    const [caminho, setCaminho] = useState("");

    const limparAlert = () => {
        setTimeout(() => {
            setMensagem("");
        }, 2000);
    };

    const apiUrl = import.meta.env.VITE_API_URL_V2;

    useEffect(() => {
        const listarServicos = async () => {
            try {
                const token = sessionStorage.getItem("authToken");

                const response = await axios.get(`${apiUrl}/servicos`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                });

                setServicos(response.data);
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

    const editarServico = (id) => {
        navigate("/profissional/servico/editar");
    };

    const abrirModalExcluir = (servico) => {
        setServicoParaExcluir(servico);
        setModalAberto(true);
    };

    const excluirServico = async () => {
        if (!servicoParaExcluir) return;

        try {
            const token = sessionStorage.getItem("authToken");
            await axios.delete(`${apiUrl}/servicos/${servicoParaExcluir.id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });
            setServicos(prev => prev.filter(servico => servico.id !== servicoParaExcluir.id));
            setMensagem("Serviço excluído com sucesso!");
            setCaminho("/assets/Check-pop.png");
            limparAlert();
        } catch (error) {
            console.error("Erro ao excluir serviço:", error);
            setMensagem("Erro ao excluir serviço.");
            setCaminho("/assets/Alert.png");
            limparAlert();
        } finally {
            setModalAberto(false);
            setServicoParaExcluir(null);
        }
    };

    const formatarDuracao = (minutos) => {
        const horas = Math.floor(minutos / 60);
        const mins = minutos % 60;
        return horas > 0 ? `${horas}h ${mins}min` : `${mins}min`;
    };

    return (
        <>
            {mensagem && <Alerta mensagem={mensagem} imagem={caminho} />}

            <div className="w-full h-screen bg-[#FFF3DC] ">
                <div className="h-full flex flex-row">
                    <MenuLateral />

                    <div className="flex flex-col w-full h-full items-center ">
                        <SinoNotificacao/>

                        <h1 className="text-[#982546] font-bold text-2xl ">Meus serviços</h1>

                        <div className="flex flex-col-reverse gap-5 md:gap-0 md:flex-row w-80 md:w-210 xl:w-250 justify-between mt-10">
                            <button
                                className="p-2 bg-[#982546] rounded-2xl text-[#FFF3DC] cursor-pointer hover:bg-[#b36078] transition-colors"
                                onClick={() => navigate("/profissional/servico/add")}
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

                        <div className="flex flex-col md:h-90 xl:h-screen p-5 mt-10 overflow-y-auto">
                            {servicosFiltrados ? (
                                servicosFiltrados.map((servico) => (
                                    <CardServico
                                        key={servico.id}
                                        id={servico.id}
                                        name={servico.name}
                                        description={servico.description}
                                        averageTime={formatarDuracao(servico.expectedDurationMinutes)}
                                        value={servico.price.toFixed(2)}
                                        onEditar={editarServico}
                                        onExcluir={() => abrirModalExcluir(servico)}
                                    />
                                ))
                            ) : (
                                <p className="text-[#982546] mt-10">Nenhum serviço encontrado.</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {modalAberto && (
                <div className="fixed inset-0 flex justify-center items-center z-50 ">
                    <div className="bg-white rounded-2xl p-8 w-96 text-center shadow-lg border border-[#982546]">
                        <h2 className=" font-bold mb-4 text-[#982546]">Confirmar exclusão</h2>
                        <p>Tem certeza que deseja excluir o serviço <strong>{servicoParaExcluir?.name}</strong>?</p>

                        <div className="mt-6 flex justify-around">
                            <button
                                className="cursor-pointer px-6 py-2 rounded-2xl border border-[#982546] text-[#982546] hover:bg-[#f9eaea]"
                                onClick={() => setModalAberto(false)}
                            >
                                Cancelar
                            </button>

                            <button
                                className="cursor-pointer px-6 py-2 rounded-2xl bg-[#982546] text-white hover:bg-[#7a1e3a]"
                                onClick={excluirServico}
                            >
                                Excluir
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
