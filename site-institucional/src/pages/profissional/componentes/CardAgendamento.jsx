import { useEffect, useState } from "react";
import Alerta from "../../Popup";
import axios from "axios";

export default function CardAgendamento(props) {
  const apiUrl = import.meta.env.VITE_API_URL;

  const [cor, setCor] = useState("#982546");
  const [text, setText] = useState("Marcar como feito");
  const [botaoAtivo, setBotaoAtivo] = useState(true);
  const [mostrarMotivo, setMostrarMotivo] = useState(false);
  const [motivoCancelamento, setMotivoCancelamento] = useState("");
  const [mensagem, setMensagem] = useState("");
  const [caminho, setCaminho] = useState("");
  const [paymentStatus, setPaymentStatus] = useState("PENDENTE");
  const [carregando, setCarregando] = useState(false);

  useEffect(() => {
    const status = props.status?.toUpperCase();

    if (status === "FEITO") {
      setCor("#a34862");
      setText("Feito");
      setBotaoAtivo(false);
      setPaymentStatus("PAGO");

    } else if (status === "CANCELADO") {
      setCor("#807679");
      setText("Cancelado");
      setBotaoAtivo(false);

    } else {
      setCor("#982546");
      setText("Marcar como feito");
      setBotaoAtivo(true);
      setPaymentStatus("PENDENTE");
    }
  }, [props.status]);

  const limparAlert = () => {
    setTimeout(() => setMensagem(""), 2000);
  };

  const marcarFeito = () => {
    if (text === "Feito") return;

    const novoStatus = "FEITO";
    const novoPaymentStatus = "PAGO";

    const payload = {
      id: props.id,
      status: novoStatus,
      paymentStatus: novoPaymentStatus,

    };

    setCarregando(true);

    axios.patch(`${apiUrl}/agendamentos/${props.id}`, payload, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("authToken")}`
      }
    })
      .then(() => {
        setMensagem("Status atualizado com sucesso!");
        setCaminho("/assets/Check-pop.png");

        setCor("#a34862");
        setText("Feito");
        setPaymentStatus("PAGO");
        setBotaoAtivo(true);
        setMostrarMotivo(false);
        limparAlert();
      })
      .catch((error) => {
        console.error("Erro ao atualizar status:", error.response?.data || error.message);
        setMensagem("Erro ao atualizar status do agendamento. Tente novamente.");
        setCaminho("/assets/Alert.png");
        limparAlert();
      })
      .finally(() => {
        setCarregando(false);
      });
  };

  const cancelar = () => setMostrarMotivo(true);

  const confirmarCancelamento = () => {
    if (motivoCancelamento.trim() === "") {
      fecharModal();
      setMensagem("Por favor, informe o motivo do cancelamento.");
      setCaminho("/assets/Alert.png");
      limparAlert();
      return;
    }

    const role = 1;

    axios.delete(`${apiUrl}/agendamentos/${props.id}`, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("authToken")}`
      },
      params: {
        roleId: role,
        message: motivoCancelamento
      }
    }).then(() => {
      setMensagem("Agendamento cancelado!");
      setCaminho("/assets/Check-pop.png");

      setCor("#807679");
      setText("Cancelado");
      setBotaoAtivo(false);
      setMostrarMotivo(false);

      limparAlert();
    }).catch((error) => {
      console.error("Erro ao cancelar agendamento:", error.response?.data || error.message);
      setMensagem("Erro ao cancelar o agendamento.");
      setCaminho("/assets/Alert.png");
      limparAlert();
    });
  };

  const fecharModal = () => {
    setMostrarMotivo(false);
    setMotivoCancelamento("");
  };

  return (
    <>
      {mensagem && <Alerta mensagem={mensagem} imagem={caminho} />}

      <div className="flex flex-row w-full mt-20">
        <div className="flex flex-col justify-center w-100 h-40 mb-20">

          <div className="h-20 rounded-t-2xl flex items-center p-2 z-10"
            style={{
              backgroundColor: cor,
              boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.3)"
            }}>
            <p className="font-bold text-white text-lg">{props.name}</p>
          </div>

          <div className="rounded-b-2xl" style={{ backgroundColor: cor }}>
            <div className="flex flex-col p-2 text-white text-lg">
              <label className="font-bold text-[#ffa8d8]">Serviços:</label>
              <select
                className="w-full p-1 rounded-lg mb-5 text-[#982546] bg-white border border-[#ffa8d8]"
              >
                {props.service?.split(",").map((serv, index) => (
                  <option key={index} value={serv.trim()} className="p-2 rounded-md">
                    {serv.trim()}
                  </option>
                ))}
              </select>
              <div className="flex flex-row justify-between">
                <div className="flex gap-2 flex-col">
                  <p className="text-[#ffa8d8]">Data: <span className="text-white">{props.date}</span></p>

                  <p className="text-[#ffa8d8]">Horário: <span className="text-white">{props.time}</span></p>
                </div>
                <p className="font-bold text-3xl text-[#ffa8d8]">{props.value}</p>
              </div>
            </div>

            <div className="w-full p-2 text-white text-lg">
              <span className="text-[#ffa8d8] font-bold">Pagamento: </span>
              <select
                className="outline-none cursor-pointer rounded p-1"
                value={paymentStatus}
                onChange={(e) => setPaymentStatus(e.target.value)}
                disabled={text === "Feito"}
              >
                <option value="PENDENTE" className="text-amber-600">Pendente</option>
                <option value="PAGO" className="text-emerald-600">Pago</option>
              </select>
            </div>

            <div className="flex justify-between p-2">
              <button
                className="bg-[#FFF3DC] cursor-pointer p-2 rounded-2xl text-[#982546] hover:bg-[#e9e3d3] transition-colors"
                onClick={marcarFeito}
                disabled={!botaoAtivo || carregando}
              >
                {carregando ? "Atualizando..." : text}
              </button>

              {text === "Marcar como feito" && (
                <button
                  className="p-2 rounded-2xl border cursor-pointer border-[#FFF3DC] text-[#FFF3DC] hover:bg-[#b36078] transition-colors"
                  onClick={cancelar}
                >
                  Cancelar atendimento
                </button>
              )}
            </div>
          </div>
        </div>

        {mostrarMotivo && (
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-2xl shadow-xl w-[30rem] max-w-[90%]">
              <h2 className="text-[#982546] text-xl font-bold mb-4">Motivo do cancelamento</h2>
              <textarea
                className="w-full h-28 border border-[#982546] rounded-xl p-2 outline-none resize-none text-[#982546] placeholder:text-[#98254699]"
                placeholder="Digite o motivo aqui"
                value={motivoCancelamento}
                onChange={(e) => setMotivoCancelamento(e.target.value)}
              />
              <div className="flex justify-between mt-4">
                <button onClick={fecharModal} className="px-4 py-2 cursor-pointer rounded-xl border border-[#982546] text-[#982546]">
                  Voltar
                </button>
                <button onClick={confirmarCancelamento} className="px-4 cursor-pointer py-2 rounded-xl bg-[#982546] text-white">
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
