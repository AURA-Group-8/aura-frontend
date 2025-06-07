import { useState } from "react";
import Alerta from "../../Pop-up";
import axios from "axios";

export default function CardAgendamento(props) {
  const apiUrl = import.meta.env.VITE_API_URL;

  // Inicializa estados direto com base no status recebido via props
  const [cor, setCor] = useState(() => {
    if (props.status === "FEITO") return "#a34862";
    if (props.status === "CANCELADO") return "#807679";
    return "#982546";
  });

  const [text, setText] = useState(() => {
    if (props.status === "FEITO") return "Feito";
    if (props.status === "CANCELADO") return "Cancelado";
    return "Marcar como feito";
  });

  const [botaoAtivo, setBotaoAtivo] = useState(() => {
    // Botão ativo somente se status for pendente ou undefined
    return props.status === "PENDENTE" || !props.status;
  });

  const [mostrarMotivo, setMostrarMotivo] = useState(false);
  const [motivoCancelamento, setMotivoCancelamento] = useState("");
  const [mensagem, setMensagem] = useState("");
  const [caminho, setCaminho] = useState("");

  const limparAlert = () => {
    setTimeout(() => {
      setMensagem("");
    }, 2000);
  };

  const marcarFeito = () => {
    axios
      .patch(
        `${apiUrl}/agendamentos/${props.id}?idScheduling=${props.id}`,
        {
          id: props.userId,
          feedback: 0,
          status: text === "Marcar como feito" ? "FEITO" : "PENDENTE",
          paymentStatus: "PAGO",
        },
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("authToken")}`,
          },
        }
      )
      .then(() => {
        setMensagem("Status atualizado com sucesso!");
        setCaminho("/assets/Check-pop.png");
        limparAlert();

        setCor((prev) => (prev === "#982546" ? "#a34862" : "#982546"));
        setText((prev) =>
          prev === "Marcar como feito" ? "Feito" : "Marcar como feito"
        );
        setBotaoAtivo((prev) => !prev);
        setMostrarMotivo(false);
      })
      .catch((error) => {
        console.error(
          "Erro ao atualizar status:",
          error.response?.data || error.message
        );
        setMensagem("Erro ao atualizar status do agendamento. Tente novamente.");
        setCaminho("/assets/Alert.png");
        limparAlert();
      });
  };

  const cancelar = () => {
    setMostrarMotivo(true);
  };

  const confirmarCancelamento = () => {
    if (motivoCancelamento.trim() === "") {
      fecharModal();
      setMensagem("Por favor, informe o motivo do cancelamento.");
      setCaminho("/assets/Alert.png");
      limparAlert();
    } else {
      axios
        .patch(
          `${apiUrl}/agendamentos/${props.id}?idScheduling=${props.id}`,
          {
            id: props.userId,
            status: "CANCELADO",
            cancellationReason: motivoCancelamento,
          },
          {
            headers: {
              Authorization: `Bearer ${sessionStorage.getItem("authToken")}`,
            },
          }
        )
        .then(() => {
          setMensagem("Agendamento cancelado!");
          setCaminho("/assets/Check-pop.png");
          limparAlert();

          setCor("#807679");
          setText("Cancelado");
          setBotaoAtivo(false);
          setMostrarMotivo(false);
        })
        .catch((error) => {
          console.error(
            "Erro ao cancelar agendamento:",
            error.response?.data || error.message
          );
          setMensagem("Erro ao cancelar o agendamento. Tente novamente.");
          setCaminho("/assets/Alert.png");
          limparAlert();
        });
    }
  };

  const fecharModal = () => {
    setMostrarMotivo(false);
    setMotivoCancelamento("");
  };

  return (
    <>
      {mensagem && <Alerta mensagem={mensagem} imagem={caminho} />}

      <div className="flex flex-row w-full relative mt-15">
        <div className="flex flex-col justify-center w-full h-40">
          <div
            className="h-20 rounded-t-2xl flex items-center p-2 z-10"
            style={{
              backgroundColor: cor,
              boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.3)",
            }}
          >
            <p className="font-bold text-white text-lg">{props.name}</p>
          </div>

          <div className="rounded-b-2xl transition-all" style={{ backgroundColor: cor }}>
            <div className="flex flex-col p-2 w-full text-white text-lg">
              <p className="mb-2 w-150 font-bold">{props.service}</p>
              <div className="flex flex-row justify-between w-full">
                <div className="flex flex-row justify-around gap-2">
                  <p className="text-[#ffa8d8]">
                    Data: <span className="text-white">{props.date}</span>
                  </p>
                  <span> - </span>
                  <p className="text-[#ffa8d8]">
                    Horário: <span className="text-white">{props.time}</span>
                  </p>
                </div>
                <p className="font-bold text-3xl text-[#ffa8d8]">{props.value}</p>
              </div>
            </div>

            <div className="w-full p-2 text-white text-lg">
              <span className="text-[#ffa8d8] font-bold">Pagamento: </span>
              <select className="outline-none cursor-pointer rounded p-1" defaultValue={props.paymentStatus === "PAGO" ? "Pago" : "Pendente"}>
                <option className="text-emerald-600" value="Pago">
                  Pago
                </option>
                <option className="text-amber-600" value="Pendente">
                  Pendente
                </option>
              </select>
            </div>

            <div className="flex flex-row justify-between w-full p-2">
              <button
                className={`bg-[#FFF3DC] p-2 rounded-2xl text-[#982546] cursor-pointer ${
                  !botaoAtivo ? "opacity-50 cursor-not-allowed" : ""
                }`}
                onClick={marcarFeito}
                disabled={!botaoAtivo}
              >
                {text}
              </button>
              {botaoAtivo && (
                <button
                  className="p-2 rounded-2xl border border-[#FFF3DC] text-[#FFF3DC] cursor-pointer"
                  onClick={cancelar}
                >
                  Cancelar atendimento
                </button>
              )}
            </div>
          </div>
        </div>

        {mostrarMotivo && (
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 translate-y-10 z-50">
            <div className="bg-white p-6 rounded-2xl shadow-xl w-[30rem] max-w-[90%]">
              <h2 className="text-[#982546] text-xl font-bold mb-4">
                Motivo do cancelamento
              </h2>
              <textarea
                className="w-full h-28 border border-[#982546] rounded-xl p-2 outline-none resize-none text-[#982546] placeholder:text-[#98254699]"
                placeholder="Digite o motivo aqui"
                value={motivoCancelamento}
                onChange={(e) => setMotivoCancelamento(e.target.value)}
              />
              <div className="flex justify-between mt-4">
                <button
                  onClick={fecharModal}
                  className="px-4 py-2 rounded-xl border border-[#982546] text-[#982546] cursor-pointer"
                >
                  Voltar
                </button>
                <button
                  onClick={confirmarCancelamento}
                  className="px-4 py-2 rounded-xl bg-[#982546] text-white cursor-pointer"
                >
                  Cancelar atendimento
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
