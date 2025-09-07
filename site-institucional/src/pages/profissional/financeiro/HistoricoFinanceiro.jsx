import { useEffect, useState } from "react";
import axios from "axios";
import NavbarPro from "../componentes/Navbar";

export default function HistoricoFinanceiro() {
  const [dadosFinanceiros, setDadosFinanceiros] = useState([]);

  const token = sessionStorage.getItem("authToken");
  const apiUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    async function fetchDados() {
      try {
        const response = await axios.get(`${apiUrl}/insights/finance/historico`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setDadosFinanceiros(response.data);
      } catch (error) {
        console.error("Erro ao buscar dados financeiros:", error);
      }
    }

    fetchDados();
  }, [token]);

  const meses = [
    "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
    "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
  ];

  return (
    <>
      <NavbarPro caminho={"/profissional/financeiro"} />
      <div className="w-full h-screen bg-[#FFF3DC] flex flex-col items-center py-10">
        <h1 className="text-[#982546] font-bold text-2xl mb-10 mt-10">Histórico financeiro</h1>

        <div className="w-full max-w-8xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8 px-4 h-200 md:h-150 overflow-y-auto">
          {meses.map((nome, index) => {
            const mesIndex = index + 1;
            const dadosDoMes = dadosFinanceiros.find((item) => item.mes === mesIndex);

            const faturado = dadosDoMes?.totalFaturadoMes || 0;
            const atendimentos = dadosDoMes?.totalAtendimentosMes || 0;
            const cancelamentos = dadosDoMes?.totalAtendimentosCanceladosMes || 0;

            return (
              <div key={mesIndex} className="flex flex-col items-center">
                <h1 className="text-[#982546] font-bold text-xl">{nome}</h1>
                <div className="bg-[#362323df] w-full p-4 rounded-2xl mt-3 text-[#FFF3DC]">
                  <span className="text-xl font-bold mb-2 block">R$ {faturado.toFixed(2)}</span>
                  <span>Total de atendimentos: {atendimentos}</span><br />
                  <span>Total de cancelamentos: {cancelamentos}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
