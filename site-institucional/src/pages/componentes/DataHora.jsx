import { useState, useEffect } from "react";
import { ptBR } from "date-fns/locale";
import axios from "axios";
import { format, parse, addDays, startOfDay } from "date-fns";

export default function CalendarioCarrossel({ duracaoTotal, onSelecionarDataHora }) {

  const apiUrl = import.meta.env.VITE_API_URL_V2;
  const token = sessionStorage.getItem("authToken");

  const diasVisiveis = 4;
  const horariosVisiveis = 4;

  const [inicioDias, setInicioDias] = useState(0);
  const [inicioHorarios, setInicioHorarios] = useState(0);

  const [dataSelecionada, setDataSelecionada] = useState(null);
  const [horarioSelecionado, setHorarioSelecionado] = useState(null);

  const [diasSemanaAPI, setDiasSemanaAPI] = useState([]);
  const [diasParaMostrar, setDiasParaMostrar] = useState([]);

  const [horarioDisponivel, setHorarioDisponivel] = useState([]);
  const [horariosParaMostrar, setHorariosParaMostrar] = useState([]);

  const [dataAtual, setDataAtual] = useState(null);

  const diaNomeParaNumero = (dia) => {
    switch (dia) {
      case "DOMINGO": return 0;
      case "SEGUNDA": return 1;
      case "TERCA": return 2;
      case "QUARTA": return 3;
      case "QUINTA": return 4;
      case "SEXTA": return 5;
      case "SABADO": return 6;
      default: return -1;
    }
  };

  const datasDiasSemana = () => {
    const hoje = startOfDay(new Date());
    const fim = addDays(hoje, 365);
    const datas = [];

    const diasAPIEmNum = diasSemanaAPI.map(diaNomeParaNumero);

    for (let d = hoje; d <= fim; d = addDays(d, 1)) {
      if (diasAPIEmNum.includes(d.getDay())) {
        datas.push(d);
      }
    }
    return datas;
  };

  useEffect(() => {
    const datas = datasDiasSemana();
    setDiasParaMostrar(datas.slice(inicioDias, inicioDias + diasVisiveis));
  }, [diasSemanaAPI, inicioDias]);

  useEffect(() => {
    if (diasParaMostrar.length > 0) {
      setDataAtual(diasParaMostrar[0]);
    }
  }, [diasParaMostrar]);


  useEffect(() => {
    async function buscarConfiguracoes() {
      try {
        const response = await axios.get(`${apiUrl}/configuracao-agendamento`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setDiasSemanaAPI(response.data.daysOfWeek || []);
      } catch (error) {
        console.error("Erro ao buscar configurações:", error);
      }
    }
    buscarConfiguracoes();
  }, []);

  useEffect(() => {
    async function buscarHorariosDisponiveis() {
      if (diasSemanaAPI.length === 0) return;

      try {
        const dataBase = dataSelecionada
          ? format(dataSelecionada, "yyyy-MM-dd")
          : format(new Date(), "yyyy-MM-dd");

        const response = await axios.get(
          `${apiUrl}/agendamentos/available-times`,
          {
            headers: { Authorization: `Bearer ${token}` },
            params: {
              durationInMinutes: duracaoTotal,
              firstDayOfWeek: dataBase,
            },
          }
        );

        setHorarioDisponivel(response.data || []);
        setInicioHorarios(0);
      } catch (error) {
        console.error("Erro ao buscar horários:", error);
      }
    }

    buscarHorariosDisponiveis();
  }, [duracaoTotal, diasSemanaAPI, dataSelecionada]);


  useEffect(() => {
    if (!dataSelecionada) {
      setHorariosParaMostrar([]);
      return;
    }

    const dataFormatada = format(dataSelecionada, "yyyy-MM-dd");

    const dia = horarioDisponivel.find(d => d.date === dataFormatada);
    if (!dia) {
      setHorariosParaMostrar([]);
      return;
    }

    const horarios = (dia.availableTimes || []).map(h =>
      format(parse(h, "HH:mm:ss", new Date()), "HH:mm")
    );

    const janela = horarios.slice(
      inicioHorarios,
      inicioHorarios + horariosVisiveis
    );

    setHorariosParaMostrar(janela);

    if (horarioSelecionado && !horarios.includes(horarioSelecionado)) {
      setHorarioSelecionado(null);
      onSelecionarDataHora?.({
        data: format(dataSelecionada, "dd/MM/yyyy"),
        horario: null
      });
    }
  }, [dataSelecionada, horarioDisponivel, inicioHorarios]);


  const handleSelecionarData = (dia) => {
    setDataSelecionada(dia);
    setHorarioSelecionado(null);
    setInicioHorarios(0);

    onSelecionarDataHora?.({
      data: format(dia, "dd/MM/yyyy"),
      horario: null
    });
  };

  const handleSelecionarHorario = (horario) => {
    setHorarioSelecionado(horario);

    onSelecionarDataHora?.({
      data: format(dataSelecionada, "dd/MM/yyyy"),
      horario
    });
  };

  const handleProximoDias = () => {
    if (inicioDias + diasVisiveis < datasDiasSemana().length) {
      setInicioDias(inicioDias + diasVisiveis);
    }
  };

  const handleDiasAnteriores = () => {
    if (inicioDias - diasVisiveis >= 0) {
      setInicioDias(inicioDias - diasVisiveis);
    }
  };

  const handleProximoHorarios = () => {
    if (inicioHorarios + horariosVisiveis < horariosParaMostrar.length + inicioHorarios) {
      setInicioHorarios(inicioHorarios + horariosVisiveis);
    }
  };

  const handleHorariosAnteriores = () => {
    if (inicioHorarios - horariosVisiveis >= 0) {
      setInicioHorarios(inicioHorarios - horariosVisiveis);
    }
  };

  return (
    <div className="w-full flex flex-col items-center pt-5">

      <h1 className="text-[#982546] text-xl font-bold mb-4">
        {dataAtual &&
          format(dataAtual, "MMMM 'de' yyyy", { locale: ptBR })
            .replace(/^./, c => c.toUpperCase())}
      </h1>

      <div className="flex items-center gap-4 pb-4">
        <button onClick={handleDiasAnteriores}>❮</button>

        {diasParaMostrar.map(dia => (
          <button
            key={dia}
            onClick={() => handleSelecionarData(dia)}
            className={`w-20 h-20 rounded-xl border font-bold
              ${dataSelecionada &&
                format(dia, "yyyy-MM-dd") === format(dataSelecionada, "yyyy-MM-dd")
                ? "bg-[#4B1F1F] text-white"
                : "text-[#362323]"}`}
          >
            <div>{format(dia, "EEE", { locale: ptBR }).slice(0, 3).toUpperCase()}</div>
            <div>{format(dia, "d")}</div>
          </button>
        ))}

        <button onClick={handleProximoDias}>❯</button>
      </div>

      <div className="flex items-center gap-4 mt-5">
        <button onClick={handleHorariosAnteriores}>❮</button>

        {horariosParaMostrar.map(horario => (
          <button
            key={horario}
            onClick={() => handleSelecionarHorario(horario)}
            className={`w-20 h-10 rounded-xl border font-bold
              ${horarioSelecionado === horario
                ? "bg-[#4B1F1F] text-white"
                : "text-[#362323]"}`}
          >
            {horario}
          </button>
        ))}

        <button onClick={handleProximoHorarios}>❯</button>
      </div>
    </div>
  );
}
