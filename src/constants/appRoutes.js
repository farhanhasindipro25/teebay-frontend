import { lazy } from "react";
import * as urls from "./appUrls";

const Login = lazy(() => import("../app/Auth/Login/Login"));
const CreateAccount = lazy(() =>
    import("../app/Auth/CreateAccount/CreateAccount")
);
const Products = lazy(() => import("../app/Products/Products"));
const ProductDetails = lazy(() => import("../app/ProductDetails/ProductDetails"));
const UserProducts = lazy(() => import("../app/UserProducts/UserProducts"));

const appRoutes = [
    {
        path: urls.PRODUCTS,
        Element: Products,
        isPrivate: false,
    },
    {
        path: urls.PRODUCT_DETAILS,
        Element: ProductDetails,
        isPrivate: false,
    },
    {
        path: urls.LOGIN,
        Element: Login,
        isPrivate: false,
    },
    {
        path: urls.CREATE_ACCOUNT,
        Element: CreateAccount,
        isPrivate: false,
    },
    {
        path: urls.MY_PRODUCTS,
        Element: UserProducts,
        isPrivate: true,
    },
];

export default appRoutes;
