import { useNavigate, useLocation } from "react-router-dom";

import { useState } from "react";
import axios from "axios";
import Alerta from "../Pop-up";
import Header from '../Header-login';

export default function ValidarToken() {
    const navigate = useNavigate();
    const apiUrl = import.meta.env.VITE_API_URL;
    const location = useLocation();
    const [tokenCliente, setTokenCliente] = useState("");
    const [mensagem, setMensagem] = useState("");
    const [caminho, setCaminho] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { token, userId, email } = location.state || {};
    
    console.log("Token recebido:", token);


    const validar = (e) => {
        e.preventDefault();
        if (isSubmitting) return; 
        setIsSubmitting(true);
        if (tokenCliente != token) {
            setMensagem("❌ Token inválido ou não fornecido.");
            setCaminho("/assets/Alert.png");
            setIsSubmitting(false);
            return;
        } else if (tokenCliente === token) {
            setMensagem("✅ Token validado com sucesso!");
            setCaminho("/assets/Check-pop.png");
            setTimeout(() => {
                navigate("/pages/client-pages/ChangePassword", {
                    state: {
                        userId: userId,
                        email: email
                    }
                });
            }, 2000);
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
        
                
                <div className="h-full w-full bg-[#FFF3DC] flex flex-col justify-center ">
                    <Header caminho={"/pages/client-pages/ForgotPassword"} />
                    <div className="h-full flex justify-center items-center">
                        <div className="flex flex-col h-screen justify-center items-center">
                            <h1 className="self-center text-[#982546] font-bold text-2xl p-4">Esqueci a senha</h1>
                            <p className="w-84 flex justify-center font-semibold text-[#982546] mb-4">Confirme o código que recebeu por E-mail para seguir com a alteração</p>
        
                            <form action="#" method="get" className="w-120 flex flex-col text-[#362323] border border-[#982546] py-5 px-8 rounded-2xl gap-2 ">
                                <label>Confirmar Código:</label>
                                <input onChange={(e) => setTokenCliente(e.target.value)} type="text" id="nome" name="nome" className="bg-[#ffffff] p-2 rounded-xl" />
                                <div className="flex flex-row justify-between gap-4 pt-5">
                                    <button type="button" className="text-[#982546] border border-[#982546] rounded-xl py-2 px-6 cursor-pointer" onClick={() => navigate("/pages/client-pages/Login")}>Cancelar</button>
                                    <button
                                        className={`bg-[#982546] border border-[#FFF3DC] text-[#FFF3DC] rounded-xl py-2 px-6 cursor-pointer ${isSubmitting ? "opacity-50 cursor-not-allowed" : ""}`}
                                        onClick={validar}
                                        disabled={isSubmitting} 
                                    >
                                        {isSubmitting ? "Enviando..." : "Enviar"}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </>
        );
    }