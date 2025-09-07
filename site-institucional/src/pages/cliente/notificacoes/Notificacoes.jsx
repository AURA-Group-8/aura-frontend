import React, { useState, useEffect } from "react";
import Alerta from "../../PopUp";
import NavbarCli from "../componentes/Navbar";
import axios from "axios";

const Notificacao = () => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const userId = sessionStorage.getItem("userId");
  const token = sessionStorage.getItem("authToken");

  const [modalAvaliacao, setModalAvaliacao] = useState(false);
  const [notificacoes, setNotificacoes] = useState([]);
  const [mensagem, setMensagem] = useState("");
  const [caminho, setCaminho] = useState('');
  const [avaliacao, setAvaliacao] = useState(null);
  const [notificacaoAvaliando, setNotificacaoAvaliando] = useState(null);


  const limparAlert = () => {
    setTimeout(() => {
      setMensagem("");
    }, 2000);
  }


  const avaliacaoParaNumero = (opcao) => {
    switch (opcao) {
      case 'muitoRuim':
        return 1;
      case 'ruim':
        return 2;
      case 'regular':
        return 3;
      case 'bom':
        return 4;
      case 'muitoBom':
        return 5;
      default:
        return 0;
    }
  }

  const enviarAvaliacao = () => {
    if (!avaliacao) {
      setMensagem("Selecione uma opção de avaliação.");
      setCaminho("/assets/Alert.png");
      limparAlert();
    } else {
      setMensagem("Avaliação enviada!");
      setCaminho("/assets/Check-pop.png");
      limparAlert();
      setModalAvaliacao(false);
      
      if (notificacaoAvaliando !== null) {
        setNotificacoes((prev) => prev.map((n) => n.id === notificacaoAvaliando ? { ...n, wasAnswered: true } : n));
        setNotificacaoAvaliando(null);
      }
    }
  }

  useEffect(() => {
    const fetchNotificacoes = async () => {
      try {
        const response = await axios.get(`${apiUrl}/notificacoes/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log("Notificações recebidas:", response.data);
        setNotificacoes(response.data);
      } catch (error) {
        console.error("Erro ao buscar notificações:", error);
      }
    };

    fetchNotificacoes();
  }, [apiUrl, userId, token]);

  return (
    <>

      {mensagem && (
        <Alerta
          mensagem={mensagem}
          imagem={caminho}
        />
      )}


      <NavbarCli caminho={"/cliente/home"} />
      <div className="min-h-screen bg-[#fef3e2] p-6 flex justify-start  items-center flex-col ">
        <h1 className="text-center text-2xl font-bold text-[#7c1d34] mb-6 mt-20">Notificações</h1>

        <div className="space-y-4 max-h-[65vh] w-200 overflow-y-auto pr-2 ">

          {modalAvaliacao && (
            <div className="fixed inset-0 flex items-center justify-center z-20 ">
              <div className="bg-white p-6 rounded-2xl shadow-xl  max-w-[90%] border border-[#982546] flex flex-col items-center justify-center">
                <p className="text-[#982546] font-bold text-xl cursor-pointer self-end" onClick={() => { setModalAvaliacao(false); setAvaliacao(null); }}>X</p>

                <h1 className="text-[#982546] text-xl font-bold mb-4">Avaliação</h1>

                <p className="text-[#982546] text-xl text-center">Nos diga o que achou do atendimento! <br /> Selecione:</p>


                <div className="flex flex-row justify-evenly gap-10 text-xl mt-10 items-center text-[#982546]">
                  <div className="flex flex-col justify-center text-center gap-4">
                    <input type="radio" name="avaliacao" id="muitoRuim" className="scale-150" onChange={() => setAvaliacao(avaliacaoParaNumero('muitoRuim'))} />
                    <label htmlFor="muitoRuim">Muito ruim</label>
                  </div>
                  <div className="flex flex-col justify-center text-center gap-4">
                    <input type="radio" name="avaliacao" id="ruim" className="scale-150" onChange={() => setAvaliacao(avaliacaoParaNumero('ruim'))} />
                    <label htmlFor="ruim">Ruim</label>
                  </div>
                  <div className="flex flex-col justify-center text-center gap-4">
                    <input type="radio" name="avaliacao" id="regular" className="scale-150" onChange={() => setAvaliacao(avaliacaoParaNumero('regular'))} />
                    <label htmlFor="regular">Regular</label>
                  </div>
                  <div className="flex flex-col justify-center text-center gap-4">
                    <input type="radio" name="avaliacao" id="bom" className="scale-150" onChange={() => setAvaliacao(avaliacaoParaNumero('bom'))} />
                    <label htmlFor="bom">Bom</label>
                  </div>
                  <div className="flex flex-col justify-center text-center gap-4">
                    <input type="radio" name="avaliacao" id="muitoBom" className="scale-150" onChange={() => setAvaliacao(avaliacaoParaNumero('muitoBom'))} />
                    <label htmlFor="muitoBom">Muito bom</label>
                  </div>
                </div>

                <button
                  onClick={enviarAvaliacao}
                  className="px-16 py-2 rounded-xl border cursor-pointer text-xl border-[#982546] bg-[#982546] text-white mt-8"
                >
                  Enviar
                </button>
              </div>
            </div>

          )}


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
                      className="flex items-center bg-white text-black cursor-pointer px-4 py-1 rounded-md hover:bg-gray-200 disabled:opacity-50"
                      onClick={() => { setModalAvaliacao(true); setAvaliacao(null); setNotificacaoAvaliando(notificacao.id); }}
                      disabled={notificacao.wasAnswered}
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
