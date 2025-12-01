import { createBrowserRouter, Navigate } from "react-router-dom";

function PrivateRoute({ children }) {
  const token = sessionStorage.getItem('authToken');
  return token ? children : <Navigate to="/login" replace />;
}

import HomePage from "../pages/landing-page/PaginaInicial";

// Cliente
import Cadastro from "../pages/cliente/autenticacao/Cadastro";
import AlterarSenhaCli from "../pages/cliente/autenticacao/AlterarSenha";
import EsqueceuSenha from "../pages/cliente/autenticacao/EsqueciSenha";
import ValidarToken from "../pages/cliente/autenticacao/ValidarToken";
import Contato from "../pages/cliente/contato/Contato";
import Home from "../pages/cliente/Home";
import ConfigCli from "../pages/cliente/configuracoes/Configuracoes";
import Notificacao from "../pages/cliente/notificacoes/Notificacoes";
import AgendarCli from "../pages/cliente/agendamentos/AgendarCliente";
import Historico from "../pages/cliente/historico/Historico";
import MeusAgendamentosCli from "../pages/cliente/agendamentos/MeusAgendamentos";

// Profissional
import Dashboard from "../pages/profissional/dashboard/Dashboard";
import Confirmar from "../pages/componentes/Confirmar";
import CadastroCliente from "../pages/profissional/clientes/CadastroCliente";
import MeusClientes from "../pages/profissional/clientes/MeusClientes";
import AddServico from "../pages/profissional/servicos/AdicionarServico";
import EditarServico from "../pages/profissional/servicos/EditarServico";
import Financeiro from "../pages/profissional/financeiro/Financeiro";
import HistoricoFinanceiro from "../pages/profissional/financeiro/HistoricoFinanceiro";
import ContatoPro from "../pages/profissional/contato/Contato"; 
import Configuracoes from "../pages/profissional/configuracoes/ConfiguracoesProfissional";
import AlterarSenha from "../pages/profissional/autenticacao/AlterarSenha";
import ProNotification from "../pages/profissional/notificacoes/Notificacoes";
import NavbarPro from "../pages/profissional/componentes/Navbar";
import Agendar from "../pages/profissional/clientes/agendamento/AgendarCliente";
import MeusServicos from "../pages/profissional/servicos/MeusServicos";
import Mensagem from "../pages/profissional/mensagens/Mensagem";

//outros
import Login from "../pages/Login";
import Alerta from "../pages/componentes/PopUp";
import SelecaoServicoCliente from "../pages/profissional/componentes/SelecaoServicoCliente";
import CalendarioCarrossel from "../pages/componentes/DataHora";


export const routes = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
    errorElement: <h1>Page not found</h1>,
  },

  //Cliente
  { path: "/cliente/cadastro", element: <Cadastro /> },
  { path: "/cliente/alterar-senha", element: <AlterarSenhaCli /> },
  { path: "/cliente/esqueci-senha", element: <EsqueceuSenha /> },
  { path: "/cliente/validar-token", element: <ValidarToken /> },
  { path: "/cliente/contato", element: <Contato /> },
  { path: "/cliente/home", element: <PrivateRoute><Home /></PrivateRoute> },
  { path: "/cliente/configuracoes", element: <PrivateRoute><ConfigCli /></PrivateRoute> },
  { path: "/cliente/notificacoes", element: <PrivateRoute><Notificacao /></PrivateRoute> },
  { path: "/cliente/agendar", element: <PrivateRoute><AgendarCli /></PrivateRoute> },
  { path: "/cliente/historico", element: <PrivateRoute><Historico /></PrivateRoute> },
  { path: "/cliente/meus-agendamentos", element: <PrivateRoute><MeusAgendamentosCli/></PrivateRoute> },
  

  // Profissional
  { path: "/profissional/dashboard", element: <PrivateRoute><Dashboard/></PrivateRoute> },
  { path: "/profissional/confirmar", element: <PrivateRoute><Confirmar/></PrivateRoute> },
  { path: "/profissional/cadastro-cliente", element: <PrivateRoute><CadastroCliente/></PrivateRoute> },
  { path: "/profissional/meus-clientes", element: <PrivateRoute><MeusClientes/></PrivateRoute> },
  { path: "/profissional/meus-servicos", element: <PrivateRoute><MeusServicos /></PrivateRoute> },
  { path: "/profissional/servico/add", element: <PrivateRoute><AddServico/></PrivateRoute> },
  { path: "/profissional/servico/editar", element: <PrivateRoute><EditarServico/></PrivateRoute> },
  { path: "/profissional/financeiro", element: <PrivateRoute><Financeiro/></PrivateRoute> },
  { path: "/profissional/financeiro/historico", element: <PrivateRoute><HistoricoFinanceiro/></PrivateRoute> },
  { path: "/profissional/mensagens", element: <PrivateRoute><Mensagem/></PrivateRoute> },
  { path: "/profissional/contato", element: <PrivateRoute><ContatoPro/></PrivateRoute> },
  { path: "/profissional/configuracoes", element: <PrivateRoute><Configuracoes/></PrivateRoute> },
  { path: "/profissional/alterar-senha", element: <PrivateRoute><AlterarSenha/></PrivateRoute> },
  { path: "/profissional/notificacoes", element: <PrivateRoute><ProNotification/></PrivateRoute> },
  { path: "/profissional/navbar", element: <PrivateRoute><NavbarPro/></PrivateRoute> },
  { path: "/profissional/data-hora", element: <PrivateRoute><CalendarioCarrossel/></PrivateRoute> },
  { path: "/profissional/agendar", element: <PrivateRoute><Agendar/></PrivateRoute> },

  //Outros
  { path: "/login", element: < Login/> },
  { path: "/agendar", element: <SelecaoServicoCliente/> },
  { path: "/popup", element: <Alerta /> },
]);
