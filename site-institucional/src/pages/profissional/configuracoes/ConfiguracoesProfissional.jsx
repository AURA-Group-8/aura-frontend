import { useNavigate } from "react-router-dom";
import MenuLateral from "../componentes/MenuLateral";
import { use, useState } from "react";
import axios from "axios";
import Alerta from "../../Popup";
import SinoNotificacao from "../componentes/SinoNotificacao";

export default function ConfiguracoesPro() {

    const apiUrl = import.meta.env.VITE_API_URL;

    const navigate = useNavigate();

    const [mensagem, setMensagem] = useState("");
    const [caminho, setCaminho] = useState('');

    const token = sessionStorage.getItem('authToken');

    const [formContaAberto, setFormContaAberto] = useState(true);
    const [formHoraAberto, setFormHoraAberto] = useState(false);

    const [horarios] = useState([
        "06:00", "07:00", "08:00", "09:00", "10:00", "11:00", "12:00",
        "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00",
        "20:00", "21:00", "22:00"
    ]);

    const diasSemana = [
        "Segunda-feira", "Terça-feira", "Quarta-feira", "Quinta-feira",
        "Sexta-feira", "Sábado", "Domingo"
    ];

    const [diasSelecionados, setDiasSelecionados] = useState([]);

    const [horarioComercialInicio, setHorarioComercialInicio] = useState("");
    const [horarioComercialFim, setHorarioComercialFim] = useState("");
    const [horarioPausaInicio, setHorarioPausaInicio] = useState("");
    const [horarioPausaFim, setHorarioPausaFim] = useState("");

    const toggleDia = (dia) => {
        setDiasSelecionados((prev) => prev.includes(dia)
            ? prev.filter((d) => d !== dia)
            : [...prev, dia]
        );
    };


    const alertAlteracoesSalvas = () => {

        setMensagem("Alterações salvas!")

        setTimeout(() => {
            setMensagem("");
        }, 1500);
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
                        <SinoNotificacao/>

                        <div className="h-screen  text-[#982546] bg-[#FFF3DC] flex flex-col items-center ml-20">
                            <h1 className="font-bold text-2xl ">Configurações</h1>

                            <div className="flex flex-col mt-5 ">
                                <div className="flex flex-row mb-5 gap-5">
                                    <button className="border-b-2 border-[#982546] cursor-pointer transition-all"

                                        style={{
                                            borderBottomColor: formContaAberto ? "#982546" : "#FFF3DC"
                                        }}
                                        onClick={() => {
                                            setFormContaAberto(true);
                                            setFormHoraAberto(false);
                                        }}
                                    >
                                        Conta
                                    </button>
                                    <button
                                        className="border-b-2 cursor-pointer transition-all"
                                        style={{
                                            borderBottomColor: formHoraAberto ? "#982546" : "#FFF3DC"
                                        }}
                                        onClick={() => {
                                            setFormContaAberto(false);
                                            setFormHoraAberto(true);
                                        }}
                                    >
                                        Agenda</button>
                                </div>

                                {formContaAberto && (
                                    <>
                                        <form className="flex flex-col text-[#362323] border border-[#982546] py-5 px-10 w-160 rounded-2xl gap-2 ">
                                            <label htmlFor="nome">CNPJ:</label>
                                            <input
                                                type="text"
                                                id="nome"
                                                name="nome"
                                                className="bg-[#ffffff] p-2 rounded-xl"
                                                value={"00.538.887/0001-76"}
                                                disabled
                                            />

                                            <label htmlFor="email">E-mail:</label>
                                            <input
                                                type="text"
                                                id="email"
                                                name="email"
                                                className="bg-[#ffffff] p-2 rounded-xl"
                                                value={sessionStorage.getItem('userEmail')}
                                                disabled
                                            />

                                            <label htmlFor="senha">Senha:</label>
                                            <div className="flex flex-row gap-5">
                                                <input
                                                    type="password"
                                                    id="senha"
                                                    name="senha"
                                                    className="bg-[#ffffff] p-2 w-50 rounded-xl"
                                                    value={"********"}
                                                    disabled
                                                />
                                                <button
                                                    type="button"
                                                    className="bg-[#982546] border border-[#FFF3DC] text-[#FFF3DC] rounded-xl py-2 px-4 cursor-pointer hover:bg-[#b36078] transition-colors"
                                                    onClick={() => {
                                                        navigate("/profissional/alterar-senha");
                                                    }}
                                                >Alterar senha
                                                </button>
                                            </div>


                                        </form>

                                    </>

                                )}


                                {formHoraAberto && (
                                    <>

                                        <form className="flex flex-col text-[#362323] border border-[#982546] py-5 px-10 rounded-2xl gap-2 justify-center items-center">
                                            <h1 className="text-[#982546] font-bold mb-5">Dias da semana</h1>

                                            <div className=" gap-4 grid grid-cols-4 font-bold text-[#756363]">

                                                {diasSemana.map((dia) => (
                                                    <label key={dia} className="flex items-center gap-2">
                                                        <input
                                                            type="checkbox"
                                                            className="cursor-pointer"
                                                            checked={diasSelecionados.includes(dia)}
                                                            onChange={() => toggleDia(dia)}
                                                        />
                                                        {dia}
                                                    </label>
                                                ))}
                                            </div>

                                            <div className="flex flex-col justify-center items-center mt-10">
                                                <div className="flex flex-row justify-between items-center gap-20">

                                                    <div className="flex flex-col justify-center items-center">
                                                        <h1 className="font-bold text-[#982546] mb-5">Horário comercial</h1>
                                                        <div className="flex flex-row gap-5">
                                                            <div>
                                                                <select
                                                                    name="horarioComercialInicio"
                                                                    id="horarioComercialInicio"
                                                                    className="w-32 bg-white p-2 rounded-2xl border border-[#982546]"
                                                                    value={horarioComercialInicio}
                                                                    onChange={(e) => setHorarioComercialInicio(e.target.value)}
                                                                >
                                                                    <option value="">Início</option>
                                                                    {horarios.map((hora) => (
                                                                        <option key={hora} value={hora}>{hora}</option>
                                                                    ))}
                                                                </select>
                                                            </div>
                                                            <span>Até</span>
                                                            <div>
                                                                <select
                                                                    name="horarioComercialFim"
                                                                    id="horarioComercialFim"
                                                                    className="w-32 bg-white p-2 rounded-2xl border border-[#982546]"
                                                                    value={horarioComercialFim}
                                                                    onChange={(e) => setHorarioComercialFim(e.target.value)}
                                                                >
                                                                    <option value="">Fim</option>
                                                                    {horarios.map((hora) => (
                                                                        <option key={hora} value={hora}>{hora}</option>
                                                                    ))}
                                                                </select>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="flex flex-col justify-center items-center">
                                                        <h1 className="font-bold text-[#982546] mb-5">Horário de pausa</h1>
                                                        <div className="flex flex-row gap-5">
                                                            <div>
                                                                <select
                                                                    name="horarioPausaInicio"
                                                                    id="horarioPausaInicio"
                                                                    className="w-32 bg-white p-2 rounded-2xl border border-[#982546]"
                                                                    value={horarioPausaInicio}
                                                                    onChange={(e) => setHorarioPausaInicio(e.target.value)}
                                                                >
                                                                    <option value="">Início</option>
                                                                    {horarios.map((hora) => (
                                                                        <option key={hora} value={hora}>{hora}</option>
                                                                    ))}
                                                                </select>
                                                            </div>
                                                            <span>Até</span>
                                                            <div>
                                                                <select
                                                                    name="horarioPausaFim"
                                                                    id="horarioPausaFim"
                                                                    className="w-32 bg-white p-2 rounded-2xl border border-[#982546]"
                                                                    value={horarioPausaFim}
                                                                    onChange={(e) => setHorarioPausaFim(e.target.value)}
                                                                >
                                                                    <option value="">Fim</option>
                                                                    {horarios.map((hora) => (
                                                                        <option key={hora} value={hora}>{hora}</option>
                                                                    ))}
                                                                </select>
                                                            </div>
                                                        </div>
                                                    </div>

                                                </div>
                                            </div>

                                            <button
                                                type="button"
                                                className="bg-[#982546] border border-[#FFF3DC] text-[#FFF3DC] rounded-xl py-2 px-10 cursor-pointer mt-8 self-end hover:bg-[#b36078] transition-colors"
                                                onClick={async () => {
                                                    const diasFormatados = diasSelecionados.map(dia => {
                                                        const diaSemAcento = dia.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
                                                        return diaSemAcento.split("-")[0].toUpperCase();
                                                    });

                                                    const dadosParaEnviar = {
                                                        id: Number(sessionStorage.getItem('userId')),
                                                        workStart: `${horarioComercialInicio}:00`,
                                                        workEnd: `${horarioComercialFim}:00`,
                                                        breakStart: `${horarioPausaInicio}:00`,
                                                        breakEnd: `${horarioPausaFim}:00`,
                                                        daysOfWeek: diasFormatados

                                                    };

                                                    console.log("Dados a serem enviados:", dadosParaEnviar);

                                                    try {
                                                        await axios.patch(
                                                            `${apiUrl}/configuracao-agendamento`,
                                                            dadosParaEnviar,
                                                            {
                                                                headers: {
                                                                    Authorization: `Bearer ${token}`,
                                                                },
                                                            }
                                                        );

                                                        alertAlteracoesSalvas();
                                                    } catch (erro) {
                                                        setMensagem("❌ Erro ao salvar as configurações.");

                                                        setTimeout(() => {
                                                            setMensagem("");
                                                        }, 1500)
                                                    }
                                                }}

                                            >
                                                Salvar
                                            </button>

                                        </form>
                                    </>

                                )}
                            </div>
                        </div>



                    </div>

                </div>


            </div >

        </>
    )
}