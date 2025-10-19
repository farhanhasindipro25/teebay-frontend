import { lazy } from "react";
import * as urls from "./appUrls";
const Login = lazy(() => import("../app/auth/Login/Login"));
const CreateUser = lazy(() => import("../app/auth/CreateUser/CreateUser"));

const appRoutes = [
    {
        path: urls.LOGIN,
        Element: Login,
    },
    {
        path: urls.CREATE_USER,
        Element: CreateUser,
    },
];

export default appRoutes;
