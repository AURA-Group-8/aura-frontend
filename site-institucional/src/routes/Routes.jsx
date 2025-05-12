import { createBrowserRouter } from "react-router-dom";
import Cadastro from "../pages/client-pages/Cadastro";
import Login from "../pages/client-pages/Login";
import App from "../App";
import AlterarSenha from "../pages/client-pages/ChangePassword";
import ConfigCli from "../pages/client-pages/Config";
import Contato from "../pages/client-pages/Contact";
import HomeClient from "../pages/client-pages/Home";
import HomePage from "../pages/landing-page-sections/HomePage";


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
    }
])