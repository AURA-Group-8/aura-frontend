import axios from "axios";
import NavbarPro from "./components/Navbar";
import { useState } from "react";
import Alerta from "../Pop-up";
import { useNavigate } from "react-router-dom";

export default function Mensagem() {
  const apiUrl = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();
  const [assunto, setAssunto] = useState("");
  const [textMensagem, setTextMensagem] = useState("");
  const [mensagem, setMensagem] = useState("");
  const [caminho, setCaminho] = useState("");

  const limparAlert = () => {
    setTimeout(() => {
      setMensagem("");
    }, 2000);
  };

  const enviar = async (e) => {
  e.preventDefault();

  const emojiRegex = /(\p{Emoji_Presentation}|\p{Emoji}\uFE0F)/u;

  if (
    assunto === "" ||
    textMensagem === "" ||
    assunto.trim().length < 2 ||
    textMensagem.trim().length < 10
  ) {
    setMensagem("Preencha todos os campos corretamente!");
    setCaminho("/assets/Alert.png");
    limparAlert();
    return;
  }

  if (emojiRegex.test(assunto) || emojiRegex.test(textMensagem)) {
    setMensagem("Emojis não são permitidos no assunto ou mensagem.");
    setCaminho("/assets/Alert.png");
    limparAlert();
    return;
  }

  try {
    const token = sessionStorage.getItem("authToken");

    const data = {
      assunto: assunto.trim(),
      mensagem: textMensagem.trim(),
    };

    await axios.post(`${apiUrl}/mensagens/all/whatsapp`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    setMensagem("Mensagem enviada!");
    setCaminho("/assets/Check-pop.png");
    limparAlert();

    setAssunto("");
    setTextMensagem("");

  } catch (error) {
    console.error("Erro ao enviar mensagem:", error);
    setMensagem("Erro ao enviar mensagem.");
    setCaminho("/assets/Alert.png");
    limparAlert();
  }
};

  return (
    <>
      {mensagem && <Alerta mensagem={mensagem} imagem={caminho} />}

      <NavbarPro caminho={"/pages/professional-pages/MeusClientes"} />
      <div className="w-full h-screen bg-[#FFF3DC] flex flex-col justify-center items-center">
        <h1 className="text-[#982546] font-bold text-2xl">Enviar mensagem</h1>

        <form
          className="border-1 border-[#982546] bg-[#FFF3DC] w-150 p-4 rounded-2xl flex flex-row justify-center items-center mt-5"
          onSubmit={enviar}
        >
          <div className="flex flex-col w-120 ">
            <p className=" mt-2">Assunto</p>
            <input
              type="text"
              name="nome"
              className="bg-amber-50 p-2 rounded-2xl border-1 border-[#982546]"
              onChange={(e) => setAssunto(e.target.value)}
              value={assunto}
            />

            <p className="mt-4">Mensagem</p>
            <textarea
              type="text"
              name="nome"
              className="bg-amber-50 p-2 rounded-2xl border-1 border-[#982546]"
              onChange={(e) => setTextMensagem(e.target.value)}
              value={textMensagem}
            />

            <div className="flex flex-row w-full justify-between mt-10">
              <button
                type="reset"
                className="border-1 border-[#982546] py-2 px-8 rounded-2xl text-[#982546] cursor-pointer hover:bg-[#dddcd1] transition-colors"
                onClick={() => {
                  setAssunto("");
                  setTextMensagem("");
                }}
              >
                Cancelar
              </button>

              <button
                type="submit"
                className="bg-[#982546] py-2 px-8 rounded-2xl text-[#FFF3DC] cursor-pointer hover:bg-[#b36078] transition-colors"
              >
                Enviar
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}
