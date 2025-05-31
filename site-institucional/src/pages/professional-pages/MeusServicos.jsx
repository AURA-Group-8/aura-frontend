import { useNavigate } from "react-router-dom";
import MenuLateral from "./components/MenuLateral";
import { use, useState } from "react";
import CardAgendamento from "./components/CardAgendamento";
import CardServico from "./components/CardServico";

export default function MeusServicos() {

    const navigate = useNavigate();

    return (
        <>

            <div className="w-full h-screen bg-[#FFF3DC] ">
                <div className="h-full flex flex-row">
                    <MenuLateral />

                    <div className="flex flex-col w-full h-full  items-center">
                        <div className="w-full flex flex-row justify-end">
                            <img className="h-8 m-2" src="/assets/Doorbell.png " alt="" />
                        </div>

                        <h1 className="text-[#982546] font-bold text-2xl ml-20">Meus serviços</h1>


                        <div className="flex flex-row w-210  justify-between ml-20 mt-10">
                            <button className="p-2 bg-[#982546] rounded-2xl text-[#FFF3DC] cursor-pointer" onClick={() => navigate("/pages/professional-pages/AddServico")}>Adicionar serviço</button>
                            <input type="text" placeholder="Buscar serviço" className="p-2 bg-white rounded-2xl border border-[#982546]" />

                        </div>

                        <CardServico />

                        
                    </div>



                </div>


            </div>

        </>
    )
}