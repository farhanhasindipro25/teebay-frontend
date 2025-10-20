import { lazy } from "react";
import * as urls from "./appUrls";
const Login = lazy(() => import("../app/auth/Login/Login"));
const CreateAccount = lazy(() =>
    import("../app/auth/CreateAccount/CreateAccount")
);

const appRoutes = [
    {
        path: urls.LOGIN,
        Element: Login,
    },
    {
        path: urls.CREATE_ACCOUNT,
        Element: CreateAccount,
    },
];

export default appRoutes;
