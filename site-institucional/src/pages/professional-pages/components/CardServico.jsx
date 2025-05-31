
import { use, useState } from "react";

export default function CardServico(props) {

    const [menuAberto, setMenuAberto] = useState(false);

    return (
        <>
            <div className="flex flex-col w-210 mt-10 ml-20">
                <div className="flex flex-col">
                    <div className="bg-[#462e2e] rounded-t-2xl p-2 w-full flex flex-row justify-between items-center text-white text-lg font-bold">
                        <span>{props.name}</span>
                        <div className="flex flex-row relative gap-2 ">
                            <img src="/assets/Ellipsis.png" alt="" className="h-10 cursor-pointer" onClick={() => setMenuAberto(!menuAberto)} />
                            {menuAberto && (
                                <div className="bg-white w-40 h-20 flex flex-col p-2 z-100 absolute mt-6 rounded-2xl border border-[#982546] text-[#982546]">
                                    <a href="#" className="border-b border-[#982546]">Editar serviço</a>
                                    <a href="#">Excluir serviço</a>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="bg-[#341c1c88] rounded-b-2xl p-2 w-full text-white flex flex-col ">
                        <span>{props.description}</span>

                        <div className="flex flex-row justify-between ">
                            <span>Duração média: {props.averageTime}</span>
                            <span className="text-3xl font-bold">R$ {props.value}</span>
                        </div>

                    </div>
                </div>

            </div>
        </>
    )

}