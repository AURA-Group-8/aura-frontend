import React, { useState, useEffect } from "react";
import NavbarCli from "./components/Navbar";
import axios from "axios";

const Notificacao = () => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const [notificacoes, setNotificacoes] = useState([]);
  const userId = sessionStorage.getItem("userId");
  const authToken = sessionStorage.getItem("authToken");

  useEffect(() => {
    const fetchNotificacoes = async () => {
      try {
        const response = await axios.get(`${apiUrl}/notificacoes/${userId}`,{
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        });
        setNotificacoes(response.data);
      } catch (error) {
        console.error("Erro ao buscar notificações:", error);
      }
    };

    fetchNotificacoes();
  }, []);

  const formatarData = (dataISO) => {
    const data = new Date(dataISO);
    return data.toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  return (
    <>
      <NavbarCli caminho={"/pages/client-pages/Home"} />
      <div className="min-h-screen bg-[#fef3e2] p-6">
        <h1 className="text-center text-2xl font-bold text-[#7c1d34] mb-6">Notificações</h1>

        <div className="space-y-4 max-h-[65vh] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-[#3b2a29] scrollbar-track-[#e7cfc6]">
          {notificacoes.length > 0 ? (
            notificacoes.map((notificacao) => (
              <div key={notificacao.id} className="bg-[#9e837c] text-white rounded-lg p-6">
                <p className="mb-2">{notificacao.message}</p>
                <div className="flex justify-between items-center">
                  <span className="text-sm">{formatarData(notificacao.created_at)}</span>
                  {notificacao.hasButtonToRate && (
                    <button
                      className="flex items-center bg-white text-black px-4 py-1 rounded-md hover:bg-gray-200"
                      onClick={() => window.location.href = "/avaliacao"}
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

export default Notificacao;