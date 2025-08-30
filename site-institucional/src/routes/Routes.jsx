import { createBrowserRouter } from "react-router-dom";

// Cliente
import PaginaInicial from "../pages/PaginaInicial";
import Cadastro from "../pages/cliente/autenticacao/Cadastro";
import Login from "../pages/cliente/autenticacao/Login";
import AlterarSenhaCli from "../pages/cliente/autenticacao/AlterarSenha";
import EsqueceuSenha from "../pages/cliente/autenticacao/EsqueciSenha";
import ValidarToken from "../pages/cliente/autenticacao/ValidarToken";
import Contato from "../pages/cliente/contato/Contato";
import Home from "../pages/cliente/Home";
import ConfigCli from "../pages/cliente/configuracoes/Configuracoes";
import Notificacao from "../pages/cliente/notificacoes/Notificacoes";
import AgendarCli from "../pages/cliente/agendamentos/AgendarCli";
import DataHoraAgendamento from "../pages/cliente/agendamentos/DataHoraAgendamento";
import ConfirmarCli from "../pages/cliente/agendamentos/ConfirmarCliente";
import Historico from "../pages/cliente/historico/Historico";

// Profissional
import Dashboard from "../pages/professional/dashboard/Dashboard";
import Confirmar from "../pages/professional/clientes/agendamento/Confirmar";
import CadastroCli from "../pages/professional/clientes/CadastroCliente";
import MeusClientes from "../pages/professional/clientes/MeusClientes";
import MeusServicos from "../pages/professional/servicos/MeusServicos";
import AddServico from "../pages/professional/servicos/AddServico";
import EditarServico from "../pages/professional/servicos/EditarServico";
import Financeiro from "../pages/professional/Financeiro";
import HistoricoFinanceiro from "../pages/professional/financeiro/HistoricoFinanceiro";
import Mensagem from "../pages/professional/mensagens/Mensagem";
import ContatoPro from "../pages/professional/contato/Contato";
import Configuracoes from "../pages/professional/configuracoes/Configuracoes";
import AlterarSenhaPro from "../pages/professional/autenticacao/AlterarSenha";
import ProNotification from "../pages/professional/notificacoes/Notificacoes";

import Alerta from "../pages/PopUp";


export const routes = createBrowserRouter([
  {
    path: "/",
    element: <PaginaInicial />,
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

  // Profissional
  { path: "/profissional/dashboard", element: <Dashboard /> },
  { path: "/profissional/confirmar", element: <Confirmar /> },
  { path: "/profissional/cadastro-cliente", element: <CadastroCli /> },
  { path: "/profissional/meus-clientes", element: <MeusClientes /> },
  { path: "/profissional/meus-servicos", element: <MeusServicos /> },
  { path: "/profissional/servico/add", element: <AddServico /> },
  { path: "/profissional/servico/editar", element: <EditarServico /> },
  { path: "/profissional/financeiro", element: <Financeiro /> },
  { path: "/profissional/financeiro/historico", element: <HistoricoFinanceiro /> },
  { path: "/profissional/mensagens", element: <Mensagem /> },
  { path: "/profissional/contato", element: <ContatoPro /> },
  { path: "/profissional/configuracoes", element: <Configuracoes /> },
  { path: "/profissional/alterar-senha", element: <AlterarSenhaPro /> },
  { path: "/profissional/notificacoes", element: <ProNotification /> },

  { path: "/popup", element: <Alerta /> },
]);
