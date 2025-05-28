import MenuLateral from "./MenuLateral";
import { useNavigate } from "react-router-dom";

export default function Financeiro() {

    const navigate = useNavigate();

    return (
        <>

            <div className="w-full h-screen bg-[#FFF3DC] ">
                <div className="h-full flex flex-row">
                    <MenuLateral />

                    <div className="flex flex-col w-full h-full  items-center ">
                        <div className="w-full flex flex-row justify-end">
                            <img className="h-8 m-2" src="/assets/Doorbell.png " alt="" />
                        </div>

                        <h1 className="text-[#982546] font-bold text-2xl ml-20">Meus serviços</h1>

                        <div className="flex flex-row w-210 justify-around ml-20 mt-5">

                            <div className="flex flex-col">
                                <h1 className="text-[#982546] font-bold text-lg mb-2">Balanço mensal</h1>
                                <div className="w-100  bg-[#982546] rounded-2xl flex flex-col justify-between p-2 ">
                                    <div className="flex flex-col text-[#FFF3DC] p-4 h-full gap-4">
                                        <span className="font-bold mb-2 text-3xl">R$ 0,00</span>
                                        <div className="flex flex-col">
                                            <span>Total de atendimentos: 0</span>
                                            <span>Total de cancelamentos: 0</span>
                                        </div>
                                    </div>

                                    <button className="p-2 rounded-2xl bg-[#FFF3DC] text-[#982546] self-end cursor-pointer" onClick={() => navigate("/pages/professional-pages/HistoricoFinanceiro")}>Ver histórico</button>

                                </div>
                            </div>

                            <div className="flex flex-col">
                                <h1 className="text-[#982546] font-bold text-lg mb-2">Serviços mais realizados</h1>
                                <div className="w-100 h-50 border border-[#982546] rounded-2xl">

                                </div>
                            </div>
                        </div>

                        <div className="flex flex-row w-210 justify-around ml-20 mt-5">

                            <div className="flex flex-col">
                                <h1 className="text-[#982546] font-bold text-lg mb-2">Movimentação semanal</h1>
                                <div className="w-100 h-40 border border-[#982546] rounded-2xl">

                                </div>
                            </div>

                            <div className="flex flex-col">
                                <h1 className="text-[#982546] font-bold text-lg mb-2">Clientes regulares</h1>
                                <div className="w-100 h-40 border border-[#982546] rounded-2xl">

                                </div>
                            </div>

                        </div>

                        <div />
                    </div>
                </div>
            </div>
        </>
    );

}