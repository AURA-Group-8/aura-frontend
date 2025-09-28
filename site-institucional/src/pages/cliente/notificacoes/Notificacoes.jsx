import CardNotificacao from "../../componentes/CardNotificacao";
import NavbarCli from "../componentes/Navbar";

const Notificacao = () => {
  
  return (
    <>
     
      <NavbarCli caminho={"/cliente/home"} />
      <CardNotificacao roleId={2} />
    </>
  );
};

export default Notificacao;
