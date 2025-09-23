import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";

export default function MenuLateral() {
    const location = useLocation();
    const navigate = useNavigate();
    const [mostrarModal, setMostrarModal] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    const isSelected = (path) => location.pathname.includes(path);

    const logout = () => {
        sessionStorage.removeItem("authToken");
        navigate("/login");
    };

    return (
        <>
            <div className={`bg-[#341C1C] z-40 fixed md:relative rounded-br-2xl rounded-tr-2xl transition-all duration-300
                ${menuOpen ? 'h-full flex flex-col w-60' : 'h-14 w-14 flex'} md:h-full md:w-60 md:flex md:flex-col
            `}>
                <button className="md:hidden p-2 ml-auto" onClick={() => setMenuOpen(!menuOpen)} >
                    <svg
                        className="w-8 h-8 text-[#FFF3DC]"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8h16M4 16h16" />
                    </svg>
                </button>

                {menuOpen && (
                    <div className="flex flex-col justify-between h-full">
                        <ul className="flex flex-col text-[#FFF3DC] w-full p-4 xl:text-2xl">
                            <li className={`${isSelected("/Dashboard") ? "bg-[#982546] rounded-md shadow-md" : ""}`}>
                                <Link to="/profissional/dashboard" className="p-2 flex justify-between items-center w-full">
                                    <span className="xl:text-2xl">Agendamentos</span>
                                    <img src="/assets/Task.png" alt="Agendamentos" className="h-6" />
                                </Link>
                            </li>
                            <li className={`${isSelected("/MeusServicos") ? "bg-[#982546] rounded-md shadow-md" : ""}`}>
                                <Link to="/profissional/meus-servicos"  className="p-2 flex justify-between items-center w-full">
                                    <span className="xl:text-2xl">Meus Serviços</span>
                                    <img src="/assets/Eyebrow.png" alt="Meus Serviços" className="h-6" />
                                </Link>
                            </li>
                            <li className={`${isSelected("/Financeiro") ? "bg-[#982546] rounded-md shadow-md" : ""}`}>
                                <Link to="/profissional/financeiro" className="p-2 flex justify-between items-center w-full">
                                    <span className="xl:text-2xl">Finanças</span>
                                    <img src="/assets/Coins.png" alt="Finanças" className="h-6" />
                                </Link>
                            </li>
                            <li className={`${isSelected("/MeusClientes") ? "bg-[#982546] rounded-md shadow-md" : ""}`}>
                                <Link to="/profissional/meus-clientes" className="p-2 flex justify-between items-center w-full">
                                    <span className="xl:text-2xl">Clientes</span>
                                    <img src="/assets/User-claro.png" alt="Clientes" className="h-6" />
                                </Link>
                            </li>
                        </ul>

                        <ul className="text-[#DD859E] flex flex-col p-2 ">
                            <li className={`p-2 flex justify-between items-center cursor-pointer ${isSelected("/Contato") ? "bg-[#982546] rounded-md shadow-md" : ""}`}>
                                <Link to="/profissional/contato" className="flex justify-between items-center w-full">
                                    <span className="xl:text-2xl">Contato</span>
                                    <img src="/assets/Help2.png" alt="Contato" className="h-6" />
                                </Link>
                            </li>
                            <li className={`p-2 flex justify-between items-center cursor-pointer ${isSelected("/Configuracoes") ? "bg-[#982546] rounded-md shadow-md" : ""}`}>
                                <Link to="/profissional/configuracoes" className="flex justify-between items-center w-full">
                                    <span className="xl:text-2xl">Config</span>
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
                                    <div className="absolute md:left-44 left-20  bottom-2 bg-white p-4 rounded-2xl border border-[#982546] shadow-lg z-50 w-64">
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
                )}

                <img src="/assets/logo-aura-claro.png" alt="Logo" className="max-h-30 w-30 xl:mb-20 self-center m-5 hidden md:flex" />

                <div className="flex-col justify-between  h-full hidden md:flex">
                    <ul className="flex flex-col gap-1 text-[#FFF3DC] w-full p-2">
                        <li className={`${isSelected("/Dashboard") ? "bg-[#982546] rounded-md shadow-md" : ""}`}>
                            <Link to="/profissional/dashboard" className="p-2 flex justify-between items-center w-full">
                                <span>Agendamentos</span>
                                <img src="/assets/Task.png" alt="Agendamentos" className="h-6" />
                            </Link>
                        </li>
                        <li className={`${isSelected("/MeusServicos") ? "bg-[#982546] rounded-md shadow-md" : ""}`}>
                            <Link to="/profissional/meus-servicos" className="p-2 flex justify-between items-center w-full">
                                <span>Meus Serviços</span>
                                <img src="/assets/Eyebrow.png" alt="Meus Serviços" className="h-6" />
                            </Link>
                        </li>
                        <li className={`${isSelected("/Financeiro") ? "bg-[#982546] rounded-md shadow-md" : ""}`}>
                            <Link to="/profissional/financeiro" className="p-2 flex justify-between items-center w-full">
                                <span>Finanças</span>
                                <img src="/assets/Coins.png" alt="Finanças" className="h-6" />
                            </Link>
                        </li>
                        <li className={`${isSelected("/MeusClientes") ? "bg-[#982546] rounded-md shadow-md" : ""}`}>
                            <Link to="/profissional/meus-clientes" className="p-2 flex justify-between items-center w-full">
                                <span>Clientes</span>
                                <img src="/assets/User-claro.png" alt="Clientes" className="h-6" />
                            </Link>
                        </li>
                    </ul>

                    <ul className="text-[#DD859E] flex flex-col p-2">
                        <li className={`p-2 flex justify-between items-center cursor-pointer ${isSelected("/Contato") ? "bg-[#982546] rounded-md shadow-md" : ""}`}>
                            <Link to="/profissional/contato" className="flex justify-between items-center w-full">
                                <span>Contato</span>
                                <img src="/assets/Help2.png" alt="Contato" className="h-6" />
                            </Link>
                        </li>
                        <li className={`p-2 flex justify-between items-center cursor-pointer ${isSelected("/Configuracoes") ? "bg-[#982546] rounded-md shadow-md" : ""}`}>
                            <Link to="/profissional/configuracoes" className="flex justify-between items-center w-full">
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
                                <div className="absolute left-44 bottom-2 bg-white p-4 rounded-2xl border border-[#982546] shadow-lg z-50 w-64">
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
