import { lazy } from "react";

const Login = lazy(() => import("../pages/auth/Login"));
const CreateAccount = lazy(() => import("../pages/auth/CreateAccount"));
// const MyProducts = lazy(() => import("../pages/MyProducts"));

export const publicRoutes = [
    {
        path: "/login",
        Element: Login,
    },
    {
        path: "/create-account",
        Element: CreateAccount,
    },
];
export const privateRoutes = [
    {
        path: "/my-products",
        Element: <div>fds</div>,
        noShell: false,
    },
];

const appRoutes = [...publicRoutes, ...privateRoutes];

export default appRoutes;
