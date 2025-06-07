import { useNavigate } from "react-router-dom";

import NavbarCli from "./components/Navbar";


export default function AlterarSenha() {

    const navigate = useNavigate();

    return (
        <>
            <div className="h-full w-full bg-[#FFF3DC] flex justify-center ">

                <NavbarCli  caminho={"/pages/client-pages/Login"}/>

                <div className="h-full flex justify-center items-center">

                    <div className="flex flex-col h-screen justify-center items-center">

                        <h1 className="self-center text-[#982546] font-bold text-2xl p-4">Alterar senha</h1>

                        <form action="#" method="get" className="w-120 flex flex-col text-[#362323]  border border-[#982546] py-5 px-8 rounded-2xl gap-2 ">

                            <label>Nova Senha:</label>
                            <input type="tel" id="telefone" name="telefone" className="bg-[#ffffff] p-2 rounded-xl" />

                            <label >Confirmar Senha:</label>
                            <input type="password" id="nome" name="nome" className="bg-[#ffffff] p-2 rounded-xl" />

                            <div className="flex flex-row justify-between gap-4 pt-5">
                                <button type="submit" className="text-[#982546] border border-[#982546]  rounded-xl py-2 px-6 cursor-pointer" onClick={() => navigate("/pages/client-pages/Login")}>Cancelar</button>
                                <button className="bg-[#982546] border border-[#FFF3DC] text-[#FFF3DC] rounded-xl py-2 px-6 cursor-pointer" >Alterar</button>
                            </div>
                        </form>
                    </div>
                </div>

            </div>
        </>
    )

}