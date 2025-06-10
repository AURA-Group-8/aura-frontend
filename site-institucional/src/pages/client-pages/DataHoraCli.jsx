import NavbarCli from "./components/Navbar";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
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
import { ptBR } from "date-fns/locale";
import { useLocation } from "react-router-dom";
import axios from "axios";
import Alerta from "../../pages/Pop-up";

export default function CalendarioCarrossel() {
  const apiUrl = import.meta.env.VITE_API_URL;
  const location = useLocation();
  const { cliente, servicos } = location.state || {};
  const navigate = useNavigate();

  const [mensagem, setMensagem] = useState("");
  const [caminho, setCaminho] = useState("");

  const diasVisiveis = 7;
  const horariosVisiveis = 7;

  const [inicioDias, setInicioDias] = useState(0);
  const [dataSelecionada, setDataSelecionada] = useState(null);

  const [inicioHorarios, setInicioHorarios] = useState(0);
  const [horarioSelecionado, setHorarioSelecionado] = useState(null);

  const [diasSemanaAPI, setDiasSemanaAPI] = useState([]);
  const [workStart, setWorkStart] = useState(null);
  const [workEnd, setWorkEnd] = useState(null);
  const [breakStart, setBreakStart] = useState(null);
  const [breakEnd, setBreakEnd] = useState(null);

  const userId = sessionStorage.getItem("userId");

  const limparAlert = () => {
    setTimeout(() => {
      setMensagem("");
    }, 2000);
  };

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

  const confirmar = () => {
    if (!dataSelecionada || !horarioSelecionado) {
      setMensagem("Por favor, selecione uma data e um horário.");
      setCaminho("/assets/Alert.png");
      limparAlert();
      return;
    }

    const dataFormatada = format(
      parse(format(dataSelecionada, "dd/MM/yyyy"), "dd/MM/yyyy", new Date()),
      "yyyy-MM-dd"
    );

    const agendamento = {
      userId,
      jobsIds: Array.isArray(servicos) ? servicos.map(s => s.id) : [servicos?.id],
      startDatetime: `${dataFormatada}T${horarioSelecionado}:00`
    };

    console.log("Agendamento:", agendamento);

    axios.post(`${apiUrl}/agendamentos`, agendamento, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("authToken")}`
      }
    })
    .then(() => {
      setMensagem("Agendamento confirmado com sucesso!");
      setCaminho("/assets/Check-pop.png");
      limparAlert();
      setTimeout(() => {
        navigate("/pages/client-pages/MeusAgendamentosCli");
      }, 2000);
    })
    .catch((error) => {
      console.error("Erro ao confirmar agendamento:", error);
      setMensagem("Erro ao confirmar agendamento. Tente novamente.");
      setCaminho("/assets/Alert.png");
      limparAlert();
    });
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
      if (
        inicioPausa &&
        fimPausa &&
        ((isAfter(atual, inicioPausa) || isEqual(atual, inicioPausa)) &&
          isBefore(atual, fimPausa))
      ) {
        // dentro da pausa, não adiciona
      } else {
        horarios.push(format(atual, "HH:mm"));
      }
      atual = addMinutes(atual, 60);
    }

    return horarios;
  };

  const [diasParaMostrar, setDiasParaMostrar] = useState([]);
  const [horariosParaMostrar, setHorariosParaMostrar] = useState([]);
  const [dataAtual, setDataAtual] = useState(null);

  useEffect(() => {
    const datas = datasDiasSemana();
    setDiasParaMostrar(datas.slice(inicioDias, inicioDias + diasVisiveis));
  }, [diasSemanaAPI, inicioDias]);

  useEffect(() => {
    const horarios = gerarHorarios();
    setHorariosParaMostrar(horarios.slice(inicioHorarios, inicioHorarios + horariosVisiveis));
  }, [workStart, workEnd, breakStart, breakEnd, inicioHorarios]);

  useEffect(() => {
    if (diasParaMostrar.length > 0) {
      setDataAtual(diasParaMostrar[0]);
    }
  }, [diasParaMostrar]);

  useEffect(() => {
    async function pegarDados() {
      try {
        const token = sessionStorage.getItem("authToken");
        const response = await axios.get(`${apiUrl}/configuracao-agendamento`, {
          headers: { Authorization: `Bearer ${token}` }
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
    pegarDados();
  }, []);

  const handleProximoDias = () => {
    if (inicioDias + diasVisiveis < datasDiasSemana().length) {
      setInicioDias(inicioDias + diasVisiveis);
    }
  };

  const handleAnteriorDias = () => {
    if (inicioDias - diasVisiveis >= 0) {
      setInicioDias(inicioDias - diasVisiveis);
    }
  };

  const handleProximoHorarios = () => {
    if (inicioHorarios + horariosVisiveis < gerarHorarios().length) {
      setInicioHorarios(inicioHorarios + horariosVisiveis);
    }
  };

  const handleAnteriorHorarios = () => {
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
    }
  };

  const handleSelecionarHorario = (horario) => {
    if (horarioSelecionado === horario) {
      setHorarioSelecionado(null);
    } else {
      setHorarioSelecionado(horario);
    }
  };

  return (
    <>
      {mensagem && (
        <Alerta mensagem={mensagem} imagem={caminho} />
      )}
      <NavbarCli caminho={"/pages/client-pages/AgendarCli"} />

      <div className="w-full h-screen bg-[#FFF3DC] flex flex-col items-center pt-10 ">
        <h1 className="text-[#982546] text-2xl font-bold mb-6 mt-10">
          {dataAtual
            ? (format(dataAtual, "MMMM 'de' yyyy", { locale: ptBR }).toUpperCase().slice(0, 1) +
              format(dataAtual, "MMMM 'de' yyyy", { locale: ptBR }).slice(1))
            : ""}
        </h1>

        <div className="flex items-center gap-6 border-b-1 border-[#982546] pb-4">
          <button onClick={handleAnteriorDias} className="text-[#982546] text-2xl cursor-pointer">❮</button>

          {diasParaMostrar.map((dia) => {
            const selecionado =
              dataSelecionada &&
              format(dia, "yyyy-MM-dd") === format(dataSelecionada, "yyyy-MM-dd");

            return (
              <button
                key={dia.toString()}
                onClick={() => handleSelecionarData(dia)}
                className={`w-20 h-30 flex flex-col items-center justify-center rounded-xl border font-bold transition-all cursor-pointer
                  ${selecionado ? "bg-[#4B1F1F] text-white" : "text-[#362323]"}`}
              >
                <span className="text-sm">
                  {format(dia, "EEE", { locale: ptBR }).substring(0, 3).toUpperCase()}
                </span>
                <span className="text-xl">{format(dia, "d")}</span>
              </button>
            );
          })}

          <button onClick={handleProximoDias} className="text-[#982546] text-2xl cursor-pointer">❯</button>
        </div>

        <div className="flex items-center gap-4 mt-10">
          <button onClick={handleAnteriorHorarios} className="text-[#982546] text-2xl cursor-pointer">❮</button>

          {horariosParaMostrar.map((horario) => {
            const selecionado = horarioSelecionado === horario;

            return (
              <button
                key={horario}
                onClick={() => handleSelecionarHorario(horario)}
                className={`w-20 h-10 flex items-center justify-center rounded-xl border font-bold transition-all cursor-pointer
                  ${selecionado ? "bg-[#4B1F1F] text-white" : "text-[#362323]"}`}
              >
                {horario}
              </button>
            );
          })}

          <button onClick={handleProximoHorarios} className="text-[#982546] text-2xl cursor-pointer">❯</button>
        </div>

        <div className="flex flex-col items-start mt-8 w-170 bg-[#E5D8C0] rounded-2xl">
          <p className="text-[#362323] p-4 font-bold">
            {dataSelecionada ? ` ${format(dataSelecionada, "dd/MM/yyyy")}` : ""}
            {" - "}
            {horarioSelecionado ? ` ${horarioSelecionado}` : ""}
          </p>
          <span className="flex flex-row gap-2 p-4 border-t-1 w-full border-[#9c9a9a] text-[#5e5e5e] ">
            Funcionário: <img src="/assets/user.png" alt="" className="h-8" /> Kathelyn
          </span>
        </div>

        <button
          className="bg-[#4B1F1F] w-150 mt-5 p-2 rounded-2xl font-bold text-amber-50 cursor-pointer"
          onClick={confirmar}
        >
          Continuar
        </button>
      </div>
    </>
  );
}
