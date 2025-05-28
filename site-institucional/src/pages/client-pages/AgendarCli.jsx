import { useState } from "react";
import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";
import Alerta from "../../pages/Pop-up";



export default function AgendarCli() {

    const navigate = useNavigate();

    const [mensagem, setMensagem] = useState("");
    const [caminho, setCaminho] = useState("");
    const [servico, setServico] = useState("");

    const limparAlert = () => {
        setTimeout(() => {
            setMensagem("");
        }, 2000);
    }

    const cancelar = () => {
        navigate("/pages/client-pages/Home");
    }

    const agendar = (e) => {
        e.preventDefault();

        if (servico === "") {
            setMensagem("Preencha todos os campos!");
            setCaminho("/assets/Alert.png");
            limparAlert();
            return;
        }

        else {

            navigate("/pages/client-pages/DataHoraCli",
                {
                    state: {
                        servico: servico,
                    }
                }

            );
        }

    }
    return (
        <>
            {mensagem && (
                <Alerta
                    mensagem={mensagem}
                    imagem={caminho}
                />
            )}


            <Navbar caminho={"/pages/client-pages/Home"} />
            <div className="w-full h-screen bg-[#FFF3DC] flex flex-col justify-center items-center">
                <h1 className="text-[#982546] font-bold text-2xl">Agendar</h1>
                <form onSubmit={agendar} className="border-1 border-[#982546] bg-[#FFF3DC] w-150 h-100 rounded-2xl flex flex-row justify-center mt-5">
                    <div className="flex flex-col w-120">
                        <p className="text-xl mt-2">Serviços</p>
                        <select
                            onChange={e => setServico(e.target.value)}
                            name="servico"
                            className="bg-amber-50 p-2 rounded-2xl border-1 border-[#982546] w-full h-10 mt-2"

                        >
                            <option value=""></option>
                            <option value="servico1">Serviço 1</option>
                            <option value="servico2">Serviço 2</option>
                        </select>

                        <div className="border-1 border-[#982546] bg-[#FFF3DC] w-full h-30 mt-5 rounded-2xl overflow-y-auto">

                        </div>
                        <div className="flex flex-row w-full justify-between mt-4">
                            <button
                                type="reset"
                                className="border-1 border-[#982546] py-2 px-8 rounded-2xl text-[#982546] cursor-pointer"
                                onClick={cancelar}

                            >
                                Cancelar
                            </button>

                            <button
                                type="submit"
                                className="bg-[#982546] py-2 px-4 rounded-2xl text-[#FFF3DC] flex flex-row gap-2 items-center cursor-pointer hover:bg-[#b36078]"

                            >
                                Selecionar data e hora
                                <img src="/assets/Calendar.png" className="h-8" />
                            </button>
                        </div>
                    </div>
                </form>

            </div>
        </>
    )

}
