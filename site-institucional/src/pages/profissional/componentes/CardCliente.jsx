import { useEffect, useState } from "react";
import axios from "axios";
import Alerta from "../../componentes/Popup";

export default function CardCliente({ id, name, phone, birthDate, observation }) {

  const [mensagem, setMensagem] = useState("");
  const [caminho, setCaminho] = useState("");
  const [observacao, setObservacao] = useState("");

  const token = sessionStorage.getItem("authToken");
  const apiUrl = import.meta.env.VITE_API_URL_V2;

  const limparAlert = () => {
    setTimeout(() => setMensagem(""), 2000);
  };

  const formatarData = (dataISO) => {
    if (!dataISO) return "";
    const data = new Date(dataISO);
    const dia = data.getDate().toString().padStart(2, "0");
    const mes = (data.getMonth() + 1).toString().padStart(2, "0");
    const ano = data.getFullYear();
    return `${dia}/${mes}/${ano}`;
  };

  useEffect(() => {
    setObservacao(observation || "");
  }, [observation]);

const salvarObs = async () => {
  try {
    const textObs = observacao.trim();

    if (!textObs) {
      setMensagem("Observação vazia.");
      setCaminho("/assets/Alert.png");
      limparAlert();
      return;
    }

    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };
    
    const body = {
      observation: textObs,
    };

    await axios.patch(`${apiUrl}/usuarios/${id}`, body, { headers });

    setMensagem("Observação atualizada com sucesso!");
    setCaminho("/assets/Check-pop.png");
    limparAlert();
    setObservacao(textObs);

  } catch (error) {
    console.error("Erro ao salvar observação:", error);
    setMensagem("Erro ao salvar observação. Tente novamente.");
    setCaminho("/assets/Alert.png");
    limparAlert();
  }
};

return (
  <>
    {mensagem && <Alerta mensagem={mensagem} imagem={caminho} />}

    <div className="flex flex-col mt-6 md:mt-0 xl:w-250 md:w-210 h-60 xl:text-lg">
      <div className="bg-[#982546] rounded-t-2xl p-2 w-full flex flex-row justify-between items-center text-white text-lg font-bold">
        <span>{name}</span>
      </div>

      <div className="bg-[#982546b9] rounded-b-2xl p-2 w-full text-white flex flex-col gap-5 md:flex-row justify-between items-center">
        <div className="flex flex-col justify-between self-left text-lg">
          <span>Telefone: {phone}</span>
          <span>Data de Nascimento: {formatarData(birthDate)}</span>

        </div>

        <div className="flex flex-col gap-4">
          <textarea
            className="bg-[#81253fd8] rounded-2xl w-80 h-20 p-2"
            placeholder="Adicione uma observação"
            value={observacao}
            onChange={(e) => setObservacao(e.target.value)}
          />

          <button className="bg-[#81253fd8] rounded-2xl p-2 text-white cursor-pointer hover:bg-[#81253f] transition-colors" onClick={salvarObs}>Salvar</button>
        </div>
      </div>
    </div>
  </>

);
}