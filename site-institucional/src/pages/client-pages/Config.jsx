
import NavbarCli from "./Navbar";
import FormsConfig from "../FormsConfig";
import { useState } from "react";
import Alerta from "../Pop-up";
import { useNavigate } from "react-router-dom";

export default function ConfigCli() {

    const [desabilitado, setDesabilitado] = useState(true);
    const [mensagem, setMensagem] = useState("");

    const navigate = useNavigate();

    const editar = () => {

        if (!desabilitado) {
            setMensagem("Alterações salvas!");

            setTimeout(() => {
                setMensagem("");
            }, 2000);
        }

        setDesabilitado(!desabilitado);
    }

    const logoOff = () => {
        sessionStorage.removeItem('authToken');
        sessionStorage.removeItem('userId');
        sessionStorage.removeItem('username'); 
        sessionStorage.removeItem('userEmail');
        navigate('/');
    };

    return (
        <>
            <div className="h-full w-full bg-[#FFF3DC] justify-center ">

                <NavbarCli caminho={"/pages/client-pages/Home"} />

                {mensagem && (
                    <Alerta
                        mensagem={mensagem}
                        imagem="/assets/Check-pop.png"
                    />
                )}

                <div className="h-screen flex justify-center  flex-col items-center pt-10">


                    <h1 className="self-center text-[#982546] font-bold text-2xl p-4">Configurações</h1>

                    <form className="flex flex-col text-[#362323] border border-[#982546] py-5 px-8 w-120 rounded-2xl gap-2 ">

                        <label for="nome">Nome:</label>
                        <input type="text" id="nome" name="nome" className=" bg-[#ffffff] p-2 rounded-xl" disabled={desabilitado} />

                        <label for="nome">E-mail:</label>
                        <input type="text" id="nome" name="nome" className="bg-[#ffffff] p-2 rounded-xl" disabled={desabilitado} />

                        <label for="telefone">Telefone:</label>
                        <input type="text" id="telefone" name="telefone" className="bg-[#ffffff] p-2 rounded-xl" disabled={desabilitado} />

                        <label for="nome">Senha:</label>

                        <div className="flex flex-row gap-5">
                            <input type="password" id="nome" name="nome" className="bg-[#ffffff] p-2 w-50 rounded-xl" disabled={desabilitado} />
                            <button type="button" className="bg-[#982546] border border-[#FFF3DC] text-[#FFF3DC] rounded-xl py-2 px-4 cursor-pointer" onClick={editar} >{desabilitado ? "Editar" : "Salvar"}</button>
                        </div>

                        <div className="flex flex-row justify-between gap-4 pt-5">
                            <button className="bg-[#982546] border border-[#FFF3DC] text-[#FFF3DC] rounded-xl py-2 px-6 self-end cursor-pointer" onClick={logoOff}>Sair da conta</button>
                            <button className="text-[#982546] cursor-pointer">Deletar conta</button>
                        </div>
                    </form>
                </div>

            </div>
        </>
    )

}