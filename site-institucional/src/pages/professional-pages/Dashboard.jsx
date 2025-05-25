import { m } from "framer-motion";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import MenuLateral from "./MenuLateral";
import CardAgendamento from "./CardAgendamento";

export default function Dashboard() {

    const navigate = useNavigate();


    const [periodoSelecionado, setPeriodoSelecionado] = useState(null);
    const [pagamentoSelecionado, setPagamentoSelecionado] = useState(null);

    const [menuAberto, setMenuAberto] = useState(false);


    const handleSelectRadio = (grupo, valor) => {
        if (grupo === 'periodo') {
            setPeriodoSelecionado(periodoSelecionado === valor ? null : valor);
        } else if (grupo === 'pagamento') {
            setPagamentoSelecionado(pagamentoSelecionado === valor ? null : valor);
        }
    };

    return (
        <>
            <div className="w-full h-screen bg-[#FFF3DC] ">
                <div className="h-full flex flex-row">

                    <MenuLateral/>

                    <div className="flex flex-col w-full h-full  items-center ">
                        <div className="w-full flex flex-row justify-end">
                            <img className="h-8 m-2" src="/assets/Doorbell.png " alt="" />
                        </div>

                        <div className=" flex flex-col justify-center items-center ml-20 w-200">

                            <h1 className="text-[#982546] font-bold text-2xl">Agendamentos</h1>

                            <div className="w-full flex flex-row justify-between items-start mt-5 ">


                                <div className="flex flex-row-reverse justify-between w-110 items-start relative" >
                                    <div className="w-full transition-all duration-300 ml-2 relative">
                                        {menuAberto && (
                                            <>
                                                <div className="max-w-2xl flex flex-col absolute z-999 border-1 border-[#982546] rounded-2xl p-5 bg-[#FFF3DC] shadow-lg shadow-[#982546]">
                                                    <div className="flex flex-col ">
                                                        <p className="font-bold text-[#982546]">Período</p>
                                                        <div className="flex flex-row gap-2 mt-2 border-b-1 border-[#982546]">
                                                            <input type="radio" name="all" id="" checked={periodoSelecionado === "todos"} onChange={() => handleSelectRadio("periodo", "todos")} /><span>Todos</span>
                                                            <input type="radio" name="today" id="" checked={periodoSelecionado === "hoje"} onChange={() => handleSelectRadio("periodo", "hoje")} /><span>Hoje</span>
                                                            <input type="radio" name="week" id="" checked={periodoSelecionado === "semana"} onChange={() => handleSelectRadio("periodo", "semana")} /><span>Essa semana</span>
                                                            <input type="radio" name="month" id="" checked={periodoSelecionado === "mes"} onChange={() => handleSelectRadio("periodo", "mes")} /><span>Esse mês</span>
                                                        </div>
                                                    </div>

                                                    <div className="flex flex-col mt-5">
                                                        <p className="font-bold text-[#982546]">Pagamento</p>
                                                        <div className="flex flex-row gap-2 mt-2 border-b-1 border-[#982546]">
                                                            <input type="radio" name="all" id="" checked={pagamentoSelecionado === "pago"} onChange={() => handleSelectRadio("pagamento", "pago")} /><span>Pago</span>
                                                            <input type="radio" name="today" id="" checked={pagamentoSelecionado === "pendente"} onChange={() => handleSelectRadio("pagamento", "pendente")} /><span>Pendente</span>
                                                        </div>
                                                    </div>

                                                    <div className="flex flex-col mt-5">
                                                        <p className="font-bold text-[#982546]">Serviço</p>
                                                        <div className="flex flex-row gap-2 mt-2">
                                                            <select name="service" id="" className="border-1 border-[#982546] bg-white rounded-2xl p-2 w-full">
                                                                <option value="1">Serviço</option>
                                                            </select>
                                                        </div>
                                                    </div>
                                                </div>

                                            </>
                                        )}
                                    </div>
                                    <button className="bg-[#982546] p-2 text-[#FFF3DC] rounded-2xl mt-5 cursor-pointer hover:bg-[#b36078]" onClick={() => setMenuAberto(!menuAberto)}><img src="/assets/Slider.png" alt="" className="h-6" /></button>

                                </div>

                                <button className="bg-[#982546] p-2 text-[#FFF3DC] rounded-2xl mt-5 cursor-pointer hover:bg-[#b36078]" onClick={() => navigate("/pages/professional-pages/Agendar")}>Adicionar agendamento</button>

                            </div>
                        </div>

                        <div className="flex w-210 h-90 ml-20 mt-5 overflow-y-scroll flex-wrap">
                            <CardAgendamento/>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}