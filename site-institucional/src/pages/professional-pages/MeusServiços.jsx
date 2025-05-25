import MenuLateral from "./MenuLateral";
import { useState } from "react";

export default function MeusServicos() {

    const [menuAberto, setMenuAberto] = useState(false);

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


                        <div className="flex flex-row w-210  justify-between ml-20 mt-10">
                            <button className="p-2 bg-[#982546] rounded-2xl text-[#FFF3DC]">Adicionar serviço</button>
                            <input type="text" placeholder="Buscar serviço" className="p-2 bg-white rounded-2xl border border-[#982546]" />

                        </div>

                        <div className="flex flex-col w-210  ml-20 mt-10 h-60 ">
                            <div className="bg-[#462e2e] rounded-t-2xl p-2 w-full flex flex-row justify-between items-center text-white text-lg font-bold">
                                <span>Serviço</span>
                                <div className="flex flex-row relative gap-2 ">
                                    <img src="/assets/Ellipsis.png" alt="" className="h-10 cursor-pointer" onClick={() => setMenuAberto(!menuAberto)}/>
                                    {menuAberto &&(
                                        <div className="bg-white w-40 h-20 flex flex-col p-2 z-100 absolute mt-6 rounded-2xl border border-[#982546] text-[#982546]">
                                        <a href="#" className="border-b border-[#982546]">Editar serviço</a>
                                        <a href="#">Excluir serviço</a>
                                    </div>
                                    )}
                                </div>
                            </div>

                            <div className="bg-[#341c1c88] rounded-b-2xl p-2 w-full text-white flex flex-col ">
                                <span>Descrição do serviço cadstrado</span>

                                <div className="flex flex-row justify-between ">
                                    <span>Duração média: 1 hora</span>
                                    <span className="text-3xl font-bold">R$ 0,00</span>
                                </div>

                            </div>
                        </div>
                    </div>



                </div>


            </div>

        </>
    )
}