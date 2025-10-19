import { Navigate } from "react-router-dom";
import AppShellLayout from "./AppShellLayout";

export default function ProtectedRoute({ children, noShell }) {
    const userId = localStorage.getItem("userId");

    if (!userId) {
        return <Navigate to="/login" replace />;
    }

    if (noShell) {
        return children;
    }

    return <AppShellLayout>{children}</AppShellLayout>;
}
