import { useNavigate } from "react-router-dom";
import MenuLateral from "./MenuLateral";
import { use, useState } from "react";

export default function MeusClientes() {

    const [menuAberto, setMenuAberto] = useState(false);
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

                        <h1 className="text-[#982546] font-bold text-2xl ml-20">Meus clientes</h1>


                        <div className="flex flex-row w-210  justify-between ml-20 mt-10">
                            <button className="p-2 bg-[#982546] rounded-2xl text-[#FFF3DC] cursor-pointer" onClick={() => navigate("/pages/professional-pages/Mensagem")}>Enviar mensagem para todos</button>
                            <input type="text" placeholder="Buscar cliente" className="p-2 bg-white rounded-2xl border border-[#982546]" />

                        </div>

                        <div className="flex flex-col w-210  ml-20 mt-10 h-60 overflow-y-auto ">
                            <div className="bg-[#982546] rounded-t-2xl p-2 w-full flex flex-row justify-between items-center text-white text-lg font-bold">
                                <span>Cliente</span>
                            </div>

                            <div className="bg-[#982546b9] rounded-b-2xl p-2 w-full text-white flex flex-row justify-between items-center">
        
                                <div className="flex flex-col justify-between ">
                                    <span>Telefone: 4002-8922</span>
                                    <span>Data de Nascimento: 12/04/1960</span>
                                </div>

                                 <textarea name="" id="" className="bg-[#81253fd8] rounded-2xl w-80 h-20 p-2" placeholder="Adicione uma observação"></textarea>

                            </div>
                        </div>

                        
                    </div>



                </div>


            </div>

        </>
    )
}