import CardNotificacao from "../../componentes/CardNotificacao";
import NavbarCli from "../componentes/Navbar";
import { useState } from "react";

const Notificacao = () => {

  const [temNotificacaoNova, setTemNotificacaoNova] = useState(false);

  return (
    <>

      <NavbarCli caminho={"/cliente/home"}
        atualizarNotificacoes={setTemNotificacaoNova}
      />

      <CardNotificacao
        atualizarNotificacoes={setTemNotificacaoNova}
      />
    </>
  );
};

export default Notificacao;
