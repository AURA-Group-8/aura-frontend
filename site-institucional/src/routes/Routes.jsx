import { createBrowserRouter } from "react-router-dom";
import Cadastro from "../pages/client-pages/Cadastro";
import Login from "../pages/client-pages/Login";
import ChangePassword from "../pages/client-pages/ChangePassword";
import ConfigCli from "../pages/client-pages/Config";
import Contato from "../pages/client-pages/Contact";
import HomeClient from "../pages/client-pages/Home";
import HomePage from "../pages/landing-page-sections/HomePage";
import Dashboard from "../pages/professional-pages/Dashboard";
import Agendar from "../pages/professional-pages/Agendar";
import DataHora from "../pages/professional-pages/DataHora";
import Confirmar from "../pages/professional-pages/Confirmar";
import CadastroCli from "../pages/professional-pages/CadastroCli";
import Alerta from "../pages/Pop-up";
import Notificacao from "../pages/client-pages/Notificacao";
import MeusServicos from "../pages/professional-pages/MeusServicos";
import Financeiro from "../pages/professional-pages/Financeiro";
import AddServico from "../pages/professional-pages/AddServico";
import HistoricoFinanceiro from "../pages/professional-pages/HistoricoFinanceiro";
import MeusClientes from "../pages/professional-pages/MeusClientes";
import Mensagem from "../pages/professional-pages/Mensagem";
import LoginPro from "../pages/professional-pages/Login";
import ContatoPro from "../pages/professional-pages/Contato";
import Configuracoes from "../pages/professional-pages/ConfigPro";
import AgendarCli from "../pages/client-pages/AgendarCli";
import DataHoraCli from "../pages/client-pages/DataHoraCli";
import MeusAgendamentosCli from "../pages/client-pages/MeusAgendamentos";
import EditarServico from "../pages/professional-pages/EditarServico";
import Historico from "../pages/client-pages/Historico";
import AlterarSenha from "../pages/professional-pages/AlterarSenha";
import EsqueceuSenha from "../pages/client-pages/ForgotPassword";
import ValidarToken from "../pages/client-pages/ValidarToken";
import ProNotification from "../pages/professional-pages/Notification";
import ConfirmarCli from "../pages/client-pages/ConfirmarCli";



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