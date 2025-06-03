import { Link, useLocation } from "react-router-dom";

export default function MenuLateral() {
    const location = useLocation();

    const isSelected = (path) => location.pathname.includes(path);

    return (
        <div className="bg-[#341C1C] h-full flex flex-col gap-10 w-44 fixed">
            <img src="/assets/logo-aura-claro.png" alt="Logo" className="max-h-30 w-30 m-5" />

            <div className="flex flex-col justify-center gap-15 items-center">
                <ul className="flex flex-col gap-1 text-[#FFF3DC] w-full p-2">
                    <li className={`${isSelected("/Dashboard") ? "bg-[#982546] rounded-md shadow-md" : ""}`}>
                        <Link
                            to="/pages/professional-pages/Dashboard"
                            className="p-2 flex flex-row justify-between items-center w-full h-full"
                        >
                            <span>Agendamentos</span>
                            <img src="/assets/Task.png" alt="Agendamentos" className="h-6" />
                        </Link>
                    </li>

                    <li className={`${isSelected("/MeusServicos") ? "bg-[#982546] rounded-md shadow-md" : ""}`}>
                        <Link
                            to="/pages/professional-pages/MeusServicos"
                            className="p-2 flex flex-row justify-between items-center w-full h-full"
                        >
                            <span>Meus Serviços</span>
                            <img src="/assets/Eyebrow.png" alt="Meus Serviços" className="h-6" />
                        </Link>
                    </li>

                    <li className={`${isSelected("/Financeiro") ? "bg-[#982546] rounded-md shadow-md" : ""}`}>
                        <Link
                            to="/pages/professional-pages/Financeiro"
                            className="p-2 flex flex-row justify-between items-center w-full h-full"
                        >
                            <span>Finanças</span>
                            <img src="/assets/Coins.png" alt="Finanças" className="h-6" />
                        </Link>
                    </li>

                    <li className={`${isSelected("/MeusClientes") ? "bg-[#982546] rounded-md shadow-md" : ""}`}>
                        <Link
                            to="/pages/professional-pages/MeusClientes"
                            className="p-2 flex flex-row justify-between items-center w-full h-full"
                        >
                            <span>Clientes</span>
                            <img src="/assets/User-claro.png" alt="Clientes" className="h-6" />
                        </Link>
                    </li>
                </ul>

                <ul className="text-[#DD859E] flex flex-col">
                    <li className={`p-2 flex flex-row justify-between cursor-pointer ${isSelected("/Contato") ? "bg-[#982546] rounded-md shadow-md" : ""}`}>
                        <Link to="/pages/professional-pages/Contato"
                            className="gap-4 flex flex-row justify-between items-center w-full"
                        >
                            <span>Contatos</span>
                            <img src="/assets/Help2.png" alt="Contato" className="h-6" />
                        </Link>

                    </li>
                    <li className={`p-2 flex flex-row justify-between gap-2 cursor-pointer ${isSelected("/Configuracoes") ? "bg-[#982546] rounded-md shadow-md" : ""}`}>
                        <Link to="/pages/professional-pages/Configuracoes"
                            className=" gap-4 flex flex-row justify-between items-center w-full"
                        >
                            <span>Configurações</span>
                            <img src="/assets/Services.png" alt="Configurações" className="h-6" />
                        </Link>
                    </li>

                    <li className={`p-2 flex flex-row justify-between cursor-pointer ${isSelected("/Logout") ? "bg-[#982546] rounded-md shadow-md" : ""}`}>
                        <Link to="/logout"
                            className="gap-4 flex flex-row justify-between items-center w-full"
                        >

                            <span>Logout</span>
                            <img src="/assets/Logout.png" alt="Logout" className="h-6" />
                            
                        </Link>
                        
                    </li>
                   
                </ul>
            </div>
        </div >
    );
}
