import React, { useState, useEffect } from "react";
import NavbarPro from "./components/Navbar";
import axios from "axios";

const ProNotification = () => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const userId = sessionStorage.getItem("userId");
  const token = sessionStorage.getItem("authToken"); 

  const [notificacoes, setNotificacoes] = useState([]);

  useEffect(() => {
    const fetchNotificacoes = async () => {
      try {
        const response = await axios.get(`${apiUrl}/notificacoes/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setNotificacoes(response.data);
      } catch (error) {
        console.error("Erro ao buscar notificações:", error);
      }
    };

    fetchNotificacoes();
  }, [apiUrl, userId, token]);

  return (
    <>
      <NavbarPro caminho={"/pages/professional-pages/Dashboard"} />
      <div className="min-h-screen bg-[#fef3e2] p-6 flex justify-start  items-center flex-col ">
        <h1 className="text-center text-2xl font-bold text-[#7c1d34] mb-6 mt-20">Notificações</h1>

        <div className="space-y-4 max-h-[65vh] w-200 overflow-y-auto pr-2 ">
          {notificacoes.length > 0 ? (
            notificacoes.map((notificacao, index) => (
              <div key={index} className="bg-[#9e837c] w-full text-white rounded-lg p-6">
                <p className="mb-2">{notificacao.message}</p>
                <div className="flex justify-between items-center">
                  <span className="text-sm">
                    {new Date(notificacao.created_at).toLocaleString("pt-BR")}
                  </span>

                  {notificacao.hasButtonToRate && !notificacao.wasAnswered && (
                    <button
                      className="flex items-center bg-white text-black px-4 py-1 rounded-md hover:bg-gray-200"
                      onClick={() => {
                        alert("Botão de avaliação clicado!");
                      }}
                    >
                      Avaliar
                    </button>
                  )}
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500">Nenhuma notificação disponível.</p>
          )}
        </div>
      </div>
    </>
  );
};

export default ProNotification;
