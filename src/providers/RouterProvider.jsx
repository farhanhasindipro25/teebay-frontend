import { Suspense } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import appRoutes from "../constants/appRoutes";

export function RouterProvider() {
    return (
        <BrowserRouter>
            <Suspense fallback={<RouteLoader />}>
                <Routes>
                    {appRoutes.map(
                        ({ path, Element, isProtected, noShell }, index) => {
                            if (isProtected) {
                                return (
                                    <Route
                                        key={path}
                                        path={path}
                                        index={index}
                                        element={
                                            <ProtectedRoute noShell={noShell}>
                                                <Element />
                                            </ProtectedRoute>
                                        }
                                    />
                                );
                            }

                            return (
                                <Route
                                    key={path}
                                    path={path}
                                    index={isIndexUrl}
                                    element={
                                        <PublicRoute>
                                            <Element />
                                        </PublicRoute>
                                    }
                                />
                            );
                        }
                    )}

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
