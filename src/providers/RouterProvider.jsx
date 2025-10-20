import { Suspense } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { useCurrentUser } from "../hooks/useCurrentUser";
import RouteLoader from "../layouts/RouteLoader";
import PublicRoute from "../layouts/PublicRoute";
import Login from "../app/auth/Login/Login";
import CreateAccount from "../app/auth/CreateAccount/CreateAccount";
import ProtectedRoute from "../layouts/ProtectedRoute";

function DefaultRedirect() {
    const currentUser = useCurrentUser();

    if (currentUser) {
        return <Navigate to="/my-products" replace />;
    }
    return <Navigate to="/login" replace />;
}

export function RouterProvider() {
    return (
        <BrowserRouter>
            <Suspense fallback={<RouteLoader />}>
                <Routes>
                    <Route
                        path="/login"
                        element={
                            <PublicRoute>
                                <Login />
                            </PublicRoute>
                        }
                    />
                    <Route
                        path="/create-account"
                        element={
                            <PublicRoute>
                                <CreateAccount />
                            </PublicRoute>
                        }
                    />

                    <Route
                        path="/my-products"
                        element={<ProtectedRoute>fsd</ProtectedRoute>}
                    />

                    <Route path="/" element={<DefaultRedirect />} />

                    <Route path="*" element={<DefaultRedirect />} />
                </Routes>
            </Suspense>
        </BrowserRouter>
    );
}
