import { Navigate } from "react-router-dom";
import { useCurrentUser } from "../hooks/useCurrentUser";
import Navbar from "./Navbar";

export default function PublicRoute({ children }) {
    const currentUser = useCurrentUser();

    if (currentUser) {
        return <Navigate to="/my-products" replace />;
    }

    return <Navbar>{children}</Navbar>;
}
