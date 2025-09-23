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

                <div className=" w-full flex flex-row justify-evenly items-start mt-5 ">
                    <form onSubmit={agendar} className=" bg-[#FFF3DC] w-60 p-5 md:w-120 xl:w-180 xl:text-lg rounded-2xl flex flex-row justify-center mt-5">
                        <div className="flex flex-col w-100">

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
                                        {servico.name} - R${servico.price},00
                                    </option>
                                ))}
                            </select>

                            <div className="border-1 border-[#982546] bg-[#FFF3DC] w-full h-30 mt-5 rounded-2xl overflow-y-auto">
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

                    <div className="bg-[#982546] w-1 h-full rounded-2xl"></div>

                    <div className="flex flex-col">

                        <div className="w-full h-screen bg-[#FFF3DC] flex flex-col justify-center items-center pt-10 ">
                            <h1 className="text-[#982546] text-2xl font-bold mb-6 mt-10 ">
                                {dataAtual ? (format(dataAtual, "MMMM 'de' yyyy", { locale: ptBR }).toUpperCase().slice(0, 1) +
                                    format(dataAtual, "MMMM 'de' yyyy", { locale: ptBR }).slice(1)) : ""}
                            </h1>

                            <div className="flex justify-center items-center gap-2 md:gap-6 border-b-1 border-[#982546] pb-4">
                                <button onClick={handleDiasAnteriores} className="text-[#982546] text-xl cursor-pointer">
                                    ❮
                                </button>

                                {diasParaMostrar.map((dia) => {
                                    const selecionado =
                                        dataSelecionada &&
                                        format(dia, "yyyy-MM-dd") === format(dataSelecionada, "yyyy-MM-dd");

                                    return (
                                        <button
                                            key={dia.toString()}
                                            onClick={() => handleSelecionarData(dia)}
                                            className={`w-10 h-20 md:w-20 md:h-30 flex flex-col items-center justify-center rounded-xl border font-bold transition-all cursor-pointer
                                          ${selecionado ? "bg-[#4B1F1F] text-white" : "text-[#362323]"}`}
                                        >
                                            <span className="text-sm">
                                                {format(dia, "EEE", { locale: ptBR })
                                                    .substring(0, 3)
                                                    .toUpperCase()}
                                            </span>
                                            <span className="text-lg">{format(dia, "d")}</span>
                                        </button>
                                    );
                                })}

                                <button
                                    onClick={handleProximoDias}
                                    className="text-[#982546] text-2xl cursor-pointer"
                                >
                                    ❯
                                </button>
                            </div>

                            <div className="flex flex-wrap justify-center items-center gap-2 md:gap-6 mt-10">
                                <button
                                    onClick={handleHorariosAnteriores}
                                    className="text-[#982546] text-xl cursor-pointer"
                                >
                                    ❮
                                </button>

                                {horariosParaMostrar.map((horario) => {
                                    const selecionado = horarioSelecionado === horario;

                                    return (
                                        <button
                                            key={horario}
                                            onClick={() => handleSelecionarHorario(horario)}
                                            className={`w-20 h-10 flex items-center justify-center rounded-xl border font-bold transition-all cursor-pointer
                                          ${selecionado ? "bg-[#4B1F1F] text-white" : "text-[#362323]"}`}
                                        >
                                            {horario}
                                        </button>
                                    );
                                })}

                                <button
                                    onClick={handleProximoHorarios}
                                    className="text-[#982546] text-xl cursor-pointer"
                                >
                                    ❯
                                </button>
                            </div>

                            <div className="flex flex-col items-start mt-12 md:mt-8 w-90 md:w-170 bg-[#E5D8C0] rounded-2xl">
                                <p className="text-[#362323] p-4 font-bold ">
                                    {dataSelecionada ? ` ${format(dataSelecionada, "dd/MM/yyyy")}` : ""}
                                    {" - "}
                                    {horarioSelecionado ? ` ${horarioSelecionado}` : ""}
                                </p>

                                <span className="flex flex-row gap-2 p-4 border-t-1 w-full border-[#9c9a9a] text-[#5e5e5e] ">
                                    Funcionário: <img src="/assets/user.png" alt="" className="h-8" /> Kathelyn
                                </span>
                            </div>
                            <button
                                className="bg-[#4B1F1F] w-90 md:w-150 mt-5 p-2 rounded-2xl font-bold text-amber-50 cursor-pointer"
                                onClick={confirmar}
                            >
                                Continuar
                            </button>
                        </div>
                        <div className="w-full bg-[#FFF3DC] flex flex-col items-center">

                            <h1 className="text-[#982546] font-bold text-xl">Confirmar agendamento</h1>
                            <div className="border-1 border-[#982546] border-t-8 bg-[#FFF3DC] md:w-120 xl:text-2xl h-auto pb-2 rounded-2xl m-5 flex flex-col ">
                                <div className="flex flex-row w-full justify-center p-5 mb-5">
                                    <div className="h-20">
                                        <p className="font-bold text-[#982546]">Serviços</p>
                                        <ul className='border border-[#982546] max-h-20 xl:max-h-30 overflow-y-auto p-1 rounded-tl-2xl rounded-bl-2xl md:w-60'>
                                            {Array.isArray(servicos) && servicos.length > 0 ? (
                                                servicos.map((servico, key) => (
                                                    <li key={key}>{servico.name}</li>
                                                ))
                                            ) : (
                                                <li >{servicos?.name || servicos?.nome || "Nenhum serviço selecionado"}</li>
                                            )}
                                        </ul>
                                    </div>

                                    <div className="flex flex-col items-end gap-5 w-full">
                                        <div className="flex flex-col items-end">
                                            <span className="font-bold text-gray-600">Data: ererr<span className="text-black font-normal"></span></span>
                                            <span className="font-bold text-gray-600">Hora: rererer<span className="text-black font-normal"></span></span>
                                        </div>

                                        <div className="flex flex-col font-bold text-[#982546] md:text-xl items-end" >
                                            <p>Total a pagar:</p>
                                            <p className="font-bold text-[#982546] md:text-lg">
                                                R$ {
                                                    Array.isArray(servicos)
                                                        ? servicos.reduce((acc, item) => acc + (Number(item.price) || 0), 0).toFixed(2)
                                                        : (Number(servicos?.price) || 0).toFixed(2)
                                                }
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <button
                                    className={`bg-[#982546] font-bold w-60 self-center  p-2 text-[#FFF3DC] rounded-2xl cursor-pointer hover:bg-[#b36078] transition-colors `}

                                >
                                    Confirmar agendamento
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </>
    )

}
