import { useNavigate } from "react-router-dom";
import MenuLateral from "./MenuLateral";
import { use, useState } from "react";
import Alerta from "../Pop-up";

export default function Configuracoes() {

    const [mensagem, setMensagem] = useState("");

    const envio = () => {

        setMensagem("Mensagem enviada!")

        setTimeout(() => {
            setMensagem("");
        }, 2000);
    }

    return (
        <>

            {mensagem && (
                <Alerta
                    mensagem={mensagem}
                    imagem="/assets/Check-pop.png"
                />
            )}

            <div className="w-full h-screen bg-[#FFF3DC] ">
                <div className="h-full flex flex-row">
                    <MenuLateral />

                    <div className="flex flex-col w-full h-full  items-center ">
                        <div className="w-full flex flex-row justify-end">
                            <img className="h-8 m-2" src="/assets/Doorbell.png " alt="" />
                        </div>

                        {mensagem && (
                            <Alerta
                                mensagem={mensagem}
                                imagem={caminho}
                            />
                        )}


                            <div className="h-screen  text-[#982546] bg-[#FFF3DC] flex flex-col items-center ml-20">
                                <h1 className="font-bold text-2xl ">Contato</h1>

                                <div className="flex flex-col mt-20">
                                    <div className="flex flex-row mb-2 gap-5">
                                        <span className="border-b-2 border-[#982546]">Conta</span>
                                        <span>Agenda</span>
                                    </div>

                                    <form className="flex flex-col text-[#362323] border border-[#982546] py-5 px-8 w-120 rounded-2xl gap-2 ">
                                        <label htmlFor="nome">Nome:</label>
                                        <input
                                            type="text"
                                            id="nome"
                                            name="nome"
                                            className="bg-[#ffffff] p-2 rounded-xl"
                                            disabled
                                        />

                                        <label htmlFor="email">E-mail:</label>
                                        <input
                                            type="text"
                                            id="email"
                                            name="email"
                                            className="bg-[#ffffff] p-2 rounded-xl"
                                            disabled
                                        />

                                        <label htmlFor="telefone">Telefone:</label>
                                        <input
                                            type="text"
                                            id="telefone"
                                            name="telefone"
                                            className="bg-[#ffffff] p-2 rounded-xl"
                                            disabled
                                        />

                                        <label htmlFor="senha">Senha:</label>
                                        <div className="flex flex-row gap-5">
                                            <input
                                                type="password"
                                                id="senha"
                                                name="senha"
                                                className="bg-[#ffffff] p-2 w-50 rounded-xl"
                                                disabled
                                            />
                                            <button
                                                type="button"
                                                className="bg-[#982546] border border-[#FFF3DC] text-[#FFF3DC] rounded-xl py-2 px-4 cursor-pointer"

                                            >Alterar senha
                                            </button>
                                        </div>


                                    </form>
                                </div>
                            </div>



                    </div>

                </div>


            </div>

        </>
    )
}