import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CardServico({ id, name, description, averageTime, value, onEditar, onExcluir }) {
    const [menuAberto, setMenuAberto] = useState(false);
    const menuRef = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        const handleClickFora = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setMenuAberto(false);
            }
        };

        document.addEventListener("mousedown", handleClickFora);

        return () => {
            document.removeEventListener("mousedown", handleClickFora);
        };
    }, []);

    return (
        <div className="flex flex-col md:w-210 xl:w-250 mb-5 md:ml-20 relative">
            <div className="flex flex-col">
                <div className="bg-[#462e2e] rounded-t-2xl p-4 md:p-2 w-full flex flex-row justify-between items-center text-white font-bold">
                    <span className="text-xl">{name}</span>
                    <div className="relative" ref={menuRef}>
                        <img
                            src="/assets/Ellipsis.png"
                            alt="Menu"
                            className="h-10 cursor-pointer"
                            onClick={() => setMenuAberto(!menuAberto)}
                        />
                        {menuAberto && (
                            <div className="absolute right-0 w-50 bg-white border border-[#982546] rounded-2xl z-50 shadow-lg text-[#982546]">
                                <button
                                    className="border-b border-[#982546] text-left px-4 py-2 cursor-pointer w-full"
                                    onClick={() => {
                                        onEditar(id);
                                        setMenuAberto(false);
                                        navigate("/profissional/servico/editar", {
                                            state: { id, name, description, averageTime, value }
                                    
                                    });
                                    }}
                                >
                                    Editar serviço
                                </button>
                                <button
                                    className="text-left px-4 py-2 cursor-pointer"
                                    onClick={() => {
                                        onExcluir(id);
                                        setMenuAberto(false);
                                    }}
                                >
                                    Excluir serviço
                                </button>
                            </div>
                        )}
                    </div>
                </div>

                <div className="bg-[#341c1c88] rounded-b-2xl p-4 md:p-2 w-full text-white flex flex-col text-lg ">
                    <span>{description}</span>

                    <div className="flex flex-col md:flex-row justify-between mt-2">
                        <span>Duração média: {averageTime}</span>
                        <span className="text-3xl font-bold mt-2 md:mt-0">R$ {value}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
