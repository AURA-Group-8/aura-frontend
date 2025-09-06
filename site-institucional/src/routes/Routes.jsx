import { createBrowserRouter } from "react-router-dom";

import HomePage from "../pages/landing-page/PaginaInicial";

// Cliente

import Cadastro from "../pages/cliente/autenticacao/Cadastro";
import Login from "../pages/cliente/autenticacao/Login";
import AlterarSenhaCli from "../pages/cliente/autenticacao/AlterarSenha";
import EsqueceuSenha from "../pages/cliente/autenticacao/EsqueciSenha";
import ValidarToken from "../pages/cliente/autenticacao/ValidarToken";
import Contato from "../pages/cliente/contato/Contato";
import Home from "../pages/cliente/Home";
import ConfigCli from "../pages/cliente/configuracoes/Configuracoes";
import Notificacao from "../pages/cliente/notificacoes/Notificacoes";
import AgendarCli from "../pages/cliente/agendamentos/AgendarCliente";
import DataHoraAgendamento from "../pages/cliente/agendamentos/DataHoraAgendamento";
import ConfirmarCli from "../pages/cliente/agendamentos/ConfirmarCliente";
import Historico from "../pages/cliente/historico/Historico";
import MeusAgendamentosCli from "../pages/cliente/agendamentos/MeusAgendamentos";

// Profissional

import Dashboard from "../pages/profissional/dashboard/Dashboard";
import Confirmar from "../pages/profissional/clientes/agendamento/Confirmar";
import CadastroCliente from "../pages/profissional/clientes/CadastroCliente";
import MeusClientes from "../pages/profissional/clientes/MeusClientes";
import AddServico from "../pages/profissional/servicos/AdicionarServico";
import Alerta from "../pages/Popup";
import EditarServico from "../pages/profissional/servicos/EditarServico";
import Financeiro from "../pages/profissional/financeiro/Financeiro";
import HistoricoFinanceiro from "../pages/profissional/financeiro/HistoricoFinanceiro";
import MenuLateral from "../pages/profissional/componentes/MenuLateral";
import ContatoPro from "../pages/profissional/contato/Contato"; 
import Configuracoes from "../pages/profissional/configuracoes/ConfiguracoesProfissional";
import AlterarSenha from "../pages/profissional/autenticacao/AlterarSenha";
import ProNotification from "../pages/profissional/notificacoes/Notificacoes";
import LoginPro from "../pages/profissional/autenticacao/Login";
import NavbarPro from "../pages/profissional/componentes/Navbar";
import CalendarioCarrossel from "../pages/profissional/clientes/agendamento/DataHora";
import Agendar from "../pages/profissional/clientes/agendamento/AgendarCliente";
import MeusServicos from "../pages/profissional/servicos/MeusServicos";
import Mensagem from "../pages/profissional/mensagens/Mensagem";


export const routes = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
    errorElement: <h1>Page not found</h1>,
  },
  { path: "/cliente/cadastro", element: <Cadastro /> },
  { path: "/cliente/login", element: <Login /> },
  { path: "/cliente/alterar-senha", element: <AlterarSenhaCli /> },
  { path: "/cliente/esqueci-senha", element: <EsqueceuSenha /> },
  { path: "/cliente/validar-token", element: <ValidarToken /> },
  { path: "/cliente/contato", element: <Contato /> },
  { path: "/cliente/home", element: <Home /> },
  { path: "/cliente/configuracoes", element: <ConfigCli /> },
  { path: "/cliente/notificacoes", element: <Notificacao /> },
  { path: "/cliente/agendar", element: <AgendarCli /> },
  { path: "/cliente/data-hora", element: <DataHoraAgendamento /> },
  { path: "/cliente/confirmar", element: <ConfirmarCli /> },
  { path: "/cliente/historico", element: <Historico /> },
  { path: "/cliente/meus-agendamentos", element: <MeusAgendamentosCli/> },

  // Profissional
  { path: "/profissional/dashboard", element: <Dashboard/> },
  { path: "/profissional/confirmar", element: <Confirmar/> },
  { path: "/profissional/cadastro-cliente", element: <CadastroCliente/> },
  { path: "/profissional/meus-clientes", element: <MeusClientes/> },
  { path: "/profissional/meus-servicos", element: <MeusServicos /> },
  { path: "/profissional/servico/add", element: <AddServico/> },
  { path: "/profissional/servico/editar", element: <EditarServico/> },
  { path: "/profissional/financeiro", element: <Financeiro/> },
  { path: "/profissional/financeiro/historico", element: <HistoricoFinanceiro/> },
  { path: "/profissional/mensagens", element: <Mensagem/> },
  { path: "/profissional/contato", element: <ContatoPro/> },
  { path: "/profissional/configuracoes", element: <Configuracoes/> },
  { path: "/profissional/alterar-senha", element: <AlterarSenha/> },
  { path: "/profissional/notificacoes", element: <ProNotification/> },
  { path: "/profissional/login", element: <LoginPro/> },
  { path: "/profissional/navbar", element: <NavbarPro/> },
  { path: "/profissional/data-hora", element: <CalendarioCarrossel/> },
  { path: "/profissional/agendar", element: <Agendar/> },

  { path: "/popup", element: <Alerta /> },
]);
