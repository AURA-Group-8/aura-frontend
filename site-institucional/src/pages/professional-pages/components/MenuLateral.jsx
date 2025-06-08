import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";

export default function MenuLateral() {
    const location = useLocation();
    const navigate = useNavigate();
    const [mostrarModal, setMostrarModal] = useState(false);

    const isSelected = (path) => location.pathname.includes(path);

    const logout = () => {
        sessionStorage.removeItem("authToken");
        navigate("/pages/professional-pages/Login");
    };

    return (
        <>
            <div className="bg-[#341C1C] h-full flex flex-col gap-10 w-44 fixed z-40">
                <img src="/assets/logo-aura-claro.png" alt="Logo" className="max-h-30 w-30 m-5" />

                <div className="flex flex-col justify-between h-full">
                    <ul className="flex flex-col gap-1 text-[#FFF3DC] w-full p-2">
                        <li className={`${isSelected("/Dashboard") ? "bg-[#982546] rounded-md shadow-md" : ""}`}>
                            <Link to="/pages/professional-pages/Dashboard" className="p-2 flex justify-between items-center w-full">
                                <span>Agendamentos</span>
                                <img src="/assets/Task.png" alt="Agendamentos" className="h-6" />
                            </Link>
                        </li>
                        <li className={`${isSelected("/MeusServicos") ? "bg-[#982546] rounded-md shadow-md" : ""}`}>
                            <Link to="/pages/professional-pages/MeusServicos" className="p-2 flex justify-between items-center w-full">
                                <span>Meus Serviços</span>
                                <img src="/assets/Eyebrow.png" alt="Meus Serviços" className="h-6" />
                            </Link>
                        </li>
                        <li className={`${isSelected("/Financeiro") ? "bg-[#982546] rounded-md shadow-md" : ""}`}>
                            <Link to="/pages/professional-pages/Financeiro" className="p-2 flex justify-between items-center w-full">
                                <span>Finanças</span>
                                <img src="/assets/Coins.png" alt="Finanças" className="h-6" />
                            </Link>
                        </li>
                        <li className={`${isSelected("/MeusClientes") ? "bg-[#982546] rounded-md shadow-md" : ""}`}>
                            <Link to="/pages/professional-pages/MeusClientes" className="p-2 flex justify-between items-center w-full">
                                <span>Clientes</span>
                                <img src="/assets/User-claro.png" alt="Clientes" className="h-6" />
                            </Link>
                        </li>
                    </ul>

                    <ul className="text-[#DD859E] flex flex-col p-2 ">
                        <li className={`p-2 flex justify-between items-center cursor-pointer ${isSelected("/Contato") ? "bg-[#982546] rounded-md shadow-md" : ""}`}>
                            <Link to="/pages/professional-pages/Contato" className="flex justify-between items-center w-full">
                                <span>Contato</span>
                                <img src="/assets/Help2.png" alt="Contato" className="h-6" />
                            </Link>
                        </li>
                        <li className={`p-2 flex justify-between items-center cursor-pointer ${isSelected("/Configuracoes") ? "bg-[#982546] rounded-md shadow-md" : ""}`}>
                            <Link to="/pages/professional-pages/Configuracoes" className="flex justify-between items-center w-full">
                                <span>Config</span>
                                <img src="/assets/Services.png" alt="Configurações" className="h-6" />
                            </Link>
                        </li>
                        <li className="relative">
                            <div
                                onClick={() => setMostrarModal(true)}
                                className="p-2 flex justify-between items-center cursor-pointer hover:bg-[#982546] rounded-md transition"
                            >
                                <span>Logout</span>
                                <img src="/assets/Logout.png" alt="Logout" className="h-6" />
                            </div>

                            {mostrarModal && (
                                <div className="absolute left-44 bottom-2 bg-[#FFF3DC] p-4 rounded-2xl border border-[#982546] shadow-lg z-50 w-64">
                                    <p className="text-[#645454] font-medium text-sm mb-4 text-center">Deseja sair da sua conta?</p>
                                    <div className="flex justify-around">
                                        <button
                                            onClick={() => setMostrarModal(false)}
                                            className="border border-[#982546] text-[#982546] py-1 px-4 rounded-2xl text-sm font-semibold hover:bg-[#f5d9d9] cursor-pointer"
                                        >
                                            Cancelar
                                        </button>
                                        <button
                                            onClick={logout}
                                            className="bg-[#982546] text-white py-1 px-4 rounded-2xl text-sm font-semibold hover:opacity-90  cursor-pointer"
                                        >
                                            Sair
                                        </button>
                                        
                                    </div>
                                </div>
                            )}
                        </li>
                    </ul>
                </div>
            </div>
        </>
    );
}
