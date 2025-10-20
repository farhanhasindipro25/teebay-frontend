import { Navigate } from "react-router-dom";
import { useCurrentUser } from "../hooks/useCurrentUser";

export default function PublicRoute({ children }) {
    const currentUser = useCurrentUser();

    if (currentUser) {
        return <Navigate to="/dashboard" replace />;
    }

    return children;
}
