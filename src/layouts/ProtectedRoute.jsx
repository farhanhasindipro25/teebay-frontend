import { Navigate } from "react-router-dom";
import { useCurrentUser } from "../hooks/useCurrentUser";
import AppShellLayout from "./AppShellLayout";

export default function ProtectedRoute({ children, noShell = false }) {
    const currentUser = useCurrentUser();
    const userId = localStorage.getItem("userId");

    if (!currentUser && !userId) {
        return <Navigate to="/login" replace />;
    }

    if (noShell) {
        return children;
    }

    return <AppShellLayout>{children}</AppShellLayout>;
}
