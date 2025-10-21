import { lazy } from "react";
import * as urls from "./appUrls";

const Login = lazy(() => import("../app/Auth/Login/Login"));
const CreateAccount = lazy(() =>
    import("../app/Auth/CreateAccount/CreateAccount")
);
const Products = lazy(() => import("../app/Products/Products"));
const ProductDetails = lazy(() =>
    import("../app/ProductDetails/ProductDetails")
);
const UserProducts = lazy(() => import("../app/UserProducts/UserProducts"));
const CreateProduct = lazy(() => import("../app/CreateProduct/CreateProduct"));
const UpdateProduct = lazy(() => import("../app/UpdateProduct/UpdateProduct"));

const appRoutes = [
    {
        path: urls.PRODUCTS,
        Element: Products,
        isPrivate: true,
    },
    {
        path: urls.PRODUCT_DETAILS,
        Element: ProductDetails,
        isPrivate: true,
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
    {
        path: urls.CREATE_PRODUCT,
        Element: CreateProduct,
        isPrivate: true,
    },
    {
        path: urls.EDIT_PRODUCT,
        Element: UpdateProduct,
        isPrivate: true,
    },
];

export default appRoutes;
