import { createBrowserRouter } from "react-router-dom";
import Cadastro from "../pages/cliente/Cadastro";
import Login from "../pages/cliente/autenticacao/Login";
import ChangePassword from "../pages/cliente/autenticacao/AlterarSenha";
import ConfigCli from "../pages/cliente/configuracoes/Configuracoes";
import Contato from "../pages/cliente/contato/Contato";
import HomeClient from "../pages/cliente/Home";
import HomePage from "../pages/landing-page/PaginaInicial";
import Dashboard from "../pages/professional/Dashboard";
import Agendar from "../pages/professional/clientes/agendamento/AgendarCliente";
import DataHora from "../pages/professional/DataHora";
import Confirmar from "../pages/professional/Confirmar";
import CadastroCli from "../pages/professional/clientes/CadastroCliente";
import Alerta from "../pages/PopUp";
import Notificacao from "../pages/cliente/notificacoes/Notificacoes";
import MeusServicos from "../pages/professional/MeusServicos";
import Financeiro from "../pages/professional/Financeiro";
import AddServico from "../pages/professional/servicos/AdicionarServico";
import HistoricoFinanceiro from "../pages/professional/HistoricoFinanceiro";
import MeusClientes from "../pages/professional/MeusClientes";
import Mensagem from "../pages/professional/Mensagem";
import LoginPro from "../pages/professional/Login";
import ContatoPro from "../pages/professional/Contato";
import Configuracoes from "../pages/professional/configuracoes/ConfiguracoesProfissional";
import AgendarCli from "../pages/cliente/AgendarCliente";
import DataHoraCli from "../pages/cliente/DataHoraCli";
import MeusAgendamentosCli from "../pages/cliente/MeusAgendamentos";
import EditarServico from "../pages/professional/EditarServico";
import Historico from "../pages/cliente/Historico";
import AlterarSenha from "../pages/professional/AlterarSenha";
import EsqueceuSenha from "../pages/cliente/autenticacao/EsqueciSenha";
import ValidarToken from "../pages/cliente/ValidarToken";
import ProNotification from "../pages/professional/notificacoes/Notificacoes";
import ConfirmarCli from "../pages/cliente/agendamentos/ConfirmarCliente";

export const routes = createBrowserRouter([
    {
        path: "/",
        element: <HomePage/>,
        errorElement: <h1>Page not found</h1>, 

    },

    {
        path: "/pages/client-pages/Cadastro",
        element: <Cadastro/>,
        errorElement: <h1>Page not found</h1>
    },

    {
        path: "/pages/client-pages/Login",
        element: <Login/>,
        errorElement: <h1>Page not found</h1>
    },

    {
        path: "/pages/client-pages/ChangePassword",
        element: <ChangePassword/>,
        errorElement: <h1>Page not found</h1>
    },

    {
        path: "/pages/client-pages/Contact",
        element: <Contato/>,
        errorElement: <h1>Page not found</h1>
    },

    {
        path: "/pages/client-pages/Home",
        element: <HomeClient/>,
        errorElement: <h1>Page not found</h1>
    },

    {
        path: "/pages/client-pages/Config",
        element: <ConfigCli/>,
        errorElement: <h1>Page not found</h1>
    },

    {
        path: "/pages/professional-pages/Dashboard",
        element: <Dashboard/>,
        errorElement: <h1>Page not found</h1>
    },

    {
        path: "/pages/professional-pages/Agendar",
        element: <Agendar/>,
        errorElement: <h1>Page not found</h1>
    },

    {
        path: "/pages/professional-pages/DataHora",
        element: <DataHora/>,
        errorElement: <h1>Page not found</h1>
    },

    {
        path: "/pages/professional-pages/Confirmar",
        element: <Confirmar/>,
        errorElement: <h1>Page not found</h1>
    },

    {
        path: "/pages/professional-pages/CadastroCli",
        element: <CadastroCli/>,
        errorElement: <h1>Page not found</h1>
    },

    {
        path: "/pages/Pop-up",
        element: <Alerta/>,
        errorElement: <h1>Page not found</h1>
    },

    {
        path: "/pages/client-pages/Notificacao",
        element: <Notificacao/>,
        errorElement: <h1>Page not found</h1>
    },

    {
        path: "/pages/professional-pages/MeusServicos",
        element: <MeusServicos/>,
        errorElement: <h1>Page not found</h1>
    },

    {
        path: "/pages/professional-pages/Financeiro",
        element: <Financeiro/>,
        errorElement: <h1>Page not found</h1>
    },

    {
        path: "/pages/professional-pages/AddServico",
        element: <AddServico/>,
        errorElement: <h1>Page not found</h1>
    },
    {
        path: "/pages/professional-pages/HistoricoFinanceiro",
        element: <HistoricoFinanceiro/>,
        errorElement: <h1>Page not found</h1>
    },

    {
        path: "/pages/professional-pages/MeusClientes",
        element: <MeusClientes/>,
        errorElement: <h1>Page not found</h1>
    },

    {
        path: "/pages/professional-pages/Mensagem",
        element: <Mensagem/>,
        errorElement: <h1>Page not found</h1>
    },

    {
        path: "/pages/professional-pages/Login",
        element: <LoginPro/>,
        errorElement: <h1>Page not found</h1>
    },

    {
        path: "/pages/professional-pages/Contato",
        element: <ContatoPro/>,
        errorElement: <h1>Page not found</h1>
    },

    {
        path: "/pages/professional-pages/Configuracoes",
        element: <Configuracoes/>,
        errorElement: <h1>Page not found</h1>
    },

    {
        path: "/pages/client-pages/AgendarCli",    
        element: <AgendarCli/>,
        errorElement: <h1>Page not found</h1>
    },

    {
        path: "/pages/client-pages/DataHoraCli",
        element: <DataHoraCli/>,
        errorElement: <h1>Page not found</h1>
    },

    {
        path: "/pages/client-pages/MeusAgendamentosCli",
        element: <MeusAgendamentosCli/>,
        errorElement: <h1>Page not found</h1>
    },

    {
        path: "/pages/professional-pages/EditarServico",
        element: <EditarServico/>,
        errorElement: <h1>Page not found</h1>
    },

    {
        path: "/pages/client-pages/Historico",
        element: <Historico/>,
        errorElement: <h1>Page not found</h1>
    },

    {
        path: "/pages/professional-pages/AlterarSenha",
        element: <AlterarSenha/>,
        errorElement: <h1>Page not found</h1>
    },

    {
        path: "/pages/professional-pages/Notification",
        element: <ProNotification/>,
        errorElement: <h1>Page not found</h1>
    },

    {
        path: "/pages/client-pages/ForgotPassword",
        element: <EsqueceuSenha/>,
        errorElement: <h1>Page not found</h1>
    },

    {
        path: "/pages/client-pages/ValidarToken",
        element: <ValidarToken/>,
        errorElement: <h1>Page not found</h1>
    },

     {
        path: "/pages/client-pages/ConfirmarCli",
        element: <ConfirmarCli/>,
        errorElement: <h1>Page not found</h1>
    },



    
])