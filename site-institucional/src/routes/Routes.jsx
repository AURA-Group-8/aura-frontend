import { createBrowserRouter } from "react-router-dom";
import Cadastro from "../pages/client-pages/Cadastro";
import Login from "../pages/client-pages/Login";
import App from "../App";
import AlterarSenha from "../pages/client-pages/ChangePassword";
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
        element: <AlterarSenha/>,
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

])