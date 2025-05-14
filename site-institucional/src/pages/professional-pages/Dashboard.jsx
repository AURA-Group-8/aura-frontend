import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
    
    const navigate = useNavigate();
    const [selectedItem, setSelectedItem] = useState(null);

    const handleSelect = (item, event) => {
        event.preventDefault(); 
        setSelectedItem(item); 
    };

    return (
        <>
            <div className="w-full h-screen bg-[#FFF3DC] ">
                <div className="h-full flex flex-row">

                    <div className="bg-[#341C1C] h-full flex flex-col gap-10 w-44 fixed">
                        <img src="/assets/logo-aura-claro.png " alt="" className="max-h-30 w-30 m-5" />
                        <div className="flex flex-col justify-center gap-15 items-center">
                            <ul className="flex flex-col gap-2 text-[#FFF3DC] ">
                                <li
                                    className={`p-2 flex flex-row justify-between gap-2 cursor-pointer ${
                                        selectedItem === "agendamentos" ? "bg-[#982546] rounded-md" : ""
                                    }`}
                                    onClick={(e) => handleSelect("agendamentos", e)}
                                >
                                    <a href="#">Agendamentos</a>
                                    <img src="/assets/Task.png" alt="" className="h-6 " />
                                </li>
                                <li
                                    className={` p-2 flex flex-row justify-between cursor-pointer ${
                                        selectedItem === "meus-servicos" ? "bg-[#982546] rounded-md shadow-md" : ""
                                    }`}
                                    onClick={(e) => handleSelect("meus-servicos", e)}
                                >
                                    <a href="#">Meus Serviços</a>
                                    <img src="/assets/Eyebrow.png" alt="" className="h-6 " />
                                </li>
                                <li
                                    className={` p-2 flex flex-row justify-between cursor-pointer ${
                                        selectedItem === "financas" ? "bg-[#982546] rounded-md shadow-lg" : ""
                                    }`}
                                    onClick={(e) => handleSelect("financas", e)}
                                >
                                    <a href="#">Finanças</a>
                                    <img src="/assets/Coins.png" alt="" className="h-6 " />
                                </li>
                                <li
                                    className={`p-2 flex flex-row justify-between cursor-pointer ${
                                        selectedItem === "clientes" ? "bg-[#982546] rounded-md shadow-md" : ""
                                    }`}
                                    onClick={(e) => handleSelect("clientes", e)}
                                >
                                    <a href="#">Clientes</a>
                                    <img src="/assets/User-claro.png" alt="" className="h-6 " />
                                </li>
                            </ul>

                            <ul className="text-[#DD859E] flex flex-col">
                                <li
                                    className={`p-2 flex flex-row justify-between cursor-pointer ${
                                        selectedItem === "contato" ? "bg-[#982546] rounded-md shadow-md" : ""
                                    }`}
                                    onClick={(e) => handleSelect("contato", e)}
                                >
                                    <a href="#">Contato</a>
                                    <img src="/assets/Help2.png" alt="" className="h-6 " />
                                </li>
                                <li
                                    className={`p-2 flex flex-row justify-between gap-2 cursor-pointer ${
                                        selectedItem === "configuracoes" ? "bg-[#982546] rounded-md shadow-md" : ""
                                    }`}
                                    onClick={(e) => handleSelect("configuracoes", e)}
                                >
                                    <a href="#">Configurações</a>
                                    <img src="/assets/Services.png" alt="" className="h-6 " />
                                </li>
                                <li
                                    className={`p-2 flex flex-row justify-between cursor-pointer ${
                                        selectedItem === "logout" ? "bg-[#982546] rounded-md shadow-md" : ""
                                    }`}
                                    onClick={(e) => handleSelect("logout", e)}
                                >
                                    <a href="#">Logout</a>
                                    <img src="/assets/Logout.png" alt="" className="h-6 " />
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div className="flex flex-col w-full h-full  items-center">
                        <div className="w-full flex flex-row justify-end">
                            <img className="h-8 m-2" src="/assets/Doorbell.png " alt="" />
                        </div>

                        <div>
                            <h1 className="text-[#982546] font-bold text-2xl">Agendamentos</h1>

                            <button className="bg-[#982546] p-2 text-[#FFF3DC] rounded-2xl mt-5 cursor-pointer hover:bg-[#b36078]" onClick={() => navigate("/pages/professional-pages/Agendar")}>Adicionar agendamento</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}