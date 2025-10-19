import { Suspense } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import appRoutes from "../constants/appRoutes";
import RouteLoader from "../layouts/RouteLoader";
import PublicRoute from "../layouts/PublicRoute";

export function RouterProvider() {
    return (
        <BrowserRouter>
            <Suspense fallback={<RouteLoader />}>
                <Routes>
                    {appRoutes.map(({ path, Element }, index) => (
                        <Route
                            key={index}
                            path={path}
                            element={
                                <PublicRoute>
                                    <Element />
                                </PublicRoute>
                            }
                        />
                    ))}

                    <Route
                        path="/"
                        element={<Navigate to="/login" replace />}
                    />

                    <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
            </Suspense>
        </BrowserRouter>
    );
}
