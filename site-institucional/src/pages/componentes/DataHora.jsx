import { useState, useEffect } from "react";
import { ptBR } from "date-fns/locale";
import axios from "axios";
import {
  format,
  parse,
  addDays,
  startOfDay,
  isAfter,
  isBefore,
  isEqual,
  addMinutes,
} from "date-fns";


export default function CalendarioCarrossel({ duracaoTotal, onSelecionarDataHora }) {

  const apiUrl = import.meta.env.VITE_API_URL;

  const diasVisiveis = 4;
  const horariosVisiveis = 4;

  const [inicioDias, setInicioDias] = useState(0);
  const [dataSelecionada, setDataSelecionada] = useState(null);

  const [inicioHorarios, setInicioHorarios] = useState(0);
  const [horarioSelecionado, setHorarioSelecionado] = useState(null);
  const [horarioDisponivel, setHorarioDisponivel] = useState([]);

  const [diasSemanaAPI, setDiasSemanaAPI] = useState([]);
  const [workStart, setWorkStart] = useState(null);
  const [workEnd, setWorkEnd] = useState(null);
  const [breakStart, setBreakStart] = useState(null);
  const [breakEnd, setBreakEnd] = useState(null);

  const [diasParaMostrar, setDiasParaMostrar] = useState([]);
  const [horariosParaMostrar, setHorariosParaMostrar] = useState([]);

  const [dataAtual, setDataAtual] = useState(null);
  const token = sessionStorage.getItem("authToken");

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

    for (let d = hoje; d <= fim; d = addDays(d, 1)) {
      const diaNum = d.getDay();
      const diasAPIEmNum = diasSemanaAPI.map(diaNomeParaNumero);
      if (diasAPIEmNum.includes(diaNum)) {
        datas.push(d);
      }
    }
    return datas;
  };

  const gerarHorarios = () => {
    if (!workStart || !workEnd) return [];

    const formatoHora = "HH:mm:ss";

    const inicioTrabalho = parse(workStart, formatoHora, new Date());
    const fimTrabalho = parse(workEnd, formatoHora, new Date());

    const inicioPausa = breakStart ? parse(breakStart, formatoHora, new Date()) : null;
    const fimPausa = breakEnd ? parse(breakEnd, formatoHora, new Date()) : null;

    let atual = inicioTrabalho;
    const horarios = [];

    while (isBefore(atual, fimTrabalho) || isEqual(atual, fimTrabalho)) {

      if (inicioPausa && fimPausa && ((isAfter(atual, inicioPausa) || isEqual(atual, inicioPausa)) &&
        (isBefore(atual, fimPausa)))) { }
      else {
        horarios.push(format(atual, "HH:mm"));
      }
      atual = addMinutes(atual, 30);
    }

    return horarios;
  };

  useEffect(() => {
    const datas = datasDiasSemana();
    setDiasParaMostrar(datas.slice(inicioDias, inicioDias + diasVisiveis));
  }, [diasSemanaAPI, inicioDias]);

  useEffect(() => {
    const horarios = gerarHorarios();

    if (dataSelecionada) {
      const dataFormatada = format(dataSelecionada, "yyyy-MM-dd");

      const disponibilidadeDoDia = horarioDisponivel.find(
        (item) => item.date === dataFormatada
      );

      if (disponibilidadeDoDia) {
        const horasDisponiveis = (disponibilidadeDoDia.availableTimes || []).map(h =>
          parse(h, "HH:mm:ss", new Date())
        );

        const horariosFiltrados = horarios.filter(h => {
          return horasDisponiveis.some(hDisponivel =>
            format(hDisponivel, "HH:mm") === h
          );
        });

        setHorariosParaMostrar(
          horariosFiltrados.slice(inicioHorarios, inicioHorarios + horariosVisiveis)
        );

        return;
      }
    }

    setHorariosParaMostrar(
      horarios.slice(inicioHorarios, inicioHorarios + horariosVisiveis)
    );
  }, [dataSelecionada, horarioDisponivel, inicioHorarios, workStart, workEnd, breakStart, breakEnd]);

  useEffect(() => {
    if (diasParaMostrar.length > 0) {
      setDataAtual(diasParaMostrar[0]);
    }
  }, [diasParaMostrar]);

  useEffect(() => {
    async function buscarConfiguracoes() {
      try {

        const response = await axios.get(`${apiUrl}/v2/configuracao-agendamento`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const dados = response.data;

        setDiasSemanaAPI(dados.daysOfWeek || []);
        setWorkStart(dados.workStart);
        setWorkEnd(dados.workEnd);
        setBreakStart(dados.breakStart);
        setBreakEnd(dados.breakEnd);
      } catch (error) {
        console.error("Erro ao buscar dados da API:", error);
      }
    }

    buscarConfiguracoes();
  }, []);


  useEffect(() => {
    async function buscarHorariosDisponiveis() {
      if (diasSemanaAPI.length === 0) return;

      try {

        const dataFormatada = dataSelecionada
          ? format(dataSelecionada, "yyyy-MM-dd")
          : (datasDiasSemana().length > 0 ? format(datasDiasSemana()[0], "yyyy-MM-dd") : format(new Date(), "yyyy-MM-dd"));

        const horariosAPI = await axios.get(`${apiUrl}/agendamentos/available-times`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: {
            durationInMinutes: duracaoTotal,
            firstDayOfWeek: dataFormatada,
          },
        });

        const horaDisponivel = horariosAPI.data;
        setHorarioDisponivel(horaDisponivel || []);
      } catch (error) {
        console.error("Erro ao buscar dados da API:", error);
      }
    }

    buscarHorariosDisponiveis();
  }, [duracaoTotal, diasSemanaAPI, dataSelecionada]);



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
    if (inicioHorarios + horariosVisiveis < gerarHorarios().length) {
      setInicioHorarios(inicioHorarios + horariosVisiveis);
    }
  };

  const handleHorariosAnteriores = () => {
    if (inicioHorarios - horariosVisiveis >= 0) {
      setInicioHorarios(inicioHorarios - horariosVisiveis);
    }
  };

  const handleSelecionarData = (dia) => {
    if (
      dataSelecionada &&
      format(dia, "yyyy-MM-dd") === format(dataSelecionada, "yyyy-MM-dd")
    ) {
      setDataSelecionada(null);
    } else {
      setDataSelecionada(dia);
      if (onSelecionarDataHora) {
        onSelecionarDataHora({ data: format(dia, "dd/MM/yyyy"), horario: horarioSelecionado });
      }
    }
  };

  const handleSelecionarHorario = (horario) => {
    if (horarioSelecionado === horario) {
      setHorarioSelecionado(null);
    } else {
      setHorarioSelecionado(horario);
      if (onSelecionarDataHora) {
        onSelecionarDataHora({ data: dataSelecionada ? format(dataSelecionada, "dd/MM/yyyy") : "", horario });
      }
    }
  };

  return (
    <>

      <div className="w-full h-full flex flex-col justify-center items-center pt-5 ">
       
        <h1 className="text-[#982546] text-xl font-bold mb-4 mt-5 xl:text-2xl ">
          {dataAtual ? (format(dataAtual, "MMMM 'de' yyyy", { locale: ptBR }).toUpperCase().slice(0, 1) +
            format(dataAtual, "MMMM 'de' yyyy", { locale: ptBR }).slice(1)) : ""}
        </h1>

        <div className="flex justify-center items-center gap-2 md:gap-6 border-b-1 border-[#982546] pb-4">
          <button onClick={handleDiasAnteriores} className="text-[#982546] text-xl cursor-pointer">
            ❮
          </button>

          {diasParaMostrar.map((dia) => {
            const selecionado =
              dataSelecionada &&
              format(dia, "yyyy-MM-dd") === format(dataSelecionada, "yyyy-MM-dd");

            return (
              <button
                key={dia.toString()}
                onClick={() => handleSelecionarData(dia)}
                className={`w-20 h-20 md:w-15 md:h-20 flex flex-col items-center justify-center rounded-xl border font-bold transition-all cursor-pointer
                  ${selecionado ? "bg-[#4B1F1F] text-white" : "text-[#362323]"}`}
              >
                <span className="text-sm">
                  {format(dia, "EEE", { locale: ptBR })
                    .substring(0, 3)
                    .toUpperCase()}
                </span>
                <span className="text-md">{format(dia, "d")}</span>
              </button>
            );
          })}

          <button
            onClick={handleProximoDias}
            className="text-[#982546] text-2xl cursor-pointer"
          >
            ❯
          </button>
        </div>

        <div className="flex flex-wrap justify-center items-center gap-2 md:gap-6 mt-5">
          <button
            onClick={handleHorariosAnteriores}
            className="text-[#982546] text-xl cursor-pointer"
          >
            ❮
          </button>

          {horariosParaMostrar.map((horario) => {
            const selecionado = horarioSelecionado === horario;

            return (
              <button
                key={horario}
                onClick={() => handleSelecionarHorario(horario)}
                className={`w-20 h-10 flex items-center justify-center rounded-xl border font-bold transition-all cursor-pointer text-md
                  ${selecionado ? "bg-[#4B1F1F] text-white" : "text-[#362323]"}`}
              >
                {horario}
              </button>
            );
          })}

          <button
            onClick={handleProximoHorarios}
            className="text-[#982546] text-xl cursor-pointer"
          >
            ❯
          </button>
        </div>


      </div>
    </>
  );
}
