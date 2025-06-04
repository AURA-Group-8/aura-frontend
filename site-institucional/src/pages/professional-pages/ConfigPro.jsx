import { useNavigate } from "react-router-dom";
import MenuLateral from "./components/MenuLateral";
import { use, useState } from "react";
import Alerta from "../Pop-up";

export default function Configuracoes() {

    const [mensagem, setMensagem] = useState("");

    const [formAberto, setFormAberto] = useState(true);

    const [borda, setBorda] = useState("#982546");

    const trocarConfig = () => {
        setFormAberto(!formAberto);


    }

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

                            <div className="flex flex-col mt-5 ">
                                <div className="flex flex-row mb-5 gap-5">
                                    <button className="border-b-2 border-[#982546] cursor-pointer transition-all" onClick={trocarConfig}>Conta</button>
                                    <button className="border-b-2 border-[#982546] cursor-pointer transition-all">Agenda</button>
                                </div>

                                {formAberto && (
                                    <>
                                        <form className="flex flex-col text-[#362323] border border-[#982546] py-5 px-10 w-160 rounded-2xl gap-2 ">
                                            <label htmlFor="nome">CNPJ:</label>
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

                                            <div>

                                            </div>


                                        </form>


                                        <form className="flex flex-col text-[#362323] border border-[#982546] py-5 px-10 w-160 rounded-2xl gap-2 justify-center items-center">
                                            <h1 className="text-[#982546] font-bold">Dias da semana</h1>

                                            <div className=" gap-4 grid grid-cols-4 font-bold text-[#756363]">
                                                <label className="flex items-center gap-2">
                                                    <input type="checkbox" className="cursor-pointer" />
                                                    Segunda-feira
                                                </label>
                                                <label className="flex items-center gap-2">
                                                    <input type="checkbox" className="cursor-pointer" />
                                                    Terça-feira
                                                </label>
                                                <label className="flex items-center gap-2">
                                                    <input type="checkbox" className="cursor-pointer" />
                                                    Quarta-feira
                                                </label>
                                                <label className="flex items-center gap-2">
                                                    <input type="checkbox" className="cursor-pointer" />
                                                    Quinta-feira
                                                </label>
                                                <label className="flex items-center gap-2">
                                                    <input type="checkbox" className="cursor-pointer" />
                                                    Sexta-feira
                                                </label>
                                                <label className="flex items-center gap-2">
                                                    <input type="checkbox" className="cursor-pointer" />
                                                    Sábado
                                                </label>
                                                <label className="flex items-center gap-2">
                                                    <input type="checkbox" className="cursor-pointer" />
                                                    Domingo
                                                </label>
                                            </div>

                                            <div className="flex flex-col justify-center items-center mt-5">
                                                <div className="flex flex-row gap-5">
                                                    <div className="flex flex-col justify-center items-center">
                                                        <h1>Horário comercial</h1>
                                                        <div className="flex flex-row gap-5">
                                                            <div>
                                                                <select name="" id="">
                                                                    <option value="">06:00</option>
                                                                    <option value="">07:00</option>
                                                                    <option value="">08:00</option>
                                                                    <option value="">09:00</option>
                                                                    <option value="">10:00</option>
                                                                    <option value="">11:00</option>
                                                                    <option value="">12:00</option>
                                                                </select>
                                                            </div>

                                                            <span> Até </span>

                                                            <div>
                                                                <select name="" id="">
                                                                    <option value="">13:00</option>
                                                                    <option value="">14:00</option>
                                                                    <option value="">15:00</option>
                                                                    <option value="">16:00</option>
                                                                    <option value="">17:00</option>
                                                                    <option value="">18:00</option>
                                                                    <option value="">19:00</option>
                                                                    <option value="">20:00</option>
                                                                    <option value="">21:00</option>
                                                                    <option value="">22:00</option>
                                                                </select>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="flex flex-col justify-center items-center">
                                                        <h1>Horário comercial</h1>
                                                        <div className="flex flex-row gap-5">
                                                            <div>
                                                                <select name="" id="">
                                                                    <option value="">06:00</option>
                                                                    <option value="">07:00</option>
                                                                    <option value="">08:00</option>
                                                                    <option value="">09:00</option>
                                                                    <option value="">10:00</option>
                                                                    <option value="">11:00</option>
                                                                    <option value="">12:00</option>
                                                                </select>
                                                            </div>

                                                            <span> Até </span>

                                                            <div>
                                                                <select name="" id="">
                                                                    <option value="">13:00</option>
                                                                    <option value="">14:00</option>
                                                                    <option value="">15:00</option>
                                                                    <option value="">16:00</option>
                                                                    <option value="">17:00</option>
                                                                    <option value="">18:00</option>
                                                                    <option value="">19:00</option>
                                                                    <option value="">20:00</option>
                                                                    <option value="">21:00</option>
                                                                    <option value="">22:00</option>
                                                                </select>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>


                                        </form>
                                    </>

                                )}
                            </div>
                        </div>



                    </div>

                </div>


            </div>

        </>
    )
}