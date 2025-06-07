import NavbarCli from "./components/Navbar";
import { useState, useEffect } from "react";
import {
  format,
  addDays,
  startOfDay,
  eachDayOfInterval,
} from "date-fns";
import { ptBR } from "date-fns/locale";
import { useLocation, useNavigate } from "react-router-dom";
import Alerta from "../Pop-up";
import axios from "axios";

export default function CalendarioCarrossel() {

  const apiUrl = import.meta.env.VITE_API_URL;

  const navigate = useNavigate();
  const location = useLocation();
  const servicosSelecionados = location.state?.servicos || [];
  useEffect(() => {
  }, [servicosSelecionados]);

  const horarios = [];
  for (let h = 1; h <= 23; h++) {
    horarios.push(`${String(h).padStart(2, "0")}:00`);
  }

  const diasVisiveis = 7;
  const horariosVisiveis = 7;

  const userId = sessionStorage.getItem("userId");

  const [inicioDias, setInicioDias] = useState(0);
  const [dataSelecionada, setDataSelecionada] = useState(null);
  const [dataAtual, setDataAtual] = useState(new Date());

  const [inicioHorarios, setInicioHorarios] = useState(0);
  const [horarioSelecionado, setHorarioSelecionado] = useState(null);
  const [mensagem, setMensagem] = useState("");
  const [caminho, setCaminho] = useState("");

  const limparAlert = () => {
    setTimeout(() => {
      setMensagem("");
    }, 2000);
  };

  const dias = eachDayOfInterval({
    start: startOfDay(new Date()),
    end: addDays(new Date(), 365),
  });

  const diasParaMostrar = dias.slice(inicioDias, inicioDias + diasVisiveis);
  const horariosParaMostrar = horarios.slice(inicioHorarios, inicioHorarios + horariosVisiveis);

  useEffect(() => {
    if (diasParaMostrar.length > 0) {
      setDataAtual(diasParaMostrar[0]);
    }
  }, [inicioDias]);

  const formatarLocalDateTime = (data, horario) => {
    const dataFormatada = format(data, "yyyy-MM-dd");
    return `${dataFormatada}T${horario}:00`; // Formato LocalDateTime
  };

  const enviarAgendamento = async () => {
    if (!dataSelecionada || !horarioSelecionado || servicosSelecionados.length === 0) {
      setMensagem("Preencha todos os campos!");
      setCaminho("/assets/Alert.png");
      limparAlert();
      return;
    }

    const localDateTime = formatarLocalDateTime(dataSelecionada, horarioSelecionado);

    const dadosAgendamento = {
      userId: userId,
      jobsIds: servicosSelecionados.map((servico) => servico.id),
      startDatetime: localDateTime,
    };

    console.log("Dados do agendamento:", dadosAgendamento);

    try {
      const authToken = sessionStorage.getItem("authToken");
      axios.post(`${apiUrl}/agendamentos`, dadosAgendamento, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      setMensagem("Agendamento realizado com sucesso!");
      setCaminho("/assets/Check-pop.png");
      setTimeout(() => {
        navigate("/pages/client-pages/Home");
    }, 2000);
      
    } catch (error) {
      console.error("Erro ao realizar agendamento:", error);
      setMensagem("Erro ao realizar agendamento!");
      setCaminho("/assets/Alert.png");
      limparAlert();
    }
  };

  const handleProximoDias = () => {
    if (inicioDias + diasVisiveis < dias.length) {
      setInicioDias(inicioDias + diasVisiveis);
    }
  };

  const handleAnteriorDias = () => {
    if (inicioDias - diasVisiveis >= 0) {
      setInicioDias(inicioDias - diasVisiveis);
    }
  };

  const handleProximoHorarios = () => {
    if (inicioHorarios + horariosVisiveis < horarios.length) {
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
        <Alerta
          mensagem={mensagem}
          imagem={caminho}
        />
      )}

      <NavbarCli caminho={"/pages/client-pages/AgendarCli"} />

      <div className="w-full h-screen bg-[#FFF3DC] flex flex-col items-center pt-10 ">
        <h1 className="text-[#982546] text-2xl font-bold mb-6 mt-10">
          {format(dataAtual, "MMMM 'de' yyyy", { locale: ptBR })
            .toUpperCase()
            .slice(0, 1) +
            format(dataAtual, "MMMM 'de' yyyy", { locale: ptBR }).slice(1)}
        </h1>

        {/* Carrossel de dias */}
        <div className="flex items-center gap-6 border-b-1 border-[#982546] pb-4">
          <button onClick={handleAnteriorDias} className="text-[#982546] text-2xl cursor-pointer">
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
                className={`w-20 h-30 flex flex-col items-center justify-center rounded-xl border font-bold transition-all cursor-pointer
                  ${selecionado ? "bg-[#4B1F1F] text-white" : "text-[#362323]"}`}
              >
                <span className="text-sm">
                  {format(dia, "EEE", { locale: ptBR })
                    .substring(0, 3)
                    .toUpperCase()}
                </span>
                <span className="text-xl">{format(dia, "d")}</span>
              </button>
            );
          })}

          <button onClick={handleProximoDias} className="text-[#982546] text-2xl cursor-pointer">
            ❯
          </button>
        </div>

        {/* Carrossel de horários */}
        <div className="flex items-center gap-4 mt-10">
          <button
            onClick={handleAnteriorHorarios}
            className="text-[#982546] text-2xl cursor-pointer"
          >
            ❮
          </button>

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

          <button
            onClick={handleProximoHorarios}
            className="text-[#982546] text-2xl cursor-pointer"
          >
            ❯
          </button>
        </div>

        <div className="flex flex-col items-start mt-8 w-170 bg-[#E5D8C0] rounded-2xl">
          <p className="text-[#362323] p-4 font-bold ">
            {dataSelecionada
              ? ` ${format(dataSelecionada, "dd/MM/yyyy")}`
              : ""}
            {" - "}
            {horarioSelecionado
              ? ` ${horarioSelecionado}`
              : ""}
          </p>

          <span className="flex flex-row gap-2 p-4 border-t-1 w-full border-[#9c9a9a] text-[#5e5e5e] ">
            Funcionário: <img src="/assets/user.png" alt="" className="h-8" /> Kathelyn
          </span>

        </div>
        <button onClick={enviarAgendamento} className="bg-[#4B1F1F] w-150 mt-5 p-2 rounded-2xl font-bold text-amber-50 cursor-pointer">Continuar</button>
      </div>
    </>
  );
}
