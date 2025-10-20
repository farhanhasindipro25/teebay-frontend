import { Suspense } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { useCurrentUser } from "../hooks/useCurrentUser";
import RouteLoader from "../layouts/RouteLoader";
import PublicRoute from "../layouts/PublicRoute";
import ProtectedRoute from "../layouts/ProtectedRoute";
import appRoutes from "../constants/appRoutes";

function DefaultRedirect() {
    const currentUser = useCurrentUser();
    if (currentUser) return <Navigate to="/my-products" replace />;
    return <Navigate to="/" replace />;
}

export function RouterProvider() {
    return (
        <BrowserRouter>
            <Suspense fallback={<RouteLoader />}>
                <Routes>
                    {appRoutes.map(({ path, Element, isPrivate }, index) => {
                        const Wrapper = isPrivate
                            ? ProtectedRoute
                            : PublicRoute;
                        return (
                            <Route
                                key={index}
                                path={path}
                                element={
                                    <Wrapper>
                                        <Element />
                                    </Wrapper>
                                }
                            />
                        );
                    })}

                    <Route path="*" element={<DefaultRedirect />} />
                </Routes>
            </Suspense>
        </BrowserRouter>
    );
}
