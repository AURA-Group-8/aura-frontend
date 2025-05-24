import NavbarPro from "./Navbar";
import { useState } from "react";
import Alerta from "../Pop-up";
import { useNavigate } from "react-router-dom";

export default function CadastroCli() {

    const navigate = useNavigate();
    const [nome, setNome] = useState("");
    const [telefone, setTelefone] = useState("");
    const [mensagem, setMensagem] = useState("");
    const [caminho, setCaminho] = useState("");

    const limparAlert = () => {
        setTimeout(() => {
            setMensagem("");
        }, 2000);
    }

    const agendar = (e) => {
        e.preventDefault();

        if (nome === "" || telefone === "") {
            setMensagem("Preencha todos os campos!");
            setCaminho("/assets/Alert.png");
            limparAlert();
            return;
        }

        navigate("/pages/professional-pages/DataHora");

    }

    return (
        <>

            {mensagem && (
                <Alerta
                    mensagem={mensagem}
                    imagem={caminho}
                />
            )}


            <NavbarPro caminho={"/pages/professional-pages/Agendar"} />
            <div className="w-full h-screen bg-[#FFF3DC] flex flex-col justify-center items-center">
                <h1 className="text-[#982546] font-bold text-2xl">Cadastrar cliente</h1>

                <form className="border-1 border-[#982546] bg-[#FFF3DC] w-150 h-80 rounded-2xl flex flex-row justify-center items-center mt-5">
                    <div className="flex flex-col w-120 ">
                        <p className=" mt-2">Nome</p>
                        <input type="text" name="nome" className="bg-amber-50 p-2 rounded-2xl border-1 border-[#982546]" onChange={e => setNome(e.target.value)} />

                        <p className="mt-4">Telefone</p>
                        <input type="text" name="nome" className="bg-amber-50 p-2 rounded-2xl border-1 border-[#982546]" onChange={e => setTelefone(e.target.value)} />

                        <div className="flex flex-row w-full justify-between mt-10">
                            <button
                                type="reset"
                                className="border-1 border-[#982546] py-2 px-8 rounded-2xl text-[#982546] cursor-pointer"
                            >
                                Cancelar
                            </button>

                            <button className="bg-[#982546] py-2 px-8 rounded-2xl text-[#FFF3DC] cursor-pointer" onClick={agendar}>Cadastrar</button>
                        </div>
                    </div>
                </form>
            </div>
        </>
    )

}


